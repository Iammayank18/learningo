import { getPrefs } from './prefs'

/**
 * Cute synthesized sound effects (Web Audio) — original, no audio files.
 * Voices: "bell" (sine + soft partials, glassy chime), "pop" (bubbly pitch blip), "boop" (soft low sine).
 * Everything runs through a gentle compressor plus a short echo for a bit of sparkle.
 */
type Voice = 'bell' | 'pop' | 'boop'
type Note = { f: number; t: number; d: number; v?: Voice; g?: number; to?: number }

let ctx: AudioContext | null = null
let bus: GainNode | null = null

function ac(): AudioContext | null {
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    if (!ctx) {
      ctx = new Ctor()
      const comp = ctx.createDynamicsCompressor()
      comp.threshold.value = -16; comp.ratio.value = 4; comp.attack.value = 0.003; comp.release.value = 0.2
      const master = ctx.createGain(); master.gain.value = 0.9
      bus = ctx.createGain(); bus.gain.value = 1
      // little echo send → sparkle
      const send = ctx.createGain(); send.gain.value = 0.16
      const delay = ctx.createDelay(1); delay.delayTime.value = 0.11
      const fb = ctx.createGain(); fb.gain.value = 0.28
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3200
      bus.connect(comp)
      bus.connect(send).connect(delay).connect(lp).connect(fb).connect(delay)
      lp.connect(comp)
      comp.connect(master).connect(ctx.destination)
    }
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch { return null }
}

function osc(c: AudioContext, out: AudioNode, type: OscillatorType, f: number, at: number, d: number, peak: number, attack: number, to?: number) {
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(f, at)
  if (to) o.frequency.exponentialRampToValueAtTime(to, at + Math.min(d, 0.12))
  g.gain.setValueAtTime(0.0001, at)
  g.gain.exponentialRampToValueAtTime(peak, at + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, at + d)
  o.connect(g).connect(out)
  o.start(at)
  o.stop(at + d + 0.05)
}

function play(notes: Note[]) {
  if (!getPrefs().sound) return
  const c = ac()
  if (!c || !bus) return
  const t0 = c.currentTime + 0.01
  for (const n of notes) {
    const at = t0 + n.t
    const g = n.g ?? 0.2
    const v = n.v ?? 'bell'
    if (v === 'bell') {
      osc(c, bus, 'sine', n.f, at, n.d, g, 0.004)
      osc(c, bus, 'sine', n.f * 2, at, n.d * 0.55, g * 0.28, 0.003)
      osc(c, bus, 'sine', n.f * 3.01, at, n.d * 0.3, g * 0.1, 0.002)
    } else if (v === 'pop') {
      osc(c, bus, 'sine', n.f, at, n.d, g, 0.004, n.to ?? n.f * 1.6)
    } else {
      osc(c, bus, 'sine', n.f, at, n.d, g, 0.01, n.to)
      osc(c, bus, 'triangle', n.f / 2, at, n.d * 0.8, g * 0.35, 0.01, n.to ? n.to / 2 : undefined)
    }
  }
}

/** Soft rising "whoosh" made from filtered noise. */
function whoosh(dur = 0.45, g = 0.12) {
  if (!getPrefs().sound) return
  const c = ac()
  if (!c || !bus) return
  const t0 = c.currentTime + 0.01
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate)
  const data = buf.getChannelData(0)
  let seed = 7
  for (let i = 0; i < data.length; i++) { seed = (seed * 16807) % 2147483647; data[i] = (seed / 2147483647) * 2 - 1 }
  const src = c.createBufferSource(); src.buffer = buf
  const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 3
  bp.frequency.setValueAtTime(400, t0); bp.frequency.exponentialRampToValueAtTime(3000, t0 + dur)
  const gn = c.createGain()
  gn.gain.setValueAtTime(0.0001, t0); gn.gain.exponentialRampToValueAtTime(g, t0 + dur * 0.6); gn.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  src.connect(bp).connect(gn).connect(bus)
  src.start(t0); src.stop(t0 + dur + 0.02)
}

const N = { C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, D6: 1174.66, E6: 1318.51, G6: 1567.98, A6: 1760, C7: 2093 }
const sparkle = (t: number, g = 0.05): Note[] => [N.C7, N.A6, N.G6, N.E6].map((f, i) => ({ f: f * 1.5, t: t + i * 0.045, d: 0.22, g }))

export const sfx = {
  /** bubbly blip for buttons */
  tap: () => play([{ f: 620, t: 0, d: 0.08, v: 'pop', g: 0.13, to: 980 }]),
  select: () => play([{ f: 480, t: 0, d: 0.08, v: 'pop', g: 0.13, to: 760 }]),
  /** two-note chime; climbs a semitone per combo step (max +7) */
  correct: (combo = 0) => {
    const k = Math.pow(2, Math.min(7, Math.max(0, combo - 1)) / 12)
    play([
      { f: N.C6 * k, t: 0, d: 0.32, g: 0.2 },
      { f: N.E6 * k, t: 0.085, d: 0.5, g: 0.22 },
      ...(combo >= 3 ? sparkle(0.16, 0.035) : []),
    ])
  },
  /** soft "bwoop" — sad but not harsh */
  wrong: () => play([{ f: 330, t: 0, d: 0.2, v: 'boop', g: 0.2, to: 230 }, { f: 260, t: 0.13, d: 0.32, v: 'boop', g: 0.18, to: 170 }]),
  match: () => play([{ f: N.G5, t: 0, d: 0.18, g: 0.15 }, { f: N.D6, t: 0.05, d: 0.22, g: 0.1 }]),
  complete: () => play([
    { f: N.C5, t: 0, d: 0.3 }, { f: N.E5, t: 0.08, d: 0.3 }, { f: N.G5, t: 0.16, d: 0.3 }, { f: N.C6, t: 0.24, d: 0.35 },
    { f: N.E6, t: 0.36, d: 0.9, g: 0.22 }, { f: N.G5, t: 0.36, d: 0.9, g: 0.12 }, { f: N.C6, t: 0.36, d: 0.9, g: 0.12 },
    ...sparkle(0.5),
  ]),
  levelUp: () => {
    whoosh(0.4, 0.08)
    play([
      { f: N.C5, t: 0.1, d: 0.25 }, { f: N.D5, t: 0.17, d: 0.25 }, { f: N.E5, t: 0.24, d: 0.25 }, { f: N.G5, t: 0.31, d: 0.25 },
      { f: N.A5, t: 0.38, d: 0.25 }, { f: N.C6, t: 0.45, d: 1, g: 0.24 }, { f: N.E6, t: 0.45, d: 1, g: 0.12 }, { f: N.G6, t: 0.45, d: 1, g: 0.08 },
      ...sparkle(0.62),
    ])
  },
  streak: () => {
    whoosh(0.55, 0.14)
    play([
      { f: N.G5, t: 0.4, d: 0.3 }, { f: N.C6, t: 0.5, d: 0.3 }, { f: N.E6, t: 0.6, d: 0.3 },
      { f: N.G6, t: 0.72, d: 1.1, g: 0.24 }, { f: N.C6, t: 0.72, d: 1.1, g: 0.12 },
      ...sparkle(0.9, 0.06),
    ])
  },
  /** coin-ish ding for chests / goals / quests */
  goal: () => play([{ f: N.A5 * 1.122, t: 0, d: 0.12, g: 0.18 }, { f: N.E6 * 1.122, t: 0.07, d: 0.6, g: 0.22 }, ...sparkle(0.2, 0.04)]),
  lock: () => play([{ f: 260, t: 0, d: 0.1, v: 'boop', g: 0.16, to: 200 }, { f: 210, t: 0.09, d: 0.14, v: 'boop', g: 0.14, to: 160 }]),
}
