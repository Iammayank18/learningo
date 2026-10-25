/** One lesson of a build course (machine coding, RAG, Node, React builds). Three steps: understand, quick check, build. */
export interface BuildQ { tag: string; q: string; opts: string[]; ans: number; why: string[] }
export interface BuildStep {
  title: string
  /** file the learner creates or edits */
  file?: string
  /** code to type (shown with a copy button) */
  code?: string
  /** command to run */
  run?: string
  /** what should appear on screen */
  expect?: string
  note?: string
}
export interface BuildLesson {
  id: string
  /** Missing = the lesson's own notes are the Understand step. */
  understand?: {
    title?: string
    what: string[]
    where: [string, string][]
    rules: string[]
    result?: string
    diagram?: string
  }
  /** 0-3 MCQs, only when the topic is asked in interviews. Empty = step skipped. */
  quiz: BuildQ[]
  build?: { minutes: number; steps: BuildStep[]; hint?: string; solution?: string; notes?: string[] }
}
