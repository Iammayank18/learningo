import { useCourse } from '../lib/useCourse'
import { locate } from '../lib/quiz'
import { sectionKinds } from '../lib/sections'
import { href } from '../lib/router'
import { lid, useProgress } from '../lib/store'
import { LessonSection } from '../components/LessonSection'
import { t } from '../lib/i18n'
import { BuildRead } from '../components/BuildFlow'
import { buildLessonFor } from '../data/build'
import { ConceptReadExtra, ExtProbCard } from '../components/ConceptFlow'
import { conceptFor } from '../data/dsa'
import { problemsForLesson, moreForLesson, lcUrl } from '../data/practice/catalog'

export function Read({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const { course, loading, error } = useCourse(courseId)
  const p = useProgress()
  if (error) return <div className="empty">{t('read.error')}</div>
  if (loading || !course) return <div className="empty">{t('common.loading')}</div>
  const loc = locate(course, lessonId)
  if (!loc) return <div className="empty">{t('read.notFound')}</div>
  const { lesson, ui, li } = loc
  const unit = course.units[ui]
  const prev = unit.lessons[li - 1] ?? course.units[ui - 1]?.lessons.at(-1)
  const next = unit.lessons[li + 1] ?? course.units[ui + 1]?.lessons[0]
  const card = p.cards[lid(course.id, lesson.id)]
  const bl = buildLessonFor(course.id, lesson.id)
  const dc = conceptFor(course.id, lesson.id)
  const picks = course.id === 'dsa' ? problemsForLesson(lesson.id) : []
  const more = course.id === 'dsa' ? moreForLesson(lesson.id) : 0
  return (
    <article className="page read">
      <div className="crumbs"><a href={href()}>{course.icon} {course.title}</a> › {unit.title}</div>
      <h1>{lesson.name}</h1>
      <div className="read-actions">
        <a className="btn btn-green" href={href('lesson', course.id, lesson.id)}>{t('read.practiceXp')}</a>
        {card && <span className="chip">{t('read.crown', { n: card.stage })}</span>}
      </div>
      {bl ? <BuildRead lesson={lesson} bl={bl} /> : sectionKinds(lesson, true).map((k) => <LessonSection key={k} lesson={lesson} kind={k} />)}
      {dc && <ConceptReadExtra concept={dc} />}
      {course.id !== 'dsa' && dc?.problems?.length ? (
        <section className="lsec">
          <h3 className="lsec-title"><span>{'</>'}</span> {t('code.practiceCode')}</h3>
          {dc.problems.map((c) => <ExtProbCard key={c.lc ?? c.mc} c={c} solved={!!p.solved[c.lc ? `lc:${c.lc}` : `mc:${c.mc}`]} />)}
        </section>
      ) : null}
      {picks.length > 0 && (
        <section className="lsec">
          <h3 className="lsec-title"><span>{'</>'}</span> {t('code.practiceCode')}</h3>
          <p className="muted">{t('code.practiceCodeHint')}</p>
          {picks.map((pick) => (
            <div key={pick.key} className="code-row">
              <span className={'code-dot ' + pick.diff} />
              <b>{pick.name}</b>
              <span className="muted small">{t(`code.${pick.diff}`)}</span>
              <span className={'tier-badge ' + pick.tier}>{t(`tier.${pick.tier}`)}</span>
              {p.solved[pick.key] ? <span className="chip">✓ {t('code.solved')}</span>
                : pick.app ? <a className="btn btn-green btn-sm" href={href('code', pick.app.id)}>{t('code.openProblem')}</a>
                : <a className="btn btn-green btn-sm" href={lcUrl(pick.slug)} target="_blank" rel="noopener noreferrer">LeetCode ↗</a>}
            </div>
          ))}
          {more > 0 && <p className="small"><a href={href('code', 't:' + lesson.id)}>{t('flow.moreInN', { n: more })}</a></p>}
        </section>
      )}
      <nav className="pager">
        {prev ? <a className="btn btn-outline" href={href('read', course.id, prev.id)}>← {prev.name.slice(0, 40)}</a> : <span />}
        {next ? <a className="btn btn-outline" href={href('read', course.id, next.id)}>{next.name.slice(0, 40)} →</a> : <span />}
      </nav>
    </article>
  )
}
