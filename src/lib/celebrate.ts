import { dayKey, getProgress, levelOf, streakOf } from './store'

export interface Snap { streak: number; todayDone: boolean; goalMet: boolean; level: number }
export type Step = 'summary' | 'streak' | 'goal' | 'level'

export function snap(): Snap {
  const p = getProgress()
  const s = streakOf(p)
  return { streak: s.current, todayDone: s.todayDone, goalMet: (p.days[dayKey()] ?? 0) >= p.goal, level: levelOf(p.xp).level }
}

/** Which celebration screens to show after an activity (like Duolingo's post-lesson sequence). */
export function stepsBetween(a: Snap, b: Snap): Step[] {
  const out: Step[] = ['summary']
  if (!a.todayDone && b.todayDone) out.push('streak')
  if (!a.goalMet && b.goalMet) out.push('goal')
  if (b.level > a.level) out.push('level')
  return out
}

export const MILESTONES: Record<number, string> = {
  3: 'Teen din! Habit ban rahi hai',
  7: 'Poora ek hafta!',
  14: 'Do hafte lagataar!',
  30: 'Ek mahina — unstoppable!',
  50: '50 din — kya baat hai!',
  100: '100 din — legend!',
  200: '200 din — machine!',
  365: 'Ek poora saal!',
}
