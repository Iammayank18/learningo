import { useState } from 'react'
import { Owl } from './Owl'

export type Mood = 'idle' | 'happy' | 'sad' | 'cheer' | 'sleep'

/** Our owl mascot. Mood changes the animation (hop / droop / dance). */
export function Mascot({ mood = 'idle', size = 96, say }: { mood?: Mood; size?: number; say?: string }) {
  return (
    <div className={'mascot ' + mood}>
      {say && <div className="mascot-say">{say}</div>}
      <Owl mood={mood === 'idle' ? 'idle' : mood} size={size} />
    </div>
  )
}

const COLORS = ['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff', '#ff9600']

/** Lightweight CSS confetti burst. */
export function Confetti({ count = 60 }: { count?: number }) {
  const [bits] = useState(() => Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    dur: 1.8 + Math.random() * 1.6,
    drift: (Math.random() - 0.5) * 220,
    rot: Math.random() * 720 - 360,
    color: COLORS[i % COLORS.length],
    w: 6 + Math.random() * 6,
    h: 8 + Math.random() * 8,
  })))
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <i key={i} style={{
          left: `${b.left}%`, width: b.w, height: b.h, background: b.color,
          animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s`,
          ['--dx' as string]: `${b.drift}px`, ['--rot' as string]: `${b.rot}deg`,
        }} />
      ))}
    </div>
  )
}
