import { useEffect, useMemo, useState } from 'react'
import { Mascot, type Mood } from '../components/Mascot'
import { Flame } from '../components/Flame'
import { Owl } from '../components/Owl'
import { ChestIcon } from '../components/Icons'
import { BooksIcon, BrainIcon, MapIcon } from '../components/NavIcons'
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

  const welcome = step === 'welcome'
  const showFoot = step !== 'plan' && !(step === 'placement' && !testDone) && !welcome
  const cta = step === 'ready' ? (busy ? 'Loading…' : 'Pehla lesson shuru karo') : step === 'name' && !name.trim() ? 'Skip' : 'Continue'
  const onCta = () => {
    if (step === 'goal' && !goal) setG(recGoal)
    if (step === 'ready') void finish()
    else next()
  }

  if (welcome) {
    return (
      <div className="flex min-h-screen flex-col bg-(--bg)">
        <header className="mx-auto flex w-full max-w-[1000px] items-center gap-2 px-5 pt-5">
          <Owl size={34} /><span className="font-display text-[26px] font-semibold text-(--green)" style={{ fontFamily: 'var(--font-display)' }}>Prep</span>
        </header>
        <main className="mx-auto grid w-full max-w-[1000px] flex-1 items-center gap-8 px-5 py-8 md:grid-cols-2 md:gap-14">
          <div className="relative mx-auto grid aspect-square w-full max-w-[380px] place-items-center">
            <span aria-hidden className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--green)_22%,transparent),transparent_70%)]" />
            {[
              ['left-[2%] top-[14%]', <BooksIcon size={44} />, '0s'],
              ['right-[4%] top-[8%]', <Flame size={50} />, '.4s'],
              ['left-[0%] bottom-[22%]', <BrainIcon size={44} />, '.8s'],
              ['right-[2%] bottom-[18%]', <ChestIcon size={50} />, '1.2s'],
              ['left-[40%] top-[0%]', <span className="text-[34px] leading-none">⭐</span>, '1.6s'],
              ['right-[30%] bottom-[2%]', <MapIcon size={40} />, '2s'],
            ].map(([pos, el, delay], i) => (
              <span key={i} className={`absolute ${pos as string} grid size-[70px] animate-[bob_3.2s_ease-in-out_infinite] place-items-center rounded-[22px] border-2 border-(--line) bg-(--card) shadow-[0_4px_0_var(--line)]`} style={{ animationDelay: delay as string }}>{el}</span>
            ))}
            <div className="relative animate-[pop_.5s_ease-out]"><Mascot mood="cheer" size={190} /></div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="m-0! text-[32px]! leading-[1.15]! sm:text-[44px]!" style={{ fontFamily: 'var(--font-display)' }}>Interview prep ka sabse <span className="text-(--green)">mazedaar</span> tareeka.</h1>
            <p className="mt-3! mb-7! text-[17px] text-(--muted)">Chhote lessons, roz ki streak, aur revision jo yaad rakhwata hai — Duolingo style.</p>
            <div className="mx-auto flex max-w-[360px] flex-col gap-3 md:mx-0">
              <button className="btn btn-green w-full py-4" onClick={next}>Shuru karo</button>
              <label className="btn btn-outline w-full py-4">Mera progress import karo<input type="file" accept="application/json" hidden onChange={(e) => importFile(e.target.files?.[0])} /></label>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-(--bg)">
      <header className="sticky top-0 z-10 bg-(--bg)">
        <div className="mx-auto flex w-full max-w-[640px] items-center gap-4 px-5 pt-5 pb-2">
          {step !== 'plan' && step !== 'ready'
            ? <button className="grid size-9 cursor-pointer place-items-center rounded-xl border-0 bg-transparent text-2xl text-(--muted) hover:bg-(--bg2)" aria-label="Back" onClick={back}>←</button>
            : <span className="size-9" />}
          <div className="pbar"><div className="pbar-fill" style={{ width: `${Math.max(6, (idx / (steps.length - 1)) * 100)}%` }} /></div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[640px] flex-1 animate-[slide_.3s_ease-out] px-5 pt-4 pb-36" key={step}>
        <div className="mb-6 flex items-end gap-3">
          <div className="shrink-0"><Mascot mood={mood} size={step === 'plan' || step === 'ready' ? 120 : 100} /></div>
          <div className="relative mb-6 rounded-2xl border-2 border-(--line) bg-(--card) px-4 py-3 text-[19px] leading-snug font-semibold text-(--head) sm:text-[21px]" style={{ fontFamily: 'var(--font-display)' }}>
            <span aria-hidden className="absolute top-1/2 -left-[9px] size-4 -translate-y-1/2 rotate-45 border-b-2 border-l-2 border-(--line) bg-(--card)" />
            {say}
          </div>
        </div>

        {step === 'name' && (
          <input className="w-full rounded-2xl border-2 border-(--line) bg-(--bg2) px-5 py-4 text-xl font-bold text-(--head) outline-none focus:border-(--blue)" autoFocus placeholder="Tumhara naam (optional)" value={name} maxLength={24}
            onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') next() }} />
        )}

        {step === 'why' && (
          <div className="grid gap-3">
            {WHY.map(([ico, t, d]) => <Opt key={t} sel={why === t} ico={ico} title={t} desc={d} onClick={() => setWhy(t)} />)}
          </div>
        )}

        {step === 'track' && (
          <div className="grid gap-3 sm:grid-cols-2">
            {roadmaps.map((r) => <Opt key={r.id} sel={track === r.id} ico={r.icon} title={r.title} desc={r.tagline} hue={HUES[r.hue]} onClick={() => setTr(r.id)} />)}
          </div>
        )}

        {step === 'level' && (
          <div className="grid gap-3">
            {LEVELS.map(([t, d, bars], i) => (
              <Opt key={t} sel={level === i} title={t} desc={d} onClick={() => setLevel(i)}
                ico={<span className="flex h-8 items-end gap-[3px]" aria-hidden>{[1, 2, 3, 4].map((b) => <i key={b} className={'w-[7px] rounded-[3px] ' + (b <= bars ? 'bg-(--blue)' : 'bg-(--line)')} style={{ height: 6 + b * 6 }} />)}</span>} />
            ))}
          </div>
        )}

        {step === 'placement' && !testDone && (
          <div className="grid gap-3">
            <Opt sel ico="📝" title={busy ? 'Loading…' : 'Placement test lo (2 min)'} desc="6 sawal — jo aata hai wo lessons skip ho jayenge" onClick={() => { if (!busy) void startPlacement() }} />
            <Opt sel={false} ico="🌱" title="Shuru se hi karunga" desc="Pehle lesson se, bina skip ke" onClick={() => { setPlaced([]); setStep('when') }} />
          </div>
        )}
        {step === 'placement' && testDone && (
          <div className="rounded-3xl border-2 border-(--line) bg-(--card) p-6 text-center shadow-[0_4px_0_var(--line)]">
            <div className="text-[44px] font-semibold text-(--green)" style={{ fontFamily: 'var(--font-display)' }}>{testDone.passed}/{testDone.total}</div>
            <div className="mb-1 text-sm font-extrabold tracking-widest text-(--muted) uppercase">sahi jawab</div>
            <p className="m-0! text-(--text)">{placed.length ? `Tumhare pehle ${placed.length} lessons skip ho gaye — direct aage se shuru hoge.` : 'Shuru se hi chalenge — jaldi aage badh jaoge.'}</p>
          </div>
        )}

        {step === 'when' && (
          <div className="grid gap-3 sm:grid-cols-2">
            {WHEN.map(([ico, t, v]) => <Opt key={v} sel={when === v} ico={ico} title={t} onClick={() => { setWhen(v); setG(0) }} />)}
          </div>
        )}

        {step === 'goal' && (
          <div className="overflow-hidden rounded-2xl border-2 border-(--line) bg-(--card)">
            {GOALS.map(([xp, t, d], i) => {
              const on = goal === xp
              return (
                <button key={xp} onClick={() => { sfx.select(); setG(xp) }}
                  className={'flex w-full cursor-pointer items-center gap-4 border-0 px-5 py-4 text-left transition-colors ' + (i ? 'border-t-2 border-(--line) ' : '') + (on ? 'bg-(--sel-bg)' : 'bg-transparent hover:bg-(--bg2)')}>
                  <span className={'w-16 shrink-0 whitespace-nowrap text-lg font-extrabold sm:w-20 ' + (on ? 'text-(--blue-d)' : 'text-(--yellow-d)')}>⚡ {xp}</span>
                  <span className={'flex-1 text-[17px] font-extrabold ' + (on ? 'text-(--blue-d)' : 'text-(--head)')}>{t}
                    {xp === recGoal && <span className="mt-1 block w-fit rounded-full sm:ml-2 sm:mt-0 sm:inline bg-(--green) px-2 py-0.5 align-middle text-[10px] font-extrabold tracking-wider text-white uppercase">Recommended</span>}
                  </span>
                  <span className="shrink-0 whitespace-nowrap text-xs font-bold text-(--muted) sm:text-sm">{d}</span>
                </button>
              )
            })}
          </div>
        )}

        {step === 'plan' && (
          <ul className="m-0 grid list-none gap-4 rounded-3xl border-2 border-(--line) bg-(--card) p-5">
            {[`${rm?.title ?? 'Track'} roadmap chuna`, `${rm?.stages.length ?? 0} stages · ${totalLessons} lessons arrange kiye`, `Daily goal ${goal || recGoal} XP set kiya`].map((t, i) => (
              <li key={t} className={'flex items-center gap-3 text-[17px] font-bold transition-all duration-500 ' + (tick > i ? 'text-(--head) opacity-100' : 'text-(--muted) opacity-40')}>
                <span className={'grid size-8 shrink-0 place-items-center rounded-full border-[3px] text-sm font-black text-white transition-all ' + (tick > i ? 'scale-110 border-(--green) bg-(--green)' : 'border-(--line)')}>{tick > i ? '✓' : ''}</span>{t}
              </li>
            ))}
          </ul>
        )}

        {step === 'ready' && rm && (
          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-3xl bg-(--hue) p-4 text-white shadow-[0_5px_0_color-mix(in_srgb,var(--hue)_68%,#000)]" style={{ ['--hue' as string]: HUES[rm.hue] }}>
              <span aria-hidden className="absolute -top-12 -right-10 size-36 rounded-full bg-white/10" />
              <div className="relative flex items-center gap-3.5">
                <div className="grid size-14 shrink-0 -rotate-6 place-items-center rounded-2xl bg-white text-[30px] shadow-[0_4px_0_rgba(0,0,0,.18)]">{rm.icon}</div>
                <div className="min-w-0">
                  <div className="text-[10px] font-extrabold tracking-[.16em] text-white/75 uppercase">Tumhari track</div>
                  <div className="text-[21px] leading-tight font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{rm.title}</div>
                  <div className="text-[13px] font-bold text-white/85">{rm.stages.length} stages · {totalLessons - placed.length} lessons</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                [<Flame size={30} key="f" />, `${goal || recGoal} XP`, 'roz ka goal'],
                ['🏁', `~${stage1Weeks} hafte`, 'pehla stage'],
                ['🏆', weeks >= 8 ? `~${Math.round(weeks / 4.3)} mahine` : `~${weeks} hafte`, 'poora roadmap'],
              ].map(([ic, v, l], i) => (
                <div key={i} className="grid justify-items-center gap-1 rounded-2xl border-2 border-(--line) bg-(--card) px-2 py-3 text-center shadow-[0_3px_0_var(--line)]">
                  <span className="grid h-8 place-items-center text-[26px] leading-none">{ic}</span>
                  <b className="text-[15px] text-(--head)">{v}</b>
                  <span className="text-[11px] font-bold tracking-wide text-(--muted) uppercase">{l}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border-2 border-(--line) bg-(--card) p-4">
              <div className="mb-3 text-[15px] font-extrabold text-(--head)">📅 Daily reminder <span className="font-bold text-(--muted)">— calendar mein repeat hoga</span></div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {REMIND.map(([ico, t, h]) => {
                  const on = remind === h
                  return (
                    <button key={h} onClick={() => { sfx.select(); setRemind(on ? null : h) }}
                      className={'cursor-pointer rounded-xl border-2 border-b-4 px-2 py-2.5 text-sm font-extrabold transition-colors ' + (on ? 'border-(--blue) bg-(--sel-bg) text-(--blue-d)' : 'border-(--line) bg-(--card) text-(--text) hover:bg-(--bg2)')}>
                      <span className="mr-1">{ico}</span>{t} · {h > 12 ? h - 12 : h}{h >= 12 ? 'pm' : 'am'}
                    </button>
                  )
                })}
              </div>
              {remind !== null && <button className="btn btn-outline mt-3 w-full" onClick={() => downloadIcs(remind)}>📥 Calendar file (.ics) download</button>}
            </div>
          </div>
        )}
      </main>

      {showFoot && (
        <footer className="fixed inset-x-0 bottom-0 z-10 border-t-2 border-(--line) bg-(--bg)">
          <div className="mx-auto flex w-full max-w-[640px] items-center justify-end gap-3 px-5 py-4 sm:py-5">
            <button className="btn btn-green w-full py-3.5 sm:w-auto sm:min-w-[200px]" disabled={!canContinue || busy} onClick={onCta}>{cta}</button>
          </div>
        </footer>
      )}
    </div>
  )
}

/** Duolingo-style choice card: chunky border + lip, blue when selected. */
function Opt({ sel, ico, title, desc, hue, onClick }: { sel: boolean; ico?: React.ReactNode; title: string; desc?: string; hue?: string; onClick: () => void }) {
  return (
    <button onClick={() => { sfx.select(); onClick() }} style={hue ? { ['--hue' as string]: hue } : undefined}
      className={'relative flex w-full cursor-pointer items-center gap-4 rounded-2xl border-2 border-b-4 px-4 py-3.5 text-left transition-[translate,border-color,background-color] duration-100 active:translate-y-[2px] active:border-b-2 ' +
        (sel ? 'border-(--blue) bg-(--sel-bg)' : 'border-(--line) bg-(--card) hover:bg-(--bg2)')}>
      {ico !== undefined && (
        <span className={'grid size-12 shrink-0 place-items-center rounded-xl text-[28px] ' + (hue ? 'bg-[color-mix(in_srgb,var(--hue)_16%,transparent)]' : 'bg-(--bg2)')}>{ico}</span>
      )}
      <span className="min-w-0 flex-1">
        <b className={'block text-[17px] leading-tight ' + (sel ? 'text-(--blue-d)' : 'text-(--head)')}>{title}</b>
        {desc && <span className="mt-0.5 block text-[13.5px] leading-snug text-(--muted)">{desc}</span>}
      </span>
      {sel && <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-(--blue) text-xs font-black text-white shadow-[0_2px_0_var(--blue-d)]">✓</span>}
    </button>
  )
}
