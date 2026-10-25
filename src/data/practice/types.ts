export type Difficulty = 'easy' | 'medium' | 'hard'

/** Special argument markers the runner turns into real structures before calling the user's function:
 *  { $list: [1,2,3] } -> ListNode chain, { $tree: [3,9,20,null,null,15,7] } -> TreeNode (level order). */
export interface TestCase {
  args: unknown[]
  expected: unknown
  label?: string
}

export interface Problem {
  id: string
  /** LeetCode number and URL slug (https://leetcode.com/problems/<slug>/) */
  lc?: { n: number; slug: string }
  /** DSA lesson id this problem belongs to */
  lesson: string
  title: string
  diff: Difficulty
  /** Name of the function the user must define */
  fn: string
  /** HTML problem statement */
  prompt: string
  examples: { input: string; output: string; note?: string }[]
  starter: string
  tests: () => TestCase[]
  /** 'unordered' compares nested arrays after sorting (order of groups / items does not matter) */
  compare?: 'ordered' | 'unordered'
  /** Convert a returned ListNode / TreeNode back into an array so it can be compared */
  out?: 'list' | 'tree'
  hints: string[]
  solution: string
  explain: string
  time: string
  space: string
}
