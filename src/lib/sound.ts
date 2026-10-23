import { getPrefs } from './prefs'

/**
 * Cute synthesized sound effects (Web Audio) — original, no audio files.
 * Voices: "mallet" (FM marimba/xylophone — bright, plucky), "tock" (tiny wood click), "bell" (glassy chime),
 * "pop" (bubbly pitch blip), "boop" (soft low sine).
 * Everything runs through a gentle compressor plus a short echo for a bit of sparkle.
 */
type Voice = 'bell' | 'pop' | 'boop' | 'mallet' | 'tock'
type Note = { f: number; t: number; d: number; v?: Voice; g?: number; to?: number; dry?: boolean }

let ctx: AudioContext | null = null
let bus: GainNode | null = null
let dry: GainNode | null = null // no echo — for tiny UI clicks

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
      dry = ctx.createGain(); dry.gain.value = 1; dry.connect(comp)
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


/** FM mallet: carrier + fast-decaying modulator → bright attack that mellows (marimba / xylophone feel). */
function fm(c: AudioContext, out: AudioNode, f: number, at: number, d: number, peak: number, ratio: number, index: number, idxDecay: number) {
  const car = c.createOscillator(); car.type = 'sine'; car.frequency.setValueAtTime(f, at)
  const mod = c.createOscillator(); mod.type = 'sine'; mod.frequency.setValueAtTime(f * ratio, at)
  const mg = c.createGain()
  mg.gain.setValueAtTime(f * index, at)
  mg.gain.exponentialRampToValueAtTime(Math.max(1, f * 0.02), at + idxDecay)
  mod.connect(mg).connect(car.frequency)
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, at)
  g.gain.exponentialRampToValueAtTime(peak, at + 0.003)
  g.gain.exponentialRampToValueAtTime(0.0001, at + d)
  car.connect(g).connect(out)
  car.start(at); mod.start(at)
  car.stop(at + d + 0.05); mod.stop(at + d + 0.05)
}

function play(notes: Note[]) {
  if (!getPrefs().sound) return
  const c = ac()
  if (!c || !bus) return
  const t0 = c.currentTime + 0.01
  for (const n of notes) {
    const at = t0 + n.t
    const g = n.g ?? 0.2
    const v = n.v ?? 'mallet'
    const out = n.dry && dry ? dry : bus
    if (v === 'mallet') {
      fm(c, out, n.f, at, n.d, g, 4, 2.2, 0.06)
      osc(c, out, 'sine', n.f * 2, at, n.d * 0.35, g * 0.18, 0.002)
    } else if (v === 'tock') {
      fm(c, out, n.f, at, n.d, g, 1.5, 3, 0.02)
    } else if (v === 'bell') {
      osc(c, out, 'sine', n.f, at, n.d, g, 0.004)
      osc(c, out, 'sine', n.f * 2, at, n.d * 0.55, g * 0.28, 0.003)
      osc(c, out, 'sine', n.f * 3.01, at, n.d * 0.3, g * 0.1, 0.002)
    } else if (v === 'pop') {
      osc(c, out, 'sine', n.f, at, n.d, g, 0.004, n.to ?? n.f * 1.6)
    } else {
      osc(c, out, 'sine', n.f, at, n.d, g, 0.01, n.to)
      osc(c, out, 'triangle', n.f / 2, at, n.d * 0.8, g * 0.35, 0.01, n.to ? n.to / 2 : undefined)
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

const N = { B6: 1975.53, E7: 2637.02, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, D6: 1174.66, E6: 1318.51, G6: 1567.98, A6: 1760, C7: 2093 }
const sparkle = (t: number, g = 0.05): Note[] => [N.C7, N.A6, N.G6, N.E6].map((f, i) => ({ f: f * 1.5, t: t + i * 0.045, d: 0.22, g }))

const chirp = (k: number): Note[] => [
  { f: 1568 * k, t: 0, d: 0.045, v: 'pop', g: 0.16, to: 1760 * k, dry: true },
  { f: 2093 * k, t: 0.05, d: 0.07, v: 'pop', g: 0.16, to: 2349 * k, dry: true },
]

export const sfx = {
  /** cute bird-like "chi-rip" for buttons — two tiny rising notes, dry */
  tap: () => play(chirp(1)),
  /** picking an option — same chirp, a whole tone higher */
  select: () => play(chirp(1.122)),
  /** going back — the chirp falling */
  back: () => play([
    { f: 2093, t: 0, d: 0.045, v: 'pop', g: 0.16, to: 1865, dry: true },
    { f: 1568, t: 0.05, d: 0.07, v: 'pop', g: 0.16, to: 1397, dry: true },
  ]),
  /** bright "ding-DING!" — climbs a semitone per combo step (max +7) */
  correct: (combo = 0) => {
    const k = Math.pow(2, Math.min(7, Math.max(0, combo - 1)) / 12)
    play([
      { f: N.E6 * k, t: 0, d: 0.22, g: 0.2 },
      { f: N.A6 * k, t: 0.075, d: 0.55, g: 0.24 },
      { f: N.A6 * 2 * k, t: 0.075, d: 0.3, v: 'bell', g: 0.04 },
      ...(combo >= 3 ? sparkle(0.16, 0.03) : []),
    ])
  },
  /** soft, slightly sad "bonk-bonk" */
  wrong: () => play([
    { f: 233, t: 0, d: 0.18, v: 'boop', g: 0.2, to: 200 },
    { f: 185, t: 0.14, d: 0.32, v: 'boop', g: 0.2, to: 150 },
    { f: 466, t: 0, d: 0.12, v: 'tock', g: 0.05 },
  ]),
  /** matched pair — quick happy blip */
  match: () => play([{ f: N.G6, t: 0, d: 0.16, g: 0.24 }, { f: N.C7, t: 0.05, d: 0.25, g: 0.2 }]),
  /** lesson complete — bouncy marimba run + chord + sparkle */
  complete: () => play([
    { f: N.C5, t: 0, d: 0.2 }, { f: N.E5, t: 0.07, d: 0.2 }, { f: N.G5, t: 0.14, d: 0.2 }, { f: N.C6, t: 0.21, d: 0.22 },
    { f: N.E6, t: 0.28, d: 0.22 }, { f: N.G6, t: 0.35, d: 0.22 },
    { f: N.C6, t: 0.5, d: 1.1, g: 0.16 }, { f: N.E6, t: 0.5, d: 1.1, g: 0.14 }, { f: N.G6, t: 0.5, d: 1.1, g: 0.12 }, { f: N.C7, t: 0.5, d: 1.1, v: 'bell', g: 0.08 },
    ...sparkle(0.62),
  ]),
  levelUp: () => {
    whoosh(0.4, 0.08)
    play([
      { f: N.C5, t: 0.1, d: 0.2 }, { f: N.D5, t: 0.16, d: 0.2 }, { f: N.E5, t: 0.22, d: 0.2 }, { f: N.G5, t: 0.28, d: 0.2 },
      { f: N.A5, t: 0.34, d: 0.2 }, { f: N.C6, t: 0.4, d: 0.2 }, { f: N.D6, t: 0.46, d: 0.2 }, { f: N.E6, t: 0.52, d: 0.2 },
      { f: N.G6, t: 0.62, d: 1.2, g: 0.2 }, { f: N.C6, t: 0.62, d: 1.2, g: 0.13 }, { f: N.E6, t: 0.62, d: 1.2, g: 0.12 },
      { f: N.C7, t: 0.62, d: 1, v: 'bell', g: 0.07 }, ...sparkle(0.8),
    ])
  },
  streak: () => {
    whoosh(0.55, 0.14)
    play([
      { f: N.G5, t: 0.4, d: 0.22 }, { f: N.C6, t: 0.48, d: 0.22 }, { f: N.E6, t: 0.56, d: 0.22 },
      { f: N.G6, t: 0.66, d: 1.2, g: 0.22 }, { f: N.C6, t: 0.66, d: 1.2, g: 0.13 }, { f: N.E6, t: 0.66, d: 1.2, g: 0.12 },
      { f: N.G6 * 2, t: 0.66, d: 0.9, v: 'bell', g: 0.06 }, ...sparkle(0.85, 0.06),
    ])
  },
  /** coin "ka-ching" for chests / goals / quests */
  goal: () => play([{ f: N.B6, t: 0, d: 0.1, g: 0.16 }, { f: N.E7, t: 0.07, d: 0.6, v: 'bell', g: 0.18 }, { f: N.E7, t: 0.07, d: 0.3, g: 0.1 }, ...sparkle(0.22, 0.035)]),
  /** muted "nope" for locked things */
  lock: () => play([{ f: 330, t: 0, d: 0.07, v: 'tock', g: 0.3 }, { f: 247, t: 0.08, d: 0.12, v: 'tock', g: 0.3 }]),
}
