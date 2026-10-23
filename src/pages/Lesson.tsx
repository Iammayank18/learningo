import { useEffect, useMemo, useState } from 'react'
import { useCourse } from '../lib/useCourse'
import { buildLessonQuiz, locate } from '../lib/quiz'
import { sectionKinds } from '../lib/sections'
import { completeLesson, passedMap, useProgress } from '../lib/store'
import { go, href } from '../lib/router'
import { LessonSection } from '../components/LessonSection'
import { QuizRunner, type QuizResult } from '../components/QuizRunner'
import { TopBar } from '../components/TopBar'
import { Mascot } from '../components/Mascot'
import { Celebration, type CelebrationData } from '../components/Celebration'
import { snap, stepsBetween } from '../lib/celebrate'
import { sfx } from '../lib/sound'
import { usePrefs } from '../lib/prefs'
import { lockedIds } from '../lib/unlock'
import type { Course } from '../types'
import { tr } from '../lib/i18n'

export function LessonPage({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const { course, loading, error } = useCourse(courseId)
  if (error) return <div className="empty">{tr('Lesson load nahi hua.')}</div>
  if (loading || !course) return <div className="empty">Loading…</div>
  return <Gate key={courseId + lessonId} course={course} lessonId={lessonId} />
}

function Gate({ course, lessonId }: { course: Course; lessonId: string }) {
  const p = useProgress()
  const { unlockAll } = usePrefs()
  // decide once on entry, so finishing the lesson doesn't re-lock/unlock the screen mid-run
  const [blocked] = useState(() => lockedIds(course, passedMap(p), unlockAll).blocker[lessonId] ?? null)
  useEffect(() => { if (blocked) sfx.lock() }, [blocked])
  if (blocked) {
    return (
      <div className="done-screen">
        <Mascot mood="sad" size={110} />
        <h1>{tr('🔒 Ye lesson abhi locked hai')}</h1>
        <p className="muted">{tr('Pehle')} <b>{blocked.name}</b> {tr('complete karo — phir agla khulega.')}</p>
        <div className="done-actions">
          <a className="btn btn-outline" href={href('read', course.id, lessonId)}>{tr('Sirf notes padho')}</a>
          <a className="btn btn-green" href={href('lesson', course.id, blocked.id)}>{tr('Wahi lesson shuru karo')}</a>
        </div>
      </div>
    )
  }
  return <Runner course={course} lessonId={lessonId} />
}

function Runner({ course, lessonId }: { course: Course; lessonId: string }) {
  const loc = locate(course, lessonId)
  const kinds = useMemo(() => (loc ? sectionKinds(loc.lesson) : []), [loc])
  const [salt] = useState(() => String(Date.now()))
  const items = useMemo(() => buildLessonQuiz(course, lessonId, salt).map((ex) => ({ ex, group: lessonId })), [course, lessonId, salt])
  const [step, setStep] = useState(0)
  const [startedAt] = useState(() => Date.now())
  const [result, setResult] = useState<CelebrationData | null>(null)
  const exit = () => go()

  if (!loc) return <div className="empty">{tr('Lesson nahi mila.')}</div>
  const { lesson, ui, li } = loc
  const nextLesson = course.units[ui].lessons[li + 1] ?? course.units[ui + 1]?.lessons[0]

  if (result) {
    return (
      <div className="done-screen">
        <Celebration data={result} actions={<>
          <a className="btn btn-outline" href={href('read', course.id, lessonId)}>{tr('Notes dekho')}</a>
          {nextLesson && <a className="btn btn-outline" href={href('lesson', course.id, nextLesson.id)}>Next lesson →</a>}
          <button className="btn btn-green" onClick={exit}>Continue</button>
        </>} />
      </div>
    )
  }

  const finish = (r: QuizResult) => {
    const perfect = r.mistakes === 0
    const xp = r.correct * 10 + 15 + (perfect ? 10 : 0)
    const prev = snap()
    completeLesson(course.id, lessonId, xp, perfect)
    const next = snap()
    setResult({
      title: 'Lesson complete!', subtitle: lesson.name, xp, perfect, prev, next, steps: stepsBetween(prev, next),
      accuracy: Math.round((r.correct / Math.max(1, r.total)) * 100), seconds: (Date.now() - startedAt) / 1000,
    })
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
            <button className="btn btn-outline" disabled={step === 0} onClick={() => { sfx.back(); setStep(step - 1) }}>Back</button>
            <button className="btn btn-green" onClick={() => { sfx.tap(); setStep(step + 1) }} autoFocus>{last ? tr('Practice shuru karo') : 'Continue'}</button>
          </div>
        </footer>
      </div>
    )
  }

  return <QuizRunner items={items} baseDone={kinds.length} baseTotal={kinds.length} onExit={exit} onFinish={finish} />
}

