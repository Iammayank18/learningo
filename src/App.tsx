import { useEffect, useState } from 'react'
import { useRoute } from './lib/router'
import { isOnboarded, useProgress } from './lib/store'
import { Shell } from './components/Shell'
import { SearchPalette } from './components/SearchPalette'
import { Learn } from './pages/Learn'
import { Courses } from './pages/Courses'
import { LessonPage } from './pages/Lesson'
import { Read } from './pages/Read'
import { Review } from './pages/Review'
import { Roadmaps } from './pages/Roadmaps'
import { Onboarding } from './pages/Onboarding'
import { Stats } from './pages/Stats'
import { Settings } from './pages/Settings'
import { useLang } from './lib/i18n'
import { applySeo } from './lib/seo'

/** Remount everything when the UI language changes, so plain t() calls re-evaluate. */
export default function App() {
  const lang = useLang()
  return <AppInner key={lang} />
}

function AppInner() {
  const route = useRoute()
  const p = useProgress()
  const [open, setOpen] = useState(false)

  useEffect(applySeo, [])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      const typing = !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o) }
      else if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) { e.preventDefault(); setOpen(true) }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  if (!isOnboarded(p)) return <Onboarding />

  const [page, a, b] = route
  let view: React.ReactNode
  let fullscreen = false
  switch (page) {
    case 'lesson': view = a && b ? <LessonPage courseId={a} lessonId={b} /> : null; fullscreen = true; break
    case 'read': view = a && b ? <Read courseId={a} lessonId={b} /> : null; break
    case 'review': view = <Review />; break
    case 'roadmaps': view = <Roadmaps id={a} />; break
    case 'courses': view = <Courses />; break
    case 'stats': view = <Stats />; break
    case 'settings': view = <Settings />; break
    default: view = <Learn courseId={p.activeCourse} />
  }
  const section = page === 'read' ? '' : (page ?? '')

  return (
    <>
      {fullscreen ? <div className="fullscreen">{view}</div> : <Shell route={section} onSearch={() => setOpen(true)}>{view}</Shell>}
      <SearchPalette open={open} onClose={() => setOpen(false)} courseId={a && (page === 'read' || page === 'lesson') ? a : p.activeCourse} />
    </>
  )
}
