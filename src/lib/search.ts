import { loadSearchIndex } from '../data/load'
import { getLang } from './i18n'
import type { SearchEntry } from '../types'

export interface Hit { e: SearchEntry; score: number; field: 'name' | 'text' }

const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}\s.+#]/gu, ' ')
type Pre = { e: SearchEntry; n: string; t: string; x: string }
let pre: Pre[] = []
let loading: Promise<void> | null = null
let loadedLang = ''

/** Loads the (large) search index on first use so it stays out of the main bundle. */
export function ensureSearch(): Promise<void> {
  const lang = getLang()
  if (lang !== loadedLang) { loadedLang = lang; pre = []; loading = null; names = null }
  loading ??= loadSearchIndex().then((idx) => { pre = idx.map((e) => ({ e, n: norm(e.n), t: norm(e.t), x: norm(e.x) })) })
  return loading
}

function subsequenceSpan(name: string, q: string): number {
  // smallest window in `name` that contains q as a subsequence (greedy from each start); Infinity if none
  let best = Infinity
  for (let s = name.indexOf(q[0]); s >= 0 && s < name.length; s = name.indexOf(q[0], s + 1)) {
    let i = 0, end = s
    for (let j = s; j < name.length && i < q.length; j++) if (name[j] === q[i]) { i++; end = j }
    if (i === q.length) best = Math.min(best, end - s + 1)
    if (best === q.length) break
  }
  return best
}

export function search(query: string, limit = 30, course?: string): Hit[] {
  const q = norm(query).trim()
  if (!q) return []
  const toks = q.split(/\s+/).filter(Boolean)
  const hits: Hit[] = []
  for (const p of pre) {
    if (course && p.e.c !== course) continue
    let score = 0
    let nameHit = false
    if (p.n === q) score += 200
    else if (p.n.startsWith(q)) score += 120
    else if (p.n.includes(q)) score += 80
    let ok = true
    for (const t of toks) {
      if (p.n.includes(t)) { score += 25; nameHit = true }
      else if (p.t.includes(t)) score += 10
      else if (p.x.includes(t)) score += 4
      else ok = false
    }
    if (ok && score > 0) hits.push({ e: p.e, score, field: nameHit ? 'name' : 'text' })
  }
  if (hits.length < 5 && q.length >= 3 && !q.includes(' ')) {
    // typo / abbreviation tolerance: query letters appear in order, tightly packed, inside the title
    const seen = new Set(hits.map((h) => h.e))
    for (const p of pre) {
      if (course && p.e.c !== course) continue
      if (seen.has(p.e)) continue
      const span = subsequenceSpan(p.n, q)
      if (span <= q.length + 2) hits.push({ e: p.e, score: 20 - (span - q.length), field: 'name' })
    }
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}

export function snippet(entry: SearchEntry, query: string, len = 110) {
  const toks = norm(query).split(/\s+/).filter(Boolean)
  const low = entry.x.toLowerCase()
  let at = -1
  for (const t of toks) { at = low.indexOf(t); if (at >= 0) break }
  const start = Math.max(0, at < 0 ? 0 : at - 30)
  return (start > 0 ? '…' : '') + entry.x.slice(start, start + len).trim() + (start + len < entry.x.length ? '…' : '')
}

export function highlightParts(text: string, query: string): { s: string; hit: boolean }[] {
  const toks = norm(query).split(/\s+/).filter((t) => t.length > 0)
  if (!toks.length) return [{ s: text, hit: false }]
  const esc = toks.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const parts = text.split(new RegExp(`(${esc.join('|')})`, 'gi'))
  return parts.map((s, i) => ({ s, hit: i % 2 === 1 })).filter((p) => p.s)
}

let names: Promise<Record<string, string>> | null = null
/** "course/lesson" -> lesson name, built from the lazy search index. */
export function lessonNames(): Promise<Record<string, string>> {
  names ??= ensureSearch().then(() => Object.fromEntries(pre.map((p) => [`${p.e.c}/${p.e.l}`, p.e.n])))
  return names
}
