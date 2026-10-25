import type { McProblem } from './types'
export type { McThink, McCheck, McProblem } from './types'

const files = import.meta.glob<{ problems: McProblem[] }>('./batch-*.json', { eager: true, import: 'default' })
const MC: Record<string, McProblem> = {}
for (const f of Object.values(files)) for (const p of f.problems) MC[p.id] = p

export const mcProblem = (lessonId: string): McProblem | undefined => MC[lessonId]
