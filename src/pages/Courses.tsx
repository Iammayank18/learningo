import { courseIndex } from '../data/load'
import { HUES } from '../lib/sections'
import { setActiveCourse, useProgress } from '../lib/store'
import { go, href } from '../lib/router'
import { DSA_PROBLEMS } from '../data/practice/dsa'
import { t } from '../lib/i18n'

export function Courses() {
  const p = useProgress()
  const groups = [...new Set(courseIndex.map((c) => c.group))]
  const doneIn = (id: string) => Object.keys(p.done).filter((k) => k.startsWith(id + '/')).length
  return (
    <div className="page">
      <h1>{t('courses.title')}</h1>
      <p className="muted">{t('courses.intro')}</p>
      <a className="card code-promo" href={href('code')}>
        <span className="code-promo-ico">{'</>'}</span>
        <span><b>{t('code.coursesCard')}</b><br /><span className="muted small">{t('code.coursesCardDesc', { n: DSA_PROBLEMS.length })}</span></span>
      </a>
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
                  <div className="muted small">{t('courses.unitsLessons', { units: c.units, lessons: c.lessons })}</div>
                  <div className="pbar slim"><div className="pbar-fill" style={{ width: `${(d / c.lessons) * 100}%` }} /></div>
                  <div className="small">{t('courses.doneCount', { done: d, total: c.lessons })}</div>
                  {c.hasDeep && <span className="tag">{t('courses.fullLessons')}</span>}
                </button>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
