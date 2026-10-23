import { useEffect, useState } from 'react'
import { useCourse } from '../lib/useCourse'
import { lid, useProgress, passedMap, openChest, placeLessons, DAY } from '../lib/store'
import { href } from '../lib/router'
import { HUES } from '../lib/sections'
import { usePrefs } from '../lib/prefs'
import { lockedIds } from '../lib/unlock'
import { sfx } from '../lib/sound'
import { buildReviewQuiz } from '../lib/quiz'
import { Mascot, Confetti, type Mood } from '../components/Mascot'
import { QuizRunner, type QuizItem, type QuizResult } from '../components/QuizRunner'
import { StarIcon, LockIcon, CheckIcon, ChestIcon, TrophyIcon, FastIcon } from '../components/Icons'
import type { Course, Lesson } from '../types'

const OFFSETS = [0, 46, 74, 46, 0, -46, -74, -46]
const CHEST_EVERY = 4

type Item =
  | { t: 'lesson'; l: Lesson; li: number }
  | { t: 'chest'; key: string; need: string[] } // need = lesson ids that must be passed
  | { t: 'trophy' }

function firstIncomplete(course: Course, done: Record<string, number>) {
  for (const u of course.units) for (const l of u.lessons) if (!done[lid(course.id, l.id)]) return l.id
  return null
}

export function Learn({ courseId }: { courseId: string }) {
  const { course, loading, error } = useCourse(courseId)
  const p = useProgress()
  const { unlockAll } = usePrefs()
  const [open, setOpen] = useState<string | null>(null)
  // close the lesson card on outside click / Esc
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => { if (!(e.target as Element | null)?.closest?.('.node-wrap.open')) setOpen(null) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])
  const [now] = useState(() => Date.now())
  const [burst, setBurst] = useState<string | null>(null)
  const [jump, setJump] = useState<number | null>(null) // unit index being tested
  if (error) return <div className="empty">Course load nahi hua.</div>
  if (loading || !course) return <div className="empty">Loading…</div>

  const hue = HUES[course.hue] ?? '#58cc02'
  const pass = passedMap(p)
  const current = firstIncomplete(course, pass)
  const { locked, blocker } = lockedIds(course, pass, unlockAll)
  const total = course.units.reduce((n, u) => n + u.lessons.length, 0)
  const done = course.units.reduce((n, u) => n + u.lessons.filter((l) => p.done[lid(course.id, l.id)]).length, 0)
  const curUnit = course.units.findIndex((u) => u.lessons.some((l) => l.id === current))

  if (jump !== null) {
    return <JumpTest course={course} unitIndex={jump} onClose={() => setJump(null)} />
  }

  return (
    <div className="path" style={{ ['--hue' as string]: hue }}>
      <header className="mb-2 flex items-center gap-4 rounded-3xl border-2 border-(--line) bg-(--card) p-4 shadow-[0_4px_0_var(--line)]">
        <div className="grid size-14 shrink-0 -rotate-3 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--hue)_18%,transparent)] text-[32px]">{course.icon}</div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[11px] font-extrabold tracking-[.14em] text-(--muted) uppercase">{p.profile?.name ? `Hi ${p.profile.name} 👋 · ` : ''}{course.group}</div>
          <h1 className="m-0! truncate text-[24px]! leading-tight">{course.title}</h1>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-(--line)">
              <div className="h-full rounded-full bg-(--hue) transition-[width] duration-500" style={{ width: `${Math.max(done ? 3 : 0, (done / total) * 100)}%` }} />
            </div>
            <span className="shrink-0 text-[13px] font-extrabold text-(--muted)">{done}/{total} · {Math.round((done / total) * 100)}%</span>
          </div>
        </div>
        <a href={href('courses')} title="Course badlo" className="grid size-11 shrink-0 place-items-center gap-0.5 rounded-2xl border-2 border-(--line) text-[11px] sm:size-auto sm:self-stretch sm:px-3 font-extrabold tracking-wider text-(--blue-d) uppercase no-underline shadow-[0_3px_0_var(--line)] transition-[translate,box-shadow] duration-100 hover:translate-y-[1.5px] hover:shadow-[0_1.5px_0_var(--line)] active:translate-y-[3px] active:shadow-none">
          <span className="text-xl leading-none">⇄</span><span className="hidden sm:inline">Switch</span>
        </a>
      </header>

      {course.units.map((u, ui) => {
        const ud = u.lessons.filter((l) => pass[lid(course.id, l.id)]).length
        const unitDone = ud === u.lessons.length
        const unitLocked = !unitDone && ui > curUnit && curUnit !== -1 && !unlockAll
        // build item list: lessons with a chest after every CHEST_EVERY, trophy at the end
        const items: Item[] = []
        u.lessons.forEach((l, li) => {
          items.push({ t: 'lesson', l, li })
          if ((li + 1) % CHEST_EVERY === 0 && li < u.lessons.length - 1) {
            items.push({ t: 'chest', key: `${course.id}/${u.id}/${li}`, need: u.lessons.slice(0, li + 1).map((x) => x.id) })
          }
        })
        items.push({ t: 'trophy' })
        const mid = Math.floor(items.length / 2)
        const mood: Mood = unitDone ? 'cheer' : unitLocked ? 'sleep' : 'idle'
        const say = unitDone ? 'Unit complete! 🎉' : unitLocked ? 'Zzz…' : ui === curUnit ? 'Chalo, shuru karo!' : ''
        const next = course.units[ui + 1]
        return (
          <section key={u.id} className={'unit' + (unitLocked ? ' locked' : '') + (unitDone ? ' complete' : '')}>
            <div className="unit-banner">
              <div className="min-w-0 flex-1">
                <div className="eyebrow">Unit {ui + 1}{u.week ? ` · ${u.week}` : ''}</div>
                <h2 className="truncate">{u.title}</h2>
                <div className="mt-2 flex max-w-[260px] items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/20"><div className="h-full rounded-full bg-white/90" style={{ width: `${(ud / u.lessons.length) * 100}%` }} /></div>
                  <span className="text-[11px] font-extrabold text-white/85">{ud}/{u.lessons.length}</span>
                </div>
              </div>
              <a className="notes-btn" href={href('read', course.id, u.lessons[0].id)}>📖 Notes</a>
            </div>
            <div className="nodes">
              {items.map((it, k) => {
                const off = OFFSETS[k % OFFSETS.length]
                const mascotSide = off > 0 ? 'left' : 'right'
                const mascot = k === mid && (
                  <div className={'side-mascot ' + mascotSide}><Mascot mood={mood} size={96} say={say || undefined} /></div>
                )
                if (it.t === 'lesson') {
                  const l = it.l
                  const id = lid(course.id, l.id)
                  const card = p.cards[id]
                  const isDone = !!p.done[id]
                  const isCur = l.id === current
                  const isDue = !!card && card.due <= now
                  const isLocked = locked.has(l.id)
                  const isPlaced = !isDone && !!p.placed[id]
                  const sel = open === id
                  return (
                    <div key={l.id} className={'node-wrap' + (sel ? ' open' : '')} style={{ transform: `translateX(${off}px)` }}>
                      {mascot}
                      <div className="relative -my-1 size-[108px] shrink-0">
                        {isCur && <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full border-[9px] border-(--ring)" />}
                        <button
                          className={'path-node absolute left-[18px] top-[20px] grid h-[60px] w-[72px] cursor-pointer place-items-center rounded-[50%] border-0 bg-(--n) text-(--n-ic) shadow-[0_8px_0_var(--n-d)] transition-[transform,box-shadow] duration-100 ease-out' + (isLocked ? ' locked cursor-not-allowed' : ' hover:translate-y-[4px] hover:shadow-[0_4px_0_var(--n-d)] active:translate-y-[8px] active:shadow-[0_0_0_var(--n-d)]') + (isLocked ? '' : isDue ? ' due' : isDone || isPlaced || isCur ? ' on' : '')}
                          aria-label={l.name} aria-expanded={sel}
                          onClick={() => { if (isLocked) sfx.lock(); else sfx.tap(); setOpen(sel ? null : id) }}
                        >
                          {isLocked ? <LockIcon /> : isPlaced || isDone ? <CheckIcon /> : <StarIcon />}
                          {isDone && card && <span title={`Crown level ${card.stage}/5`} className="absolute -top-2.5 -right-3 flex items-center gap-0.5 rounded-full border-2 border-(--bg) bg-(--yellow) px-2 py-0.5 text-[12px] leading-none font-black text-[#7a5300]"><span className="text-[13px]">👑</span>{card.stage}</span>}
                        </button>
                        {isCur && (
                          <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2">
                            <div className="relative animate-[bob_1.4s_ease-in-out_infinite] rounded-xl border-2 border-(--ring) bg-(--card) px-3.5 py-1.5 text-[15px] font-extrabold uppercase leading-none tracking-wider text-(--hue)">
                              Start
                              <span className="absolute -bottom-[7px] left-1/2 size-3 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-(--ring) bg-(--card)" />
                            </div>
                          </div>
                        )}
                      </div>
                      {sel && (
                        <div role="dialog" aria-label={l.name}
                          className={'absolute top-[118px] left-1/2 z-30 w-[min(300px,84vw)] -translate-x-1/2 animate-[pop_.15s_ease-out] rounded-2xl border-2 p-4 ' +
                            (isLocked ? 'border-(--ring) bg-(--card)' : 'border-transparent bg-(--hue) text-white shadow-[0_8px_24px_rgba(0,0,0,.22)]')}>
                          <span aria-hidden className={'absolute -top-[9px] left-1/2 size-4 -translate-x-1/2 rotate-45 rounded-tl-[3px] border-t-2 border-l-2 ' + (isLocked ? 'border-(--ring) bg-(--card)' : 'border-transparent bg-(--hue)')} />
                          <h4 className={'m-0! text-[18px] leading-tight ' + (isLocked ? 'text-(--lock-ic)!' : 'text-white!')}>{l.name}</h4>
                          <p className={'mt-2! mb-4! text-[15px] leading-snug ' + (isLocked ? 'text-(--lock-ic)' : 'text-white/90')}>
                            {isLocked ? `Upar wale lessons complete karo, tab ye khulega! Agla: “${blocker[l.id].name}”.` : isPlaced ? 'Placement test se skip — chaho to practice kar lo.' : isDone && card ? (isDue ? 'Revision due hai — chalo pakka kar lein!' : `Next revision ${fmtIn(card.due - now)}`) : l.desc ? l.desc.slice(0, 110) + '…' : 'Chalo shuru karte hain!'}
                          </p>
                          {isLocked ? (
                            <button disabled className="w-full cursor-not-allowed rounded-xl border-0 bg-(--ring) py-3 text-sm font-extrabold tracking-widest text-(--lock-ic) uppercase">Locked</button>
                          ) : (
                            <div className="grid gap-2.5">
                              <a href={href('lesson', course.id, l.id)} className="block rounded-xl bg-white py-3 text-center text-sm font-extrabold tracking-wide text-[color-mix(in_srgb,var(--hue)_80%,#000)] uppercase no-underline shadow-[0_4px_0_rgba(0,0,0,.2)] transition-[translate,box-shadow] duration-100 hover:translate-y-[2px] hover:shadow-[0_2px_0_rgba(0,0,0,.2)] active:translate-y-[4px] active:shadow-none">
                                {isDone ? 'Practice' : 'Start'} +25 XP
                              </a>
                              <a href={href('read', course.id, l.id)} className="block rounded-xl border-2 border-white/45 py-2.5 text-center text-sm font-extrabold tracking-wide text-white uppercase no-underline hover:bg-white/10">Read notes</a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                }
                if (it.t === 'chest') {
                  const ready = it.need.every((x) => pass[lid(course.id, x)])
                  const opened = !!p.chests[it.key]
                  return (
                    <div key={it.key} className="node-wrap" style={{ transform: `translateX(${off}px)` }}>
                      {mascot}
                      <button className={'chest' + (ready && !opened ? ' ready' : '') + (opened ? ' opened' : '')} aria-label="Reward chest"
                        onClick={() => {
                          if (!ready) { sfx.lock(); return }
                          if (!opened) { openChest(it.key, 15); sfx.goal(); setBurst(it.key); setTimeout(() => setBurst(null), 2200) }
                        }}>
                        <ChestIcon size={62} open={opened} dim={!ready && !opened} />
                        {ready && !opened && <span className="chest-tag">+15 XP</span>}
                      </button>
                      {burst === it.key && <><Confetti count={36} /><div className="xp-pop">+15 XP ⚡</div></>}
                    </div>
                  )
                }
                return (
                  <div key="trophy" className="node-wrap" style={{ transform: `translateX(${off}px)` }}>
                    {mascot}
                    <button className={'trophy' + (unitDone ? ' won' : '')} aria-label="Unit trophy" onClick={() => unitDone ? sfx.goal() : sfx.lock()}>
                      <TrophyIcon size={64} dim={!unitDone} />
                    </button>
                  </div>
                )
              })}
            </div>
            {next && !unitDone && ui === curUnit && !unlockAll && (
              <div className="jump-wrap">
                <div className="jump-line"><span>{next.title}</span></div>
                <div className="start-bubble jump-bubble">JUMP HERE?</div>
                <button className="jump-btn" aria-label={`Jump to ${next.title}`} onClick={() => { sfx.tap(); setJump(ui + 1) }}><FastIcon /></button>
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}

/** "Jump here?" — pass a short test on a later unit to skip everything before it. */
function JumpTest({ course, unitIndex, onClose }: { course: Course; unitIndex: number; onClose: () => void }) {
  const unit = course.units[unitIndex]
  const [items] = useState<QuizItem[]>(() => {
    const ls = unit.lessons
    const n = Math.min(5, ls.length)
    const out: QuizItem[] = []
    for (let i = 0; i < n; i++) {
      const l = ls[Math.floor((i * ls.length) / n)]
      const ex = buildReviewQuiz(course, l.id, 'jump').find((e) => e.kind === 'mcq')
      if (ex) out.push({ ex, group: l.id })
    }
    return out
  })
  const [res, setRes] = useState<{ ok: boolean; skipped: number } | null>(null)

  const finish = (r: QuizResult) => {
    const ok = r.mistakes === 0
    let skipped = 0
    if (ok) {
      const ids: string[] = []
      for (let ui = 0; ui < unitIndex; ui++) for (const l of course.units[ui].lessons) ids.push(lid(course.id, l.id))
      skipped = ids.length
      placeLessons(ids)
      sfx.complete()
    } else sfx.wrong()
    setRes({ ok, skipped })
  }

  if (res) {
    return (
      <div className="overlay"><div className="done-screen">
        {res.ok && <Confetti count={70} />}
        <Mascot mood={res.ok ? 'cheer' : 'sad'} size={120} say={res.ok ? 'Perfect! Seedha aage!' : 'Abhi nahi — pehle yahi pakka karo'} />
        <h1>{res.ok ? `Jump! ${res.skipped} lessons skip` : 'Thoda aur practice'}</h1>
        <p className="muted">{res.ok ? `Ab "${unit.title}" se shuru.` : 'Jump ke liye saare sawal sahi hone chahiye.'}</p>
        <button className="btn btn-green" onClick={onClose}>Continue</button>
      </div></div>
    )
  }
  if (!items.length) return <div className="overlay"><div className="done-screen"><p className="muted">Is unit ke liye test available nahi.</p><button className="btn btn-green" onClick={onClose}>Wapas</button></div></div>
  return <div className="overlay"><QuizRunner items={items} onExit={onClose} onFinish={finish} /></div>
}

function fmtIn(ms: number) {
  const d = Math.round(ms / DAY)
  if (d <= 0) return 'today'
  return d === 1 ? 'tomorrow' : `in ${d} days`
}
