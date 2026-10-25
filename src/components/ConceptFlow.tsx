import { useMemo, useState } from 'react'
import type { Course, Lesson } from '../types'
import type { DsaConcept, ConceptProblem } from '../data/dsa'
import { sectionKinds } from '../lib/sections'
import { LessonSection } from './LessonSection'
import { TopBar } from './TopBar'
import { Celebration, type CelebrationData } from './Celebration'
import { completeLesson } from '../lib/store'
import { snap, stepsBetween } from '../lib/celebrate'
import { go, href } from '../lib/router'
import { sfx } from '../lib/sound'
import { t } from '../lib/i18n'
import { problemsForLesson, moreForLesson, lcUrl, type CatalogItem } from '../data/practice/catalog'
import { useProgress, solveProblem } from '../lib/store'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const H = ({ html }: { html: string }) => <span dangerouslySetInnerHTML={{ __html: html }} />
const P = ({ html }: { html: string }) => <p dangerouslySetInnerHTML={{ __html: html }} />

type Phase = 'learn' | 'trace' | 'think' | 'try' | 'take' | 'prob'

export function ConceptFlow({ course, lesson, concept, nextId }: { course: Course; lesson: Lesson; concept: DsaConcept; nextId?: string }) {
  const kinds = useMemo(() => sectionKinds(lesson), [lesson])
  const picks = useMemo(() => (course.id === 'dsa' ? problemsForLesson(lesson.id) : []), [course.id, lesson.id])
  const pick = picks[0]
  const ext = concept.problems ?? []
  const prog = useProgress()
  const phases = useMemo<Phase[]>(() => ['learn', ...(concept.dryRun ? ['trace' as const] : []), 'think', ...(concept.try ? ['try' as const] : []), 'take', ...(picks.length || ext.length ? ['prob' as const] : [])], [concept, picks.length, ext.length])
  const [phase, setPhase] = useState<Phase>('learn')
  const [ki, setKi] = useState(0)
  const [shown, setShown] = useState(1)
  const [qi, setQi] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [right, setRight] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [tried, setTried] = useState(false)
  const [startedAt] = useState(() => Date.now())
  const [result, setResult] = useState<CelebrationData | null>(null)
  const exit = () => go()

  const pi = phases.indexOf(phase)
  const inner = phase === 'learn' ? ki / Math.max(1, kinds.length) : phase === 'think' ? qi / concept.think.length : 0
  const progress = (pi + inner) / phases.length
  const next = (p: Phase) => { const i = phases.indexOf(p); return phases[i + 1] }

  if (result) {
    return (
      <div className="done-screen">
        <Celebration data={result} actions={<>
          <a className="btn btn-outline" href={href('read', course.id, lesson.id)}>{t('lesson.viewNotes')}</a>
          {pick && <a className="btn btn-blue" href={pick.app ? href('code', pick.app.id) : lcUrl(pick.slug)} {...(pick.app ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>{t('flow.solveNow', { name: pick.name })}</a>}
          {!pick && ext[0] && <a className="btn btn-blue" href={extHref(ext[0])} {...(ext[0].lc ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{t('flow.solveNow', { name: ext[0].name })}</a>}
          {nextId && <a className="btn btn-outline" href={href('lesson', course.id, nextId)}>{t('lesson.nextLesson')}</a>}
          <button className="btn btn-green" onClick={exit}>{t('lesson.continue')}</button>
        </>} />
      </div>
    )
  }

  const finish = () => {
    const perfect = wrong === 0
    const xp = 15 + right * 10 + (perfect ? 10 : 0) + (tried ? 15 : 0)
    const prev = snap()
    completeLesson(course.id, lesson.id, xp, perfect)
    const nx = snap()
    setResult({
      title: t('lesson.completeTitle'), subtitle: lesson.name, xp, perfect, prev, next: nx, steps: stepsBetween(prev, nx),
      accuracy: Math.round((right / Math.max(1, right + wrong)) * 100), seconds: (Date.now() - startedAt) / 1000,
    })
  }

  const chips = (
    <div className="mc-steps">
      {phases.map((p, i) => <span key={p} className={'mc-step' + (i === pi ? ' on' : i < pi ? ' done' : '')}>{t(`dsa.phase.${p}`)}</span>)}
    </div>
  )

  const footer = (back: (() => void) | null, label: string, onNext: () => void, disabled = false) => (
    <footer className="qfooter idle">
      <div className="qfooter-in">
        {back ? <button className="btn btn-outline" onClick={() => { sfx.back(); back() }}>{t('lesson.back')}</button> : <span />}
        <button className="btn btn-green" disabled={disabled} onClick={() => { sfx.tap(); onNext() }} autoFocus>{label}</button>
      </div>
    </footer>
  )
  const go2 = (p: Phase | undefined) => { if (p) setPhase(p); else finish() }

  let body: React.ReactNode
  let foot: React.ReactNode

  if (phase === 'learn') {
    const last = ki === kinds.length - 1
    body = <LessonSection lesson={lesson} kind={kinds[ki]} bare />
    foot = footer(ki > 0 ? () => setKi(ki - 1) : null, last ? t(concept.dryRun ? 'dsa.toTrace' : 'dsa.toThink') : t('common.continue'),
      () => { if (last) go2(next('learn')); else setKi(ki + 1) })
  } else if (phase === 'trace' && concept.dryRun) {
    const d = concept.dryRun
    const all = shown >= d.rows.length
    body = (
      <>
        <div className="mc-tag">{t('dsa.phase.trace')}</div>
        <h2 className="mc-h">{d.title}</h2>
        <p className="muted">{t('dsa.traceHint')}</p>
        <div className="dsa-table-wrap">
          <table className="dsa-table">
            <thead><tr>{d.columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
            <tbody>
              {d.rows.slice(0, shown).map((r, i) => (
                <tr key={i} className={i === d.hit && all ? 'hit' : i === shown - 1 && !all ? 'now' : ''}>
                  {r.map((c, j) => <td key={j}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!all && (
          <div className="mc-build-actions">
            <button className="btn btn-blue" onClick={() => { sfx.tap(); setShown(shown + 1) }}>{t('dsa.nextStep', { n: shown, m: d.rows.length })}</button>
            <button className="btn btn-outline" onClick={() => setShown(d.rows.length)}>{t('dsa.showAll')}</button>
          </div>
        )}
        {all && <div className="mc-explain ok"><b>{t('dsa.notice')}</b><P html={d.note} /></div>}
      </>
    )
    foot = footer(null, t('dsa.toThink'), () => go2(next('trace')), !all)
  } else if (phase === 'think') {
    const q = concept.think[qi]
    const done = picked !== null
    const ok = done && picked === q.ans
    body = (
      <>
        <div className="mc-tag">{q.tag} · {qi + 1}/{concept.think.length}{q.exec ? <span className="dsa-ver" title={t('dsa.verifiedHint')}>✓ {t('dsa.verified')}</span> : null}</div>
        <div className="mc-q"><H html={q.q} /></div>
        {q.opts.map((o, i) => (
          <button key={i} disabled={done} className={'mc-opt' + (done && i === q.ans ? ' ok' : done && i === picked ? ' bad' : '')}
            onClick={() => { setPicked(i); if (i === q.ans) { setRight((n) => n + 1); sfx.correct() } else { setWrong((n) => n + 1); sfx.wrong() } }}>
            <span className="mc-n">{'ABCD'[i]}</span><span><H html={o} /></span>
          </button>
        ))}
        {done && (
          <div className={'mc-explain ' + (ok ? 'ok' : 'bad')}>
            <b>{ok ? t('mc.right') : t('mc.wrong')}</b>
            {q.why.map((w, i) => <P key={i} html={w} />)}
          </div>
        )}
      </>
    )
    const lastQ = qi + 1 >= concept.think.length
    foot = footer(null, lastQ ? t(concept.try ? 'dsa.toTry' : 'dsa.toTake') : t('common.continue'), () => {
      setPicked(null)
      if (!lastQ) setQi(qi + 1); else go2(next('think'))
    }, !done)
  } else if (phase === 'try' && concept.try) {
    body = <TryView tr={concept.try} setTried={setTried} />
    foot = footer(null, tried ? t('dsa.toTake') : t('dsa.skipTry'), () => go2(next('try')))
  } else if (phase === 'prob' && !picks.length && ext.length) {
    body = (
      <>
        <div className="mc-tag">{t('dsa.phase.prob')}</div>
        <h2 className="mc-h">{t(ext.length > 1 ? 'flow.probTitle2' : 'flow.probTitle')}</h2>
        <p className="muted">{t('flow.probHint')}</p>
        {ext.map((c) => <ExtProbCard key={c.lc ?? c.mc} c={c} solved={!!prog.solved[extKey(c)]} />)}
      </>
    )
    foot = footer(null, t('mc.finish'), finish)
  } else if (phase === 'prob' && picks.length) {
    const more = moreForLesson(lesson.id)
    body = (
      <>
        <div className="mc-tag">{t('dsa.phase.prob')}</div>
        <h2 className="mc-h">{t(picks.length > 1 ? 'flow.probTitle2' : 'flow.probTitle')}</h2>
        <p className="muted">{t('flow.probHint')}</p>
        {picks.map((c) => <ProbCard key={c.key} c={c} solved={!!prog.solved[c.key]} />)}
        {more > 0 && <p className="small"><a href={href('code', 't:' + lesson.id)}>{t('flow.moreInN', { n: more })}</a></p>}
      </>
    )
    foot = footer(null, t('mc.finish'), finish)
  } else {
    body = (
      <>
        <div className="mc-tag">{t('dsa.phase.take')}</div>
        <h2 className="mc-h">{t('dsa.takeTitle')}</h2>
        <div className="dsa-key"><H html={concept.takeaway.key} /></div>
        <h3 className="mc-h3">{t('dsa.mistakes')}</h3>
        {concept.takeaway.mistakes.map((m, i) => <div key={i} className="mc-watch"><H html={m} /></div>)}
      </>
    )
    foot = footer(null, pick ? t('common.continue') : t('mc.finish'), () => go2(next('take')))
  }

  return (
    <div className="runner">
      <TopBar progress={progress} onExit={exit} />
      <div className="qbody learn-card mc" key={phase + qi + ki}>
        <div className="qtag">{lesson.name}</div>
        {chips}
        {body}
      </div>
      {foot}
    </div>
  )
}

const HELPER = 'const assert = (c, m) => { if (!c) throw new Error(m || "failed") }\nconst sleep = (ms) => new Promise((r) => setTimeout(r, ms))'

function Copy({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button className="btn btn-outline btn-sm" onClick={() => { try { void navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500) } catch { /* clipboard blocked */ } }}>
      {ok ? t('dsa.copied') : t('dsa.copy')}
    </button>
  )
}

function TryView({ tr, setTried }: { tr: NonNullable<DsaConcept['try']>; setTried: (v: boolean) => void }) {
  const [ticks, setTicks] = useState<boolean[]>(() => tr.checks.map(() => false))
  const toggle = (i: number) => {
    const nx = ticks.map((v, j) => (j === i ? !v : v))
    setTicks(nx); setTried(nx.every(Boolean))
  }
  const tests = [HELPER, ...tr.checks.map((c) => `// ${c.t}\n{\n${c.verify}\n}`), 'console.log("all tests passed")'].join('\n')
  return (
    <>
      <div className="mc-tag">{t('dsa.phase.try')}</div>
      <h2 className="mc-h">{t('dsa.tryTitle')}</h2>
      <P html={tr.task} />
      <pre className="mc-pre sm"><code>{tr.examples.join('\n')}</code></pre>
      <p className="muted small">{t('dsa.tryRule')}</p>
      <div className="dsa-row"><b>{t('dsa.starter')}</b><Copy text={tr.starter} /></div>
      <pre className="mc-pre"><code>{tr.starter}</code></pre>
      <div className="mc-peek"><details><summary>{t('dsa.hint')}</summary><P html={tr.hint} /></details></div>
      <h3 className="mc-h3">{t('dsa.selfCheck')}</h3>
      <p className="muted small">{t('dsa.selfCheckHint')}</p>
      <div className="dsa-row"><b>{t('dsa.tests')}</b><Copy text={tests} /></div>
      {tr.checks.map((c, i) => (
        <label key={i} className={'mc-chk' + (ticks[i] ? ' on' : '')}>
          <input type="checkbox" checked={ticks[i]} onChange={() => toggle(i)} />
          <span><b>{c.t}</b><pre className="mc-pre sm"><code>{c.verify}</code></pre></span>
        </label>
      ))}
      <div className="mc-peek"><details><summary>{t('dsa.solution')}</summary><pre className="mc-pre"><code>{esc(tr.solution)}</code></pre></details></div>
    </>
  )
}

export function ConceptReadExtra({ concept }: { concept: DsaConcept }) {
  const d = concept.dryRun
  return (
    <>
      {d && (
        <section className="lsec">
          <h3 className="lsec-title"><span>🔎</span> {t('dsa.phase.trace')}: {d.title}</h3>
          <div className="dsa-table-wrap">
            <table className="dsa-table">
              <thead><tr>{d.columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
              <tbody>{d.rows.map((r, i) => <tr key={i} className={i === d.hit ? 'hit' : ''}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <P html={d.note} />
        </section>
      )}
      <section className="lsec">
        <h3 className="lsec-title"><span>📌</span> {t('dsa.takeTitle')}</h3>
        <div className="dsa-key"><H html={concept.takeaway.key} /></div>
        {concept.takeaway.mistakes.map((m, i) => <div key={i} className="mc-watch"><H html={m} /></div>)}
      </section>
    </>
  )
}

const extKey = (c: ConceptProblem) => (c.lc ? `lc:${c.lc}` : `mc:${c.mc}`)
const extHref = (c: ConceptProblem) => (c.lc ? lcUrl(c.lc) : href('lesson', 'machine-coding', c.mc!))

/** A practice problem of a non-DSA concept lesson: LeetCode (opens in a new tab, honest tick) or a Machine Coding lesson. */
export function ExtProbCard({ c, solved }: { c: ConceptProblem; solved: boolean }) {
  return (
    <div className="flow-prob">
      <div className="flow-prob-head">
        <b>{c.name}</b><span className={'diff-pill ' + c.diff}>{t(`code.${c.diff}`)}</span>
        {solved && <span className="chip">✓ {t('code.solved')}</span>}
      </div>
      <div className="small muted">{c.lc ? t('flow.probLcHere') : t('flow.probMc')}</div>
      <div className="mc-build-actions">
        <a className="btn btn-blue" href={extHref(c)} {...(c.lc ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{c.lc ? 'LeetCode ↗' : t('flow.openMc')}</a>
        {c.lc && !solved && <button className="btn btn-outline" onClick={() => { sfx.correct(); solveProblem(extKey(c), 10) }}>✓ {t('code.markSolved')}</button>}
      </div>
    </div>
  )
}

function ProbCard({ c, solved }: { c: CatalogItem; solved: boolean }) {
  const open = c.app ? href('code', c.app.id) : lcUrl(c.slug)
  const ext = c.app ? {} : { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <div className="flow-prob">
      <div className="flow-prob-head">
        <b>{c.name}</b><span className={'diff-pill ' + c.diff}>{t(`code.${c.diff}`)}</span>
        <span className={'tier-badge ' + c.tier}>{t(`tier.${c.tier}`)}</span>
        {solved && <span className="chip">✓ {t('code.solved')}</span>}
      </div>
      {c.app
        ? <div className="small muted">{t('flow.probMeta', { time: c.app.time, space: c.app.space, min: String(c.app.diff === 'easy' ? 15 : c.app.diff === 'medium' ? 25 : 40) })}</div>
        : <div className="small muted">{t('flow.probLc')}</div>}
      <div className="mc-build-actions">
        <a className="btn btn-blue" href={open} {...ext}>{t('flow.openProblem')}{c.app ? '' : ' ↗'}</a>
      </div>
    </div>
  )
}
