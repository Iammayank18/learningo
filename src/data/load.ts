import type { Course, CourseMeta, Lesson, SearchEntry } from '../types'
import { getLang } from '../lib/i18n'
import indexJson from './index.json'

export const courseIndex = indexJson as CourseMeta[]
const searchLoaders = import.meta.glob<{ default: SearchEntry[] }>('./search*.json')
export const loadSearchIndex = () => {
  const fn = (getLang() === 'en' && searchLoaders['./search.en.json']) || searchLoaders['./search.json']
  return fn().then((m) => m.default)
}

const loaders = import.meta.glob<{ default: Course }>('./courses/*.json')
const translations = import.meta.glob<{ default: CourseTranslation }>('./translations/en/*.json')
const cache = new Map<string, Promise<Course>>()

type LessonPatch = Partial<Pick<Lesson, 'name' | 'desc' | 'q' | 'qsub' | 'terms' | 'what' | 'analogy' | 'why' | 'where' | 'pros' | 'cons' | 'gotchas' | 'qa' | 'answer'>> & { visualCap?: string; codeSwap?: [string, string][]; svgSwap?: [string, string][] }
interface CourseTranslation {
  course?: { title?: string; group?: string }
  units?: Record<string, { title?: string; week?: string }>
  lessons?: Record<string, LessonPatch>
}

function mergeTranslation(course: Course, tr: CourseTranslation): Course {
  return {
    ...course,
    title: tr.course?.title ?? course.title,
    group: tr.course?.group ?? course.group,
    units: course.units.map((u) => {
      const ut = tr.units?.[u.id]
      return {
        ...u,
        title: ut?.title ?? u.title,
        week: ut?.week ?? u.week,
        lessons: u.lessons.map((l) => {
          const p = tr.lessons?.[l.id]
          if (!p) return l
          const swap = (text: string, pairs?: [string, string][]) =>
            pairs ? pairs.reduce((acc, [from, to]) => acc.split(from).join(to), text) : text
          const visual = l.visual
            ? { ...l.visual, ...(p.visualCap ? { cap: p.visualCap } : {}), svg: swap(l.visual.svg, p.svgSwap) }
            : l.visual
          return {
            ...l,
            ...Object.fromEntries(
              Object.entries(p).filter(([k, v]) => !['visualCap', 'codeSwap', 'svgSwap'].includes(k) && v !== undefined),
            ),
            code: swap(l.code, p.codeSwap),
            visual,
          }
        }),
      }
    }),
  }
}

export function loadCourse(id: string): Promise<Course> {
  const lang = getLang()
  const key = `${id}:${lang}`
  let p = cache.get(key)
  if (!p) {
    const fn = loaders[`./courses/${id}.json`]
    if (!fn) return Promise.reject(new Error('Unknown course ' + id))
    p = fn().then(async (m) => {
      if (lang !== 'en') return m.default
      const tr = translations[`./translations/en/${id}.json`]
      return tr ? mergeTranslation(m.default, (await tr()).default) : m.default
    })
    cache.set(key, p)
  }
  return p
}

export const metaOf = (id: string) => courseIndex.find((c) => c.id === id)
