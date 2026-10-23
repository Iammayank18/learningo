import { useSyncExternalStore } from 'react'

export interface Card {
  stage: number // 1..5 (crown level)
  due: number // epoch ms
  seen: number
  lastOk: boolean
}
export interface Progress {
  xp: number
  goal: number
  activeCourse: string
  track: string // selected roadmap id ('' = none)
  days: Record<string, number> // yyyy-mm-dd -> xp earned
  done: Record<string, number> // "course/lesson" -> times completed
  cards: Record<string, Card>
}

const KEY = 'interview-prep:v1'
const empty = (): Progress => ({ xp: 0, goal: 30, activeCourse: 'react-mastery', track: '', days: {}, done: {}, cards: {} })

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...empty(), ...JSON.parse(raw) }
  } catch { /* storage unavailable */ }
  return empty()
}

let state = read()
const listeners = new Set<() => void>()

function commit(next: Progress) {
  state = next
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignore */ }
  listeners.forEach((l) => l())
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb) } },
    () => state,
  )
}

export const getProgress = () => state

export const DAY = 86_400_000
export const dayKey = (t = Date.now()) => {
  const d = new Date(t)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
export const lid = (course: string, lesson: string) => `${course}/${lesson}`

/** Leitner intervals (days) — matches the D+1 / 3 / 7 / 21 / 56 spiral revision plan. */
export const INTERVALS = [1, 3, 7, 21, 56]

function withXp(s: Progress, n: number): Progress {
  const k = dayKey()
  return { ...s, xp: s.xp + n, days: { ...s.days, [k]: (s.days[k] ?? 0) + n } }
}

/** Called when a lesson (learn + practice) is finished. */
export function completeLesson(course: string, lesson: string, xp: number, perfect: boolean) {
  const id = lid(course, lesson)
  const prev = state.cards[id]
  const stage = prev ? prev.stage : perfect ? 2 : 1
  const card: Card = { stage, due: Date.now() + INTERVALS[stage - 1] * DAY, seen: (prev?.seen ?? 0) + 1, lastOk: true }
  const s = withXp(state, xp)
  commit({ ...s, done: { ...s.done, [id]: (s.done[id] ?? 0) + 1 }, cards: { ...s.cards, [id]: card } })
}

/** Called after reviewing one lesson. */
export function reviewLesson(course: string, lesson: string, ok: boolean, xp: number) {
  const id = lid(course, lesson)
  const prev = state.cards[id] ?? { stage: 1, due: 0, seen: 0, lastOk: true }
  const stage = ok ? Math.min(5, prev.stage + 1) : Math.max(1, prev.stage - 2)
  const due = Date.now() + (ok ? INTERVALS[stage - 1] : 1) * DAY
  const s = withXp(state, xp)
  commit({ ...s, cards: { ...s.cards, [id]: { stage, due, seen: prev.seen + 1, lastOk: ok } } })
}

export function setGoal(goal: number) { commit({ ...state, goal }) }
export function setActiveCourse(activeCourse: string) { commit({ ...state, activeCourse }) }
export function setTrack(track: string) { commit({ ...state, track }) }
/** XP only — free practice that doesn't touch the spaced-repetition schedule. */
export function addXp(n: number) { commit(withXp(state, n)) }
export const doneCount = (p: Progress, course: string) => Object.keys(p.done).filter((k) => k.startsWith(course + '/')).length
export function resetAll() { commit(empty()) }
export function importState(json: string) { commit({ ...empty(), ...JSON.parse(json) }) }

export function streakOf(p: Progress): { current: number; best: number; todayDone: boolean } {
  const has = (t: number) => (p.days[dayKey(t)] ?? 0) > 0
  const todayDone = has(Date.now())
  let current = 0
  let t = todayDone ? Date.now() : Date.now() - DAY
  while (has(t)) { current++; t -= DAY }
  const keys = Object.keys(p.days).filter((k) => p.days[k] > 0).sort()
  let best = 0, run = 0, prev = 0
  for (const k of keys) {
    const [y, m, d] = k.split('-').map(Number)
    const ts = new Date(y, m - 1, d).getTime()
    run = prev && Math.round((ts - prev) / DAY) === 1 ? run + 1 : 1
    best = Math.max(best, run)
    prev = ts
  }
  return { current, best: Math.max(best, current), todayDone }
}

export function levelOf(xp: number) {
  let level = 1, need = 100, acc = 0
  while (xp >= acc + need) { acc += need; level++; need = 100 * level }
  return { level, into: xp - acc, need }
}

export function dueCards(p: Progress, now = Date.now()) {
  return Object.entries(p.cards).filter(([, c]) => c.due <= now).sort((a, b) => a[1].due - b[1].due).map(([id]) => id)
}
