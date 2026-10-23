import type { Course } from '../types'
import { lid } from './store'

/** Lessons unlock strictly in order: lesson N opens only after lesson N-1 is completed. */
export function lockedIds(course: Course, done: Record<string, number>, unlockAll: boolean): { locked: Set<string>; blocker: Record<string, { id: string; name: string }> } {
  const locked = new Set<string>()
  const blocker: Record<string, { id: string; name: string }> = {}
  if (unlockAll) return { locked, blocker }
  let firstOpen: { id: string; name: string } | null = null
  for (const u of course.units) {
    for (const l of u.lessons) {
      if (firstOpen) { if (!done[lid(course.id, l.id)]) { locked.add(l.id); blocker[l.id] = firstOpen } }
      else if (!done[lid(course.id, l.id)]) firstOpen = { id: l.id, name: l.name }
    }
  }
  return { locked, blocker }
}
