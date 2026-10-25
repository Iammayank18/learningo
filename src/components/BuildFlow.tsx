import { useEffect, useMemo, useState } from 'react'
import type { Course, Lesson } from '../types'
import type { BuildLesson } from '../data/build'
import { sectionKinds } from '../lib/sections'
import { LessonSection } from './LessonSection'
import { TopBar } from './TopBar'
import { Celebration, type CelebrationData } from './Celebration'
import { completeLesson } from '../lib/store'
import { snap, stepsBetween } from '../lib/celebrate'
import { go, href } from '../lib/router'
import { sfx } from '../lib/sound'
import { t } from '../lib/i18n'

const H = ({ html }: { html: string }) => <span dangerouslySetInnerHTML={{ __html: html }} />
const P = ({ html }: { html: string }) => <p dangerouslySetInnerHTML={{ __html: html }} />

type Phase = 'understand' | 'quiz' | 'build'

/** Build lesson: Understand → Quick check (only if it has questions) → Build on your machine. */
export function BuildFlow({ course, lesson, bl, nextId }: { course: Course; lesson: Lesson; bl: BuildLesson; nextId?: string }) {
  const phases = useMemo<Phase[]>(() => ['understand', ...(bl.quiz.length ? ['quiz' as const] : []), ...(bl.build ? ['build' as const] : [])], [bl])
  const [phase, setPhase] = useState<Phase>('understand')
  const [qi, setQi] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [right, setRight] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [ticks, setTicks] = useState<boolean[]>(() => (bl.build?.steps ?? []).map(() => false))
  const [startedAt] = useState(() => Date.now())
  const [result, setResult] = useState<CelebrationData | null>(null)
  const exit = () => go()

  const pi = phases.indexOf(phase)
  const progress = (pi + (phase === 'quiz' ? qi / bl.quiz.length : 0)) / phases.length
  const nextPhase = phases[pi + 1]

  if (result) {
    return (
      <div className="done-screen">
        <Celebration data={result} actions={<>
          <a className="btn btn-outline" href={href('read', course.id, lesson.id)}>{t('lesson.viewNotes')}</a>
          {nextId && <a className="btn btn-outline" href={href('lesson', course.id, nextId)}>{t('lesson.nextLesson')}</a>}
          <button className="btn btn-green" onClick={exit}>{t('lesson.continue')}</button>
        </>} />
      </div>
    )
  }

  const finish = () => {
    const built = ticks.length > 0 && ticks.every(Boolean)
    const perfect = wrong === 0 && (built || !bl.build)
    const xp = 15 + right * 10 + (built ? 25 : 0)
    const prev = snap()
    completeLesson(course.id, lesson.id, xp, perfect)
    const nx = snap()
    setResult({
      title: t('lesson.completeTitle'), subtitle: lesson.name, xp, perfect, prev, next: nx, steps: stepsBetween(prev, nx),
      accuracy: Math.round((right / Math.max(1, right + wrong)) * 100), seconds: (Date.now() - startedAt) / 1000,
    })
  }

  const footer = (back: (() => void) | null, label: string, onNext: () => void, disabled = false) => (
    <footer className="qfooter idle">
      <div className="qfooter-in">
        {back ? <button className="btn btn-outline" onClick={() => { sfx.back(); back() }}>{t('lesson.back')}</button> : <span />}
        <button className="btn btn-green" disabled={disabled} onClick={() => { sfx.tap(); onNext() }} autoFocus>{label}</button>
      </div>
    </footer>
  )
  const advance = () => { if (nextPhase) setPhase(nextPhase); else finish() }
  const labelFor = (p: Phase | undefined) => (p === 'quiz' ? t('build.toQuiz') : p === 'build' ? t('build.toBuild') : t('build.finish'))

  let body: React.ReactNode
  let foot: React.ReactNode

  if (phase === 'understand') {
    body = <UnderstandView lesson={lesson} bl={bl} />
    foot = footer(null, labelFor(nextPhase), advance)
  } else if (phase === 'quiz') {
    const q = bl.quiz[qi]
    const done = picked !== null
    const ok = done && picked === q.ans
    body = (
      <>
        <div className="mc-tag">{t('build.p.quiz')} · {qi + 1}/{bl.quiz.length}</div>
        <div className="mc-q"><H html={q.q} /></div>
        {q.opts.map((o, i) => (
          <button key={i} disabled={done} className={'mc-opt' + (done && i === q.ans ? ' ok' : done && i === picked ? ' bad' : '')}
            onClick={() => { setPicked(i); if (i === q.ans) { setRight((n) => n + 1); sfx.correct() } else { setWrong((n) => n + 1); sfx.wrong() } }}>
            <span className="mc-n">{'ABCD'[i]}</span><span><H html={o} /></span>
          </button>
        ))}
        {done && (
          <div className={'mc-explain ' + (ok ? 'ok' : 'bad')}>
            <b>{ok ? t('mc.right') : t('mc.wrong')}</b>
            {q.why.map((w, i) => <P key={i} html={w} />)}
          </div>
        )}
      </>
    )
    const last = qi + 1 >= bl.quiz.length
    foot = footer(null, last ? labelFor(nextPhase) : t('common.continue'), () => {
      setPicked(null)
      if (!last) setQi(qi + 1); else advance()
    }, !done)
  } else {
    body = <BuildView bl={bl} ticks={ticks} setTicks={setTicks} />
    foot = footer(() => setPhase(phases[pi - 1] ?? 'understand'), t('build.finish'), finish)
  }

  return (
    <div className="runner">
      <TopBar progress={progress} onExit={exit} />
      <div className="qbody learn-card mc" key={phase + qi}>
        <div className="qtag">{lesson.name}</div>
        <div className="mc-steps">
          {phases.map((p, i) => <span key={p} className={'mc-step' + (i === pi ? ' on' : i < pi ? ' done' : '')}>{t(`build.p.${p}`)}</span>)}
        </div>
        {body}
      </div>
      {foot}
    </div>
  )
}

function UnderstandView({ lesson, bl }: { lesson: Lesson; bl: BuildLesson }) {
  const u = bl.understand
  if (!u) {
    // the lesson's own notes are the explanation
    return (
      <>
        <div className="mc-tag">{t('build.p.understand')}</div>
        {lesson.desc && <p className="muted">{lesson.desc}</p>}
        {sectionKinds(lesson).map((k) => <LessonSection key={k} lesson={lesson} kind={k} />)}
      </>
    )
  }
  return (
    <>
      <div className="mc-tag">{t('build.p.understand')}</div>
      {u.title && <h2 className="mc-h"><code>{u.title}</code></h2>}
      <div className="bf-box">
        <h3 className="mc-h3">{t('build.what')}</h3>
        {u.what.map((w, i) => <P key={i} html={w} />)}
        {u.diagram && <pre className="mc-pre sm"><code>{u.diagram}</code></pre>}
      </div>
      {u.where.length > 0 && (
        <div className="bf-box">
          <h3 className="mc-h3">{t('build.where')}</h3>
          <div className="mc-use">{u.where.map(([a, b], i) => <div key={i}><b>{a}</b> <H html={b} /></div>)}</div>
        </div>
      )}
      {u.result && (
        <div className="bf-box">
          <h3 className="mc-h3">{t('build.result')}</h3>
          <pre className="mc-pre sm"><code>{u.result}</code></pre>
        </div>
      )}
      {u.contract && u.contract.length > 0 && (
        <div className="bf-box bf-contract">
          <h3 className="mc-h3">{t('build.contract')}</h3>
          <ul>{u.contract.map((r, i) => <li key={i}><H html={r} /></li>)}</ul>
        </div>
      )}
      {u.rules.length > 0 && (
        <div className="bf-box">
          <h3 className="mc-h3">{t('build.rules')}</h3>
          <ul>{u.rules.map((r, i) => <li key={i}><H html={r} /></li>)}</ul>
        </div>
      )}
    </>
  )
}

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
  return (
    <div className="bf-timer">
      <span className="muted small">⏱ {t('build.target', { n: minutes })}</span>
      <b className={over ? 'over' : ''}>{clock}</b>
      {running
        ? <button className="btn btn-outline btn-sm" onClick={() => setRunning(false)}>{t('mc.pause')}</button>
        : <button className="btn btn-blue btn-sm" onClick={() => { sfx.tap(); setRunning(true) }}>{left === total ? t('mc.startTimer') : t('mc.resume')}</button>}
    </div>
  )
}

function BuildView({ bl, ticks, setTicks }: { bl: BuildLesson; ticks: boolean[]; setTicks: (v: boolean[]) => void }) {
  const b = bl.build!
  const toggle = (i: number) => setTicks(ticks.map((v, j) => (j === i ? !v : v)))
  return (
    <>
      <div className="mc-tag">{t('build.p.build')}</div>
      <h2 className="mc-h">{t('build.title')}</h2>
      <p className="muted small">{t('build.rule')}</p>
      <Timer minutes={b.minutes} />
      {b.steps.map((s, i) => (
        <div key={i} className={'bf-step' + (ticks[i] ? ' done' : '')}>
          <div className="bf-sh"><span className="bf-n">{ticks[i] ? '✓' : i + 1}</span><span>{s.title}</span></div>
          {s.note && <p className="muted small">{s.note}</p>}
          {s.run && (
            <>
              <div className="dsa-row"><b className="bf-lbl">{t('build.run')}</b><Copy text={s.run} /></div>
              <pre className="mc-pre sm"><code>{s.run.split('\n').map((l) => '$ ' + l).join('\n')}</code></pre>
            </>
          )}
          {s.code && (
            <>
              {s.file ? <div className="dsa-row"><b className="bf-lbl">{s.file}</b><Copy text={s.code} /></div> : null}
              {s.fold
                ? <div className="mc-peek"><details><summary>{/(^|[/.])test\.[mc]?[jt]sx?$|\.test\./.test(s.file ?? '') ? t('dsa.showTests') : t('build.showCode')}</summary><pre className="mc-pre"><code>{s.code}</code></pre></details></div>
                : <pre className="mc-pre"><code>{s.code}</code></pre>}
            </>
          )}
          {s.expect && (
            <>
              <b className="bf-lbl">{t('build.expect')}</b>
              <pre className="mc-pre sm"><code>{s.expect}</code></pre>
            </>
          )}
          <label className="bf-tick">
            <input type="checkbox" checked={ticks[i]} onChange={() => toggle(i)} />
            <span>{s.expect ? t('build.seeIt') : t('build.done')}</span>
          </label>
        </div>
      ))}
      <p className="muted small">{t('build.ticked', { a: ticks.filter(Boolean).length, b: ticks.length })}</p>
      {b.hint && <div className="mc-peek"><details><summary>{t('build.hint')}</summary><pre className="mc-pre"><code>{b.hint}</code></pre></details></div>}
      {(b.solution || b.notes?.length) && (
        <div className="mc-peek"><details><summary>{t('build.solution')}</summary>
          {b.solution && <pre className="mc-pre"><code>{b.solution}</code></pre>}
          {b.notes?.length ? <><h3 className="mc-h3">{t('build.notes')}</h3><ul>{b.notes.map((n, i) => <li key={i}><H html={n} /></li>)}</ul></> : null}
        </details></div>
      )}
    </>
  )
}

/** Read page: everything of a build lesson on one scrollable page. */
export function BuildRead({ lesson, bl }: { lesson: Lesson; bl: BuildLesson }) {
  return (
    <>
      <UnderstandView lesson={lesson} bl={bl} />
      {bl.build && (
        <section className="lsec">
          <h3 className="lsec-title"><span>🛠️</span> {t('build.title')}</h3>
          {bl.build.steps.map((s, i) => (
            <div key={i} className="bf-step">
              <div className="bf-sh"><span className="bf-n">{i + 1}</span><span>{s.title}</span></div>
              {s.run && <pre className="mc-pre sm"><code>{s.run.split('\n').map((l) => '$ ' + l).join('\n')}</code></pre>}
              {s.file && <b className="bf-lbl">{s.file}</b>}
              {s.code && (s.fold
                ? <div className="mc-peek"><details><summary>{/(^|[/.])test\.[mc]?[jt]sx?$|\.test\./.test(s.file ?? '') ? t('dsa.showTests') : t('build.showCode')}</summary><pre className="mc-pre"><code>{s.code}</code></pre></details></div>
                : <pre className="mc-pre"><code>{s.code}</code></pre>)}
              {s.expect && <><b className="bf-lbl">{t('build.expect')}</b><pre className="mc-pre sm"><code>{s.expect}</code></pre></>}
            </div>
          ))}
          {bl.build.solution && <div className="mc-peek"><details><summary>{t('build.solution')}</summary><pre className="mc-pre"><code>{bl.build.solution}</code></pre></details></div>}
        </section>
      )}
    </>
  )
}
