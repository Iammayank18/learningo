import { useEffect, useState } from 'react'
import { loadCourse } from '../data/load'
import type { Course } from '../types'

type S = { id: string; course?: Course; error?: boolean }

export function useCourse(id: string | undefined): { course?: Course; loading: boolean; error: boolean } {
  const [s, setS] = useState<S | null>(null)
  useEffect(() => {
    if (!id) return
    let live = true
    loadCourse(id).then((course) => live && setS({ id, course })).catch(() => live && setS({ id, error: true }))
    return () => { live = false }
  }, [id])
  const ready = !!id && s?.id === id
  return { course: ready ? s.course : undefined, loading: !!id && !ready, error: ready && !!s.error }
}
