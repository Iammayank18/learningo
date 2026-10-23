import { useSyncExternalStore } from 'react'

const get = () => location.hash.replace(/^#\/?/, '')
const sub = (cb: () => void) => { window.addEventListener('hashchange', cb); return () => window.removeEventListener('hashchange', cb) }

export function useRoute(): string[] {
  const h = useSyncExternalStore(sub, get)
  return h.split('/').filter(Boolean).map(decodeURIComponent)
}
export const go = (...parts: string[]) => { location.hash = '/' + parts.map(encodeURIComponent).join('/') }
export const href = (...parts: string[]) => '#/' + parts.map(encodeURIComponent).join('/')
