import { useEffect, useMemo, useState } from 'react'
import type { Problem } from '../data/practice/types'
import type { DsaProblemExtra } from '../data/dsa'
import { DSA_PROBLEMS } from '../data/practice/dsa'
import { CATALOG } from '../data/practice/catalog'
import { fmt, fmtArgs } from '../lib/runner'
import { buildTestScript, isBigCase } from '../lib/testScript'
import { solveProblem, useProgress } from '../lib/store'
import { href } from '../lib/router'
import { sfx } from '../lib/sound'
import { t } from '../lib/i18n'
import type { Difficulty } from '../data/practice/types'

const XP: Record<Difficulty, number> = { easy: 30, medium: 50, hard: 80 }
const H = ({ html }: { html: string }) => <span dangerouslySetInnerHTML={{ __html: html }} />
const P = ({ html }: { html: string }) => <p dangerouslySetInnerHTML={{ __html: html }} />
const pretty = (id: string) => id.replace(/-/g, ' ')

type Step = 'pattern' | 'dry' | 'problem' | 'challenge' | 'review'

function Copy({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button className="btn btn-outline btn-sm" onClick={() => { try { void navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500) } catch { /* clipboard blocked */ } }}>
      {ok ? t('dsa.copied') : t('dsa.copy')}
    </button>
  )
}

function Timer({ minutes }: { minutes: number }) {
  const total = minutes * 60
  const [left, setLeft] = useState(total)
  const [running, setRunning] = useState(false)
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setLeft((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [running])
  const over = left < 0
  const abs = Math.abs(left)
  const clock = `${over ? '+' : ''}${Math.floor(abs / 60)}:${String(abs % 60).padStart(2, '0')}`
  const pct = Math.max(0, Math.min(100, (left / total) * 100))
  const warn = !over && left <= 60
  return (
    <div className="mc-timer">
      <div className={'mc-clock' + (over ? ' over' : warn ? ' warn' : '')} aria-live="off">{clock}</div>
      <div className="mc-tbar"><i className={over ? 'over' : warn ? 'warn' : ''} style={{ width: pct + '%' }} /></div>
      {over && <p className="muted small">{t('mc.overtime')}</p>}
      <div className="mc-build-actions">
        {!running
          ? <button className="btn btn-blue" onClick={() => { sfx.tap(); setRunning(true) }}>{left === total ? t('mc.startTimer') : t('mc.resume')}</button>
          : <button className="btn btn-outline" onClick={() => setRunning(false)}>{t('mc.pause')}</button>}
      </div>
    </div>
  )
}

function Trace({ d }: { d: DsaProblemExtra['dryRun'] }) {
  const [shown, setShown] = useState(1)
  const all = shown >= d.rows.length
  return (
    <>
      <div className="dsa-table-wrap">
        <table className="dsa-table">
          <thead><tr>{d.columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
          <tbody>
            {d.rows.slice(0, shown).map((r, i) => (
              <tr key={i} className={i === d.hit && all ? 'hit' : i === shown - 1 && !all ? 'now' : ''}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      {!all ? (
        <div className="mc-build-actions">
          <button className="btn btn-blue" onClick={() => { sfx.tap(); setShown(shown + 1) }}>{t('dsa.nextStep', { n: shown, m: d.rows.length })}</button>
          <button className="btn btn-outline" onClick={() => setShown(d.rows.length)}>{t('dsa.showAll')}</button>
        </div>
      ) : <div className="mc-explain ok"><b>{t('dsa.notice')}</b><P html={d.note} /></div>}
    </>
  )
}

function ReviewView({ problem, extra }: { problem: Problem; extra?: DsaProblemExtra }) {
  const r = extra?.review
  const idx = DSA_PROBLEMS.findIndex((p) => p.id === problem.id)
  const next = DSA_PROBLEMS[idx + 1]
  return (
    <>
      <h2 className="mc-h">{t('pb.reviewTitle')}</h2>
      {r && (
        <>
          <h3 className="mc-h3">{t('pb.approaches')}</h3>
          <div className="dsa-table-wrap">
            <table className="dsa-table pf-appr">
              <thead><tr><th>{t('pb.approach')}</th><th>{t('code.time')}</th><th>{t('code.space')}</th><th>{t('pb.idea')}</th></tr></thead>
              <tbody>
                {r.approaches.map((a, i) => (
                  <tr key={i} className={a.best ? 'hit' : ''}>
                    <td>{a.best ? '★ ' : ''}{a.name}</td><td>{a.time}</td><td>{a.space}</td><td className="pf-wrap">{a.idea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="mc-h3">{t('pb.why')}</h3>
          {r.why.map((w, i) => <P key={i} html={w} />)}
        </>
      )}
      <h3 className="mc-h3">{t('pb.solutionCode')}</h3>
      <pre className="code"><code>{problem.solution}</code></pre>
      <p className="rich">{problem.explain}</p>
      <p className="small"><b>{t('code.time')}:</b> <code>{problem.time}</code> · <b>{t('code.space')}:</b> <code>{problem.space}</code></p>
      {r && (
        <>
          <h3 className="mc-h3">{t('dsa.mistakes')}</h3>
          {r.mistakes.map((m, i) => <div key={i} className="mc-watch"><H html={m} /></div>)}
          <h3 className="mc-h3">{t('pb.variations')}</h3>
          <ul>{r.variations.map((v, i) => <li key={i}><H html={v} /></li>)}</ul>
        </>
      )}
      <div className="mc-build-actions">
        {next && <a className="btn btn-green" href={href('code', next.id)}>{t('code.next')} →</a>}
        <a className="btn btn-outline" href={href('code')}>{t('code.backToList')}</a>
      </div>
    </>
  )
}

function Challenge({ problem, extra, ticks, setTicks, hints, setHints, stuck, setStuck, goReview }: {
  problem: Problem; extra?: DsaProblemExtra; ticks: boolean[]; setTicks: (v: boolean[]) => void
  hints: number; setHints: (n: number) => void; stuck: boolean; setStuck: (v: boolean) => void; goReview: () => void
}) {
  const prog = useProgress()
  const tests = useMemo(() => problem.tests(), [problem])
  const script = useMemo(() => buildTestScript(problem, tests), [problem, tests])
  const solved = !!prog.solved[problem.id]
  const all = ticks.every(Boolean)
  const [reward, setReward] = useState<number | null>(null)
  const done = () => {
    const base = XP[problem.diff]
    const xp = stuck ? Math.round(base / 2) : base
    const first = solveProblem(problem.id, xp)
    sfx.correct()
    setReward(first ? xp : 0)
  }
  return (
    <>
      <div className="mc-tag">{t('pb.step.challenge')}</div>
      <h2 className="mc-h">{t('pb.localTitle')}</h2>
      <p className="muted small">{t('pb.localRule')}</p>
      {extra && <Timer minutes={extra.minutes} />}
      <div className="dsa-row"><b>{t('dsa.starter')}</b><Copy text={problem.starter} /></div>
      <pre className="mc-pre"><code>{problem.starter}</code></pre>
      <div className="mc-peek">
        <h3 className="mc-h3">{t('code.hints')}</h3>
        {hints === 0 && <p className="muted small">{t('code.noHints')}</p>}
        {problem.hints.slice(0, hints).map((h, i) => <div key={i} className="cp-hint"><b>{i + 1}.</b> {h}</div>)}
        {hints < problem.hints.length && <button className="btn btn-outline btn-sm" onClick={() => { sfx.tap(); setHints(hints + 1) }}>💡 {t('code.hintLocked', { n: hints + 1 })}</button>}
      </div>
      <h3 className="mc-h3">{t('dsa.selfCheck')}</h3>
      <p className="muted small">{t('pb.checkHint')}</p>
      <div className="dsa-row"><b>{t('pb.testScript')}</b><Copy text={script} /></div>
      {tests.map((c, i) => (
        <label key={i} className={'mc-chk' + (ticks[i] ? ' on' : '')}>
          <input type="checkbox" checked={ticks[i]} onChange={() => setTicks(ticks.map((v, j) => (j === i ? !v : v)))} />
          <span>
            <b>{t('code.caseN', { n: i + 1 })}{c.label ? ` · ${c.label}` : ''}</b>
            <pre className="mc-pre sm"><code>{fmtArgs(c.args)}{'\n→ '}{fmt(c.expected)}</code></pre>
            {isBigCase(c) && <span className="muted small">{t('pb.bigCase')}</span>}
          </span>
        </label>
      ))}
      {reward !== null || solved ? (
        <div className="mc-explain ok"><b>{t('pb.solvedMsg')}{reward ? ` · ${t('code.xpEarned', { xp: reward })}` : ''}</b></div>
      ) : null}
      <div className="mc-build-actions">
        <button className="btn btn-green" disabled={!all || solved} onClick={done}>{t('pb.markSolved')}</button>
        <button className="btn btn-outline" onClick={() => { setStuck(true); goReview() }}>{t('pb.stuck')}</button>
        {(all || solved) && <button className="btn btn-blue" onClick={goReview}>{t('pb.step.review')} →</button>}
      </div>
      {stuck && !solved && <p className="muted small">{t('pb.xpHalf')}</p>}
    </>
  )
}

export function ProblemFlow({ problem, extra }: { problem: Problem; extra?: DsaProblemExtra }) {
  const tierOfProblem = CATALOG.find((c) => c.key === problem.id)?.tier
  const steps = useMemo<Step[]>(() => (extra ? ['pattern', 'dry', 'problem', 'challenge', 'review'] : ['problem', 'challenge', 'review']), [extra])
  const [step, setStep] = useState<Step>(steps[0])
  const prog = useProgress()
  const nTests = useMemo(() => problem.tests().length, [problem])
  const [ticks, setTicks] = useState<boolean[]>(() => Array.from({ length: nTests }, () => false))
  const [hints, setHints] = useState(0)
  const [stuck, setStuck] = useState(false)
  const si = steps.indexOf(step)
  const p = extra?.pattern
  const solved = !!prog.solved[problem.id]
  const reviewOpen = stuck || solved || ticks.some(Boolean)
  const chips = (
    <div className="mc-steps pf-steps">
      {steps.map((s, i) => (
        <button key={s} disabled={s === 'review' && !reviewOpen && step !== 'review'} className={'mc-step' + (i === si ? ' on' : i < si ? ' done' : '')}
          onClick={() => { sfx.tap(); setStep(s) }}>{t(`pb.step.${s}`)}</button>
      ))}
    </div>
  )
  const nav = (back: Step | null, label: string, to: Step) => (
    <div className="pf-nav">
      {back ? <button className="btn btn-outline" onClick={() => { sfx.back(); setStep(back) }}>{t('lesson.back')}</button> : <span />}
      <button className="btn btn-green" onClick={() => { sfx.tap(); setStep(to) }}>{label}</button>
    </div>
  )
  return (
    <div className="page pf mc">
      <div className="pf-crumbs">
        <a href={href('code')}>← {t('code.backToList')}</a>
        <span className="pf-links">
          <a href={href('read', 'dsa', problem.lesson)}>📖 {t('code.readLesson')}</a>
          {problem.lc && <a href={`https://leetcode.com/problems/${problem.lc.slug}/`} target="_blank" rel="noopener noreferrer">LeetCode #{problem.lc.n} ↗</a>}
        </span>
      </div>
      <h1 className="pf-h1">
        {problem.title}
        <span className="pf-badges">
          <span className={'diff-pill ' + problem.diff}>{t(`code.${problem.diff}`)}</span>
          {tierOfProblem && <span className={'tier-badge ' + tierOfProblem}>{t(`tier.${tierOfProblem}`)}</span>}
          {solved && <span className="solved-badge">✓ {t('code.solved')}</span>}
        </span>
      </h1>
      {chips}
      {step === 'pattern' && p && (
        <>
          <div className="mc-tag">{t('pb.step.pattern')}</div>
          <h2 className="mc-h">{p.name}</h2>
          <div className="mc-explain ok pf-think"><b>{t('pb.thinkFirst')}</b><P html={p.question} /></div>
          {p.idea.map((x, i) => <P key={i} html={x} />)}
          <h3 className="mc-h3">{t('pb.spotWhen')}</h3>
          {p.spotWhen.map((x, i) => <div key={i} className="mc-watch"><H html={x} /></div>)}
          {p.prereqs.length > 0 && (
            <p className="muted small">{t('pb.prereqs')}: {p.prereqs.map((id, i) => <span key={id}>{i ? ', ' : ''}<a href={href('read', 'dsa', id)}>{pretty(id)}</a></span>)}</p>
          )}
          {nav(null, t('pb.toDry'), 'dry')}
        </>
      )}
      {step === 'dry' && extra && (
        <>
          <div className="mc-tag">{t('pb.step.dry')}</div>
          <h2 className="mc-h">{extra.dryRun.title}</h2>
          <p className="muted">{t('dsa.traceHint')}</p>
          <Trace d={extra.dryRun} />
          {nav('pattern', t('pb.toProblem'), 'problem')}
        </>
      )}
      {step === 'problem' && (
        <>
          <div className="mc-tag">{t('pb.step.problem')}</div>
          <div className="rich" dangerouslySetInnerHTML={{ __html: problem.prompt }} />
          <h3 className="mc-h3">{t('code.examples')}</h3>
          {problem.examples.map((ex, i) => (
            <div key={i} className="cp-ex">
              <div><span className="muted">{t('code.input')}:</span> <code>{ex.input}</code></div>
              <div><span className="muted">{t('code.output')}:</span> <code>{ex.output}</code></div>
              {ex.note && <div className="muted small">{ex.note}</div>}
            </div>
          ))}
          {extra && (
            <>
              <h3 className="mc-h3">{t('pb.constraints')}</h3>
              <ul>{extra.constraints.map((c, i) => <li key={i}><code>{c}</code></li>)}</ul>
              <p className="muted small">{t('pb.timeNote', { n: extra.minutes })}</p>
            </>
          )}
          {nav(extra ? 'dry' : null, t('pb.start'), 'challenge')}
        </>
      )}
      {step === 'challenge' && (
        <>
          <Challenge problem={problem} extra={extra} ticks={ticks} setTicks={setTicks} hints={hints} setHints={setHints} stuck={stuck} setStuck={setStuck} goReview={() => setStep('review')} />
          <div className="pf-nav"><button className="btn btn-outline" onClick={() => { sfx.back(); setStep('problem') }}>{t('lesson.back')}</button><span /></div>
        </>
      )}
      {step === 'review' && (
        <>
          <ReviewView problem={problem} extra={extra} />
          {nav('challenge', t('pb.backToChallenge'), 'challenge')}
        </>
      )}
    </div>
  )
}
