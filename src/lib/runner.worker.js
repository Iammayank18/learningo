/* Runs inside a Web Worker. Receives { code, fn, cases, compare, out } and streams results back. */
class ListNode {
  constructor(val, next) { this.val = val === undefined ? 0 : val; this.next = next === undefined ? null : next }
}
class TreeNode {
  constructor(val, left, right) { this.val = val === undefined ? 0 : val; this.left = left === undefined ? null : left; this.right = right === undefined ? null : right }
}
const mkList = (a) => { let h = null; for (let i = a.length - 1; i >= 0; i--) h = new ListNode(a[i], h); return h }
const mkTree = (a) => {
  if (!a.length || a[0] === null) return null
  const root = new TreeNode(a[0]); const q = [root]; let i = 1
  while (q.length && i < a.length) {
    const n = q.shift()
    if (i < a.length && a[i] !== null) { n.left = new TreeNode(a[i]); q.push(n.left) }
    i++
    if (i < a.length && a[i] !== null) { n.right = new TreeNode(a[i]); q.push(n.right) }
    i++
  }
  return root
}
const revive = (v) => {
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    if ('$list' in v) return mkList(v.$list)
    if ('$tree' in v) return mkTree(v.$tree)
  }
  return v
}
const ser = (v, out) => {
  if (v === undefined) return { $undefined: true }
  if (out === 'list') {
    if (v === null) return []
    const a = []; let n = v; let c = 0
    while (n && typeof n === 'object' && c < 1e6) { a.push(n.val); n = n.next; c++ }
    return n ? { $error: 'The returned list has a cycle or is not a list.' } : a
  }
  return v
}
const canon = (v) => (Array.isArray(v) ? v.map(canon).sort((a, b) => { const x = JSON.stringify(a), y = JSON.stringify(b); return x < y ? -1 : x > y ? 1 : 0 }) : v)
const same = (a, b) => {
  if (Object.is(a, b)) return true
  if (typeof a !== typeof b || a === null || b === null || typeof a !== 'object') return false
  if (Array.isArray(a) !== Array.isArray(b)) return false
  if (Array.isArray(a)) { if (a.length !== b.length) return false; for (let i = 0; i < a.length; i++) if (!same(a[i], b[i])) return false; return true }
  const ka = Object.keys(a), kb = Object.keys(b)
  if (ka.length !== kb.length) return false
  return ka.every((k) => same(a[k], b[k]))
}
const show = (v) => {
  if (typeof v === 'string') return v
  try { const s = JSON.stringify(v); return s === undefined ? String(v) : s } catch { return String(v) }
}

self.onmessage = (e) => {
  const { code, fn, cases, compare, out } = e.data
  let logs = []
  const fakeConsole = {
    log: (...a) => { if (logs.length < 30) logs.push(a.map(show).join(' ').slice(0, 300)) },
  }
  fakeConsole.info = fakeConsole.warn = fakeConsole.error = fakeConsole.debug = fakeConsole.log
  let f
  try {
    f = new Function('ListNode', 'TreeNode', 'console', code + '\n;return (typeof ' + fn + ' === "function") ? ' + fn + ' : undefined')(ListNode, TreeNode, fakeConsole)
  } catch (err) {
    self.postMessage({ type: 'compile', error: String(err && err.message ? err.message : err) })
    return
  }
  if (!f) { self.postMessage({ type: 'nofn' }); return }
  for (let i = 0; i < cases.length; i++) {
    self.postMessage({ type: 'start', i })
    logs = []
    const t0 = performance.now()
    try {
      const args = cases[i].args.map(revive)
      const raw = f(...args)
      const got = ser(raw, out)
      const exp = cases[i].expected
      const ok = !(got && got.$error) && (compare === 'unordered' ? same(canon(got), canon(exp)) : same(got, exp))
      self.postMessage({ type: 'case', i, ok, got, ms: performance.now() - t0, logs })
    } catch (err) {
      self.postMessage({ type: 'case', i, ok: false, error: String(err && err.message ? err.message : err), ms: performance.now() - t0, logs })
    }
  }
  self.postMessage({ type: 'done' })
}
