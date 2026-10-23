export interface Lesson {
  id: string
  name: string
  cat: string
  desc: string
  q: string
  qsub: string
  terms: [string, string][]
  what: string
  analogy: string
  why: string
  visual: { cap?: string; svg: string } | null
  code: string
  where: [string, string][]
  pros: string[]
  cons: string[]
  gotchas: string[]
  qa?: { q: string; a: string }[]
  answer?: string
  kind?: 'problem'
  diff?: string
}
export interface Unit {
  id: string
  title: string
  week: string
  lessons: Lesson[]
}
export interface CourseMeta {
  id: string
  title: string
  icon: string
  group: string
  hue: string
  source: string
  lessons: number
  units: number
  featured: boolean
  hasDeep: boolean
}
export interface Course extends Omit<CourseMeta, 'lessons' | 'units'> {
  cats: { id: string; label: string }[]
  units: Unit[]
}
export interface SearchEntry {
  c: string // course id
  u: string // unit id
  l: string // lesson id
  n: string // name
  t: string // unit title
  x: string // searchable text
}
