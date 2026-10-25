import type { BuildLesson } from './types'
import { mcProblem } from '../mc'
import { fromMc } from './fromMc'
export type { BuildLesson, BuildStep, BuildQ } from './types'

const files = import.meta.glob<{ course: string; items: BuildLesson[] }>('./*.json', { eager: true, import: 'default' })
const MAP: Record<string, BuildLesson> = {}
for (const f of Object.values(files)) for (const it of f.items) MAP[`${f.course}/${it.id}`] = it

/** Build-lesson data (understand → quick check → build) for a lesson of a build course. */
export function buildLessonFor(courseId: string, lessonId: string): BuildLesson | undefined {
  if (courseId === 'machine-coding') {
    const mc = mcProblem(lessonId)
    return mc ? fromMc(mc) : undefined
  }
  return MAP[`${courseId}/${lessonId}`]
}
