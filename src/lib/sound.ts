import { getPrefs } from './prefs'

/** Tiny synthesized sound effects (Web Audio) — no audio files needed. */
type Note = { f: number; t: number; d: number; type?: OscillatorType; g?: number; to?: number }

let ctx: AudioContext | null = null
function ac(): AudioContext | null {
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx ??= new Ctor()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch { return null }
}

function play(notes: Note[]) {
  if (!getPrefs().sound) return
  const c = ac()
  if (!c) return
  const t0 = c.currentTime
  for (const n of notes) {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = n.type ?? 'triangle'
    o.frequency.setValueAtTime(n.f, t0 + n.t)
    if (n.to) o.frequency.exponentialRampToValueAtTime(n.to, t0 + n.t + n.d)
    const peak = n.g ?? 0.18
    g.gain.setValueAtTime(0.0001, t0 + n.t)
    g.gain.exponentialRampToValueAtTime(peak, t0 + n.t + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + n.t + n.d)
    o.connect(g).connect(c.destination)
    o.start(t0 + n.t)
    o.stop(t0 + n.t + n.d + 0.05)
  }
}

const N = { C5: 523.25, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.5, G4: 392, E4: 329.63, C4: 261.63 }

export const sfx = {
  tap: () => play([{ f: 620, t: 0, d: 0.06, type: 'sine', g: 0.08 }]),
  select: () => play([{ f: 480, t: 0, d: 0.07, type: 'sine', g: 0.09 }]),
  /** `combo` = answers in a row; pitch climbs a semitone per step (max +7). */
  correct: (combo = 0) => {
    const k = Math.pow(2, Math.min(7, Math.max(0, combo - 1)) / 12)
    play([{ f: N.E5 * k, t: 0, d: 0.14 }, { f: N.A5 * k, t: 0.09, d: 0.26 }, { f: N.E6 * k, t: 0.09, d: 0.26, g: 0.06 }])
  },
  wrong: () => play([{ f: 220, t: 0, d: 0.28, type: 'sawtooth', g: 0.1, to: 130 }, { f: 165, t: 0.12, d: 0.3, type: 'square', g: 0.05, to: 110 }]),
  match: () => play([{ f: N.G5, t: 0, d: 0.12, type: 'sine', g: 0.12 }]),
  complete: () => play([
    { f: N.C5, t: 0, d: 0.18 }, { f: N.E5, t: 0.14, d: 0.18 }, { f: N.G5, t: 0.28, d: 0.18 },
    { f: N.C6, t: 0.42, d: 0.5, g: 0.2 }, { f: N.E6, t: 0.42, d: 0.5, g: 0.08 }, { f: N.G5, t: 0.42, d: 0.5, g: 0.08 },
  ]),
  levelUp: () => play([{ f: N.C5, t: 0, d: 0.12 }, { f: N.G5, t: 0.1, d: 0.12 }, { f: N.C6, t: 0.2, d: 0.12 }, { f: N.E6, t: 0.3, d: 0.4 }]),
  streak: () => play([
    { f: 330, t: 0, d: 0.5, type: 'sawtooth', g: 0.05, to: 660 },
    { f: N.C5, t: 0.25, d: 0.15 }, { f: N.E5, t: 0.4, d: 0.15 }, { f: N.G5, t: 0.55, d: 0.15 }, { f: N.C6, t: 0.7, d: 0.6, g: 0.2 },
    { f: N.E6, t: 0.7, d: 0.6, g: 0.07 }, { f: 2093, t: 0.95, d: 0.3, type: 'sine', g: 0.05 },
  ]),
  goal: () => play([{ f: N.G5, t: 0, d: 0.12 }, { f: N.C6, t: 0.12, d: 0.12 }, { f: N.E6, t: 0.24, d: 0.12 }, { f: 1567.98, t: 0.36, d: 0.5, g: 0.2 }]),
  lock: () => play([{ f: N.G4, t: 0, d: 0.1, type: 'square', g: 0.06 }, { f: N.C4, t: 0.09, d: 0.16, type: 'square', g: 0.06 }]),
}
