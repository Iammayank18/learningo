import { courseIndex } from '../data/load'
import { HUES } from '../lib/sections'
import { setActiveCourse, useProgress } from '../lib/store'
import { go } from '../lib/router'

export function Courses() {
  const p = useProgress()
  const groups = [...new Set(courseIndex.map((c) => c.group))]
  const doneIn = (id: string) => Object.keys(p.done).filter((k) => k.startsWith(id + '/')).length
  return (
    <div className="page">
      <h1>Courses</h1>
      <p className="muted">Ek course chuno — path usi se chalega. Progress har course ki alag save hoti hai.</p>
      {groups.map((g) => (
        <section key={g}>
          <h3 className="group-title">{g}</h3>
          <div className="course-grid">
            {courseIndex.filter((c) => c.group === g).map((c) => {
              const d = doneIn(c.id)
              return (
                <button key={c.id} className={'course-card' + (p.activeCourse === c.id ? ' active' : '')} style={{ ['--hue' as string]: HUES[c.hue] }}
                  onClick={() => { setActiveCourse(c.id); go() }}>
                  <div className="course-ico">{c.icon}</div>
                  <h4>{c.title}</h4>
                  <div className="muted small">{c.units} units · {c.lessons} lessons</div>
                  <div className="pbar slim"><div className="pbar-fill" style={{ width: `${(d / c.lessons) * 100}%` }} /></div>
                  <div className="small">{d}/{c.lessons} done</div>
                  {c.hasDeep && <span className="tag">Full lessons</span>}
                </button>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
