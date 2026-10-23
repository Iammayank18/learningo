import { useSyncExternalStore } from 'react'

export interface Prefs { sound: boolean; unlockAll: boolean }
const KEY = 'interview-prep:prefs'
const defaults: Prefs = { sound: true, unlockAll: false }

function read(): Prefs {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...defaults, ...JSON.parse(raw) }
  } catch { /* storage unavailable */ }
  return defaults
}

let prefs = read()
const listeners = new Set<() => void>()

export function setPref<K extends keyof Prefs>(k: K, v: Prefs[K]) {
  prefs = { ...prefs, [k]: v }
  try { localStorage.setItem(KEY, JSON.stringify(prefs)) } catch { /* ignore */ }
  listeners.forEach((l) => l())
}
export const getPrefs = () => prefs
export function usePrefs(): Prefs {
  return useSyncExternalStore((cb) => { listeners.add(cb); return () => { listeners.delete(cb) } }, () => prefs)
}
