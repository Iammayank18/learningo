import { useEffect, useState } from 'react'
import { loadCourse, metaOf } from '../data/load'
import { buildReviewQuiz, locate } from '../lib/quiz'
import { lessonNames } from '../lib/search'
import { addXp, dueCards, reviewLesson, useProgress, DAY, INTERVALS } from '../lib/store'
import { go, href } from '../lib/router'
import { sfx } from '../lib/sound'
import { HUES } from '../lib/sections'
import { QuizRunner, type QuizItem, type QuizResult } from '../components/QuizRunner'
import { Mascot } from '../components/Mascot'
import { Celebration, type CelebrationData } from '../components/Celebration'
import { snap, stepsBetween } from '../lib/celebrate'
import { t, tp, getLocale } from '../lib/i18n'

const SIZES = [[4, 'review.quick'], [8, 'review.standard'], [15, 'review.deep']] as const

const crowns = (n: number) => '●'.repeat(n) + '○'.repeat(5 - n)
const split = (id: string) => { const [cid, ...rest] = id.split('/'); return [cid, rest.join('/')] as const }

export function Review() {
  const p = useProgress()
  const [now] = useState(() => Date.now())
  const [names, setNames] = useState<Record<string, string>>({})
  const [size, setSize] = useState<number>(8)
  const [free, setFree] = useState(false)
  const [built, setBuilt] = useState<{ key: string; items: QuizItem[] } | null>(null)
  const [running, setRunning] = useState(false)
  const [startedAt, setStartedAt] = useState(() => Date.now())
  const [summary, setSummary] = useState<(CelebrationData & { free: boolean }) | null>(null)

  const cards = Object.entries(p.cards)
  const snapshotDue = dueCards(p, now)
  const weakest = [...cards].sort((a, b) => (a[1].lastOk === b[1].lastOk ? a[1].stage - b[1].stage : a[1].lastOk ? 1 : -1)).map(([id]) => id)
  const picked = (free ? weakest : snapshotDue).slice(0, size)
  const pickedKey = picked.join('|') + (free ? ':free' : '')

  const items = built && built.key === pickedKey ? built.items : null

  useEffect(() => { void lessonNames().then(setNames) }, [])

  useEffect(() => {
    let live = true
    ;(async () => {
      const out: QuizItem[] = []
      for (const id of picked) {
        const [cid, lessonId] = split(id)
        try {
          const course = await loadCourse(cid)
          if (!locate(course, lessonId)) continue
          for (const ex of buildReviewQuiz(course, lessonId, String(Date.now() >> 10))) out.push({ ex, group: id })
        } catch { /* skip broken */ }
      }
      if (live) setBuilt({ key: pickedKey, items: out })
    })()
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedKey])

  const nameOf = (id: string) => names[id] ?? split(id)[1]

  const finish = (r: QuizResult) => {
    let ok = 0, xp = 0
    const prev = snap()
    const groups = Object.keys(r.ok)
    for (const g of groups) {
      const [cid, lessonId] = split(g)
      const good = r.ok[g]
      if (free) { const x = good ? 6 : 2; addXp(x); xp += x }
      else { const x = good ? 12 : 4; reviewLesson(cid, lessonId, good, x); xp += x }
      if (good) ok++
    }
    const next = snap()
    setRunning(false)
    setSummary({
      title: free ? t('review.freeDoneTitle') : t('review.revisionDoneTitle'), subtitle: t(free ? 'review.rememberedFree' : 'review.remembered', { ok, n: groups.length }),
      xp, perfect: ok === groups.length && groups.length > 0, prev, next, steps: stepsBetween(prev, next),
      accuracy: Math.round((ok / Math.max(1, groups.length)) * 100), seconds: (Date.now() - startedAt) / 1000, free,
    })
  }

  if (summary) return <Summary s={summary} onBack={() => setSummary(null)} />
  if (running && items?.length) {
    return <div className="overlay"><QuizRunner items={items} onExit={() => setRunning(false)} onFinish={finish} /></div>
  }

  const total = cards.length
  const strong = cards.filter(([, c]) => c.stage >= 4).length
  const stageCount = [1, 2, 3, 4, 5].map((s) => cards.filter(([, c]) => c.stage === s).length)
  const weak = cards.filter(([, c]) => !c.lastOk).map(([id]) => id)
  const acc = total ? Math.round((cards.filter(([, c]) => c.lastOk).length / total) * 100) : 0
  const forecast = Array.from({ length: 7 }, (_, i) => {
    const from = now + (i - 1) * DAY, to = now + i * DAY
    const n = cards.filter(([, c]) => (i === 0 ? c.due <= to : c.due > from && c.due <= to)).length
    return { n, label: i === 0 ? t('common.todayShort') : new Date(now + i * DAY).toLocaleDateString(getLocale(), { weekday: 'short' }) }
  })
  const fmax = Math.max(1, ...forecast.map((f) => f.n))
  const byCourse = new Map<string, string[]>()
  for (const id of snapshotDue) { const [cid] = split(id); byCourse.set(cid, [...(byCourse.get(cid) ?? []), id]) }
  const upcoming = cards.filter(([, c]) => c.due > now).sort((a, b) => a[1].due - b[1].due).slice(0, 8)
  const hasDue = snapshotDue.length > 0

  const begin = () => { sfx.tap(); setStartedAt(Date.now()); setRunning(true) }

  return (
    <div className="page">
      <h1>🔁 {t('review.title')}</h1>
      <p className="muted">{t('review.spacedRepetition', { i: INTERVALS.join(' → ') })}</p>

      <div className={'card rev-hero' + (hasDue ? ' due' : '')}>
        <Mascot mood={hasDue ? 'idle' : 'happy'} size={84} />
        <div className="rev-hero-text">
          {total === 0 ? (
            <><h3>{t('review.noRevision')}</h3><p className="muted small">{t('review.firstLesson')}</p></>
          ) : hasDue ? (
            <><h3>{tp('review.dueOne', 'review.dueOther', snapshotDue.length)}</h3><p className="muted small">{t('review.doNow', { m: Math.max(2, Math.round(Math.min(size, snapshotDue.length) * 1.5)) })}</p></>
          ) : (
            <><h3>{t('review.clear')}</h3><p className="muted small">{t('review.freePracticeHint')}</p></>
          )}
        </div>
        {total > 0 && (
          <div className="rev-actions">
            <div className="seg">
              {SIZES.map(([n, key]) => <button key={n} className={'seg-btn' + (size === n ? ' on' : '')} onClick={() => { sfx.tap(); setSize(n) }}>{t(key)}</button>)}
            </div>
            {hasDue && (
              <button className="btn btn-green" disabled={!items?.length || free} onClick={begin}>{items && !free ? t('review.startRevision') : t('common.loading')}</button>
            )}
            <button className={'btn ' + (hasDue ? 'btn-outline' : 'btn-blue')} disabled={free && !items?.length} onClick={() => { if (free) begin(); else { sfx.tap(); setFree(true) } }}>
              {free ? (items ? t('review.startFree') : t('common.loading')) : t('review.freePracticeBtn')}
            </button>
            {free && <button className="btn btn-outline" onClick={() => setFree(false)}>{t('review.back')}</button>}
          </div>
        )}
        {total === 0 && <a className="btn btn-green" href={href()}>{t('review.startLesson')}</a>}
      </div>

      {total > 0 && (
        <>
          <div className="tiles">
            <div className="tile"><small>{t('review.dueTag')}</small><b>⏰ {snapshotDue.length}</b><span className="muted small">{t('review.now')}</span></div>
            <div className="tile"><small>{t('review.learnedTag')}</small><b>📘 {total}</b><span className="muted small">{t('review.lessonsTracked')}</span></div>
            <div className="tile"><small>{t('review.strongTag')}</small><b>👑 {strong}</b><span className="muted small">{t('review.crown4plus')}</span></div>
            <div className="tile"><small>{t('review.lastOkTag')}</small><b>🎯 {acc}%</b><span className="muted small">{t('review.lastReview')}</span></div>
          </div>

          <div className="rev-cols">
            <section className="card">
              <h3>{t('review.next7')}</h3>
              <div className="bars" role="img" aria-label={t('review.reviewsPerDay')}>
                {forecast.map((f, i) => (
                  <div key={i} className="bar-col" title={t('review.reviewsCount', { n: f.n })}>
                    <span className="small">{f.n || ''}</span>
                    <div className={'bar' + (i === 0 && f.n ? ' hit' : '')} style={{ height: `${(f.n / fmax) * 100}%` }} />
                    <small>{f.label}</small>
                  </div>
                ))}
              </div>
            </section>
            <section className="card">
              <h3>{t('review.crownLevels')}</h3>
              {stageCount.map((n, i) => (
                <div key={i} className="crow crown-row">
                  <span className="crowns-lbl">{crowns(i + 1)}</span>
                  <div className="pbar slim"><div className="pbar-fill" style={{ width: `${(n / total) * 100}%` }} /></div>
                  <span className="muted small">{n}</span>
                </div>
              ))}
              <p className="muted small">{t('review.crown5Hint')}</p>
            </section>
          </div>
        </>
      )}

      {hasDue && (
        <section>
          <h3 className="group-title">{t('review.dueNow')}</h3>
          {[...byCourse.entries()].map(([cid, ids]) => {
            const m = metaOf(cid)
            return (
              <div key={cid} className="card due-group" style={{ ['--hue' as string]: HUES[m?.hue ?? 'green'] }}>
                <div className="due-group-head"><span>{m?.icon} <b>{m?.title ?? cid}</b></span><span className="muted small">{ids.length}</span></div>
                <ul className="rev-list">
                  {ids.map((id) => {
                    const c = p.cards[id]
                    const late = Math.max(0, Math.floor((now - c.due) / DAY))
                    return (
                      <li key={id}>
                        <a href={href('read', ...split(id))}>{nameOf(id)}</a>
                        <span className="muted small"><span className="crowns-lbl">{crowns(c.stage)}</span>{late > 0 ? ` · ${t('review.lateDays', { n: late })}` : ''}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
          {snapshotDue.length > size && <p className="muted small">{t('review.sessionLimit', { n: size })}</p>}
        </section>
      )}

      {weak.length > 0 && (
        <section>
          <h3 className="group-title">{t('review.weakTopics')}</h3>
          <div className="card"><ul className="rev-list">
            {weak.slice(0, 8).map((id) => <li key={id}><a href={href('read', ...split(id))}>{nameOf(id)}</a><span className="muted small">{metaOf(split(id)[0])?.title}</span></li>)}
          </ul></div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section>
          <h3 className="group-title">{t('review.upcoming')}</h3>
          <div className="card"><ul className="rev-list">
            {upcoming.map(([id, c]) => (
              <li key={id}>
                <a href={href('read', ...split(id))}>{nameOf(id)}</a>
                <span className="muted small"><span className="crowns-lbl">{crowns(c.stage)}</span> · {new Date(c.due).toLocaleDateString(getLocale(), { day: 'numeric', month: 'short' })}</span>
              </li>
            ))}
          </ul></div>
        </section>
      )}
    </div>
  )
}

function Summary({ s, onBack }: { s: CelebrationData; onBack: () => void }) {
  return (
    <div className="overlay">
      <div className="done-screen">
        <Celebration data={s} actions={<>
          <button className="btn btn-outline" onClick={onBack}>{t('review.reviewPage')}</button>
          <button className="btn btn-green" onClick={() => go()}>{t('common.continue')}</button>
        </>} />
      </div>
    </div>
  )
}
