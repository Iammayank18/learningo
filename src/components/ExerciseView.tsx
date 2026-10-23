import { useEffect, useMemo, useState } from 'react'
import type { Exercise } from '../lib/quiz'

interface Props { ex: Exercise; onNext: (correct: boolean) => void }

const shuffled = <T,>(a: T[]) => {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] }
  return b
}

export function ExerciseView({ ex, onNext }: Props) {
  if (ex.kind === 'mcq') return <Mcq ex={ex} onNext={onNext} />
  if (ex.kind === 'match') return <Match ex={ex} onNext={onNext} />
  return <Recall ex={ex} onNext={onNext} />
}

function Footer({ state, explain, onPrimary, primary, disabled, children }: {
  state: 'idle' | 'ok' | 'bad'; explain?: string; onPrimary: () => void; primary: string; disabled?: boolean; children?: React.ReactNode
}) {
  return (
    <footer className={'qfooter ' + state}>
      <div className="qfooter-in">
        <div className="qfeedback">
          {state === 'ok' && <strong>🎉 Sahi jawab!</strong>}
          {state === 'bad' && <strong>Galat — sahi jawab:</strong>}
          {state !== 'idle' && explain && <div className="qexplain">{explain}</div>}
          {children}
        </div>
        <button className={'btn ' + (state === 'bad' ? 'btn-red' : 'btn-green')} disabled={disabled} onClick={onPrimary}>{primary}</button>
      </div>
    </footer>
  )
}

function Mcq({ ex, onNext }: { ex: Extract<Exercise, { kind: 'mcq' }>; onNext: Props['onNext'] }) {
  const [sel, setSel] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const correct = sel === ex.answer

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (!checked && /^[1-9]$/.test(e.key) && +e.key <= ex.options.length) setSel(+e.key - 1)
      if (e.key === 'Enter') {
        e.preventDefault()
        if (checked) onNext(correct)
        else if (sel !== null) setChecked(true)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [checked, sel, correct, ex.options.length, onNext])

  return (
    <>
      <div className="qbody">
        <div className="qtag">{ex.tag}</div>
        <h2 className="qprompt">{ex.prompt}</h2>
        {ex.sub && <blockquote className="qsub">{ex.sub}</blockquote>}
        <div className="opts">
          {ex.options.map((o, i) => {
            let cls = 'opt'
            if (sel === i) cls += ' sel'
            if (checked && i === ex.answer) cls += ' right'
            if (checked && sel === i && i !== ex.answer) cls += ' wrong'
            return (
              <button key={i} className={cls} disabled={checked} onClick={() => setSel(i)}>
                <kbd>{i + 1}</kbd><span>{o}</span>
              </button>
            )
          })}
        </div>
      </div>
      {checked ? (
        <Footer state={correct ? 'ok' : 'bad'} explain={correct ? undefined : ex.explain} primary="Continue" onPrimary={() => onNext(correct)} />
      ) : (
        <Footer state="idle" primary="Check" disabled={sel === null} onPrimary={() => setChecked(true)} />
      )}
    </>
  )
}

function Match({ ex, onNext }: { ex: Extract<Exercise, { kind: 'match' }>; onNext: Props['onNext'] }) {
  const lefts = useMemo(() => ex.pairs.map((p, i) => ({ t: p[0], i })), [ex])
  const rights = useMemo(() => shuffled(ex.pairs.map((p, i) => ({ t: p[1], i }))), [ex])
  const [left, setLeft] = useState<number | null>(null)
  const [done, setDone] = useState<Set<number>>(new Set())
  const [flash, setFlash] = useState<number | null>(null)
  const [mistakes, setMistakes] = useState(0)
  const finished = done.size === ex.pairs.length

  const pickRight = (i: number) => {
    if (left === null || done.has(i)) return
    if (left === i) {
      setDone(new Set(done).add(i)); setLeft(null)
    } else {
      setMistakes(mistakes + 1); setFlash(i)
      setTimeout(() => setFlash(null), 450)
    }
  }
  return (
    <>
      <div className="qbody">
        <div className="qtag">{ex.tag}</div>
        <h2 className="qprompt">{ex.prompt}</h2>
        <div className="match">
          <div className="match-col">
            {lefts.map((l) => (
              <button key={l.i} disabled={done.has(l.i)} className={'opt' + (left === l.i ? ' sel' : '') + (done.has(l.i) ? ' right' : '')} onClick={() => setLeft(l.i)}>{l.t}</button>
            ))}
          </div>
          <div className="match-col">
            {rights.map((r) => (
              <button key={r.i} disabled={done.has(r.i)} className={'opt' + (done.has(r.i) ? ' right' : '') + (flash === r.i ? ' wrong' : '')} onClick={() => pickRight(r.i)}>{r.t}</button>
            ))}
          </div>
        </div>
      </div>
      {finished ? (
        <Footer state={mistakes === 0 ? 'ok' : 'bad'} explain={mistakes ? 'Kuch pairs galat try hue — ek baar upar dekh lo.' : undefined} primary="Continue" onPrimary={() => onNext(mistakes === 0)} />
      ) : (
        <Footer state="idle" primary="Pehle sab jodo" disabled onPrimary={() => {}} />
      )}
    </>
  )
}

function Recall({ ex, onNext }: { ex: Extract<Exercise, { kind: 'recall' }>; onNext: Props['onNext'] }) {
  const [shown, setShown] = useState(false)
  return (
    <>
      <div className="qbody">
        <div className="qtag">{ex.tag} · bolke bolo, phir check karo</div>
        <h2 className="qprompt">{ex.prompt}</h2>
        {ex.sub && <p className="muted">Follow-up: {ex.sub}</p>}
        {shown ? (
          <div className="recall-answer"><div className="qtag">Reference answer</div><p>{ex.answer}</p></div>
        ) : (
          <p className="muted">Pehle apne words mein jawab socho (ya zor se bolo!). Fir answer dekho aur khud ko honestly grade karo.</p>
        )}
      </div>
      <footer className="qfooter idle">
        <div className="qfooter-in">
          {shown ? (
            <div className="recall-btns">
              <button className="btn btn-red" onClick={() => onNext(false)}>Dobara padhna padega</button>
              <button className="btn btn-green" onClick={() => onNext(true)}>Yaad tha ✓</button>
            </div>
          ) : (
            <button className="btn btn-blue" onClick={() => setShown(true)}>Answer dikhao</button>
          )}
        </div>
      </footer>
    </>
  )
}
