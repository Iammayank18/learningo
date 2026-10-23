import { useEffect, useState } from 'react'
import { loadCourse } from '../data/load'
import { buildReviewQuiz, locate } from '../lib/quiz'
import { dueCards, getProgress, reviewLesson, useProgress } from '../lib/store'
import { go, href } from '../lib/router'
import { QuizRunner, type QuizItem, type QuizResult } from '../components/QuizRunner'

const MAX_LESSONS = 8

export function Review() {
  const p = useProgress()
  const [items, setItems] = useState<QuizItem[] | null>(null)
  const [names, setNames] = useState<Record<string, string>>({})
  const [started, setStarted] = useState(false)
  const [summary, setSummary] = useState<{ ok: number; total: number; xp: number } | null>(null)
  const [now] = useState(() => Date.now())
  const [snapshotDue] = useState(() => dueCards(getProgress()))

  useEffect(() => {
    let live = true
    ;(async () => {
      const picked = snapshotDue.slice(0, MAX_LESSONS)
      const out: QuizItem[] = []
      const nm: Record<string, string> = {}
      for (const id of picked) {
        const [cid, ...rest] = id.split('/')
        const lessonId = rest.join('/')
        try {
          const course = await loadCourse(cid)
          const loc = locate(course, lessonId)
          if (!loc) continue
          nm[id] = loc.lesson.name
          for (const ex of buildReviewQuiz(course, lessonId, String(Date.now() >> 10))) out.push({ ex, group: id })
        } catch { /* skip */ }
      }
      if (live) { setItems(out); setNames(nm) }
    })()
    return () => { live = false }
  }, [snapshotDue])

  if (summary) {
    return (
      <div className="done-screen">
        <img src="/owl.png" alt="" width={110} height={110} className="bounce" />
        <h1>Revision done!</h1>
        <p className="muted">{summary.ok}/{summary.total} topics yaad the</p>
        <div className="done-stats"><div className="dstat xp"><small>XP</small><b>⚡ {summary.xp}</b></div></div>
        <button className="btn btn-green" onClick={() => go()}>Continue</button>
      </div>
    )
  }
  if (started && items && items.length) {
    const finish = (r: QuizResult) => {
      let ok = 0, xp = 0
      const groups = Object.keys(r.ok)
      for (const g of groups) {
        const [cid, ...rest] = g.split('/')
        const good = r.ok[g]
        const x = good ? 12 : 4
        reviewLesson(cid, rest.join('/'), good, x)
        xp += x
        if (good) ok++
      }
      setSummary({ ok, total: groups.length, xp })
    }
    return <QuizRunner items={items} onExit={() => go()} onFinish={finish} />
  }

  const upcoming = Object.entries(p.cards).filter(([, c]) => c.due > now).sort((a, b) => a[1].due - b[1].due).slice(0, 6)
  return (
    <div className="page">
      <h1>Revision</h1>
      <p className="muted">Spaced repetition: ek lesson complete karne ke baad woh 1 → 3 → 7 → 21 → 56 din pe wapas aata hai. Sahi jawab = crown badhta hai, galat = peeche.</p>
      {snapshotDue.length === 0 ? (
        <div className="card empty-card"><div className="big">🎉</div><h3>Aaj ki revision clear!</h3>
          <p className="muted">{Object.keys(p.cards).length === 0 ? 'Pehle koi lesson complete karo — phir yahan revision aayega.' : 'Agla revision jab due hoga yahan dikhega.'}</p>
          <a className="btn btn-green" href={href()}>Naya lesson seekho</a></div>
      ) : (
        <div className="card">
          <h3>{snapshotDue.length} lessons due</h3>
          <ul className="due-list">{snapshotDue.slice(0, MAX_LESSONS).map((id) => <li key={id}>{names[id] ?? id.split('/')[1]}</li>)}</ul>
          {snapshotDue.length > MAX_LESSONS && <p className="muted small">Pehle {MAX_LESSONS} — baaki baad mein.</p>}
          <button className="btn btn-green" disabled={!items || !items.length} onClick={() => setStarted(true)}>{items ? 'Revision shuru karo' : 'Loading…'}</button>
        </div>
      )}
      {upcoming.length > 0 && (
        <section><h3 className="group-title">Aane wale reviews</h3>
          <ul className="upcoming">{upcoming.map(([id, c]) => (
            <li key={id}><a href={href('read', ...id.split('/'))}>{id.split('/')[1]}</a><span className="muted small">crown {c.stage} · {new Date(c.due).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span></li>
          ))}</ul></section>
      )}
    </div>
  )
}
