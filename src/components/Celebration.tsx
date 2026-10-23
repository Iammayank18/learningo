import { useEffect, useState } from 'react'
import { Confetti, Mascot } from './Mascot'
import { Flame } from './Flame'
import { Ring } from './Rail'
import { MILESTONES, type Snap, type Step } from '../lib/celebrate'
import { sfx } from '../lib/sound'
import { DAY, dayKey, levelOf, useProgress } from '../lib/store'
import { tr } from '../lib/i18n'

export interface CelebrationData {
  title: string
  subtitle?: string
  xp: number
  accuracy: number // 0-100
  seconds: number
  perfect: boolean
  prev: Snap
  next: Snap
  steps: Step[]
}

function useCountUp(from: number, to: number, ms = 1000, delay = 0) {
  const [v, setV] = useState(from)
  useEffect(() => {
    let raf = 0
    let t0 = 0
    const tick = (t: number) => {
      t0 ||= t
      const k = Math.min(1, Math.max(0, (t - t0 - delay) / ms))
      setV(Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [from, to, ms, delay])
  return v
}

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`

/** Duolingo-style post-activity sequence: summary → streak → daily goal → level up. */
export function Celebration({ data, actions }: { data: CelebrationData; actions: React.ReactNode }) {
  const [i, setI] = useState(0)
  const step = data.steps[i]
  const last = i === data.steps.length - 1
  useEffect(() => {
    if (step === 'summary') sfx.complete()
    else if (step === 'streak') sfx.streak()
    else if (step === 'goal') sfx.goal()
    else if (step === 'level') sfx.levelUp()
  }, [step])

  return (
    <div className="celebrate" key={step}>
      {step === 'summary' && <Summary d={data} />}
      {step === 'streak' && <StreakScreen d={data} />}
      {step === 'goal' && <GoalScreen />}
      {step === 'level' && <LevelScreen level={data.next.level} />}
      <div className="done-actions celebrate-actions">
        {last ? actions : <button className="btn btn-green" autoFocus onClick={() => { sfx.tap(); setI(i + 1) }}>Continue</button>}
      </div>
    </div>
  )
}

function Summary({ d }: { d: CelebrationData }) {
  const xp = useCountUp(0, d.xp, 900, 250)
  const acc = useCountUp(0, d.accuracy, 900, 450)
  const say = d.perfect ? tr('Flawless! Ek bhi galti nahi 🔥') : d.accuracy >= 70 ? tr('Badhiya kaam!') : tr('Dohrane se pakka ho jayega')
  return (
    <>
      <Confetti count={d.perfect ? 100 : 55} />
      <Mascot mood="cheer" size={130} say={say} />
      <h1 className="pop-in">{d.title}</h1>
      {d.subtitle && <p className="muted">{d.subtitle}</p>}
      {d.perfect && <span className="perfect-badge">⭐ PERFECT LESSON</span>}
      <div className="done-stats">
        <div className="dstat xp stat-in" style={{ animationDelay: '.15s' }}><small>TOTAL XP</small><b>⚡ {xp}</b></div>
        <div className="dstat acc stat-in" style={{ animationDelay: '.35s' }}><small>{d.accuracy >= 90 ? 'AMAZING' : 'ACCURACY'}</small><b>🎯 {acc}%</b></div>
        <div className="dstat time stat-in" style={{ animationDelay: '.55s' }}><small>SPEED</small><b>⏱️ {mmss(d.seconds)}</b></div>
      </div>
    </>
  )
}

function StreakScreen({ d }: { d: CelebrationData }) {
  const p = useProgress()
  const [now] = useState(() => Date.now())
  const n = useCountUp(Math.max(0, d.next.streak - 1), d.next.streak, 700, 600)
  const milestoneRaw = MILESTONES[d.next.streak]
  const milestone = milestoneRaw ? tr(milestoneRaw) : undefined
  const dow = (new Date(now).getDay() + 6) % 7 // Mon=0
  const week = Array.from({ length: 7 }, (_, k) => {
    const t = now + (k - dow) * DAY
    return { label: 'MTWTFSS'[k], done: (p.days[dayKey(t)] ?? 0) > 0, today: k === dow }
  })
  const scale = Math.min(1.6, 1 + Math.log10(Math.max(1, d.next.streak)) * 0.4)
  return (
    <>
      {milestone && <Confetti count={120} />}
      <div className={'streak-hero' + (milestone ? ' milestone' : '')}>
        {milestone && <div className="streak-rays" aria-hidden="true" />}
        <div className="streak-flame" style={{ transform: `scale(${scale})` }}><Flame size={130} /></div>
        {milestone && <div className="streak-owl"><Mascot mood="cheer" size={92} /></div>}
      </div>
      <div className="streak-num"><span>{n}</span></div>
      <h2 className="streak-title">{tr('din ka streak!')}</h2>
      {milestone && <p className="milestone-line">{milestone}</p>}
      <div className="week-card">
        {week.map((w, k) => (
          <div key={k} className={'wd' + (w.done ? ' on' : '') + (w.today ? ' today' : '')}>
            <small>{w.label}</small>
            <span className="wd-dot">{w.done ? '✓' : ''}</span>
          </div>
        ))}
      </div>
      <p className="muted small">{milestone ? tr('Kal bhi aana — streak bachaye rakho!') : tr('Roz thoda — aise hi streak badhti hai.')}</p>
      {milestone && <ShareBtn text={`🔥 ${d.next.streak}-day streak on my interview prep! ${milestone}`} />}
    </>
  )
}

function ShareBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button className="btn btn-outline share-btn" onClick={() => { void navigator.clipboard?.writeText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 1800) }) }}>
      {ok ? '✓ Copied' : tr('📤 Share text copy karo')}
    </button>
  )
}

function GoalScreen() {
  const p = useProgress()
  const [v, setV] = useState(0)
  useEffect(() => { const t = setTimeout(() => setV(1), 250); return () => clearTimeout(t) }, [])
  return (
    <>
      <Confetti count={50} />
      <div className="goal-big"><Ring value={v} size={150}><span className="goal-check">🎯</span></Ring></div>
      <h2>Daily goal complete!</h2>
      <p className="muted">{tr('{p} XP aaj ke liye poore — shabaash!', { p: p.goal })}</p>
    </>
  )
}

function LevelScreen({ level }: { level: number }) {
  const p = useProgress()
  const lv = levelOf(p.xp)
  return (
    <>
      <Confetti count={80} />
      <div className="level-badge"><span>{level}</span></div>
      <h2>Level up!</h2>
      <p className="muted">{tr('Ab tum Level {l} par ho · agle level tak {x} XP', { l: level, x: lv.need - lv.into })}</p>
    </>
  )
}
