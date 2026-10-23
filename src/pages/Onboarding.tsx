import { useEffect, useMemo, useState } from 'react'
import { Mascot, type Mood } from '../components/Mascot'
import { Flame } from '../components/Flame'
import { QuizRunner, type QuizItem, type QuizResult } from '../components/QuizRunner'
import { roadmaps, roadmapOf } from '../data/roadmaps'
import { loadCourse, metaOf } from '../data/load'
import { buildReviewQuiz } from '../lib/quiz'
import { go } from '../lib/router'
import { sfx } from '../lib/sound'
import { HUES } from '../lib/sections'
import { importState, lid, placeLessons, setActiveCourse, setGoal, setProfile, setTrack, getProgress } from '../lib/store'
import type { Course } from '../types'

type StepId = 'welcome' | 'name' | 'why' | 'track' | 'level' | 'placement' | 'when' | 'goal' | 'plan' | 'ready'

const WHY = [
  ['💼', 'Job switch', 'Nayi job ke liye interviews crack karne hain'],
  ['🚀', 'Next level / promotion', 'Senior ya staff role ki taraf badhna hai'],
  ['🎓', 'Fresher / campus', 'Pehli job ya placements ki taiyari'],
  ['🧠', 'Skills sharpen karna', 'Concepts pakke karne hain, jaldi nahi'],
  ['🎯', 'Specific interview aa raha hai', 'Time kam hai, focus chahiye'],
] as const

const LEVELS = [
  ['Bilkul naya hoon', 'Basics se shuru karna hai', 1],
  ['Thoda-bahut aata hai', 'Kuch concepts pata hain', 2],
  ['Kaafi aata hai', 'Interview-level revise karna hai', 3],
  ['Expert', 'Sirf gaps dhoondhne hain', 4],
] as const

const WHEN = [
  ['🔥', 'Is hafte mein', 'week'],
  ['📅', '1 mahine ke andar', 'month'],
  ['🗓️', '2-3 mahine mein', 'quarter'],
  ['🤷', 'Abhi pata nahi', 'none'],
] as const

const GOALS = [
  [20, 'Casual', '~3 min / din'],
  [30, 'Regular', '~5 min / din'],
  [50, 'Serious', '~8 min / din'],
  [100, 'Intense', '~15 min / din'],
] as const

const REMIND = [['🌅', 'Subah', 8], ['☀️', 'Dopahar', 13], ['🌆', 'Shaam', 19], ['🌙', 'Raat', 22]] as const

const SAY: Record<StepId, [string, Mood]> = {
  welcome: ['Hi! Main Prep hoon — tumhara interview-prep buddy!', 'cheer'],
  name: ['Pehle batao — tumhe kya bulaun?', 'idle'],
  why: ['Tum interview prep kyun kar rahe ho?', 'idle'],
  track: ['Tumhara target role kya hai? Main wahi roadmap banaunga.', 'idle'],
  level: ['Is track ka tumhe abhi kitna aata hai?', 'idle'],
  placement: ['Chalo, ek chhota test — dekhte hain kitna aata hai!', 'happy'],
  when: ['Interview kab tak hai?', 'idle'],
  goal: ['Roz kitna time de sakte ho?', 'idle'],
  plan: ['Ruko, tumhare liye plan bana raha hoon…', 'idle'],
  ready: ['Plan ready! Chalo shuru karte hain 🔥', 'cheer'],
}

const sampleIdx = (n: number) => Array.from({ length: 6 }, (_, i) => Math.min(n - 1, Math.floor((i * 0.6 * n) / 6)))

export function Onboarding() {
  const [step, setStep] = useState<StepId>('welcome')
  const [name, setName] = useState('')
  const [why, setWhy] = useState('')
  const [track, setTr] = useState('')
  const [level, setLevel] = useState(-1)
  const [when, setWhen] = useState('')
  const [goal, setG] = useState(0)
  const [remind, setRemind] = useState<number | null>(null)
  const [placed, setPlaced] = useState<string[]>([])
  const [testing, setTesting] = useState<QuizItem[] | null>(null)
  const [testDone, setTestDone] = useState<{ passed: number; total: number } | null>(null)
  const [busy, setBusy] = useState(false)

  const rm = roadmapOf(track)
  const firstCourseId = rm?.stages[0].courses[0] ?? 'react-mastery'
  const steps = useMemo<StepId[]>(() => ['welcome', 'name', 'why', 'track', 'level', ...(level >= 1 ? (['placement'] as StepId[]) : []), 'when', 'goal', 'plan', 'ready'], [level])
  const idx = steps.indexOf(step)
  const recGoal = when === 'week' ? 100 : when === 'month' ? 50 : 30

  const next = () => { sfx.tap(); setStep(steps[idx + 1]) }
  const back = () => { sfx.tap(); if (idx > 0) setStep(steps[idx - 1]) }

  // plan "loading" screen auto-advances
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (step !== 'plan') return
    const ts = [setTimeout(() => setTick(1), 700), setTimeout(() => setTick(2), 1400), setTimeout(() => setTick(3), 2100), setTimeout(() => { sfx.complete(); setStep('ready') }, 2900)]
    return () => ts.forEach(clearTimeout)
  }, [step])

  const startPlacement = async () => {
    setBusy(true)
    try {
      const course = await loadCourse(firstCourseId)
      const flat = course.units.flatMap((u) => u.lessons)
      const items: QuizItem[] = []
      for (const i of sampleIdx(flat.length)) {
        const l = flat[i]
        const ex = buildReviewQuiz(course, l.id, 'placement').find((e) => e.kind === 'mcq')
        if (ex) items.push({ ex, group: l.id })
      }
      setTesting(items)
    } finally { setBusy(false) }
  }

  const finishPlacement = async (r: QuizResult) => {
    const course = await loadCourse(firstCourseId)
    const flat = course.units.flatMap((u) => u.lessons)
    const marks = sampleIdx(flat.length)
    const order = marks.map((i) => flat[i].id)
    let firstFail = order.findIndex((id) => r.ok[id] === false)
    if (firstFail === -1) firstFail = order.length - 1
    const upto = marks[firstFail]
    const ids = flat.slice(0, upto).map((l) => lid(course.id, l.id))
    setPlaced(ids)
    setTestDone({ passed: order.filter((id) => r.ok[id] !== false).length, total: order.length })
    setTesting(null)
    sfx.complete()
  }

  const importFile = (f?: File) => f?.text().then((t) => {
    try { importState(t); setProfile({ onboarded: true }); go() } catch { alert('Invalid file') }
  })

  const finish = async () => {
    setBusy(true)
    sfx.tap()
    const first = rm?.stages[0].courses[0] ?? 'react-mastery'
    setProfile({ name: name.trim(), why, level: Math.max(0, level), when, onboarded: true })
    setTrack(track)
    setGoal(goal || recGoal)
    setActiveCourse(first)
    if (placed.length) placeLessons(placed)
    let course: Course | null = null
    try { course = await loadCourse(first) } catch { /* fallthrough */ }
    const pass = getProgress()
    const lesson = course?.units.flatMap((u) => u.lessons).find((l) => !pass.placed[lid(first, l.id)])
    if (course && lesson) go('lesson', course.id, lesson.id)
    else go()
  }

  // ---- placement quiz runs full-screen
  if (testing && testing.length) {
    return <div className="overlay"><QuizRunner items={testing} onExit={() => setTesting(null)} onFinish={(r) => { void finishPlacement(r) }} /></div>
  }

  const canContinue =
    step === 'welcome' || step === 'name' || step === 'plan' ||
    (step === 'why' && !!why) || (step === 'track' && !!track) || (step === 'level' && level >= 0) ||
    step === 'placement' || (step === 'when' && !!when) || (step === 'goal' && goal > 0) || step === 'ready'

  const [say, mood] = step === 'placement' && testDone ? [placed.length ? `Zabardast! ${placed.length} lessons skip kar diye 🎉` : 'Koi baat nahi — shuru se hi pakka karenge!', placed.length ? 'cheer' as Mood : 'happy' as Mood] : SAY[step]

  const totalLessons = rm ? [...new Set(rm.stages.flatMap((s) => s.courses))].reduce((n, c) => n + (metaOf(c)?.lessons ?? 0), 0) : 0
  const perDay = Math.max(0.5, (goal || recGoal) / 45)
  const days = Math.ceil(Math.max(0, totalLessons - placed.length) / perDay)
  const weeks = Math.max(1, Math.round(days / 7))
  const stage1 = rm ? rm.stages[0].courses.reduce((n, c) => n + (metaOf(c)?.lessons ?? 0), 0) : 0
  const stage1Weeks = Math.max(1, Math.ceil(Math.max(0, stage1 - placed.length) / perDay / 7))

  const downloadIcs = (hour: number) => {
    const d = new Date(); d.setHours(hour, 0, 0, 0)
    const p = (n: number) => String(n).padStart(2, '0')
    const stamp = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(hour)}0000`
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Prep//EN', 'BEGIN:VEVENT', `UID:prep-daily-${Date.now()}@prep`, `DTSTAMP:${stamp}`, `DTSTART:${stamp}`, 'DURATION:PT15M', 'RRULE:FREQ=DAILY',
      'SUMMARY:Prep — aaj ka lesson 🔥', 'DESCRIPTION:Streak mat todna!', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    a.download = 'prep-daily-reminder.ics'; a.click(); URL.revokeObjectURL(a.href)
  }

  return (
    <div className="onboard">
      {step !== 'welcome' && (
        <header className="ob-top">
          {step !== 'plan' && step !== 'ready' ? <button className="icon-btn" aria-label="Back" onClick={back}>←</button> : <span style={{ width: 40 }} />}
          <div className="pbar"><div className="pbar-fill" style={{ width: `${Math.max(6, (idx / (steps.length - 1)) * 100)}%` }} /></div>
        </header>
      )}

      <main className="ob-main" key={step}>
        <div className={'ob-say' + (step === 'welcome' ? ' center' : '')}>
          <Mascot mood={mood} size={step === 'welcome' ? 150 : 86} />
          <div className="ob-bubble">{say}</div>
        </div>

        {step === 'welcome' && (
          <div className="ob-welcome">
            <h1>Prep</h1>
            <p className="muted">Interview prep — Duolingo jaisa. Chhote lessons, roz ki streak, aur revision jo yaad rakhwata hai.</p>
          </div>
        )}

        {step === 'name' && (
          <input className="ob-input" autoFocus placeholder="Tumhara naam (optional)" value={name} maxLength={24}
            onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') next() }} />
        )}

        {step === 'why' && (
          <div className="ob-opts">
            {WHY.map(([ico, t, d]) => (
              <button key={t} className={'ob-opt' + (why === t ? ' sel' : '')} onClick={() => { sfx.select(); setWhy(t) }}>
                <span className="ob-ico">{ico}</span><span><b>{t}</b><small>{d}</small></span>
              </button>
            ))}
          </div>
        )}

        {step === 'track' && (
          <div className="ob-opts grid">
            {roadmaps.map((r) => (
              <button key={r.id} className={'ob-opt' + (track === r.id ? ' sel' : '')} style={{ ['--hue' as string]: HUES[r.hue] }} onClick={() => { sfx.select(); setTr(r.id) }}>
                <span className="ob-ico">{r.icon}</span><span><b>{r.title}</b><small>{r.tagline}</small></span>
              </button>
            ))}
          </div>
        )}

        {step === 'level' && (
          <div className="ob-opts">
            {LEVELS.map(([t, d, bars], i) => (
              <button key={t} className={'ob-opt' + (level === i ? ' sel' : '')} onClick={() => { sfx.select(); setLevel(i) }}>
                <span className="lvl-bars" aria-hidden="true">{[1, 2, 3, 4].map((b) => <i key={b} className={b <= bars ? 'on' : ''} style={{ height: 6 + b * 6 }} />)}</span>
                <span><b>{t}</b><small>{d}</small></span>
              </button>
            ))}
          </div>
        )}

        {step === 'placement' && !testDone && (
          <div className="ob-opts">
            <button className="ob-opt sel" disabled={busy} onClick={() => { sfx.tap(); void startPlacement() }}>
              <span className="ob-ico">📝</span><span><b>{busy ? 'Loading…' : 'Placement test lo (2 min)'}</b><small>6 sawal — jo aata hai wo lessons skip ho jayenge</small></span>
            </button>
            <button className="ob-opt" onClick={() => { sfx.tap(); setPlaced([]); setStep('when') }}>
              <span className="ob-ico">🌱</span><span><b>Shuru se hi karunga</b><small>Pehle lesson se, bina skip ke</small></span>
            </button>
          </div>
        )}
        {step === 'placement' && testDone && (
          <div className="card ob-result">
            <h3>{testDone.passed}/{testDone.total} sahi</h3>
            <p className="muted">{placed.length ? `Tumhare pehle ${placed.length} lessons skip ho gaye — direct aage se shuru hoge.` : 'Shuru se hi chalenge — jaldi aage badh jaoge.'}</p>
          </div>
        )}

        {step === 'when' && (
          <div className="ob-opts">
            {WHEN.map(([ico, t, v]) => (
              <button key={v} className={'ob-opt' + (when === v ? ' sel' : '')} onClick={() => { sfx.select(); setWhen(v); setG(0) }}>
                <span className="ob-ico">{ico}</span><span><b>{t}</b></span>
              </button>
            ))}
          </div>
        )}

        {step === 'goal' && (
          <div className="ob-opts">
            {GOALS.map(([xp, t, d]) => (
              <button key={xp} className={'ob-opt' + (goal === xp ? ' sel' : '')} onClick={() => { sfx.select(); setG(xp) }}>
                <span className="goal-xp">⚡ {xp}</span><span><b>{t}</b><small>{d}</small></span>
                {xp === recGoal && <span className="rec-tag">Recommended</span>}
              </button>
            ))}
          </div>
        )}

        {step === 'plan' && (
          <ul className="ob-plan">
            {[`${rm?.title ?? 'Track'} roadmap chuna`, `${rm?.stages.length ?? 0} stages · ${totalLessons} lessons arrange kiye`, `Daily goal ${goal || recGoal} XP set kiya`].map((t, i) => (
              <li key={t} className={tick > i ? 'on' : ''}><span>{tick > i ? '✓' : ''}</span>{t}</li>
            ))}
          </ul>
        )}

        {step === 'ready' && (
          <div className="ob-ready">
            <div className="card ob-summary" style={{ ['--hue' as string]: HUES[rm?.hue ?? 'green'] }}>
              <div className="ob-sum-row"><span className="ob-ico">{rm?.icon}</span><div><b>{rm?.title}</b><div className="muted small">{rm?.stages.length} stages · {totalLessons - placed.length} lessons</div></div></div>
              <div className="ob-sum-row"><Flame size={34} /><div><b>{goal || recGoal} XP / din</b><div className="muted small">Pehla stage ~{stage1Weeks} hafte mein · poora roadmap ~{weeks >= 8 ? `${Math.round(weeks / 4.3)} mahine` : `${weeks} hafte`}</div></div></div>
            </div>
            <p className="small muted">📅 Daily reminder (calendar mein repeat hoga):</p>
            <div className="seg">
              {REMIND.map(([ico, t, h]) => <button key={h} className={'seg-btn' + (remind === h ? ' on' : '')} onClick={() => { sfx.select(); setRemind(remind === h ? null : h) }}>{ico} {t} · {h > 12 ? h - 12 : h}{h >= 12 ? 'pm' : 'am'}</button>)}
            </div>
            {remind !== null && <button className="btn btn-outline" onClick={() => downloadIcs(remind)}>📥 Calendar file (.ics) download</button>}
          </div>
        )}
      </main>

      {step !== 'plan' && !(step === 'placement' && !testDone) && (
        <footer className="ob-foot">
          <div className="ob-foot-in">
            {step === 'welcome' && (
              <label className="ob-link">Pehle se progress hai? Import karo<input type="file" accept="application/json" hidden onChange={(e) => importFile(e.target.files?.[0])} /></label>
            )}
            <button className="btn btn-green" disabled={!canContinue || busy}
              onClick={() => {
                if (step === 'goal' && !goal) setG(recGoal)
                if (step === 'ready') void finish()
                else next()
              }}>
              {step === 'welcome' ? 'Shuru karo' : step === 'ready' ? (busy ? 'Loading…' : 'Pehla lesson shuru karo') : step === 'name' && !name.trim() ? 'Skip' : 'Continue'}
            </button>
          </div>
        </footer>
      )}
    </div>
  )
}
