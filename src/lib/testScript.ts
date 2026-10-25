import workerSrc from './runner.worker.js?raw'
import type { Problem, TestCase } from '../data/practice/types'

/** Cases whose arguments are too big to paste (performance cases) are left out of the script. */
const MAX_CASE = 600
export const isBigCase = (c: TestCase) => JSON.stringify(c).length > MAX_CASE

/** A script the learner pastes under their own function in the browser console or Node. */
export function buildTestScript(problem: Problem, tests: TestCase[]): string {
  const helpers = workerSrc.slice(0, workerSrc.indexOf('self.onmessage')).replace(/^\/\*.*\*\/\n/, '').trim()
  const cases = tests.map((c, i) => ({ n: i + 1, args: c.args, expected: c.expected })).filter((_, i) => !isBigCase(tests[i]))
  return `// 1) Paste your ${problem.fn} function first. 2) Paste this block under it and run.
{
${helpers}
const cases = ${JSON.stringify(cases)}
const mode = ${JSON.stringify(problem.compare ?? 'ordered')}, outKind = ${JSON.stringify(problem.out ?? null)}
for (const c of cases) {
  try {
    const got = ser(${problem.fn}(...c.args.map(revive)), outKind)
    const ok = !(got && got.$error) && (mode === 'unordered' ? same(canon(got), canon(c.expected)) : same(got, c.expected))
    console.log(ok ? '✓ case ' + c.n : '✗ case ' + c.n + '  got ' + show(got) + '  expected ' + show(c.expected))
  } catch (e) { console.log('✗ case ' + c.n + '  threw ' + e.message) }
}
}`
}
