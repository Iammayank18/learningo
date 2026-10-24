import { useSyncExternalStore } from 'react'
import { en, type MessageKey } from './catalog/en'
import { hi } from './catalog/hi'

/** UI + lesson language. 'en' = English (default), 'hi' = Hinglish (optional). */
export type Lang = 'hi' | 'en'
export type { MessageKey }

const KEY = 'interview-prep:lang'
const CATALOGS: Record<Lang, Record<MessageKey, string>> = { hi, en }

function read(): Lang {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'en' || v === 'hi') return v
  } catch { /* storage unavailable */ }
  return 'en'
}

let lang: Lang = read()
const listeners = new Set<() => void>()
const apply = () => { try { document.documentElement.lang = lang === 'en' ? 'en' : 'hi-Latn' } catch { /* ssr */ } }
apply()

export const getLang = () => lang
/** BCP-47 tag used for dates/numbers, matching the UI language. */
export const getLocale = () => (lang === 'en' ? 'en-IN' : 'en-IN')

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

/** Translate a message id. Placeholders look like {name}. */
export function t(key: MessageKey, vars?: Record<string, string | number>): string {
  const s = CATALOGS[lang][key] ?? en[key]
  return vars ? s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? '')) : s
}

/** Pick the singular or plural message for `n`. Both catalogues must define both forms. */
export function tp(one: MessageKey, other: MessageKey, n: number, vars?: Record<string, string | number>): string {
  return t(n === 1 ? one : other, { n, ...vars })
}
