import { useCourse } from '../lib/useCourse'
import { locate } from '../lib/quiz'
import { sectionKinds } from '../lib/sections'
import { href } from '../lib/router'
import { lid, useProgress } from '../lib/store'
import { LessonSection } from '../components/LessonSection'
import { tr } from '../lib/i18n'

export function Read({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const { course, loading, error } = useCourse(courseId)
  const p = useProgress()
  if (error) return <div className="empty">{tr('Load nahi hua.')}</div>
  if (loading || !course) return <div className="empty">Loading…</div>
  const loc = locate(course, lessonId)
  if (!loc) return <div className="empty">{tr('Lesson nahi mila.')}</div>
  const { lesson, ui, li } = loc
  const unit = course.units[ui]
  const prev = unit.lessons[li - 1] ?? course.units[ui - 1]?.lessons.at(-1)
  const next = unit.lessons[li + 1] ?? course.units[ui + 1]?.lessons[0]
  const card = p.cards[lid(course.id, lesson.id)]
  return (
    <article className="page read">
      <div className="crumbs"><a href={href()}>{course.icon} {course.title}</a> › {unit.title}</div>
      <h1>{lesson.name}</h1>
      <div className="read-actions">
        <a className="btn btn-green" href={href('lesson', course.id, lesson.id)}>{tr('Practice karo · +25 XP')}</a>
        {card && <span className="chip">Crown {card.stage}/5</span>}
      </div>
      {sectionKinds(lesson, true).map((k) => <LessonSection key={k} lesson={lesson} kind={k} />)}
      <nav className="pager">
        {prev ? <a className="btn btn-outline" href={href('read', course.id, prev.id)}>← {prev.name.slice(0, 40)}</a> : <span />}
        {next ? <a className="btn btn-outline" href={href('read', course.id, next.id)}>{next.name.slice(0, 40)} →</a> : <span />}
      </nav>
    </article>
  )
}
