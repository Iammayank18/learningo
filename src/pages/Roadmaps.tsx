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
      <div className="road-hero">
        <div className="road-ico big">{r.icon}</div>
        <div className="road-hero-text">
          <h1>{r.title}</h1>
          <p className="muted">{r.tagline}</p>
          <div className="muted small">{r.audience} · {r.stages.length} stages · ~{hours(s.total)} ghante</div>
        </div>
        <Ring value={s.pct} size={84}><b>{Math.round(s.pct * 100)}%</b></Ring>
      </div>

      <div className="row-btns">
        {nextCourse && <button className="btn btn-green" onClick={() => start(nextCourse)}>{s.done ? 'Continue' : 'Shuru karo'} · {metaOf(nextCourse)!.title}</button>}
        <button className={'btn ' + (mine ? 'btn-outline' : 'btn-blue')} onClick={() => { sfx.tap(); setTrack(mine ? '' : r.id) }}>{mine ? '✓ Meri track' : 'Ise meri track banao'}</button>
      </div>
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
