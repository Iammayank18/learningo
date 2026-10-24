import type { MessageKey } from './i18n'
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

export const MILESTONES: Record<number, MessageKey> = {
  3: 'celebration.milestone.3',
  7: 'celebration.milestone.7',
  14: 'celebration.milestone.14',
  30: 'celebration.milestone.30',
  50: 'celebration.milestone.50',
  100: 'celebration.milestone.100',
  200: 'celebration.milestone.200',
  365: 'celebration.milestone.365',
}
