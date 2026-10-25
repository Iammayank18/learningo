export interface McThink { tag: string; q: string; opts: string[]; ans: number; why: string[] }
export interface McCheck { t: string; test: string; verify: string | null; gap: string }
export interface McProblem {
  id: string; diff: string; fn: string; signature: string
  learn: { what: string[]; how: { steps: string[]; diagram: string }; where: [string, string][] }
  think: McThink[]
  pseudo: string; watch: string[]
  build: { minutes: number; problem: string; reqs: string[]; checks: McCheck[] }
  solution: string; notes: string[]; next: string[]
  /** optional hand-written starter (otherwise built from the solution) */
  starter?: string
}
