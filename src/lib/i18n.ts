import { useSyncExternalStore } from 'react'
import { EN } from './en'

/** UI language. 'hi' = Hinglish (the source strings in code), 'en' = English. Lesson content is English either way. */
export type Lang = 'hi' | 'en'
const KEY = 'interview-prep:lang'

function read(): Lang {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'en' || v === 'hi') return v
  } catch { /* storage unavailable */ }
  return 'hi'
}

let lang: Lang = read()
const listeners = new Set<() => void>()
const apply = () => { try { document.documentElement.lang = lang === 'en' ? 'en' : 'hi-Latn' } catch { /* ssr */ } }
apply()

export const getLang = () => lang
export function setLang(l: Lang) {
  if (l === lang) return
  lang = l
  try { localStorage.setItem(KEY, l) } catch { /* ignore */ }
  apply()
  listeners.forEach((f) => f())
}
export function useLang(): Lang {
  return useSyncExternalStore((cb) => { listeners.add(cb); return () => { listeners.delete(cb) } }, () => lang)
}

/**
 * Translate a UI string. The Hinglish text IS the key; English comes from ./en.
 * Placeholders look like {name}. App.tsx remounts the tree when the language changes,
 * so plain calls (no hooks) are enough.
 */
export function tr(src: string, vars?: Record<string, string | number>): string {
  const s = lang === 'en' ? (EN[src] ?? src) : src
  return vars ? s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? '')) : s
}
