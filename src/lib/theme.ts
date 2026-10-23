const KEY = 'interview-prep:theme'
export type Theme = 'light' | 'dark'

export function currentTheme(): Theme {
  const attr = document.documentElement.dataset.theme
  if (attr === 'light' || attr === 'dark') return attr
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
export function applySavedTheme() {
  try {
    const t = localStorage.getItem(KEY)
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t
  } catch { /* ignore */ }
}
export function toggleTheme() {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = next
  try { localStorage.setItem(KEY, next) } catch { /* ignore */ }
}
