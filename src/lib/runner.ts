import workerSrc from './runner.worker.js?raw'
import type { Problem, TestCase } from '../data/practice/types'

export type CaseStatus = 'pass' | 'fail' | 'error' | 'timeout' | 'skipped'
export interface CaseResult {
  status: CaseStatus
  got?: unknown
  error?: string
  ms: number
  logs: string[]
}
export interface RunResult {
  kind: 'ok' | 'compile' | 'nofn'
  error?: string
  cases: CaseResult[]
  passed: number
  total: number
}

const CASE_TIMEOUT = 2500

/** Run the user's code against test cases inside a throwaway Web Worker (so infinite loops can be killed). */
export function runCode(problem: Problem, code: string, tests: TestCase[]): Promise<RunResult> {
  return new Promise((resolve) => {
    const cases: CaseResult[] = tests.map(() => ({ status: 'skipped' as CaseStatus, ms: 0, logs: [] }))
    const url = URL.createObjectURL(new Blob([workerSrc], { type: 'text/javascript' }))
    const w = new Worker(url)
    let timer = 0
    let current = -1
    let finished = false
    const finish = (r: Omit<RunResult, 'cases' | 'passed' | 'total'>) => {
      if (finished) return
      finished = true
      clearTimeout(timer)
      w.terminate()
      URL.revokeObjectURL(url)
      resolve({ ...r, cases, passed: cases.filter((c) => c.status === 'pass').length, total: tests.length })
    }
    w.onerror = (e) => finish({ kind: 'compile', error: e.message })
    w.onmessage = (e: MessageEvent) => {
      const m = e.data
      if (m.type === 'compile') finish({ kind: 'compile', error: m.error })
      else if (m.type === 'nofn') finish({ kind: 'nofn' })
      else if (m.type === 'start') {
        current = m.i
        clearTimeout(timer)
        timer = window.setTimeout(() => {
          cases[current] = { status: 'timeout', ms: CASE_TIMEOUT, logs: [] }
          finish({ kind: 'ok' })
        }, CASE_TIMEOUT)
      } else if (m.type === 'case') {
        clearTimeout(timer)
        cases[m.i] = { status: m.error ? 'error' : m.ok ? 'pass' : 'fail', got: m.got, error: m.error, ms: m.ms, logs: m.logs }
      } else if (m.type === 'done') finish({ kind: 'ok' })
    }
    w.postMessage({ code, fn: problem.fn, cases: tests.map((t) => ({ args: t.args, expected: t.expected })), compare: problem.compare, out: problem.out })
  })
}

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
