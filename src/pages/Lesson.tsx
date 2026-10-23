import { useMemo, useState } from 'react'
import { useCourse } from '../lib/useCourse'
import { buildLessonQuiz, locate } from '../lib/quiz'
import { sectionKinds } from '../lib/sections'
import { completeLesson, getProgress, streakOf, useProgress } from '../lib/store'
import { go, href } from '../lib/router'
import { LessonSection } from '../components/LessonSection'
import { QuizRunner, type QuizResult } from '../components/QuizRunner'
import { TopBar } from '../components/TopBar'
import type { Course } from '../types'

export function LessonPage({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const { course, loading, error } = useCourse(courseId)
  if (error) return <div className="empty">Lesson load nahi hua.</div>
  if (loading || !course) return <div className="empty">Loading…</div>
  return <Runner key={courseId + lessonId} course={course} lessonId={lessonId} />
}

function Runner({ course, lessonId }: { course: Course; lessonId: string }) {
  const loc = locate(course, lessonId)
  const kinds = useMemo(() => (loc ? sectionKinds(loc.lesson) : []), [loc])
  const [salt] = useState(() => String(Date.now()))
  const items = useMemo(() => buildLessonQuiz(course, lessonId, salt).map((ex) => ({ ex, group: lessonId })), [course, lessonId, salt])
  const [step, setStep] = useState(0)
  const [result, setResult] = useState<{ xp: number; r: QuizResult; streak: number } | null>(null)
  const p = useProgress()
  const exit = () => go()

  if (!loc) return <div className="empty">Lesson nahi mila.</div>
  const { lesson, ui, li } = loc
  const nextLesson = course.units[ui].lessons[li + 1] ?? course.units[ui + 1]?.lessons[0]

  if (result) {
    const acc = Math.round((result.r.correct / Math.max(1, result.r.total)) * 100)
    return (
      <div className="done-screen">
        <img src="/owl.png" alt="" width={110} height={110} className="bounce" />
        <h1>Lesson complete!</h1>
        <p className="muted">{lesson.name}</p>
        <div className="done-stats">
          <div className="dstat xp"><small>TOTAL XP</small><b>⚡ {result.xp}</b></div>
          <div className="dstat acc"><small>ACCURACY</small><b>🎯 {acc}%</b></div>
          <div className="dstat fire"><small>STREAK</small><b>🔥 {result.streak}</b></div>
        </div>
        <p className="muted small">Revision {p.cards[`${course.id}/${lessonId}`] ? 'schedule ho gaya — Review tab mein aayega.' : 'schedule ho gaya.'}</p>
        <div className="done-actions">
          <a className="btn btn-outline" href={href('read', course.id, lessonId)}>Notes dekho</a>
          {nextLesson && <a className="btn btn-outline" href={href('lesson', course.id, nextLesson.id)}>Next lesson →</a>}
          <button className="btn btn-green" onClick={exit}>Continue</button>
        </div>
      </div>
    )
  }

  const finish = (r: QuizResult) => {
    const perfect = r.mistakes === 0
    const xp = r.correct * 10 + 15 + (perfect ? 10 : 0)
    completeLesson(course.id, lessonId, xp, perfect)
    setResult({ xp, r, streak: streakOf(getProgress()).current })
  }

  if (step < kinds.length) {
    const last = step === kinds.length - 1
    return (
      <div className="runner">
        <TopBar progress={step / (kinds.length + items.length)} onExit={exit} />
        <div className="qbody learn-card">
          <div className="qtag">{lesson.name}</div>
          <LessonSection lesson={lesson} kind={kinds[step]} bare />
        </div>
        <footer className="qfooter idle">
          <div className="qfooter-in">
            <button className="btn btn-outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
            <button className="btn btn-green" onClick={() => setStep(step + 1)} autoFocus>{last ? 'Practice shuru karo' : 'Continue'}</button>
          </div>
        </footer>
      </div>
    )
  }

  return <QuizRunner items={items} baseDone={kinds.length} baseTotal={kinds.length} onExit={exit} onFinish={finish} />
}

