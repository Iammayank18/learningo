import { useSyncExternalStore } from 'react'

const KEY = 'interview-prep:theme'
export type Theme = 'light' | 'dark'
/** What the user picked. 'system' follows the OS and keeps following it. */
export type ThemePref = Theme | 'system'

const mq = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null
const listeners = new Set<() => void>()

function readPref(): ThemePref {
  try {
    const t = localStorage.getItem(KEY)
    if (t === 'light' || t === 'dark') return t
  } catch { /* storage unavailable */ }
  return 'system'
}

let pref: ThemePref = readPref()

const resolve = (): Theme => (pref === 'system' ? (mq?.matches ? 'dark' : 'light') : pref)

function apply() {
  const root = document.documentElement
  if (pref === 'system') delete root.dataset.theme
  else root.dataset.theme = pref
  // browser UI colour (mobile address bar) follows the app theme
  let m = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (!m) { m = document.createElement('meta'); m.name = 'theme-color'; document.head.appendChild(m) }
  m.content = resolve() === 'dark' ? '#131f24' : '#58cc02'
}

const emit = () => { apply(); listeners.forEach((l) => l()) }
mq?.addEventListener('change', () => { if (pref === 'system') emit() })

export const currentTheme = (): Theme => resolve()
export const themePref = (): ThemePref => pref
export function applySavedTheme() { pref = readPref(); apply() }

export function setThemePref(next: ThemePref) {
  if (next === pref) return
  pref = next
  try { if (next === 'system') localStorage.removeItem(KEY); else localStorage.setItem(KEY, next) } catch { /* ignore */ }
  emit()
}
export function toggleTheme() { setThemePref(resolve() === 'dark' ? 'light' : 'dark') }

/** Re-renders on any theme change (sidebar, settings, palette all stay in sync). */
export function useTheme(): { theme: Theme; pref: ThemePref } {
  const key = useSyncExternalStore((cb) => { listeners.add(cb); return () => { listeners.delete(cb) } }, () => pref + ':' + resolve())
  const [p, t] = key.split(':') as [ThemePref, Theme]
  return { theme: t, pref: p }
}
