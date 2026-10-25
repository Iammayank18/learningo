export interface DsaThink { tag: string; q: string; opts: string[]; ans: number; why: string[]; exec?: string | null }
export interface DsaDryRun { title: string; columns: string[]; rows: string[][]; hit: number; note: string }
export interface DsaTry {
  task: string; examples: string[]; hint: string; fn: string; starter: string; solution: string
  checks: { t: string; verify: string }[]
}
/** A practice problem attached to a non-DSA concept lesson: a LeetCode problem (lc = slug) or a Machine Coding lesson (mc = lesson id). */
export interface ConceptProblem { name: string; diff: 'easy' | 'medium' | 'hard'; lc?: string; mc?: string }
export interface DsaConcept {
  id: string; prereqs: string[]; dryRun: DsaDryRun | null; think: DsaThink[]; try: DsaTry | null
  takeaway: { key: string; mistakes: string[] }
  problems?: ConceptProblem[]
}

const files = import.meta.glob<{ items: DsaConcept[] }>('./concept-*.json', { eager: true, import: 'default' })
const MAP: Record<string, DsaConcept> = {}
for (const f of Object.values(files)) for (const it of f.items) MAP[it.id] = it

export const dsaConcept = (lessonId: string): DsaConcept | undefined => MAP[lessonId]

export interface DsaProblemExtra {
  id: string
  pattern: { name: string; question: string; idea: string[]; spotWhen: string[]; prereqs: string[] }
  dryRun: DsaDryRun
  constraints: string[]
  minutes: number
  review: {
    approaches: { name: string; time: string; space: string; idea: string; best: boolean }[]
    why: string[]; mistakes: string[]; variations: string[]
  }
}
const pfiles = import.meta.glob<{ items: DsaProblemExtra[] }>('./problem-*.json', { eager: true, import: 'default' })
const PMAP: Record<string, DsaProblemExtra> = {}
for (const f of Object.values(pfiles)) for (const it of f.items) PMAP[it.id] = it
export const dsaProblemExtra = (id: string): DsaProblemExtra | undefined => PMAP[id]


// Concept courses other than DSA (JS, ...): src/data/concepts/<course>-NN.json = { course, items }
const cfiles = import.meta.glob<{ course: string; items: DsaConcept[] }>('../concepts/*.json', { eager: true, import: 'default' })
const CMAP: Record<string, DsaConcept> = {}
for (const f of Object.values(cfiles)) for (const it of f.items) CMAP[`${f.course}/${it.id}`] = it

/** Concept-flow data (Learn → Trace → Think → Try → Takeaway → Problem) for a lesson. */
export const conceptFor = (courseId: string, lessonId: string): DsaConcept | undefined =>
  courseId === 'dsa' ? MAP[lessonId] : CMAP[`${courseId}/${lessonId}`]
