import type { Course, Lesson } from '../types'
import { tr } from './i18n'

export type Exercise =
  | { kind: 'mcq'; tag: string; prompt: string; sub?: string; options: string[]; answer: number; explain: string }
  | { kind: 'match'; tag: string; prompt: string; pairs: [string, string][]; explain: string }
  | { kind: 'recall'; tag: string; prompt: string; sub?: string; answer: string }

/* ---------- helpers ---------- */
export const plain = (html: string) =>
  html.replace(/<[^>]+>/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
export const clip = (s: string, n = 150) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s)
const firstSentences = (s: string, max = 220) => {
  const t = plain(s)
  const parts = t.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [t]
  let out = ''
  for (const p of parts) { if ((out + p).length > max && out) break; out += p }
  return clip(out.trim() || t, max + 40)
}

function rng(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) }
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
type R = () => number
const shuffle = <T,>(a: T[], r: R) => {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] }
  return b
}
const pick = <T,>(a: T[], r: R) => a[Math.floor(r() * a.length)]

function buildMcq(correct: string, pool: string[], r: R, extra: string[] = []) {
  const seen = new Set([correct])
  const wrong: string[] = []
  for (const w of [...extra, ...shuffle(pool, r)]) {
    const v = clip(w)
    if (!v || seen.has(v)) continue
    seen.add(v); wrong.push(v)
    if (wrong.length === 3) break
  }
  if (wrong.length < 2) return null
  const options = shuffle([correct, ...wrong], r)
  return { options, answer: options.indexOf(correct) }
}

/* ---------- generators ---------- */
interface Ctx { course: Course; lesson: Lesson; unitIdx: number; all: Lesson[]; others: Lesson[]; unitMates: Lesson[]; r: R }
type Gen = (c: Ctx) => Exercise | null

const gTerm: Gen = ({ lesson, others, r }) => {
  if (!lesson.terms.length) return null
  const [t, d] = pick(lesson.terms, r)
  const pool = others.flatMap((o) => o.terms.map((x) => x[1]))
  const m = buildMcq(clip(d), pool.map(clip), r)
  return m && { kind: 'mcq', tag: 'Term', prompt: tr('“{t}” ka matlab kya hai?', { t }), sub: lesson.name, ...m, explain: `${t} → ${d}` }
}
const gAnalogy: Gen = ({ lesson, unitMates, others, r }) => {
  if (!lesson.analogy) return null
  const m = buildMcq(clip(lesson.name), [...unitMates, ...others].map((o) => o.name), r)
  return m && { kind: 'mcq', tag: 'Analogy', prompt: tr('Ye analogy kis concept ke baare mein hai?'), sub: plain(lesson.analogy), ...m, explain: lesson.name }
}
const gDesc: Gen = ({ lesson, unitMates, others, r }) => {
  if (!lesson.desc) return null
  const m = buildMcq(clip(lesson.name), [...unitMates, ...others].map((o) => o.name), r)
  return m && { kind: 'mcq', tag: 'Concept', prompt: tr('Ye description kis topic ka hai?'), sub: firstSentences(lesson.desc), ...m, explain: lesson.name }
}
const gCon: Gen = ({ lesson, others, r }) => {
  if (!lesson.cons.length) return null
  const c = pick(lesson.cons, r)
  const m = buildMcq(clip(c), others.flatMap((o) => o.pros), r, lesson.pros)
  return m && { kind: 'mcq', tag: 'Trade-off', prompt: tr('Kaunsa point “{n}” ki LIMITATION / nuksaan hai?', { n: clip(lesson.name, 60) }), ...m, explain: c }
}
const gPro: Gen = ({ lesson, others, r }) => {
  if (!lesson.pros.length) return null
  const c = pick(lesson.pros, r)
  const m = buildMcq(clip(c), others.flatMap((o) => o.cons), r, lesson.cons)
  return m && { kind: 'mcq', tag: 'Trade-off', prompt: tr('Kaunsa point “{n}” ka FAYDA hai?', { n: clip(lesson.name, 60) }), ...m, explain: c }
}
const gGotcha: Gen = ({ lesson, others, r }) => {
  if (!lesson.gotchas.length) return null
  const c = pick(lesson.gotchas, r)
  const m = buildMcq(clip(c), others.flatMap((o) => o.gotchas), r)
  return m && { kind: 'mcq', tag: 'Gotcha', prompt: tr('Interview trap: “{n}” ke baare mein kaunsi baat SAHI hai?', { n: clip(lesson.name, 60) }), ...m, explain: c }
}
const gWhere: Gen = ({ lesson, others, r }) => {
  if (!lesson.where.length) return null
  const [t, d] = pick(lesson.where, r)
  const m = buildMcq(clip(`${t} — ${d}`), others.flatMap((o) => o.where.map((w) => `${w[0]} — ${w[1]}`)), r)
  return m && { kind: 'mcq', tag: 'Real world', prompt: tr('“{n}” real project mein kahan kaam aata hai?', { n: clip(lesson.name, 60) }), ...m, explain: `${t} — ${d}` }
}
const gMatchTerms: Gen = ({ lesson, r }) => {
  if (lesson.terms.length < 3) return null
  const pairs = shuffle(lesson.terms, r).slice(0, 4).map(([a, b]) => [clip(a, 40), clip(b, 90)] as [string, string])
  return { kind: 'match', tag: 'Match', prompt: tr('Term ko uske matlab se jodo'), pairs, explain: pairs.map((p) => `${p[0]} → ${p[1]}`).join('\n') }
}
const gMatchUnit: Gen = ({ unitMates, lesson, r }) => {
  const pool = [lesson, ...unitMates].filter((l) => l.desc)
  if (pool.length < 3) return null
  const pairs = shuffle(pool, r).slice(0, 4).map((l) => [clip(l.name, 60), firstSentences(l.desc, 90)] as [string, string])
  return { kind: 'match', tag: 'Match', prompt: tr('Topic ko uske description se jodo'), pairs, explain: pairs.map((p) => `${p[0]} → ${p[1]}`).join('\n') }
}
const gRecall: Gen = ({ lesson, r }) => {
  const clipAns = (t: string) => clip(plain(t), 900)
  if (lesson.qa && lesson.qa.length) {
    const x = pick(lesson.qa, r)
    return { kind: 'recall', tag: 'Interview Q', prompt: x.q, sub: lesson.qsub || undefined, answer: clipAns(x.a) }
  }
  const answer = lesson.answer || lesson.what || lesson.desc || lesson.why
  if (!answer) return null
  const prompt = lesson.q || (lesson.kind === 'problem' ? tr('Is problem ko kaise solve karoge? {n}', { n: lesson.name }) : tr('“{n}” ko apne words mein samjhao.', { n: lesson.name }))
  return { kind: 'recall', tag: lesson.kind === 'problem' ? 'Problem' : 'Interview Q', prompt, sub: lesson.qsub || undefined, answer: clipAns(answer) }
}

/* ---------- public API ---------- */
const cleanCache = new WeakMap<Lesson, Lesson>()
/** Strip inline HTML from the short text fields so quiz options read as plain text. */
function clean(l: Lesson): Lesson {
  let c = cleanCache.get(l)
  if (!c) {
    c = {
      ...l,
      terms: l.terms.map(([a, b]) => [plain(a), plain(b)] as [string, string]),
      where: l.where.map(([a, b]) => [plain(a), plain(b)] as [string, string]),
      pros: l.pros.map(plain), cons: l.cons.map(plain), gotchas: l.gotchas.map(plain),
    }
    cleanCache.set(l, c)
  }
  return c
}

function ctxFor(course: Course, unitIdx: number, rawLesson: Lesson, seed: string): Ctx {
  const lesson = clean(rawLesson)
  const all = course.units.flatMap((u) => u.lessons).map(clean)
  const unitMates = course.units[unitIdx].lessons.filter((l) => l.id !== lesson.id).map(clean)
  const others = [...unitMates, ...all.filter((l) => l.id !== lesson.id && !unitMates.some((u) => u.id === l.id))]
  return { course, lesson, unitIdx, all, others, unitMates, r: rng(seed) }
}

export function locate(course: Course, lessonId: string) {
  for (let ui = 0; ui < course.units.length; ui++) {
    const li = course.units[ui].lessons.findIndex((l) => l.id === lessonId)
    if (li >= 0) return { ui, li, lesson: course.units[ui].lessons[li] }
  }
  return null
}

/** A full lesson quiz: ~6 mixed exercises, ending with an interview-question recall card. */
export function buildLessonQuiz(course: Course, lessonId: string, salt = ''): Exercise[] {
  const loc = locate(course, lessonId)
  if (!loc) return []
  const c = ctxFor(course, loc.ui, loc.lesson, `${course.id}/${lessonId}/${salt}`)
  const gens = shuffle([gDesc, gTerm, gAnalogy, gPro, gCon, gGotcha, gWhere], c.r)
  const out: Exercise[] = []
  const seenKinds = new Set<string>()
  for (const g of gens) {
    const e = g(c)
    if (e && !seenKinds.has(e.tag)) { out.push(e); seenKinds.add(e.tag) }
    if (out.length >= 4) break
  }
  const m = (c.r() > 0.5 ? gMatchTerms(c) : null) ?? gMatchUnit(c) ?? gMatchTerms(c)
  if (m) out.splice(Math.min(2, out.length), 0, m)
  if (out.length < 3) { const d = gDesc(c); if (d && !out.includes(d)) out.unshift(d) }
  const rc = gRecall(c)
  if (rc) out.push(rc)
  return out
}

/** Short review: 2–3 quick exercises for one lesson. */
export function buildReviewQuiz(course: Course, lessonId: string, salt = ''): Exercise[] {
  const loc = locate(course, lessonId)
  if (!loc) return []
  const c = ctxFor(course, loc.ui, loc.lesson, `rev/${course.id}/${lessonId}/${salt}`)
  const out: Exercise[] = []
  for (const g of shuffle([gDesc, gTerm, gGotcha, gPro, gCon, gAnalogy], c.r)) {
    const e = g(c)
    if (e) out.push(e)
    if (out.length >= 2) break
  }
  const rc = gRecall(c)
  if (rc) out.push(rc)
  return out
}
