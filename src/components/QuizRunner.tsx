import { useState } from 'react'
import type { Exercise } from '../lib/quiz'
import { ExerciseView } from './ExerciseView'
import { TopBar } from './TopBar'

export interface QuizItem { ex: Exercise; group: string }
export interface QuizResult { correct: number; total: number; mistakes: number; ok: Record<string, boolean> }

interface Props { items: QuizItem[]; baseDone?: number; baseTotal?: number; onExit: () => void; onFinish: (r: QuizResult) => void }

/** Runs a queue of exercises Duolingo-style: wrong answers are re-queued once at the end. */
export function QuizRunner({ items, baseDone = 0, baseTotal = 0, onExit, onFinish }: Props) {
  const [queue, setQueue] = useState(items.map((it) => ({ ...it, retry: false })))
  const [i, setI] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [combo, setCombo] = useState(0)
  const [ok, setOk] = useState<Record<string, boolean>>(() => Object.fromEntries(items.map((it) => [it.group, true])))

  const total = baseTotal + queue.length
  const cur = queue[i]

  const next = (right: boolean) => {
    const nCorrect = correct + (right && !cur.retry ? 1 : 0)
    const nMistakes = mistakes + (right ? 0 : 1)
    const nOk = right ? ok : { ...ok, [cur.group]: false }
    let q = queue
    if (!right && !cur.retry) q = [...queue, { ...cur, retry: true }]
    setCombo(right ? combo + 1 : 0)
    setCorrect(nCorrect); setMistakes(nMistakes); setOk(nOk); setQueue(q)
    if (i + 1 >= q.length) onFinish({ correct: nCorrect, total: items.length, mistakes: nMistakes, ok: nOk })
    else setI(i + 1)
  }

  if (!cur) return null
  return (
    <div className="runner">
      <TopBar progress={(baseDone + i) / total} onExit={onExit} mistakes={mistakes} combo={combo} />
      <ExerciseView key={i} ex={cur.ex} combo={combo} onNext={next} />
    </div>
  )
}
