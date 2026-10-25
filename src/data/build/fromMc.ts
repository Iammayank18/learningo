import type { McProblem } from '../mc/types'
import type { BuildLesson } from './types'

const FN = /^(?:async )?function (\w+)(.*)\{\s*$/
const CLASS = /^class (\w+)(.*)\{\s*$/
const PROTO = /^((?:\w+\.)+(\w+)) = (?:async )?function\s*(.*)\{\s*$/
const has = (sig: string, name: string) => new RegExp(`\\b${name}\\b`).test(sig)

/** Top-level functions in the solution that the problem asks for. */
function decls(mc: McProblem) {
  const plain: { name: string; rest: string; cls?: boolean; async?: boolean }[] = []
  const proto: { full: string; rest: string }[] = []
  for (const line of mc.solution.split('\n')) {
    const f = FN.exec(line)
    if (f && has(mc.signature, f[1])) plain.push({ name: f[1], rest: f[2], async: line.startsWith('async ') })
    const k = CLASS.exec(line)
    if (k && has(mc.signature, k[1])) plain.push({ name: k[1], rest: k[2], cls: true })
    const p = PROTO.exec(line)
    if (p && has(mc.signature, p[2])) proto.push({ full: p[1], rest: p[3] })
  }
  return { plain, proto }
}

export function mcFiles(mc: McProblem) {
  const { plain, proto } = decls(mc)
  const file = `${mc.id}.mjs`
  const starter = mc.starter ?? [
    ...plain.map((d) => (d.cls ? `export class ${d.name}${d.rest}{\n  // your code\n}` : `export ${d.async ? 'async ' : ''}function ${d.name}${d.rest}{\n  // your code\n}`)),
    ...proto.map((d) => `${d.full} = function ${d.rest}{\n  // your code\n}`),
  ].join('\n\n') + '\n'
  const solution = mc.solution.trimEnd() + (plain.length ? `\n\nexport { ${plain.map((d) => d.name).join(', ')} }\n` : '\n')
  const imp = plain.length ? `import { ${plain.map((d) => d.name).join(', ')} } from './${file}'` : `import './${file}'`
  const tests = [
    imp,
    '',
    'const assert = (c, m) => { if (!c) throw new Error(m || "failed") }',
    'const sleep = (ms) => new Promise((r) => setTimeout(r, ms))',
    '',
    'const tests = [',
    ...mc.build.checks.filter((c) => c.verify).map((c) => `  [${JSON.stringify(c.t)}, async () => {\n    ${c.verify!.split('\n').join('\n    ')}\n  }],`),
    ']',
    '',
    'let pass = 0',
    'for (const [name, fn] of tests) {',
    '  try { await fn(); pass++; console.log("✓ " + name) }',
    '  catch (e) { console.log("✗ " + name + " -> " + e.message) }',
    '}',
    'console.log(`${pass}/${tests.length} passed`)',
    '',
  ].join('\n')
  const checks = mc.build.checks.filter((c) => c.verify)
  const expect = [...checks.map((c) => '✓ ' + c.t), `${checks.length}/${checks.length} passed`].join('\n')
  return { file, starter, solution, tests, expect }
}

export function fromMc(mc: McProblem): BuildLesson {
  const f = mcFiles(mc)
  return {
    id: mc.id,
    understand: {
      title: mc.signature,
      what: mc.learn.what,
      where: mc.learn.where,
      rules: mc.build.reqs,
      result: mc.build.checks[0]?.test,
      diagram: mc.learn.how.diagram,
    },
    quiz: mc.think.slice(0, 3),
    build: {
      minutes: mc.build.minutes,
      steps: [
        { title: 'Create the folder and two files', run: `mkdir ${mc.id} && cd ${mc.id}\ntouch ${f.file} test.mjs`, code: `${mc.id}/\n├── ${f.file}\n└── test.mjs` },
        { title: `Write ${f.file}`, file: f.file, code: f.starter, note: 'Start from this skeleton and follow the rules above. Open the hint only if you are stuck.' },
        { title: 'Paste the tests into test.mjs', file: 'test.mjs', code: f.tests, fold: true },
        { title: 'Run the tests', run: 'node test.mjs', expect: f.expect },
      ],
      hint: mc.pseudo,
      solution: f.solution,
      notes: mc.notes,
    },
  }
}
