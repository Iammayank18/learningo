import type { Lesson } from '../types'

export type SectionKind = 'concept' | 'analogy' | 'why' | 'code' | 'use' | 'answer' | 'gotchas' | 'interview'

export const SECTION_META: Record<SectionKind, { title: string; icon: string }> = {
  concept: { title: 'Concept', icon: '💡' },
  analogy: { title: 'Real-life analogy', icon: '🍛' },
  why: { title: 'Kyun zaroori hai', icon: '🎯' },
  code: { title: 'Code mein dekho', icon: '👨‍💻' },
  use: { title: 'Kahan use hota hai & trade-offs', icon: '⚖️' },
  answer: { title: 'Model answer', icon: '✅' },
  gotchas: { title: 'Interview traps', icon: '⚠️' },
  interview: { title: 'Interview question', icon: '🎤' },
}

const PROBLEM_META: Partial<Record<SectionKind, { title: string; icon: string }>> = {
  concept: { title: 'Problem', icon: '📝' },
  why: { title: 'Hints', icon: '💡' },
  code: { title: 'Starter / code', icon: '👨‍💻' },
}
export const sectionMeta = (k: SectionKind, l: Lesson) => (l.kind === 'problem' && PROBLEM_META[k]) || SECTION_META[k]

export function sectionKinds(l: Lesson, withInterview = false): SectionKind[] {
  const k: SectionKind[] = ['concept']
  if (l.analogy) k.push('analogy')
  if (l.why || l.visual) k.push('why')
  if (l.code) k.push('code')
  if (l.where.length || l.pros.length || l.cons.length) k.push('use')
  if (l.answer) k.push('answer')
  if (l.gotchas.length) k.push('gotchas')
  if (withInterview && l.q) k.push('interview')
  return k
}

export const HUES: Record<string, string> = {
  sky: '#1cb0f6', amber: '#ff9600', blue: '#2b70c9', pink: '#ff86d0', violet: '#ce82ff', green: '#58cc02', teal: '#00cd9c',
  orange: '#ff7a1a', slate: '#64748b', cyan: '#00b8d9', rose: '#ff4b6e', indigo: '#6366f1', lime: '#84cc16', emerald: '#10b981',
  red: '#ff4b4b', fuchsia: '#d946ef',
}
