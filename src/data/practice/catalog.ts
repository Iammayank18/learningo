import raw from './catalog.json'
import course from '../courses/dsa.json'
import { DSA_PROBLEMS } from './dsa'
import { LESSON_PROBLEMS } from './lessonProblems'
import type { Difficulty, Problem } from './types'

export type Tier = 'must' | 'important' | 'optional'
const TIER_RANK: Record<Tier, number> = { must: 0, important: 1, optional: 2 }

/** One row of the Code page. Most rows are just a LeetCode link; `app` is set when the app has the full 5-step page. */
export interface CatalogItem {
  slug: string
  name: string
  diff: Difficulty
  /** DSA lesson ids (or 'timed-mocks') */
  topics: string[]
  app?: Problem
  /** Progress key: the app problem id when it has one, else `lc:<slug>` */
  key: string
  /** Priority label, taken from the lesson(s) this problem belongs to */
  tier: Tier
  /** Position in the learning path (smaller = earlier) */
  rank: number
  /** Unit of the path this problem belongs to (by its first lesson) */
  unitId: string
  unitTitle: string
}

// lesson order and priority come from the course itself, so the Code page always follows the path
const units = (course as { units: { id: string; title: string; lessons: { id: string; name: string; tier?: Tier }[] }[] }).units
const lessons = units.flatMap((u) => u.lessons)
const unitOfLesson = new Map(units.flatMap((u) => u.lessons.map((l) => [l.id, u] as const)))
const lessonIndex = new Map(lessons.map((l, i) => [l.id, i]))
const lessonTier = new Map(lessons.map((l) => [l.id, (l.tier ?? 'important') as Tier]))
const lessonName = new Map(lessons.map((l) => [l.id, l.name]))

const bySlug = new Map(DSA_PROBLEMS.filter((p) => p.lc).map((p) => [p.lc!.slug, p]))
type Base = { slug: string; name: string; diff: Difficulty; topics: string[]; app?: Problem }

const fromJournal: Base[] = (raw as { slug: string; name: string; diff: Difficulty; topics: string[] }[]).map((r) => ({ ...r, app: bySlug.get(r.slug) }))
const seen = new Set(fromJournal.map((c) => c.slug))
// problems written for the app that are not in the old journal list
const extra: Base[] = DSA_PROBLEMS.filter((p) => !p.lc || !seen.has(p.lc.slug))
  .map((p) => ({ slug: p.lc?.slug ?? p.id, name: p.title, diff: p.diff, topics: [p.lesson], app: p }))

const tierOf = (topics: string[]): Tier =>
  topics.reduce<Tier>((best, tp) => { const t = lessonTier.get(tp) ?? 'important'; return TIER_RANK[t] < TIER_RANK[best] ? t : best }, 'optional')
const rankOf = (slug: string, topics: string[]) => {
  // hand-picked problems come first inside their lesson, in the order they are listed
  const picked = topics.map((tp) => ({ tp, at: LESSON_PROBLEMS[tp]?.indexOf(slug) ?? -1 })).filter((x) => x.at >= 0)
  if (picked.length) return Math.min(...picked.map((x) => (lessonIndex.get(x.tp) ?? 999) * 100 + x.at))
  return Math.min(...topics.map((tp) => (lessonIndex.get(tp) ?? 999) * 100 + 50))
}

// a hand-picked problem also counts as belonging to the lesson that picks it
const pickedBy = new Map<string, string[]>()
for (const [lid, slugs] of Object.entries(LESSON_PROBLEMS)) for (const sl of slugs) pickedBy.set(sl, [...(pickedBy.get(sl) ?? []), lid])

export const CATALOG: CatalogItem[] = [...fromJournal, ...extra].map((b) => {
  const topics = [...new Set([...b.topics, ...(pickedBy.get(b.slug) ?? []).filter((id) => lessonIndex.has(id))])]
  const rank = rankOf(b.slug, topics)
  const first = lessons[Math.floor(rank / 100)]
  const unit = first ? unitOfLesson.get(first.id) : undefined
  return { ...b, topics, key: b.app ? b.app.id : `lc:${b.slug}`, tier: tierOf(topics), rank, unitId: unit?.id ?? 'other', unitTitle: unit?.title ?? 'Other' }
})

const bySlugItem = new Map(CATALOG.map((c) => [c.slug, c]))

/** Topics for the Code page filter, in learning-path order (only lessons that have problems, then interview topics). */
export const TOPICS: string[] = (() => {
  const used = new Set(CATALOG.flatMap((c) => c.topics))
  const inPath = lessons.map((l) => l.id).filter((id) => used.has(id))
  return [...inPath, ...[...used].filter((id) => !lessonIndex.has(id))]
})()

export const topicLabel = (id: string) => lessonName.get(id) ?? id.replace(/-/g, ' ').replace(/^./, (m) => m.toUpperCase())
export const lcUrl = (slug: string) => `https://leetcode.com/problems/${slug}/`

/** The 1–2 hand-picked problems shown at the end of a lesson (easier first). */
export function problemsForLesson(lessonId: string): CatalogItem[] {
  return (LESSON_PROBLEMS[lessonId] ?? []).map((s) => bySlugItem.get(s)).filter((c): c is CatalogItem => !!c)
}
/** Other problems tagged with this lesson (for the "more in Code" link). */
export const moreForLesson = (lessonId: string) => {
  const picked = new Set(LESSON_PROBLEMS[lessonId] ?? [])
  return CATALOG.filter((c) => c.topics.includes(lessonId) && !picked.has(c.slug)).length
}

/** Topics of a problem in path order (for display). */
export const topicsInOrder = (c: CatalogItem) => [...c.topics].sort((a, b) => (lessonIndex.get(a) ?? 999) - (lessonIndex.get(b) ?? 999))
