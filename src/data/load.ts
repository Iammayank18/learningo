import type { Course, CourseMeta, SearchEntry } from '../types'
import indexJson from './index.json'

export const courseIndex = indexJson as CourseMeta[]
export const loadSearchIndex = () => import('./search.json').then((m) => m.default as SearchEntry[])

const loaders = import.meta.glob<{ default: Course }>('./courses/*.json')
const cache = new Map<string, Promise<Course>>()

export function loadCourse(id: string): Promise<Course> {
  let p = cache.get(id)
  if (!p) {
    const fn = loaders[`./courses/${id}.json`]
    p = fn ? fn().then((m) => m.default) : Promise.reject(new Error('Unknown course ' + id))
    cache.set(id, p)
  }
  return p
}

export const metaOf = (id: string) => courseIndex.find((c) => c.id === id)
