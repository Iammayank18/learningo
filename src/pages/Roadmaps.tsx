import { courseIndex, metaOf } from '../data/load'
import { roadmaps, roadmapOf, type Roadmap } from '../data/roadmaps'
import { HUES } from '../lib/sections'
import { doneCount, setActiveCourse, setTrack, useProgress, type Progress } from '../lib/store'
import { go, href } from '../lib/router'
import { sfx } from '../lib/sound'
import { Ring } from '../components/Rail'

const MIN_PER_LESSON = 8

function stats(r: Roadmap, p: Progress) {
  const ids = [...new Set(r.stages.flatMap((s) => s.courses))].filter((id) => courseIndex.some((c) => c.id === id))
  let total = 0, done = 0
  for (const id of ids) { total += metaOf(id)!.lessons; done += doneCount(p, id) }
  return { total, done, pct: total ? done / total : 0, courses: ids.length }
}

const hours = (lessons: number) => Math.max(1, Math.round((lessons * MIN_PER_LESSON) / 60))

export function Roadmaps({ id }: { id?: string }) {
  const r = id ? roadmapOf(id) : undefined
  return r ? <Detail r={r} /> : <Index />
}

function Index() {
  const p = useProgress()
  return (
    <div className="page">
      <h1>🗺️ Roadmaps</h1>
      <p className="muted">Apna goal chuno — kaunsa course kab karna hai, ye roadmap tay kar dega. Har roadmap mein stages hain; ek ke baad ek.</p>
      <div className="road-grid">
        {roadmaps.map((r) => {
          const s = stats(r, p)
          const mine = p.track === r.id
          return (
            <a key={r.id} href={href('roadmaps', r.id)} className={'road-card' + (mine ? ' mine' : '')} style={{ ['--hue' as string]: HUES[r.hue] }} onClick={() => sfx.tap()}>
              <div className="road-top">
                <div className="road-ico">{r.icon}</div>
                {mine && <span className="tag">Meri track</span>}
              </div>
              <h3>{r.title}</h3>
              <p className="muted small">{r.tagline}</p>
              <div className="pbar slim"><div className="pbar-fill" style={{ width: `${s.pct * 100}%` }} /></div>
              <div className="road-meta small">
                <span>{r.stages.length} stages · {s.courses} courses</span>
                <span>{s.done}/{s.total} · ~{hours(s.total)}h</span>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

function Detail({ r }: { r: Roadmap }) {
  const p = useProgress()
  const s = stats(r, p)
  const mine = p.track === r.id

  const stageInfo = r.stages.map((st) => {
    const cs = st.courses.filter((cid) => metaOf(cid))
    const total = cs.reduce((n, cid) => n + metaOf(cid)!.lessons, 0)
    const done = cs.reduce((n, cid) => n + doneCount(p, cid), 0)
    return { st, cs, total, done, complete: total > 0 && done >= total }
  })
  const curStage = stageInfo.findIndex((x) => !x.complete)
  const nextCourse = curStage >= 0 ? stageInfo[curStage].cs.find((cid) => doneCount(p, cid) < metaOf(cid)!.lessons) : undefined

  const start = (cid: string) => {
    sfx.tap()
    setActiveCourse(cid)
    if (!mine) setTrack(r.id)
    go()
  }

  return (
    <div className="page road-detail" style={{ ['--hue' as string]: HUES[r.hue] }}>
      <a className="muted small" href={href('roadmaps')}>← Saare roadmaps</a>
      <section className="relative mt-2 mb-5 overflow-hidden rounded-3xl bg-(--hue) px-4 py-4 text-white shadow-[0_5px_0_color-mix(in_srgb,var(--hue)_68%,#000)] sm:px-5">
        <span aria-hidden className="pointer-events-none absolute -top-14 -right-10 size-40 rounded-full bg-white/10" />
        <span aria-hidden className="pointer-events-none absolute -bottom-16 left-20 size-32 rounded-full bg-black/10" />
        <span aria-hidden className="pointer-events-none absolute top-6 right-40 hidden size-3 sm:block rounded-full bg-white/40" />
        <span aria-hidden className="pointer-events-none absolute bottom-10 right-24 hidden size-2 sm:block rounded-full bg-white/50" />

        <div className="relative flex items-center gap-3.5">
          <div className="grid size-14 shrink-0 -rotate-6 place-items-center rounded-2xl bg-white text-[30px] shadow-[0_4px_0_rgba(0,0,0,.18)] transition-transform hover:rotate-3">{r.icon}</div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-white/75">Roadmap · {r.stages.length} stages</div>
            <h1 className="mt-0.5 mb-0.5! text-[21px] leading-tight text-white!">{r.title}</h1>
            <p className="m-0! line-clamp-2 text-[13px] font-bold leading-snug text-white/90">{r.tagline}</p>
          </div>
          <div className="hidden shrink-0 sm:block">
            <Ring value={s.pct} size={64} light><b className="text-sm text-white">{Math.round(s.pct * 100)}%</b></Ring>
          </div>
        </div>

        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {[
            ['👥', r.audience],
            ['📚', `${s.done}/${s.total} lessons`],
            ['⏱️', `~${hours(s.total)} ghante`],
          ].map(([ic, t]) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full bg-black/15 px-2.5 py-1 text-[11.5px] font-bold text-white">
              <span className="text-[13px] leading-none">{ic}</span>{t}
            </span>
          ))}
          <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-[11.5px] font-extrabold sm:hidden">{Math.round(s.pct * 100)}% done</span>
        </div>

        <div className="relative mt-2.5 h-2 overflow-hidden rounded-full bg-black/15 sm:hidden">
          <div className="h-full rounded-full bg-white transition-[width] duration-700" style={{ width: `${Math.max(s.pct * 100, s.pct ? 4 : 0)}%` }} />
        </div>

        <div className="relative mt-3.5 flex flex-wrap gap-2">
          {nextCourse && (
            <button onClick={() => start(nextCourse)} className="cursor-pointer rounded-xl border-0 bg-white px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-(--hue) shadow-[0_3px_0_rgba(0,0,0,.22)] transition-[translate,box-shadow] duration-100 hover:translate-y-[1.5px] hover:shadow-[0_1.5px_0_rgba(0,0,0,.22)] active:translate-y-[3px] active:shadow-none">
              {s.done ? 'Continue' : 'Shuru karo'} · {metaOf(nextCourse)!.title}
            </button>
          )}
          <button onClick={() => { sfx.tap(); setTrack(mine ? '' : r.id) }} className={'cursor-pointer rounded-xl border-2 px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[0_3px_0_rgba(0,0,0,.18)] transition-[translate,box-shadow] duration-100 hover:translate-y-[1.5px] hover:shadow-[0_1.5px_0_rgba(0,0,0,.18)] active:translate-y-[3px] active:shadow-none ' + (mine ? 'border-white/0 bg-black/20 text-white' : 'border-white/70 bg-white/10 text-white')}>
            {mine ? '✓ Meri track' : 'Ise meri track banao'}
          </button>
        </div>
      </section>

      {!nextCourse && <div className="card empty-card"><div className="big">🏆</div><h3>Roadmap complete!</h3><p className="muted">Review tab mein revision karte raho.</p></div>}

      <ol className="timeline">
        {stageInfo.map(({ st, cs, total, done, complete }, i) => {
          const state = complete ? 'complete' : i === curStage ? 'current' : 'later'
          return (
            <li key={st.title} className={'stage ' + state}>
              <div className="stage-dot">{complete ? '✓' : i + 1}</div>
              <div className="stage-body">
                <div className="stage-head">
                  <h3>{st.title}</h3>
                  <span className="muted small">{done}/{total} lessons</span>
                </div>
                <p className="muted small">{st.blurb}</p>
                <div className="stage-courses">
                  {cs.map((cid) => {
                    const m = metaOf(cid)!
                    const d = doneCount(p, cid)
                    return (
                      <button key={cid} className="mini-course" style={{ ['--hue' as string]: HUES[m.hue] }} onClick={() => start(cid)}>
                        <span className="mc-ico">{m.icon}</span>
                        <span className="mc-main">
                          <b>{m.title}</b>
                          <span className="pbar slim"><span className="pbar-fill" style={{ width: `${(d / m.lessons) * 100}%` }} /></span>
                          <small className="muted">{d}/{m.lessons} · ~{hours(m.lessons)}h</small>
                        </span>
                        <span className="mc-go">{d >= m.lessons ? '✓' : d ? '▶' : '→'}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
