/** Compact, truncated display of any test value. */
export function fmt(v: unknown, max = 160): string {
  let s: string
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    const o = v as Record<string, unknown>
    if ('$undefined' in o) return 'undefined'
    if ('$error' in o) return String(o.$error)
    if ('$list' in o) s = JSON.stringify(o.$list)
    else if ('$tree' in o) s = JSON.stringify(o.$tree)
    else s = JSON.stringify(v)
  } else {
    try { s = JSON.stringify(v) ?? String(v) } catch { s = String(v) }
  }
  return s.length > max ? s.slice(0, max) + `… (${s.length} chars)` : s
}
export const fmtArgs = (args: unknown[]) => args.map((a) => fmt(a, 120)).join(', ')
