import { useEffect, useMemo, useRef, useState } from 'react'
import { DSA_PROBLEMS, problemById } from '../data/practice/dsa'
import type { Difficulty, Problem } from '../data/practice/types'
import { fmt, fmtArgs, runCode, type RunResult } from '../lib/runner'
import { solveProblem, useProgress } from '../lib/store'
import { href } from '../lib/router'
import { sfx } from '../lib/sound'
import { t } from '../lib/i18n'

const XP: Record<Difficulty, number> = { easy: 30, medium: 50, hard: 80 }
const draftKey = (id: string) => `interview-prep:code:${id}`

function loadDraft(p: Problem): string {
  try { return localStorage.getItem(draftKey(p.id)) ?? p.starter } catch { return p.starter }
}

export function CodeIndex() {
  const prog = useProgress()
  const done = DSA_PROBLEMS.filter((p) => prog.solved[p.id]).length
  return (
    <div className="page">
      <h1>{t('code.title')}</h1>
      <p className="muted">{t('code.intro')}</p>
      <div className="card">
        <div className="pbar"><div className="pbar-fill" style={{ width: `${(done / DSA_PROBLEMS.length) * 100}%` }} /></div>
        <p className="small muted" style={{ marginTop: 8 }}>{t('code.solvedCount', { done, total: DSA_PROBLEMS.length })}</p>
      </div>
      {DSA_PROBLEMS.map((p) => (
        <a key={p.id} className="code-row" href={href('code', p.id)}>
          <span className={'code-dot ' + p.diff} />
          <span className="code-row-main"><b>{p.title}</b><span className="muted small"> · {t(`code.${p.diff}`)}</span></span>
          {prog.solved[p.id] ? <span className="chip">✓ {t('code.solved')}</span> : <span className="btn btn-outline btn-sm">{t('code.openProblem')}</span>}
        </a>
      ))}
    </div>
  )
}

export function CodeProblem({ id }: { id: string }) {
  const problem = problemById(id)
  if (!problem) return <div className="empty">{t('code.notFound')}</div>
  return <Editor key={id} problem={problem} />
}

function Editor({ problem }: { problem: Problem }) {
  const prog = useProgress()
  const [code, setCode] = useState(() => loadDraft(problem))
  const [res, setRes] = useState<RunResult | null>(null)
  const [running, setRunning] = useState(false)
  const [hints, setHints] = useState(0)
  const [showSol, setShowSol] = useState(false)
  const [runs, setRuns] = useState(0)
  const [reward, setReward] = useState<{ xp: number; half: boolean; repeat: boolean } | null>(null)
  const taRef = useRef<HTMLTextAreaElement>(null)
  const tests = useMemo(() => problem.tests(), [problem])
  const mac = /Mac|iPhone|iPad/.test(navigator.platform)

  useEffect(() => {
    const h = window.setTimeout(() => { try { localStorage.setItem(draftKey(problem.id), code) } catch { /* ignore */ } }, 400)
    return () => window.clearTimeout(h)
  }, [code, problem.id])

  const idx = DSA_PROBLEMS.findIndex((p) => p.id === problem.id)
  const nextProblem = DSA_PROBLEMS[idx + 1]

  const run = async () => {
    if (running) return
    setRunning(true)
    setReward(null)
    sfx.tap()
    const r = await runCode(problem, code, tests)
    setRes(r)
    setRuns((n) => n + 1)
    setRunning(false)
    if (r.kind === 'ok' && r.passed === r.total) {
      const base = XP[problem.diff]
      const half = showSol
      const xp = half ? Math.round(base / 2) : base
      const first = solveProblem(problem.id, xp)
      setReward({ xp: first ? xp : 0, half, repeat: !first })
      sfx.correct()
    } else sfx.wrong()
  }

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); void run(); return }
    if (e.key === 'Tab') {
      e.preventDefault()
      ta.setRangeText('  ', ta.selectionStart, ta.selectionEnd, 'end')
      setCode(ta.value)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const before = ta.value.slice(0, ta.selectionStart)
      const line = before.slice(before.lastIndexOf('\n') + 1)
      const indent = /^\s*/.exec(line)?.[0] ?? ''
      const extra = /[{[(]\s*$/.test(line) ? '  ' : ''
      ta.setRangeText('\n' + indent + extra, ta.selectionStart, ta.selectionEnd, 'end')
      setCode(ta.value)
    }
  }

  const reset = () => {
    if (!window.confirm(t('code.resetConfirm'))) return
    setCode(problem.starter)
    setRes(null)
    setReward(null)
  }

  const firstBad = res ? res.cases.findIndex((c) => c.status !== 'pass' && c.status !== 'skipped') : -1
  const solved = !!prog.solved[problem.id]

  return (
    <div className="cp">
      <header className="cp-top">
        <a className="btn btn-outline btn-sm" href={href('code')}>← {t('code.backToList')}</a>
        <span className="cp-title">{problem.title}</span>
        <span className={'chip diff ' + problem.diff}>{t(`code.${problem.diff}`)}</span>
        {solved && <span className="chip">✓ {t('code.solved')}</span>}
      </header>
      <div className="cp-body">
        <section className="cp-left">
          <div className="rich" dangerouslySetInnerHTML={{ __html: problem.prompt }} />
          <h4>{t('code.examples')}</h4>
          {problem.examples.map((ex, i) => (
            <div key={i} className="cp-ex">
              <div><span className="muted">{t('code.input')}:</span> <code>{ex.input}</code></div>
              <div><span className="muted">{t('code.output')}:</span> <code>{ex.output}</code></div>
              {ex.note && <div className="muted small">{ex.note}</div>}
            </div>
          ))}
          <a className="small" href={href('read', 'dsa', problem.lesson)}>📖 {t('code.readLesson')}</a>

          <h4>{t('code.hints')}</h4>
          {hints === 0 && <p className="muted small">{t('code.noHints')}</p>}
          {problem.hints.slice(0, hints).map((h, i) => <div key={i} className="cp-hint"><b>{i + 1}.</b> {h}</div>)}
          {hints < problem.hints.length && (
            <button className="btn btn-outline btn-sm" onClick={() => { sfx.tap(); setHints(hints + 1) }}>💡 {t('code.hintLocked', { n: hints + 1 })}</button>
          )}

          <h4>{t('code.solution')}</h4>
          {!showSol ? (
            <>
              <button className="btn btn-outline btn-sm" disabled={runs === 0} onClick={() => { sfx.tap(); setShowSol(true) }}>{t('code.showSolution')}</button>
              <p className="muted small" style={{ marginTop: 6 }}>{runs === 0 ? t('code.solutionGate') : t('code.solutionWarn')}</p>
            </>
          ) : (
            <div className="cp-solution">
              <pre className="code"><code>{problem.solution}</code></pre>
              <p className="rich">{problem.explain}</p>
              <p className="small"><b>{t('code.time')}:</b> <code>{problem.time}</code> · <b>{t('code.space')}:</b> <code>{problem.space}</code></p>
              <button className="btn btn-outline btn-sm" onClick={() => setShowSol(false)}>{t('code.hideSolution')}</button>
            </div>
          )}
        </section>

        <section className="cp-right">
          <textarea
            ref={taRef}
            className="cp-editor"
            value={code}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-label={problem.title}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={onKey}
          />
          <div className="cp-bar">
            <button className="btn btn-green" onClick={() => void run()} disabled={running}>{running ? t('code.running') : '▶ ' + t('code.run')}</button>
            <button className="btn btn-outline" onClick={reset}>{t('code.reset')}</button>
            <span className="muted small cp-short">{t('code.shortcut', { key: mac ? '⌘' : 'Ctrl' })}</span>
          </div>

          <h4>{t('code.results')}</h4>
          {!res && <p className="muted">{t('code.notRun')}</p>}
          {res?.kind === 'compile' && <div className="cp-err"><b>{t('code.compileError')}</b><pre>{res.error}</pre></div>}
          {res?.kind === 'nofn' && <div className="cp-err"><b>{t('code.noFn', { fn: problem.fn })}</b></div>}
          {res?.kind === 'ok' && (
            <>
              <div className={'cp-summary ' + (res.passed === res.total ? 'ok' : 'bad')}>
                {res.passed === res.total ? '🎉 ' + t('code.allPass') : t('code.passedOf', { passed: res.passed, total: res.total })}
                {reward && reward.xp > 0 && <b> · {t('code.xpEarned', { xp: reward.xp })}</b>}
              </div>
              {reward?.half && reward.xp > 0 && <p className="muted small">{t('code.xpHalf')}</p>}
              {reward?.repeat && <p className="muted small">{t('code.alreadySolved')}</p>}
              {reward && nextProblem && <a className="btn btn-green btn-sm" href={href('code', nextProblem.id)}>{t('code.next')} →</a>}
              {res.cases.map((c, i) => (
                <details key={i} className={'cp-case ' + c.status} open={i === firstBad}>
                  <summary>
                    <span className="cp-mark">{c.status === 'pass' ? '✓' : c.status === 'skipped' ? '–' : '✗'}</span>
                    {t('code.caseN', { n: i + 1 })}{tests[i].label ? ` · ${tests[i].label}` : ''}
                    {c.status !== 'skipped' && <span className="muted small"> · {c.ms < 1 ? '<1' : Math.round(c.ms)} ms</span>}
                  </summary>
                  <div className="cp-case-body">
                    <div><span className="muted">{t('code.args')}:</span> <code>{fmtArgs(tests[i].args)}</code></div>
                    <div><span className="muted">{t('code.expected')}:</span> <code>{fmt(tests[i].expected)}</code></div>
                    {c.status === 'fail' && <div><span className="muted">{t('code.got')}:</span> <code>{fmt(c.got)}</code></div>}
                    {c.status === 'error' && <div className="cp-errline"><b>{t('code.error')}:</b> {c.error}</div>}
                    {c.status === 'timeout' && <div className="cp-errline">{t('code.timeout')}</div>}
                    {c.logs.length > 0 && <div><span className="muted">{t('code.logs')}:</span><pre className="cp-logs">{c.logs.join('\n')}</pre></div>}
                  </div>
                </details>
              ))}
            </>
          )}
        </section>
      </div>
    </div>
  )
}
