import type { Problem } from './types'

const range = <T,>(n: number, f: (i: number) => T): T[] => Array.from({ length: n }, (_, i) => f(i))

/** Core-lesson practice problems (batches 1-8). Expected values were computed by running the reference solution. */
export const DSA_MORE: Problem[] = [
  {
    id: 'contains-duplicate',
    lc: { n: 217, slug: 'contains-duplicate' },
    lesson: 'arrays',
    title: 'Contains Duplicate',
    diff: 'easy',
    fn: 'containsDuplicate',
    prompt: `<p>Given an array of integers <code>nums</code>, return <code>true</code> if any value appears <b>at least twice</b>, and <code>false</code> if every value is different.</p>`,
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: 'true' },
      { input: 'nums = [1, 2, 3, 4]', output: 'false' },
      { input: 'nums = [3, 3]', output: 'true', note: 'Two equal values are enough.' },
    ],
    starter: `function containsDuplicate(nums) {
  // your code here
}
`,
    tests: () => [
      { args: [[1,2,3,1]], expected: true },
      { args: [[1,2,3,4]], expected: false },
      { args: [[]], expected: false },
      { args: [[5]], expected: false },
      { args: [[1,1,1,3,3,4,3,2,4,2]], expected: true },
      { args: [[-1,0,-1]], expected: true },
      { args: [range(200000, (i) => i)], expected: false, label: '200,000 different numbers' },
      { args: [[...range(200000, (i) => i), 5]], expected: true, label: 'one repeat at the very end' },
    ],
    hints: [
      'For each number you only need to know one thing: have I seen this exact value before?',
      'Comparing every pair works but is slow on 200,000 numbers. Is there a structure that remembers values and answers "seen?" in one step?',
      'Walk the array once. If a Set already has the number, return true. Otherwise add it. Return false after the loop.',
    ],
    solution: `function containsDuplicate(nums) {
  const seen = new Set()
  for (const x of nums) {
    if (seen.has(x)) return true
    seen.add(x)
  }
  return false
}
`,
    explain: 'A Set remembers every value you passed and answers "seen before?" in constant time. The first repeat ends the loop, so you never look at the rest.',
    time: 'O(n)',
    space: 'O(n)',
  },
  {
    id: 'best-time-to-buy-sell-stock',
    lc: { n: 121, slug: 'best-time-to-buy-and-sell-stock' },
    lesson: 'arrays',
    title: 'Best Time to Buy and Sell Stock',
    diff: 'easy',
    fn: 'maxProfit',
    prompt: `<p><code>prices[i]</code> is the price of a stock on day <code>i</code>. You may buy on one day and sell on a <b>later</b> day.</p>
<p>Return the maximum profit you can make. If no profit is possible, return <code>0</code>.</p>`,
    examples: [
      { input: 'prices = [7, 1, 5, 3, 6, 4]', output: '5', note: 'Buy at 1, sell at 6.' },
      { input: 'prices = [7, 6, 4, 3, 1]', output: '0', note: 'Prices only fall, so do not trade.' },
    ],
    starter: `function maxProfit(prices) {
  // your code here
}
`,
    tests: () => [
      { args: [[7,1,5,3,6,4]], expected: 5 },
      { args: [[7,6,4,3,1]], expected: 0 },
      { args: [[1]], expected: 0 },
      { args: [[2,4,1]], expected: 2 },
      { args: [[3,3,3]], expected: 0 },
      { args: [[2,1,2,0,1]], expected: 1 },
      { args: [[1,2]], expected: 1 },
      { args: [range(100000, (i) => 100000 - i)], expected: 0, label: '100,000 falling prices' },
      { args: [range(100000, (i) => i)], expected: 99999, label: '100,000 rising prices' },
    ],
    hints: [
      'A profit is sell price minus an earlier buy price. For one selling day, which earlier buy price is best?',
      'The best buy price for a day is the lowest price seen before it. You can keep that as a single variable while you walk.',
      'For each price: update the lowest price so far, or compute price - lowest and keep the best. Start best at 0.',
    ],
    solution: `function maxProfit(prices) {
  let lowest = Infinity
  let best = 0
  for (const p of prices) {
    if (p < lowest) lowest = p
    else best = Math.max(best, p - lowest)
  }
  return best
}
`,
    explain: 'For each day the best buy is the cheapest earlier day, so one variable that tracks the lowest price so far is enough. Starting best at 0 handles the case where prices only fall.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'move-zeroes',
    lc: { n: 283, slug: 'move-zeroes' },
    lesson: 'arrays-2',
    title: 'Move Zeroes',
    diff: 'easy',
    fn: 'moveZeroes',
    prompt: `<p>Given an array <code>nums</code>, move every <code>0</code> to the <b>end</b> while keeping the relative order of the non-zero values.</p>
<p>Do it <b>in place</b> (do not create a second array) and <b>return</b> the same array. On LeetCode the function returns nothing, but here we return it so the tests can read it.</p>`,
    examples: [
      { input: 'nums = [0, 1, 0, 3, 12]', output: '[1, 3, 12, 0, 0]' },
      { input: 'nums = [0]', output: '[0]' },
      { input: 'nums = [1, 2, 3]', output: '[1, 2, 3]', note: 'Nothing to move.' },
    ],
    starter: `function moveZeroes(nums) {
  // your code here
  return nums
}
`,
    tests: () => [
      { args: [[0,1,0,3,12]], expected: [1,3,12,0,0] },
      { args: [[0]], expected: [0] },
      { args: [[1,2,3]], expected: [1,2,3] },
      { args: [[0,0,1]], expected: [1,0,0] },
      { args: [[1,0,0,2,0,3]], expected: [1,2,3,0,0,0] },
      { args: [[]], expected: [] },
      { args: [[0,0,0]], expected: [0,0,0] },
      { args: [range(100000, (i) => i % 2)], expected: range(100000, (i) => (i < 50000 ? 1 : 0)), label: '100,000 values, half zeros' },
    ],
    hints: [
      'The order of the non-zero values must stay the same, so you cannot just swap the first zero with the last number.',
      'Use two indexes: one that reads every value, and one (write) that marks where the next non-zero value belongs.',
      'When you read a non-zero value, copy it to nums[write] and move write forward. At the end, fill the rest with zeros.',
    ],
    solution: `function moveZeroes(nums) {
  let write = 0
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      nums[write] = nums[read]
      write++
    }
  }
  for (let i = write; i < nums.length; i++) nums[i] = 0
  return nums
}
`,
    explain: 'The write index always points at the next slot for a non-zero value, so non-zero values are packed to the front in their original order. Whatever is left after write must be zeros.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'product-except-self',
    lc: { n: 238, slug: 'product-of-array-except-self' },
    lesson: 'arrays-2',
    title: 'Product of Array Except Self',
    diff: 'medium',
    fn: 'productExceptSelf',
    prompt: `<p>Given an array <code>nums</code>, return an array <code>answer</code> where <code>answer[i]</code> is the product of <b>all values except</b> <code>nums[i]</code>.</p>
<p>Do not use division. Aim for O(n) time.</p>`,
    examples: [
      { input: 'nums = [1, 2, 3, 4]', output: '[24, 12, 8, 6]' },
      { input: 'nums = [2, 0, 0, 3]', output: '[0, 0, 0, 0]', note: 'Two zeros: every product contains a zero.' },
    ],
    starter: `function productExceptSelf(nums) {
  // your code here
}
`,
    tests: () => [
      { args: [[1,2,3,4]], expected: [24,12,8,6] },
      { args: [[1,2,0,4]], expected: [0,0,8,0] },
      { args: [[2,0,0,3]], expected: [0,0,0,0] },
      { args: [[5,2]], expected: [2,5] },
      { args: [[-1,2,-3]], expected: [-6,3,-2] },
      { args: [[1,1,1]], expected: [1,1,1] },
      { args: [[2,3,4,5,6]], expected: [360,240,180,144,120] },
      { args: [range(100000, () => 1)], expected: range(100000, () => 1), label: '100,000 ones' },
    ],
    hints: [
      'The answer at i is (product of everything to the left of i) times (product of everything to the right of i).',
      'Compute the left products in one pass and store them in the answer array. Then compute the right products in a second pass, going backward, and multiply them in.',
      'Pass 1: answer[i] = running product of nums[0..i-1]. Pass 2 (from the end): answer[i] *= running product of nums[i+1..end].',
    ],
    solution: `function productExceptSelf(nums) {
  const n = nums.length
  const answer = new Array(n).fill(1)
  let left = 1
  for (let i = 0; i < n; i++) {
    answer[i] = left
    left *= nums[i]
  }
  let right = 1
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= right
    right *= nums[i]
  }
  return answer
}
`,
    explain: 'Everything except nums[i] is the part on its left times the part on its right. Two passes build those two parts, and the output array itself is reused to hold the left products, so no extra array is needed.',
    time: 'O(n)',
    space: 'O(1) extra',
  },
  {
    id: 'longest-consecutive-sequence',
    lc: { n: 128, slug: 'longest-consecutive-sequence' },
    lesson: 'hashset',
    title: 'Longest Consecutive Sequence',
    diff: 'medium',
    fn: 'longestConsecutive',
    prompt: `<p>Given an unsorted array of integers <code>nums</code>, return the length of the <b>longest run of consecutive values</b> (like 1, 2, 3, 4). The values do not need to be next to each other in the array.</p>
<p>Aim for O(n) time.</p>`,
    examples: [
      { input: 'nums = [100, 4, 200, 1, 3, 2]', output: '4', note: '1, 2, 3, 4 is the longest run.' },
      { input: 'nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]', output: '9' },
    ],
    starter: `function longestConsecutive(nums) {
  // your code here
}
`,
    tests: () => [
      { args: [[100,4,200,1,3,2]], expected: 4 },
      { args: [[0,3,7,2,5,8,4,6,0,1]], expected: 9 },
      { args: [[]], expected: 0 },
      { args: [[5]], expected: 1 },
      { args: [[1,2,0,1]], expected: 3 },
      { args: [[-1,-2,-3,10]], expected: 3 },
      { args: [[9,1,4,7,3,-1,0,5,8,-1,6]], expected: 7 },
      { args: [range(100000, (i) => 100000 - i)], expected: 100000, label: '100,000 numbers in one run' },
      { args: [range(100000, () => 7)], expected: 1, label: '100,000 equal numbers' },
    ],
    hints: [
      'Sorting works in O(n log n). To reach O(n), think about how to find where a run starts.',
      'Put all numbers in a Set. A number x starts a run only if x - 1 is NOT in the Set.',
      'For each run start, walk upward (x + 1, x + 2, ...) while the Set has the number and count the length. Skip numbers that are not run starts.',
    ],
    solution: `function longestConsecutive(nums) {
  const set = new Set(nums)
  let best = 0
  for (const x of set) {
    if (set.has(x - 1)) continue
    let y = x
    let len = 1
    while (set.has(y + 1)) {
      y++
      len++
    }
    best = Math.max(best, len)
  }
  return best
}
`,
    explain: 'Only the first number of a run starts a walk. Every number is walked over at most once (when its run is counted), so the total work is linear even though there is a loop inside a loop.',
    time: 'O(n)',
    space: 'O(n)',
  },
  {
    id: 'intersection-of-two-arrays',
    lc: { n: 349, slug: 'intersection-of-two-arrays' },
    lesson: 'hashset',
    title: 'Intersection of Two Arrays',
    diff: 'easy',
    fn: 'intersection',
    compare: 'unordered',
    prompt: `<p>Given two integer arrays <code>nums1</code> and <code>nums2</code>, return an array of the values that appear in <b>both</b>.</p>
<p>Each value must appear <b>once</b> in the result, and the result can be in any order.</p>`,
    examples: [
      { input: 'nums1 = [1, 2, 2, 1], nums2 = [2, 2]', output: '[2]' },
      { input: 'nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]', output: '[9, 4]', note: 'The order [4, 9] is also accepted.' },
    ],
    starter: `function intersection(nums1, nums2) {
  // your code here
}
`,
    tests: () => [
      { args: [[1,2,2,1],[2,2]], expected: [2] },
      { args: [[4,9,5],[9,4,9,8,4]], expected: [9,4] },
      { args: [[],[1]], expected: [] },
      { args: [[1,2,3],[4,5,6]], expected: [] },
      { args: [[1,1,1],[1]], expected: [1] },
      { args: [[-1,0],[0,-1]], expected: [0,-1] },
      { args: [range(100000, (i) => i), range(100000, (i) => i * 2)], expected: range(50000, (i) => i * 2), label: '100,000 values in each array' },
    ],
    hints: [
      'A value belongs in the answer if it is in nums1 AND in nums2. How can you check "is it in nums1?" in one step?',
      'Put nums1 in a Set. Then walk through nums2 and keep every value the Set contains.',
      'Keep the answer itself in a Set too, so a value that appears many times in nums2 is added only once. Return it as an array.',
    ],
    solution: `function intersection(nums1, nums2) {
  const first = new Set(nums1)
  const common = new Set()
  for (const x of nums2) {
    if (first.has(x)) common.add(x)
  }
  return [...common]
}
`,
    explain: 'A Set gives an instant "is this in nums1?" check. A second Set for the answer removes repeated values, so each common value is returned once.',
    time: 'O(n + m)',
    space: 'O(n + m)',
  },
  {
    id: 'ransom-note',
    lc: { n: 383, slug: 'ransom-note' },
    lesson: 'objects-map-set',
    title: 'Ransom Note',
    diff: 'easy',
    fn: 'canConstruct',
    prompt: `<p>You have a <code>ransomNote</code> and a <code>magazine</code>, both strings. Return <code>true</code> if you can build the note by cutting letters out of the magazine, and <code>false</code> otherwise.</p>
<p>Each letter in the magazine can be used <b>only once</b>.</p>`,
    examples: [
      { input: 'ransomNote = "a", magazine = "b"', output: 'false' },
      { input: 'ransomNote = "aa", magazine = "ab"', output: 'false', note: 'Only one "a" is available.' },
      { input: 'ransomNote = "aa", magazine = "aab"', output: 'true' },
    ],
    starter: `function canConstruct(ransomNote, magazine) {
  // your code here
}
`,
    tests: () => [
      { args: ["a","b"], expected: false },
      { args: ["aa","ab"], expected: false },
      { args: ["aa","aab"], expected: true },
      { args: ["","x"], expected: true },
      { args: ["abc","cba"], expected: true },
      { args: ["aab","baa"], expected: true },
      { args: ["x",""], expected: false },
      { args: ['z'.repeat(100000), 'z'.repeat(99999)], expected: false, label: 'one letter short (100,000 letters)' },
      { args: ['z'.repeat(100000), 'z'.repeat(100000)], expected: true, label: 'exactly enough (100,000 letters)' },
    ],
    hints: [
      'Order does not matter, only how many of each letter you have. What do you need to count?',
      'Count every letter of the magazine in a Map (letter to how many are left).',
      'For each letter of the note: if the Map has none left, return false. Otherwise reduce its count by 1. If the loop ends, return true.',
    ],
    solution: `function canConstruct(ransomNote, magazine) {
  const left = new Map()
  for (const ch of magazine) left.set(ch, (left.get(ch) ?? 0) + 1)
  for (const ch of ransomNote) {
    const count = left.get(ch) ?? 0
    if (count === 0) return false
    left.set(ch, count - 1)
  }
  return true
}
`,
    explain: 'Only the number of copies of each letter matters. A Map of letter counts built from the magazine is "spent" one letter at a time while reading the note; if a letter runs out, the note cannot be built.',
    time: 'O(n + m)',
    space: 'O(k)',
  },
  {
    id: 'time-needed-to-buy-tickets',
    lc: { n: 2073, slug: 'time-needed-to-buy-tickets' },
    lesson: 'queue',
    title: 'Time Needed to Buy Tickets',
    diff: 'easy',
    fn: 'timeRequiredToBuy',
    prompt: `<p>People stand in a line to buy tickets. Person <code>i</code> wants <code>tickets[i]</code> tickets. Each person buys <b>one</b> ticket per turn and takes <b>1 second</b>. After buying, a person who still wants more goes to the <b>back</b> of the line; a person who is done leaves.</p>
<p>Return how many seconds pass until the person at position <code>k</code> has bought all of their tickets.</p>`,
    examples: [
      { input: 'tickets = [2, 3, 2], k = 2', output: '6' },
      { input: 'tickets = [5, 1, 1, 1], k = 0', output: '8' },
    ],
    starter: `function timeRequiredToBuy(tickets, k) {
  // your code here
}
`,
    tests: () => [
      { args: [[2,3,2],2], expected: 6 },
      { args: [[5,1,1,1],0], expected: 8 },
      { args: [[1],0], expected: 1 },
      { args: [[4,4,4],1], expected: 11 },
      { args: [[1,1,1,1],3], expected: 4 },
      { args: [[3,1,2,4],2], expected: 6 },
      { args: [[84,49,5,24,70,77,87,8],3], expected: 154 },
      { args: [range(100, () => 100000), 99], expected: 10000000, label: '100 people, 100,000 tickets each' },
    ],
    hints: [
      'You could simulate the line with a queue. It works for small inputs, but think about what is really being counted.',
      'Each person buys at most as many tickets as person k needs before person k finishes. So person i adds min(tickets[i], tickets[k]) seconds.',
      'People standing after k get one fewer turn: they only buy tickets[k] - 1 before k finishes the last ticket. Add up min(tickets[i], limit) where limit is tickets[k] for i <= k and tickets[k] - 1 for i > k.',
    ],
    solution: `function timeRequiredToBuy(tickets, k) {
  let seconds = 0
  for (let i = 0; i < tickets.length; i++) {
    const limit = i <= k ? tickets[k] : tickets[k] - 1
    seconds += Math.min(tickets[i], limit)
  }
  return seconds
}
`,
    explain: 'Every second is one ticket sold by someone. Person i sells at most tickets[k] tickets before k finishes (one fewer if i stands behind k, because k buys the last ticket first in that round). Summing those caps gives the total time without simulating the queue.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'students-unable-to-eat-lunch',
    lc: { n: 1700, slug: 'number-of-students-unable-to-eat-lunch' },
    lesson: 'queue',
    title: 'Number of Students Unable to Eat Lunch',
    diff: 'easy',
    fn: 'countStudents',
    prompt: `<p>A school has circular (<code>0</code>) and square (<code>1</code>) sandwiches in a stack, and students in a queue. <code>students[i]</code> is the sandwich type student <code>i</code> likes. <code>sandwiches[j]</code> is the sandwich at position <code>j</code> of the stack (index 0 is the top).</p>
<p>The front student takes the top sandwich if they like it, and both leave. Otherwise the student goes to the back of the queue. This repeats until nobody in the queue wants the top sandwich.</p>
<p>Return the number of students who cannot eat.</p>`,
    examples: [
      { input: 'students = [1, 1, 0, 0], sandwiches = [0, 1, 0, 1]', output: '0' },
      { input: 'students = [1, 1, 1, 0, 0, 1], sandwiches = [1, 0, 0, 0, 1, 1]', output: '3' },
    ],
    starter: `function countStudents(students, sandwiches) {
  // your code here
}
`,
    tests: () => [
      { args: [[1,1,0,0],[0,1,0,1]], expected: 0 },
      { args: [[1,1,1,0,0,1],[1,0,0,0,1,1]], expected: 3 },
      { args: [[1],[0]], expected: 1 },
      { args: [[0],[0]], expected: 0 },
      { args: [[0,0,0],[1,1,1]], expected: 3 },
      { args: [[],[]], expected: 0 },
      { args: [[1,0,1,0],[0,0,1,1]], expected: 0 },
      { args: [range(100000, (i) => i % 2), range(100000, (i) => (i + 1) % 2)], expected: 0, label: '100,000 students' },
      { args: [range(100000, () => 0), range(100000, () => 1)], expected: 100000, label: 'nobody likes the top sandwich' },
    ],
    hints: [
      'A simulation with a queue works, but it can loop for a long time when nobody wants the top sandwich. When should it stop?',
      'The order of the students does not matter, because a student who is skipped goes to the back and comes round again. Only the NUMBER of students who like each type matters.',
      'Count how many students like 0 and how many like 1. Go through the sandwiches from the top: if nobody left likes it, return how many students are left. Otherwise remove one student of that type.',
    ],
    solution: `function countStudents(students, sandwiches) {
  const want = [0, 0]
  for (const s of students) want[s]++
  let left = students.length
  for (const sand of sandwiches) {
    if (want[sand] === 0) return left
    want[sand]--
    left--
  }
  return 0
}
`,
    explain: 'Because skipped students rejoin the queue, the queue order never blocks anyone for long. The only thing that can block the line is a top sandwich type that nobody left wants. So counting preferences is enough.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'missing-number',
    lc: { n: 268, slug: 'missing-number' },
    lesson: 'linear-search',
    title: 'Missing Number',
    diff: 'easy',
    fn: 'missingNumber',
    prompt: `<p>An array <code>nums</code> holds <code>n</code> <b>different</b> numbers taken from the range <code>0..n</code>. Exactly one number of that range is missing. Return it.</p>`,
    examples: [
      { input: 'nums = [3, 0, 1]', output: '2', note: 'n = 3, the range is 0 to 3.' },
      { input: 'nums = [0, 1]', output: '2' },
      { input: 'nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]', output: '8' },
    ],
    starter: `function missingNumber(nums) {
  // your code here
}
`,
    tests: () => [
      { args: [[3,0,1]], expected: 2 },
      { args: [[0,1]], expected: 2 },
      { args: [[9,6,4,2,3,5,7,0,1]], expected: 8 },
      { args: [[0]], expected: 1 },
      { args: [[1]], expected: 0 },
      { args: [[]], expected: 0 },
      { args: [[1,2]], expected: 0 },
      { args: [range(100000, (i) => i + 1)], expected: 0, label: '100,000 numbers, 0 is missing' },
      { args: [range(100000, (i) => i)], expected: 100000, label: '100,000 numbers, 100000 is missing' },
    ],
    hints: [
      'If nothing were missing, you would have all the numbers 0 to n. What is their sum?',
      'The sum of 0..n is n × (n + 1) / 2. The array sum is smaller by exactly the missing number.',
      'Compute n × (n + 1) / 2 minus the sum of the array. n is nums.length.',
    ],
    solution: `function missingNumber(nums) {
  const n = nums.length
  let total = (n * (n + 1)) / 2
  for (const x of nums) total -= x
  return total
}
`,
    explain: 'The numbers 0..n add up to n(n+1)/2. The array contains all of them except one, so the difference between the full sum and the array sum is the missing number. One pass and no extra memory.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'two-sum-ii',
    lc: { n: 167, slug: 'two-sum-ii-input-array-is-sorted' },
    lesson: 'two-pointers',
    title: 'Two Sum II (Sorted Array)',
    diff: 'medium',
    fn: 'twoSumSorted',
    prompt: `<p>Given an array <code>numbers</code> that is already <b>sorted in ascending order</b>, find two numbers that add up to <code>target</code>.</p>
<p>Return their positions as <code>[i, j]</code>, counting from <b>1</b> (not 0), with <code>i &lt; j</code>. Exactly one answer exists. Use only O(1) extra space.</p>`,
    examples: [
      { input: 'numbers = [2, 7, 11, 15], target = 9', output: '[1, 2]', note: 'Positions start at 1.' },
      { input: 'numbers = [2, 3, 4], target = 6', output: '[1, 3]' },
      { input: 'numbers = [-1, 0], target = -1', output: '[1, 2]' },
    ],
    starter: `function twoSumSorted(numbers, target) {
  // your code here
}
`,
    tests: () => [
      { args: [[2,7,11,15],9], expected: [1,2] },
      { args: [[2,3,4],6], expected: [1,3] },
      { args: [[-1,0],-1], expected: [1,2] },
      { args: [[1,2,3,4,4,9,56,90],8], expected: [4,5] },
      { args: [[0,0,3,4],0], expected: [1,2] },
      { args: [[-5,-3,0,2,8],5], expected: [2,5] },
      { args: [range(100000, (i) => i * 2), 399994], expected: [99999,100000], label: '100,000 sorted numbers' },
    ],
    hints: [
      'The array is sorted. If you look at the smallest and the largest number together, what does their sum tell you?',
      'Put one pointer at the start and one at the end. If the sum is too big, the right number is too large for any partner. If it is too small, the left number is too small.',
      'Loop while left < right. sum > target: right--. sum < target: left++. sum === target: return [left + 1, right + 1].',
    ],
    solution: `function twoSumSorted(numbers, target) {
  let left = 0
  let right = numbers.length - 1
  while (left < right) {
    const sum = numbers[left] + numbers[right]
    if (sum === target) return [left + 1, right + 1]
    if (sum < target) left++
    else right--
  }
  return []
}
`,
    explain: 'In a sorted array, a sum that is too big can only be fixed by a smaller right number, and a sum that is too small only by a bigger left number. So each step safely discards one number, and the two pointers meet after at most n steps.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'three-sum',
    lc: { n: 15, slug: '3sum' },
    lesson: 'two-pointers',
    title: '3Sum',
    diff: 'medium',
    fn: 'threeSum',
    compare: 'unordered',
    prompt: `<p>Given an array <code>nums</code>, return all <b>unique triplets</b> <code>[a, b, c]</code> of values that add up to <code>0</code>.</p>
<p>The result must not contain the same triplet twice. The order of the triplets and the order inside a triplet do not matter.</p>`,
    examples: [
      { input: 'nums = [-1, 0, 1, 2, -1, -4]', output: '[[-1, -1, 2], [-1, 0, 1]]' },
      { input: 'nums = [0, 1, 1]', output: '[]', note: 'No triplet adds up to 0.' },
      { input: 'nums = [0, 0, 0]', output: '[[0, 0, 0]]' },
    ],
    starter: `function threeSum(nums) {
  // your code here
}
`,
    tests: () => [
      { args: [[-1,0,1,2,-1,-4]], expected: [[-1,-1,2],[-1,0,1]] },
      { args: [[0,1,1]], expected: [] },
      { args: [[0,0,0]], expected: [[0,0,0]] },
      { args: [[]], expected: [] },
      { args: [[0,0,0,0]], expected: [[0,0,0]] },
      { args: [[-2,0,1,1,2]], expected: [[-2,0,2],[-2,1,1]] },
      { args: [[-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]], expected: [[-4,-2,6],[-4,0,4],[-4,1,3],[-4,2,2],[-2,-2,4],[-2,0,2]] },
      { args: [range(3000, () => 0)], expected: [[0,0,0]], label: '3,000 zeros' },
      { args: [range(3000, () => 1)], expected: [], label: '3,000 ones' },
    ],
    hints: [
      'Checking all triplets is O(n³). Try fixing the first number and solving the rest as a Two Sum problem.',
      'Sort the array. For each first number nums[i], put one pointer just after i and one at the end, and move them like in Two Sum II.',
      'To avoid repeats, skip a first number that equals the previous one, and after you find a triplet, skip equal values on both sides. Stop early when nums[i] > 0.',
    ],
    solution: `function threeSum(nums) {
  const a = [...nums].sort((x, y) => x - y)
  const result = []
  for (let i = 0; i < a.length - 2; i++) {
    if (a[i] > 0) break
    if (i > 0 && a[i] === a[i - 1]) continue
    let left = i + 1
    let right = a.length - 1
    while (left < right) {
      const sum = a[i] + a[left] + a[right]
      if (sum < 0) left++
      else if (sum > 0) right--
      else {
        result.push([a[i], a[left], a[right]])
        left++
        right--
        while (left < right && a[left] === a[left - 1]) left++
        while (left < right && a[right] === a[right + 1]) right--
      }
    }
  }
  return result
}
`,
    explain: 'Sorting lets you fix one number and run the two-pointer search on the rest, which turns O(n³) into O(n²). Skipping equal values for the first number and after each hit is what keeps the triplets unique.',
    time: 'O(n²)',
    space: 'O(n)',
  },
  {
    id: 'container-with-most-water',
    lc: { n: 11, slug: 'container-with-most-water' },
    lesson: 'two-pointers',
    title: 'Container With Most Water',
    diff: 'medium',
    fn: 'maxArea',
    prompt: `<p>The array <code>height</code> describes vertical lines: line <code>i</code> stands at x = <code>i</code> and has height <code>height[i]</code>.</p>
<p>Pick two lines. Together with the x-axis they form a container. Return the <b>largest amount of water</b> a container can hold. The water is as high as the shorter line.</p>`,
    examples: [
      { input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]', output: '49', note: 'Lines 1 and 8: min(8, 7) × 7 = 49.' },
      { input: 'height = [1, 1]', output: '1' },
    ],
    starter: `function maxArea(height) {
  // your code here
}
`,
    tests: () => [
      { args: [[1,8,6,2,5,4,8,3,7]], expected: 49 },
      { args: [[1,1]], expected: 1 },
      { args: [[4,3,2,1,4]], expected: 16 },
      { args: [[1,2,1]], expected: 2 },
      { args: [[2,3,4,5,18,17,6]], expected: 17 },
      { args: [[0,0]], expected: 0 },
      { args: [[5,5,5,5,5]], expected: 20 },
      { args: [range(100000, (i) => (i * 37) % 1000 + 1)], expected: 99000000, label: '100,000 lines' },
    ],
    hints: [
      'The area is width × the shorter height. Start with the widest container: the first and the last line.',
      'From there, moving the TALLER line inward can only make the width smaller without raising the shorter height. Which line should you move?',
      'Move the pointer at the shorter line inward. After each step update the best area, and stop when the pointers meet.',
    ],
    solution: `function maxArea(height) {
  let left = 0
  let right = height.length - 1
  let best = 0
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left)
    best = Math.max(best, area)
    if (height[left] < height[right]) left++
    else right--
  }
  return best
}
`,
    explain: 'The shorter line limits the water. Moving the taller line can never help (width shrinks and the limit stays the same or drops), so the only move that might improve the area is the shorter line. That discards one line per step.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'pow-x-n',
    lc: { n: 50, slug: 'powx-n' },
    lesson: 'recursion',
    title: 'Pow(x, n)',
    diff: 'medium',
    fn: 'myPow',
    prompt: `<p>Compute <code>x</code> raised to the power <code>n</code> without using <code>Math.pow</code> or <code>**</code>.</p>
<p><code>n</code> can be negative (then the answer is <code>1 / x^(-n)</code>) and as large as 2³¹ - 1, so repeating <code>x * x * x ...</code> n times is too slow. If <code>n</code> is negative, <code>x</code> is not 0.</p>`,
    examples: [
      { input: 'x = 2, n = 10', output: '1024' },
      { input: 'x = 2, n = -2', output: '0.25', note: '1 / (2 × 2) = 0.25' },
      { input: 'x = 3, n = 5', output: '243' },
    ],
    starter: `function myPow(x, n) {
  // your code here
}
`,
    tests: () => [
      { args: [2,10], expected: 1024 },
      { args: [2,-2], expected: 0.25 },
      { args: [3,5], expected: 243 },
      { args: [2,0], expected: 1 },
      { args: [2,-1], expected: 0.5 },
      { args: [0.5,4], expected: 0.0625 },
      { args: [-2,3], expected: -8 },
      { args: [2,1000], expected: 1.0715086071862673e+301 },
      { args: [1,2147483647], expected: 1, label: 'huge n, x = 1' },
      { args: [-1,2147483647], expected: -1, label: 'huge odd n, x = -1' },
      { args: [1,-2147483648], expected: 1, label: 'smallest n' },
    ],
    hints: [
      'Repeating the multiplication n times is O(n). A power can be split in half: x^10 = x^5 × x^5.',
      'If n is even: x^n = (x^(n/2))². If n is odd: x^n = (x^(n/2 rounded down))² × x. Base case: x^0 = 1.',
      'Handle a negative n first: return 1 / myPow(x, -n). Compute the half power once and reuse it, do not call the recursion twice.',
    ],
    solution: `function myPow(x, n) {
  if (n < 0) return 1 / myPow(x, -n)
  if (n === 0) return 1
  const half = myPow(x, Math.floor(n / 2))
  return n % 2 === 0 ? half * half : half * half * x
}
`,
    explain: 'Each call halves n, so only about log₂(n) calls happen, instead of n. Computing the half once and squaring it is what makes it fast: calling the recursion twice would bring the cost back to O(n).',
    time: 'O(log n)',
    space: 'O(log n)',
  },
  {
    id: 'reverse-string',
    lc: { n: 344, slug: 'reverse-string' },
    lesson: 'recursion',
    title: 'Reverse String',
    diff: 'easy',
    fn: 'reverseString',
    prompt: `<p>The array <code>s</code> holds the characters of a string. Reverse it <b>in place</b> (do not make a second array) and return the same array.</p>
<p>On LeetCode the function returns nothing, but here we return the array so the tests can read it.</p>`,
    examples: [
      { input: 's = ["h", "e", "l", "l", "o"]', output: '["o", "l", "l", "e", "h"]' },
      { input: 's = ["a", "b"]', output: '["b", "a"]' },
    ],
    starter: `function reverseString(s) {
  // your code here
  return s
}
`,
    tests: () => [
      { args: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] },
      { args: [["H","a","n","n","a","h"]], expected: ["h","a","n","n","a","H"] },
      { args: [["a"]], expected: ["a"] },
      { args: [[]], expected: [] },
      { args: [["a","b"]], expected: ["b","a"] },
      { args: [["a","b","c"]], expected: ["c","b","a"] },
      { args: [range(100000, (i) => String.fromCharCode(97 + (i % 26)))], expected: range(100000, (i) => String.fromCharCode(97 + ((99999 - i) % 26))), label: '100,000 characters' },
    ],
    hints: [
      'The first character belongs at the end and the last at the start. What can you swap first?',
      'Keep two indexes, one at the start and one at the end. Swap the two characters, then move both indexes toward the middle.',
      'Stop when the indexes meet or cross (left >= right). You can write this as a loop, or as a function that calls itself with left + 1 and right - 1.',
    ],
    solution: `function reverseString(s) {
  let left = 0
  let right = s.length - 1
  while (left < right) {
    ;[s[left], s[right]] = [s[right], s[left]]
    left++
    right--
  }
  return s
}
`,
    explain: 'Swapping the outer pair puts both characters in their final place, and what is left is the same problem on a shorter range. A loop does this with O(1) memory. A recursive version works too, but it uses one stack frame per swap.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'same-tree',
    lc: { n: 100, slug: 'same-tree' },
    lesson: 'binary-tree',
    title: 'Same Tree',
    diff: 'easy',
    fn: 'isSameTree',
    prompt: `<p>Given the roots <code>p</code> and <code>q</code> of two binary trees, return <code>true</code> if the trees are the <b>same</b>: they have the same shape and every pair of matching nodes has the same value.</p>
<p>Each node is a <code>TreeNode</code> with <code>val</code>, <code>left</code> and <code>right</code>. The class is available in your code. The tests build trees from level-order arrays, where <code>null</code> means a missing child.</p>`,
    examples: [
      { input: 'p = [1, 2, 3], q = [1, 2, 3]', output: 'true' },
      { input: 'p = [1, 2], q = [1, null, 2]', output: 'false', note: 'Same values, different shape.' },
      { input: 'p = [1, 2, 1], q = [1, 1, 2]', output: 'false' },
    ],
    starter: `// TreeNode is provided: new TreeNode(val, left, right)
function isSameTree(p, q) {
  // your code here
}
`,
    tests: () => [
      { args: [{"$tree":[1,2,3]},{"$tree":[1,2,3]}], expected: true },
      { args: [{"$tree":[1,2]},{"$tree":[1,null,2]}], expected: false },
      { args: [{"$tree":[1,2,1]},{"$tree":[1,1,2]}], expected: false },
      { args: [{"$tree":[]},{"$tree":[]}], expected: true },
      { args: [{"$tree":[1]},{"$tree":[]}], expected: false },
      { args: [{"$tree":[1,2,3,4]},{"$tree":[1,2,3,4]}], expected: true },
      { args: [{ $tree: range(100000, (i) => i) }, { $tree: range(100000, (i) => i) }], expected: true, label: 'two equal trees (100,000 nodes)' },
      { args: [{ $tree: range(100000, (i) => i) }, { $tree: range(100000, (i) => (i === 99999 ? -1 : i)) }], expected: false, label: 'differ only in the last node' },
    ],
    hints: [
      'Two trees are the same if their roots match AND their left subtrees are the same AND their right subtrees are the same. That is a recursive definition.',
      'Think about the base cases first: both nodes missing (the same), only one missing (different), values differ (different).',
      'If both are null return true. If one is null or the values differ return false. Otherwise return the result of comparing the left pair AND the right pair.',
    ],
    solution: `function isSameTree(p, q) {
  if (!p && !q) return true
  if (!p || !q || p.val !== q.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}
`,
    explain: 'Compare the two roots, then trust the recursion for the two pairs of subtrees. Both empty means equal; exactly one empty or different values means different. Each pair of nodes is compared once.',
    time: 'O(n)',
    space: 'O(h)',
  },
  {
    id: 'symmetric-tree',
    lc: { n: 101, slug: 'symmetric-tree' },
    lesson: 'binary-tree',
    title: 'Symmetric Tree',
    diff: 'easy',
    fn: 'isSymmetric',
    prompt: `<p>Given the <code>root</code> of a binary tree, return <code>true</code> if the tree is <b>symmetric</b>: its left half is a mirror image of its right half.</p>
<p>Each node is a <code>TreeNode</code> with <code>val</code>, <code>left</code> and <code>right</code>. The class is available in your code. The tests build trees from level-order arrays, where <code>null</code> means a missing child.</p>`,
    examples: [
      { input: 'root = [1, 2, 2, 3, 4, 4, 3]', output: 'true' },
      { input: 'root = [1, 2, 2, null, 3, null, 3]', output: 'false', note: 'Both 3s sit on the same side.' },
    ],
    starter: `// TreeNode is provided: new TreeNode(val, left, right)
function isSymmetric(root) {
  // your code here
}
`,
    tests: () => [
      { args: [{"$tree":[1,2,2,3,4,4,3]}], expected: true },
      { args: [{"$tree":[1,2,2,null,3,null,3]}], expected: false },
      { args: [{"$tree":[]}], expected: true },
      { args: [{"$tree":[1]}], expected: true },
      { args: [{"$tree":[1,2,3]}], expected: false },
      { args: [{"$tree":[1,2,2,2,null,2]}], expected: false },
      { args: [{"$tree":[1,2,2,null,3,3]}], expected: true },
      { args: [{ $tree: range(65535, () => 1) }], expected: true, label: 'symmetric tree (65,535 nodes)' },
    ],
    hints: [
      'A tree is symmetric when its left subtree is the mirror of its right subtree. Write a helper that compares two nodes.',
      'Two nodes mirror each other if they hold the same value, the LEFT child of the first mirrors the RIGHT child of the second, and the RIGHT child of the first mirrors the LEFT child of the second.',
      'helper(a, b): both null is true, one null or different values is false, otherwise helper(a.left, b.right) && helper(a.right, b.left). Call it with root.left and root.right.',
    ],
    solution: `function isSymmetric(root) {
  if (!root) return true
  const mirror = (a, b) => {
    if (!a && !b) return true
    if (!a || !b || a.val !== b.val) return false
    return mirror(a.left, b.right) && mirror(a.right, b.left)
  }
  return mirror(root.left, root.right)
}
`,
    explain: 'Same Tree compares left with left and right with right. A mirror crosses over: the outer children must match each other and the inner children must match each other. The rest is the same recursion.',
    time: 'O(n)',
    space: 'O(h)',
  },
  {
    id: 'path-sum',
    lc: { n: 112, slug: 'path-sum' },
    lesson: 'dfs',
    title: 'Path Sum',
    diff: 'easy',
    fn: 'hasPathSum',
    prompt: `<p>Given the <code>root</code> of a binary tree and a number <code>targetSum</code>, return <code>true</code> if the tree has a <b>root-to-leaf path</b> whose values add up to <code>targetSum</code>.</p>
<p>A leaf is a node with no children. The path must end at a leaf.</p>
<p>Each node is a <code>TreeNode</code> with <code>val</code>, <code>left</code> and <code>right</code>. The class is available in your code. The tests build trees from level-order arrays, where <code>null</code> means a missing child.</p>`,
    examples: [
      { input: 'root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], targetSum = 22', output: 'true', note: '5 + 4 + 11 + 2 = 22.' },
      { input: 'root = [1, 2, 3], targetSum = 5', output: 'false' },
      { input: 'root = [1, 2], targetSum = 1', output: 'false', note: 'The root is not a leaf.' },
    ],
    starter: `// TreeNode is provided: new TreeNode(val, left, right)
function hasPathSum(root, targetSum) {
  // your code here
}
`,
    tests: () => [
      { args: [{"$tree":[5,4,8,11,null,13,4,7,2,null,null,null,1]},22], expected: true },
      { args: [{"$tree":[1,2,3]},5], expected: false },
      { args: [{"$tree":[]},0], expected: false },
      { args: [{"$tree":[1,2]},1], expected: false },
      { args: [{"$tree":[1]},1], expected: true },
      { args: [{"$tree":[-2,null,-3]},-5], expected: true },
      { args: [{"$tree":[1,-2,-3,1,3,-2,null,-1]},-1], expected: true },
      { args: [{ $tree: range(100000, () => 1) }, 17], expected: true, label: 'big tree, a path of 17 exists' },
      { args: [{ $tree: range(100000, () => 1) }, 100000], expected: false, label: 'big tree, no such path' },
    ],
    hints: [
      'A root-to-leaf path is made of one step down plus a smaller root-to-leaf path. What do you subtract as you go down?',
      'At each node subtract its value from the target. At a leaf, the path works if what is left equals the leaf value.',
      'If there is no node, return false. If it is a leaf, return root.val === targetSum. Otherwise recurse on both children with targetSum - root.val and combine with ||.',
    ],
    solution: `function hasPathSum(root, targetSum) {
  if (!root) return false
  if (!root.left && !root.right) return root.val === targetSum
  const remaining = targetSum - root.val
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining)
}
`,
    explain: 'Subtracting each value while going down turns the question into "does a path from here to a leaf add up to what is left?". At the leaf the remaining target must equal the leaf value. Either subtree can supply the answer, so the results are combined with ||.',
    time: 'O(n)',
    space: 'O(h)',
  },
  {
    id: 'inorder-traversal',
    lc: { n: 94, slug: 'binary-tree-inorder-traversal' },
    lesson: 'dfs',
    title: 'Binary Tree Inorder Traversal',
    diff: 'easy',
    fn: 'inorderTraversal',
    prompt: `<p>Given the <code>root</code> of a binary tree, return the values of its nodes in <b>inorder</b>: first the left subtree, then the node itself, then the right subtree.</p>
<p>Each node is a <code>TreeNode</code> with <code>val</code>, <code>left</code> and <code>right</code>. The class is available in your code. The tests build trees from level-order arrays, where <code>null</code> means a missing child.</p>`,
    examples: [
      { input: 'root = [1, null, 2, 3]', output: '[1, 3, 2]' },
      { input: 'root = [2, 1, 3]', output: '[1, 2, 3]' },
      { input: 'root = []', output: '[]' },
    ],
    starter: `// TreeNode is provided: new TreeNode(val, left, right)
function inorderTraversal(root) {
  // your code here
}
`,
    tests: () => [
      { args: [{"$tree":[1,null,2,3]}], expected: [1,3,2] },
      { args: [{"$tree":[2,1,3]}], expected: [1,2,3] },
      { args: [{"$tree":[]}], expected: [] },
      { args: [{"$tree":[1]}], expected: [1] },
      { args: [{"$tree":[5,3,8,2,4,7,9]}], expected: [2,3,4,5,7,8,9] },
      { args: [{"$tree":[1,2,3,4,5]}], expected: [4,2,5,1,3] },
      { args: [{ $tree: [0, ...range(2000, (i) => [i + 1, null]).flat()] }], expected: [2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921,1920,1919,1918,1917,1916,1915,1914,1913,1912,1911,1910,1909,1908,1907,1906,1905,1904,1903,1902,1901,1900,1899,1898,1897,1896,1895,1894,1893,1892,1891,1890,1889,1888,1887,1886,1885,1884,1883,1882,1881,1880,1879,1878,1877,1876,1875,1874,1873,1872,1871,1870,1869,1868,1867,1866,1865,1864,1863,1862,1861,1860,1859,1858,1857,1856,1855,1854,1853,1852,1851,1850,1849,1848,1847,1846,1845,1844,1843,1842,1841,1840,1839,1838,1837,1836,1835,1834,1833,1832,1831,1830,1829,1828,1827,1826,1825,1824,1823,1822,1821,1820,1819,1818,1817,1816,1815,1814,1813,1812,1811,1810,1809,1808,1807,1806,1805,1804,1803,1802,1801,1800,1799,1798,1797,1796,1795,1794,1793,1792,1791,1790,1789,1788,1787,1786,1785,1784,1783,1782,1781,1780,1779,1778,1777,1776,1775,1774,1773,1772,1771,1770,1769,1768,1767,1766,1765,1764,1763,1762,1761,1760,1759,1758,1757,1756,1755,1754,1753,1752,1751,1750,1749,1748,1747,1746,1745,1744,1743,1742,1741,1740,1739,1738,1737,1736,1735,1734,1733,1732,1731,1730,1729,1728,1727,1726,1725,1724,1723,1722,1721,1720,1719,1718,1717,1716,1715,1714,1713,1712,1711,1710,1709,1708,1707,1706,1705,1704,1703,1702,1701,1700,1699,1698,1697,1696,1695,1694,1693,1692,1691,1690,1689,1688,1687,1686,1685,1684,1683,1682,1681,1680,1679,1678,1677,1676,1675,1674,1673,1672,1671,1670,1669,1668,1667,1666,1665,1664,1663,1662,1661,1660,1659,1658,1657,1656,1655,1654,1653,1652,1651,1650,1649,1648,1647,1646,1645,1644,1643,1642,1641,1640,1639,1638,1637,1636,1635,1634,1633,1632,1631,1630,1629,1628,1627,1626,1625,1624,1623,1622,1621,1620,1619,1618,1617,1616,1615,1614,1613,1612,1611,1610,1609,1608,1607,1606,1605,1604,1603,1602,1601,1600,1599,1598,1597,1596,1595,1594,1593,1592,1591,1590,1589,1588,1587,1586,1585,1584,1583,1582,1581,1580,1579,1578,1577,1576,1575,1574,1573,1572,1571,1570,1569,1568,1567,1566,1565,1564,1563,1562,1561,1560,1559,1558,1557,1556,1555,1554,1553,1552,1551,1550,1549,1548,1547,1546,1545,1544,1543,1542,1541,1540,1539,1538,1537,1536,1535,1534,1533,1532,1531,1530,1529,1528,1527,1526,1525,1524,1523,1522,1521,1520,1519,1518,1517,1516,1515,1514,1513,1512,1511,1510,1509,1508,1507,1506,1505,1504,1503,1502,1501,1500,1499,1498,1497,1496,1495,1494,1493,1492,1491,1490,1489,1488,1487,1486,1485,1484,1483,1482,1481,1480,1479,1478,1477,1476,1475,1474,1473,1472,1471,1470,1469,1468,1467,1466,1465,1464,1463,1462,1461,1460,1459,1458,1457,1456,1455,1454,1453,1452,1451,1450,1449,1448,1447,1446,1445,1444,1443,1442,1441,1440,1439,1438,1437,1436,1435,1434,1433,1432,1431,1430,1429,1428,1427,1426,1425,1424,1423,1422,1421,1420,1419,1418,1417,1416,1415,1414,1413,1412,1411,1410,1409,1408,1407,1406,1405,1404,1403,1402,1401,1400,1399,1398,1397,1396,1395,1394,1393,1392,1391,1390,1389,1388,1387,1386,1385,1384,1383,1382,1381,1380,1379,1378,1377,1376,1375,1374,1373,1372,1371,1370,1369,1368,1367,1366,1365,1364,1363,1362,1361,1360,1359,1358,1357,1356,1355,1354,1353,1352,1351,1350,1349,1348,1347,1346,1345,1344,1343,1342,1341,1340,1339,1338,1337,1336,1335,1334,1333,1332,1331,1330,1329,1328,1327,1326,1325,1324,1323,1322,1321,1320,1319,1318,1317,1316,1315,1314,1313,1312,1311,1310,1309,1308,1307,1306,1305,1304,1303,1302,1301,1300,1299,1298,1297,1296,1295,1294,1293,1292,1291,1290,1289,1288,1287,1286,1285,1284,1283,1282,1281,1280,1279,1278,1277,1276,1275,1274,1273,1272,1271,1270,1269,1268,1267,1266,1265,1264,1263,1262,1261,1260,1259,1258,1257,1256,1255,1254,1253,1252,1251,1250,1249,1248,1247,1246,1245,1244,1243,1242,1241,1240,1239,1238,1237,1236,1235,1234,1233,1232,1231,1230,1229,1228,1227,1226,1225,1224,1223,1222,1221,1220,1219,1218,1217,1216,1215,1214,1213,1212,1211,1210,1209,1208,1207,1206,1205,1204,1203,1202,1201,1200,1199,1198,1197,1196,1195,1194,1193,1192,1191,1190,1189,1188,1187,1186,1185,1184,1183,1182,1181,1180,1179,1178,1177,1176,1175,1174,1173,1172,1171,1170,1169,1168,1167,1166,1165,1164,1163,1162,1161,1160,1159,1158,1157,1156,1155,1154,1153,1152,1151,1150,1149,1148,1147,1146,1145,1144,1143,1142,1141,1140,1139,1138,1137,1136,1135,1134,1133,1132,1131,1130,1129,1128,1127,1126,1125,1124,1123,1122,1121,1120,1119,1118,1117,1116,1115,1114,1113,1112,1111,1110,1109,1108,1107,1106,1105,1104,1103,1102,1101,1100,1099,1098,1097,1096,1095,1094,1093,1092,1091,1090,1089,1088,1087,1086,1085,1084,1083,1082,1081,1080,1079,1078,1077,1076,1075,1074,1073,1072,1071,1070,1069,1068,1067,1066,1065,1064,1063,1062,1061,1060,1059,1058,1057,1056,1055,1054,1053,1052,1051,1050,1049,1048,1047,1046,1045,1044,1043,1042,1041,1040,1039,1038,1037,1036,1035,1034,1033,1032,1031,1030,1029,1028,1027,1026,1025,1024,1023,1022,1021,1020,1019,1018,1017,1016,1015,1014,1013,1012,1011,1010,1009,1008,1007,1006,1005,1004,1003,1002,1001,1000,999,998,997,996,995,994,993,992,991,990,989,988,987,986,985,984,983,982,981,980,979,978,977,976,975,974,973,972,971,970,969,968,967,966,965,964,963,962,961,960,959,958,957,956,955,954,953,952,951,950,949,948,947,946,945,944,943,942,941,940,939,938,937,936,935,934,933,932,931,930,929,928,927,926,925,924,923,922,921,920,919,918,917,916,915,914,913,912,911,910,909,908,907,906,905,904,903,902,901,900,899,898,897,896,895,894,893,892,891,890,889,888,887,886,885,884,883,882,881,880,879,878,877,876,875,874,873,872,871,870,869,868,867,866,865,864,863,862,861,860,859,858,857,856,855,854,853,852,851,850,849,848,847,846,845,844,843,842,841,840,839,838,837,836,835,834,833,832,831,830,829,828,827,826,825,824,823,822,821,820,819,818,817,816,815,814,813,812,811,810,809,808,807,806,805,804,803,802,801,800,799,798,797,796,795,794,793,792,791,790,789,788,787,786,785,784,783,782,781,780,779,778,777,776,775,774,773,772,771,770,769,768,767,766,765,764,763,762,761,760,759,758,757,756,755,754,753,752,751,750,749,748,747,746,745,744,743,742,741,740,739,738,737,736,735,734,733,732,731,730,729,728,727,726,725,724,723,722,721,720,719,718,717,716,715,714,713,712,711,710,709,708,707,706,705,704,703,702,701,700,699,698,697,696,695,694,693,692,691,690,689,688,687,686,685,684,683,682,681,680,679,678,677,676,675,674,673,672,671,670,669,668,667,666,665,664,663,662,661,660,659,658,657,656,655,654,653,652,651,650,649,648,647,646,645,644,643,642,641,640,639,638,637,636,635,634,633,632,631,630,629,628,627,626,625,624,623,622,621,620,619,618,617,616,615,614,613,612,611,610,609,608,607,606,605,604,603,602,601,600,599,598,597,596,595,594,593,592,591,590,589,588,587,586,585,584,583,582,581,580,579,578,577,576,575,574,573,572,571,570,569,568,567,566,565,564,563,562,561,560,559,558,557,556,555,554,553,552,551,550,549,548,547,546,545,544,543,542,541,540,539,538,537,536,535,534,533,532,531,530,529,528,527,526,525,524,523,522,521,520,519,518,517,516,515,514,513,512,511,510,509,508,507,506,505,504,503,502,501,500,499,498,497,496,495,494,493,492,491,490,489,488,487,486,485,484,483,482,481,480,479,478,477,476,475,474,473,472,471,470,469,468,467,466,465,464,463,462,461,460,459,458,457,456,455,454,453,452,451,450,449,448,447,446,445,444,443,442,441,440,439,438,437,436,435,434,433,432,431,430,429,428,427,426,425,424,423,422,421,420,419,418,417,416,415,414,413,412,411,410,409,408,407,406,405,404,403,402,401,400,399,398,397,396,395,394,393,392,391,390,389,388,387,386,385,384,383,382,381,380,379,378,377,376,375,374,373,372,371,370,369,368,367,366,365,364,363,362,361,360,359,358,357,356,355,354,353,352,351,350,349,348,347,346,345,344,343,342,341,340,339,338,337,336,335,334,333,332,331,330,329,328,327,326,325,324,323,322,321,320,319,318,317,316,315,314,313,312,311,310,309,308,307,306,305,304,303,302,301,300,299,298,297,296,295,294,293,292,291,290,289,288,287,286,285,284,283,282,281,280,279,278,277,276,275,274,273,272,271,270,269,268,267,266,265,264,263,262,261,260,259,258,257,256,255,254,253,252,251,250,249,248,247,246,245,244,243,242,241,240,239,238,237,236,235,234,233,232,231,230,229,228,227,226,225,224,223,222,221,220,219,218,217,216,215,214,213,212,211,210,209,208,207,206,205,204,203,202,201,200,199,198,197,196,195,194,193,192,191,190,189,188,187,186,185,184,183,182,181,180,179,178,177,176,175,174,173,172,171,170,169,168,167,166,165,164,163,162,161,160,159,158,157,156,155,154,153,152,151,150,149,148,147,146,145,144,143,142,141,140,139,138,137,136,135,134,133,132,131,130,129,128,127,126,125,124,123,122,121,120,119,118,117,116,115,114,113,112,111,110,109,108,107,106,105,104,103,102,101,100,99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], label: 'a tree that leans left (2,000 levels)' },
    ],
    hints: [
      'Inorder means: finish the whole left subtree, then record the node, then do the right subtree.',
      'Write a helper that takes a node. If it is null, stop. Otherwise call it on the left child, push the value, then call it on the right child.',
      'Keep one array outside the helper and return it at the end. The order of the three lines inside the helper is what makes it inorder.',
    ],
    solution: `function inorderTraversal(root) {
  const out = []
  const visit = (node) => {
    if (!node) return
    visit(node.left)
    out.push(node.val)
    visit(node.right)
  }
  visit(root)
  return out
}
`,
    explain: 'Inorder, preorder and postorder differ only in where the value is recorded relative to the two recursive calls. Recording it between the left and the right call gives inorder. For a binary search tree this lists the values in sorted order.',
    time: 'O(n)',
    space: 'O(h)',
  },
  {
    id: 'binary-tree-paths',
    lc: { n: 257, slug: 'binary-tree-paths' },
    lesson: 'dfs',
    title: 'Binary Tree Paths',
    diff: 'easy',
    fn: 'binaryTreePaths',
    compare: 'unordered',
    prompt: `<p>Given the <code>root</code> of a binary tree, return <b>all root-to-leaf paths</b> as strings. Write each path as the values joined by <code>"-&gt;"</code>, like <code>"1-&gt;2-&gt;5"</code>. The order of the paths does not matter.</p>
<p>Each node is a <code>TreeNode</code> with <code>val</code>, <code>left</code> and <code>right</code>. The class is available in your code. The tests build trees from level-order arrays, where <code>null</code> means a missing child.</p>`,
    examples: [
      { input: 'root = [1, 2, 3, null, 5]', output: '["1->2->5", "1->3"]' },
      { input: 'root = [1]', output: '["1"]' },
    ],
    starter: `// TreeNode is provided: new TreeNode(val, left, right)
function binaryTreePaths(root) {
  // your code here
}
`,
    tests: () => [
      { args: [{"$tree":[1,2,3,null,5]}], expected: ["1->2->5","1->3"] },
      { args: [{"$tree":[1]}], expected: ["1"] },
      { args: [{"$tree":[]}], expected: [] },
      { args: [{"$tree":[1,2]}], expected: ["1->2"] },
      { args: [{"$tree":[1,2,3]}], expected: ["1->2","1->3"] },
      { args: [{"$tree":[-1,-2,3]}], expected: ["-1->-2","-1->3"] },
      { args: [{"$tree":[0,1,2,3,4,5,6]}], expected: ["0->1->3","0->1->4","0->2->5","0->2->6"] },
      { args: [{ $tree: [0, ...range(1500, (i) => [i + 1, null]).flat()] }], expected: ["0->1->2->3->4->5->6->7->8->9->10->11->12->13->14->15->16->17->18->19->20->21->22->23->24->25->26->27->28->29->30->31->32->33->34->35->36->37->38->39->40->41->42->43->44->45->46->47->48->49->50->51->52->53->54->55->56->57->58->59->60->61->62->63->64->65->66->67->68->69->70->71->72->73->74->75->76->77->78->79->80->81->82->83->84->85->86->87->88->89->90->91->92->93->94->95->96->97->98->99->100->101->102->103->104->105->106->107->108->109->110->111->112->113->114->115->116->117->118->119->120->121->122->123->124->125->126->127->128->129->130->131->132->133->134->135->136->137->138->139->140->141->142->143->144->145->146->147->148->149->150->151->152->153->154->155->156->157->158->159->160->161->162->163->164->165->166->167->168->169->170->171->172->173->174->175->176->177->178->179->180->181->182->183->184->185->186->187->188->189->190->191->192->193->194->195->196->197->198->199->200->201->202->203->204->205->206->207->208->209->210->211->212->213->214->215->216->217->218->219->220->221->222->223->224->225->226->227->228->229->230->231->232->233->234->235->236->237->238->239->240->241->242->243->244->245->246->247->248->249->250->251->252->253->254->255->256->257->258->259->260->261->262->263->264->265->266->267->268->269->270->271->272->273->274->275->276->277->278->279->280->281->282->283->284->285->286->287->288->289->290->291->292->293->294->295->296->297->298->299->300->301->302->303->304->305->306->307->308->309->310->311->312->313->314->315->316->317->318->319->320->321->322->323->324->325->326->327->328->329->330->331->332->333->334->335->336->337->338->339->340->341->342->343->344->345->346->347->348->349->350->351->352->353->354->355->356->357->358->359->360->361->362->363->364->365->366->367->368->369->370->371->372->373->374->375->376->377->378->379->380->381->382->383->384->385->386->387->388->389->390->391->392->393->394->395->396->397->398->399->400->401->402->403->404->405->406->407->408->409->410->411->412->413->414->415->416->417->418->419->420->421->422->423->424->425->426->427->428->429->430->431->432->433->434->435->436->437->438->439->440->441->442->443->444->445->446->447->448->449->450->451->452->453->454->455->456->457->458->459->460->461->462->463->464->465->466->467->468->469->470->471->472->473->474->475->476->477->478->479->480->481->482->483->484->485->486->487->488->489->490->491->492->493->494->495->496->497->498->499->500->501->502->503->504->505->506->507->508->509->510->511->512->513->514->515->516->517->518->519->520->521->522->523->524->525->526->527->528->529->530->531->532->533->534->535->536->537->538->539->540->541->542->543->544->545->546->547->548->549->550->551->552->553->554->555->556->557->558->559->560->561->562->563->564->565->566->567->568->569->570->571->572->573->574->575->576->577->578->579->580->581->582->583->584->585->586->587->588->589->590->591->592->593->594->595->596->597->598->599->600->601->602->603->604->605->606->607->608->609->610->611->612->613->614->615->616->617->618->619->620->621->622->623->624->625->626->627->628->629->630->631->632->633->634->635->636->637->638->639->640->641->642->643->644->645->646->647->648->649->650->651->652->653->654->655->656->657->658->659->660->661->662->663->664->665->666->667->668->669->670->671->672->673->674->675->676->677->678->679->680->681->682->683->684->685->686->687->688->689->690->691->692->693->694->695->696->697->698->699->700->701->702->703->704->705->706->707->708->709->710->711->712->713->714->715->716->717->718->719->720->721->722->723->724->725->726->727->728->729->730->731->732->733->734->735->736->737->738->739->740->741->742->743->744->745->746->747->748->749->750->751->752->753->754->755->756->757->758->759->760->761->762->763->764->765->766->767->768->769->770->771->772->773->774->775->776->777->778->779->780->781->782->783->784->785->786->787->788->789->790->791->792->793->794->795->796->797->798->799->800->801->802->803->804->805->806->807->808->809->810->811->812->813->814->815->816->817->818->819->820->821->822->823->824->825->826->827->828->829->830->831->832->833->834->835->836->837->838->839->840->841->842->843->844->845->846->847->848->849->850->851->852->853->854->855->856->857->858->859->860->861->862->863->864->865->866->867->868->869->870->871->872->873->874->875->876->877->878->879->880->881->882->883->884->885->886->887->888->889->890->891->892->893->894->895->896->897->898->899->900->901->902->903->904->905->906->907->908->909->910->911->912->913->914->915->916->917->918->919->920->921->922->923->924->925->926->927->928->929->930->931->932->933->934->935->936->937->938->939->940->941->942->943->944->945->946->947->948->949->950->951->952->953->954->955->956->957->958->959->960->961->962->963->964->965->966->967->968->969->970->971->972->973->974->975->976->977->978->979->980->981->982->983->984->985->986->987->988->989->990->991->992->993->994->995->996->997->998->999->1000->1001->1002->1003->1004->1005->1006->1007->1008->1009->1010->1011->1012->1013->1014->1015->1016->1017->1018->1019->1020->1021->1022->1023->1024->1025->1026->1027->1028->1029->1030->1031->1032->1033->1034->1035->1036->1037->1038->1039->1040->1041->1042->1043->1044->1045->1046->1047->1048->1049->1050->1051->1052->1053->1054->1055->1056->1057->1058->1059->1060->1061->1062->1063->1064->1065->1066->1067->1068->1069->1070->1071->1072->1073->1074->1075->1076->1077->1078->1079->1080->1081->1082->1083->1084->1085->1086->1087->1088->1089->1090->1091->1092->1093->1094->1095->1096->1097->1098->1099->1100->1101->1102->1103->1104->1105->1106->1107->1108->1109->1110->1111->1112->1113->1114->1115->1116->1117->1118->1119->1120->1121->1122->1123->1124->1125->1126->1127->1128->1129->1130->1131->1132->1133->1134->1135->1136->1137->1138->1139->1140->1141->1142->1143->1144->1145->1146->1147->1148->1149->1150->1151->1152->1153->1154->1155->1156->1157->1158->1159->1160->1161->1162->1163->1164->1165->1166->1167->1168->1169->1170->1171->1172->1173->1174->1175->1176->1177->1178->1179->1180->1181->1182->1183->1184->1185->1186->1187->1188->1189->1190->1191->1192->1193->1194->1195->1196->1197->1198->1199->1200->1201->1202->1203->1204->1205->1206->1207->1208->1209->1210->1211->1212->1213->1214->1215->1216->1217->1218->1219->1220->1221->1222->1223->1224->1225->1226->1227->1228->1229->1230->1231->1232->1233->1234->1235->1236->1237->1238->1239->1240->1241->1242->1243->1244->1245->1246->1247->1248->1249->1250->1251->1252->1253->1254->1255->1256->1257->1258->1259->1260->1261->1262->1263->1264->1265->1266->1267->1268->1269->1270->1271->1272->1273->1274->1275->1276->1277->1278->1279->1280->1281->1282->1283->1284->1285->1286->1287->1288->1289->1290->1291->1292->1293->1294->1295->1296->1297->1298->1299->1300->1301->1302->1303->1304->1305->1306->1307->1308->1309->1310->1311->1312->1313->1314->1315->1316->1317->1318->1319->1320->1321->1322->1323->1324->1325->1326->1327->1328->1329->1330->1331->1332->1333->1334->1335->1336->1337->1338->1339->1340->1341->1342->1343->1344->1345->1346->1347->1348->1349->1350->1351->1352->1353->1354->1355->1356->1357->1358->1359->1360->1361->1362->1363->1364->1365->1366->1367->1368->1369->1370->1371->1372->1373->1374->1375->1376->1377->1378->1379->1380->1381->1382->1383->1384->1385->1386->1387->1388->1389->1390->1391->1392->1393->1394->1395->1396->1397->1398->1399->1400->1401->1402->1403->1404->1405->1406->1407->1408->1409->1410->1411->1412->1413->1414->1415->1416->1417->1418->1419->1420->1421->1422->1423->1424->1425->1426->1427->1428->1429->1430->1431->1432->1433->1434->1435->1436->1437->1438->1439->1440->1441->1442->1443->1444->1445->1446->1447->1448->1449->1450->1451->1452->1453->1454->1455->1456->1457->1458->1459->1460->1461->1462->1463->1464->1465->1466->1467->1468->1469->1470->1471->1472->1473->1474->1475->1476->1477->1478->1479->1480->1481->1482->1483->1484->1485->1486->1487->1488->1489->1490->1491->1492->1493->1494->1495->1496->1497->1498->1499->1500"], label: 'one long path (1,500 levels)' },
    ],
    hints: [
      'A path grows by one node each time you go down. What do you need to carry from the parent to the child?',
      'Pass the path text built so far. At each node add "->" and the value to it (no arrow for the root).',
      'When a node has no children it is a leaf: push the finished text into the result. Otherwise recurse into the children with the new text.',
    ],
    solution: `function binaryTreePaths(root) {
  const out = []
  const walk = (node, path) => {
    if (!node) return
    const text = path === '' ? String(node.val) : path + '->' + node.val
    if (!node.left && !node.right) {
      out.push(text)
      return
    }
    walk(node.left, text)
    walk(node.right, text)
  }
  walk(root, '')
  return out
}
`,
    explain: 'DFS passes the path built so far down to each child, so when a leaf is reached the text is already complete. A node with one child is not a leaf, so only a node with neither child records a path.',
    time: 'O(n × h)',
    space: 'O(n × h)',
  },
  {
    id: 'level-order-traversal',
    lc: { n: 102, slug: 'binary-tree-level-order-traversal' },
    lesson: 'bfs',
    title: 'Binary Tree Level Order Traversal',
    diff: 'medium',
    fn: 'levelOrder',
    prompt: `<p>Given the <code>root</code> of a binary tree, return its values <b>level by level</b>, from left to right. The result is an array of arrays: one inner array per level.</p>
<p>Each node is a <code>TreeNode</code> with <code>val</code>, <code>left</code> and <code>right</code>. The class is available in your code. The tests build trees from level-order arrays, where <code>null</code> means a missing child.</p>`,
    examples: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', output: '[[3], [9, 20], [15, 7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' },
    ],
    starter: `// TreeNode is provided: new TreeNode(val, left, right)
function levelOrder(root) {
  // your code here
}
`,
    tests: () => [
      { args: [{"$tree":[3,9,20,null,null,15,7]}], expected: [[3],[9,20],[15,7]] },
      { args: [{"$tree":[1]}], expected: [[1]] },
      { args: [{"$tree":[]}], expected: [] },
      { args: [{"$tree":[1,2,3,4,5]}], expected: [[1],[2,3],[4,5]] },
      { args: [{"$tree":[1,null,2]}], expected: [[1],[2]] },
      { args: [{"$tree":[1,2,null,3]}], expected: [[1],[2],[3]] },
      { args: [{"$tree":[1,2,3,null,4,5]}], expected: [[1],[2,3],[4,5]] },
      { args: [{ $tree: range(100000, (i) => i) }], expected: range(17, (d) => range(Math.min(2 ** d, 100000 - (2 ** d - 1)), (i) => 2 ** d - 1 + i)), label: 'big tree (100,000 nodes)' },
    ],
    hints: [
      'A queue gives you the nodes in the order they were discovered, which is exactly the order of levels.',
      'At the start of each round the queue holds one full level. Remember its size, then take exactly that many nodes. Their children go to the back of the queue and form the next level.',
      'Loop while the queue is not empty. In each round, make an empty array for the level, take size nodes, push their values into it, enqueue the children, and add the level array to the result. Avoid queue.shift() on big trees: use an index instead.',
    ],
    solution: `function levelOrder(root) {
  if (!root) return []
  const result = []
  const queue = [root]
  let head = 0
  while (head < queue.length) {
    const size = queue.length - head
    const level = []
    for (let i = 0; i < size; i++) {
      const node = queue[head++]
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
  }
  return result
}
`,
    explain: 'A queue processes nodes first in, first out, so all nodes of one level come out before any node of the next. Taking exactly "size" nodes per round, where size is measured before adding children, cuts the stream of nodes into levels.',
    time: 'O(n)',
    space: 'O(n)',
  },
  {
    id: 'right-side-view',
    lc: { n: 199, slug: 'binary-tree-right-side-view' },
    lesson: 'bfs',
    title: 'Binary Tree Right Side View',
    diff: 'medium',
    fn: 'rightSideView',
    prompt: `<p>Imagine standing on the <b>right side</b> of a binary tree. Return the values of the nodes you can see, from top to bottom.</p>
<p>At every level you see the rightmost node of that level.</p>
<p>Each node is a <code>TreeNode</code> with <code>val</code>, <code>left</code> and <code>right</code>. The class is available in your code. The tests build trees from level-order arrays, where <code>null</code> means a missing child.</p>`,
    examples: [
      { input: 'root = [1, 2, 3, null, 5, null, 4]', output: '[1, 3, 4]' },
      { input: 'root = [1, null, 3]', output: '[1, 3]' },
      { input: 'root = [1, 2]', output: '[1, 2]', note: 'The 2 is visible because nothing is to its right at that level.' },
    ],
    starter: `// TreeNode is provided: new TreeNode(val, left, right)
function rightSideView(root) {
  // your code here
}
`,
    tests: () => [
      { args: [{"$tree":[1,2,3,null,5,null,4]}], expected: [1,3,4] },
      { args: [{"$tree":[1,null,3]}], expected: [1,3] },
      { args: [{"$tree":[]}], expected: [] },
      { args: [{"$tree":[1]}], expected: [1] },
      { args: [{"$tree":[1,2]}], expected: [1,2] },
      { args: [{"$tree":[1,2,3,4]}], expected: [1,3,4] },
      { args: [{"$tree":[1,2,3,4,null,null,null,5]}], expected: [1,3,4,5] },
      { args: [{ $tree: range(100000, (i) => i) }], expected: [0,2,6,14,30,62,126,254,510,1022,2046,4094,8190,16382,32766,65534,99999], label: 'big tree (100,000 nodes)' },
      { args: [{ $tree: [0, ...range(2000, (i) => [i + 1, null]).flat()] }], expected: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,600,601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,658,659,660,661,662,663,664,665,666,667,668,669,670,671,672,673,674,675,676,677,678,679,680,681,682,683,684,685,686,687,688,689,690,691,692,693,694,695,696,697,698,699,700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745,746,747,748,749,750,751,752,753,754,755,756,757,758,759,760,761,762,763,764,765,766,767,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867,868,869,870,871,872,873,874,875,876,877,878,879,880,881,882,883,884,885,886,887,888,889,890,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905,906,907,908,909,910,911,912,913,914,915,916,917,918,919,920,921,922,923,924,925,926,927,928,929,930,931,932,933,934,935,936,937,938,939,940,941,942,943,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,970,971,972,973,974,975,976,977,978,979,980,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,999,1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1022,1023,1024,1025,1026,1027,1028,1029,1030,1031,1032,1033,1034,1035,1036,1037,1038,1039,1040,1041,1042,1043,1044,1045,1046,1047,1048,1049,1050,1051,1052,1053,1054,1055,1056,1057,1058,1059,1060,1061,1062,1063,1064,1065,1066,1067,1068,1069,1070,1071,1072,1073,1074,1075,1076,1077,1078,1079,1080,1081,1082,1083,1084,1085,1086,1087,1088,1089,1090,1091,1092,1093,1094,1095,1096,1097,1098,1099,1100,1101,1102,1103,1104,1105,1106,1107,1108,1109,1110,1111,1112,1113,1114,1115,1116,1117,1118,1119,1120,1121,1122,1123,1124,1125,1126,1127,1128,1129,1130,1131,1132,1133,1134,1135,1136,1137,1138,1139,1140,1141,1142,1143,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1155,1156,1157,1158,1159,1160,1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1186,1187,1188,1189,1190,1191,1192,1193,1194,1195,1196,1197,1198,1199,1200,1201,1202,1203,1204,1205,1206,1207,1208,1209,1210,1211,1212,1213,1214,1215,1216,1217,1218,1219,1220,1221,1222,1223,1224,1225,1226,1227,1228,1229,1230,1231,1232,1233,1234,1235,1236,1237,1238,1239,1240,1241,1242,1243,1244,1245,1246,1247,1248,1249,1250,1251,1252,1253,1254,1255,1256,1257,1258,1259,1260,1261,1262,1263,1264,1265,1266,1267,1268,1269,1270,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1281,1282,1283,1284,1285,1286,1287,1288,1289,1290,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,1304,1305,1306,1307,1308,1309,1310,1311,1312,1313,1314,1315,1316,1317,1318,1319,1320,1321,1322,1323,1324,1325,1326,1327,1328,1329,1330,1331,1332,1333,1334,1335,1336,1337,1338,1339,1340,1341,1342,1343,1344,1345,1346,1347,1348,1349,1350,1351,1352,1353,1354,1355,1356,1357,1358,1359,1360,1361,1362,1363,1364,1365,1366,1367,1368,1369,1370,1371,1372,1373,1374,1375,1376,1377,1378,1379,1380,1381,1382,1383,1384,1385,1386,1387,1388,1389,1390,1391,1392,1393,1394,1395,1396,1397,1398,1399,1400,1401,1402,1403,1404,1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421,1422,1423,1424,1425,1426,1427,1428,1429,1430,1431,1432,1433,1434,1435,1436,1437,1438,1439,1440,1441,1442,1443,1444,1445,1446,1447,1448,1449,1450,1451,1452,1453,1454,1455,1456,1457,1458,1459,1460,1461,1462,1463,1464,1465,1466,1467,1468,1469,1470,1471,1472,1473,1474,1475,1476,1477,1478,1479,1480,1481,1482,1483,1484,1485,1486,1487,1488,1489,1490,1491,1492,1493,1494,1495,1496,1497,1498,1499,1500,1501,1502,1503,1504,1505,1506,1507,1508,1509,1510,1511,1512,1513,1514,1515,1516,1517,1518,1519,1520,1521,1522,1523,1524,1525,1526,1527,1528,1529,1530,1531,1532,1533,1534,1535,1536,1537,1538,1539,1540,1541,1542,1543,1544,1545,1546,1547,1548,1549,1550,1551,1552,1553,1554,1555,1556,1557,1558,1559,1560,1561,1562,1563,1564,1565,1566,1567,1568,1569,1570,1571,1572,1573,1574,1575,1576,1577,1578,1579,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1590,1591,1592,1593,1594,1595,1596,1597,1598,1599,1600,1601,1602,1603,1604,1605,1606,1607,1608,1609,1610,1611,1612,1613,1614,1615,1616,1617,1618,1619,1620,1621,1622,1623,1624,1625,1626,1627,1628,1629,1630,1631,1632,1633,1634,1635,1636,1637,1638,1639,1640,1641,1642,1643,1644,1645,1646,1647,1648,1649,1650,1651,1652,1653,1654,1655,1656,1657,1658,1659,1660,1661,1662,1663,1664,1665,1666,1667,1668,1669,1670,1671,1672,1673,1674,1675,1676,1677,1678,1679,1680,1681,1682,1683,1684,1685,1686,1687,1688,1689,1690,1691,1692,1693,1694,1695,1696,1697,1698,1699,1700,1701,1702,1703,1704,1705,1706,1707,1708,1709,1710,1711,1712,1713,1714,1715,1716,1717,1718,1719,1720,1721,1722,1723,1724,1725,1726,1727,1728,1729,1730,1731,1732,1733,1734,1735,1736,1737,1738,1739,1740,1741,1742,1743,1744,1745,1746,1747,1748,1749,1750,1751,1752,1753,1754,1755,1756,1757,1758,1759,1760,1761,1762,1763,1764,1765,1766,1767,1768,1769,1770,1771,1772,1773,1774,1775,1776,1777,1778,1779,1780,1781,1782,1783,1784,1785,1786,1787,1788,1789,1790,1791,1792,1793,1794,1795,1796,1797,1798,1799,1800,1801,1802,1803,1804,1805,1806,1807,1808,1809,1810,1811,1812,1813,1814,1815,1816,1817,1818,1819,1820,1821,1822,1823,1824,1825,1826,1827,1828,1829,1830,1831,1832,1833,1834,1835,1836,1837,1838,1839,1840,1841,1842,1843,1844,1845,1846,1847,1848,1849,1850,1851,1852,1853,1854,1855,1856,1857,1858,1859,1860,1861,1862,1863,1864,1865,1866,1867,1868,1869,1870,1871,1872,1873,1874,1875,1876,1877,1878,1879,1880,1881,1882,1883,1884,1885,1886,1887,1888,1889,1890,1891,1892,1893,1894,1895,1896,1897,1898,1899,1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000], label: 'a tree that leans left' },
    ],
    hints: [
      'What you see at each level is just one node of that level. Which one?',
      'Walk the tree level by level with a queue, like in a level order traversal.',
      'In each round, the last node you take from the queue is the rightmost one. Push its value to the result. Still add the children of every node to the queue.',
    ],
    solution: `function rightSideView(root) {
  if (!root) return []
  const view = []
  const queue = [root]
  let head = 0
  while (head < queue.length) {
    const size = queue.length - head
    for (let i = 0; i < size; i++) {
      const node = queue[head++]
      if (i === size - 1) view.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }
  return view
}
`,
    explain: 'It is the level order traversal, but only the last node of each level is kept. A node on the left is visible when the right side of its level is shorter, which this approach handles naturally because it looks at levels, not at the right spine.',
    time: 'O(n)',
    space: 'O(w)',
  },
  {
    id: 'validate-bst',
    lc: { n: 98, slug: 'validate-binary-search-tree' },
    lesson: 'bst',
    title: 'Validate Binary Search Tree',
    diff: 'medium',
    fn: 'isValidBST',
    prompt: `<p>Given the <code>root</code> of a binary tree, return <code>true</code> if it is a valid <b>binary search tree</b>:</p>
<ul><li>every value in the left subtree of a node is <b>less than</b> the node's value,</li><li>every value in the right subtree is <b>greater than</b> the node's value,</li><li>both subtrees are valid binary search trees too.</li></ul>
<p>Each node is a <code>TreeNode</code> with <code>val</code>, <code>left</code> and <code>right</code>. The class is available in your code. The tests build trees from level-order arrays, where <code>null</code> means a missing child.</p>`,
    examples: [
      { input: 'root = [2, 1, 3]', output: 'true' },
      { input: 'root = [5, 1, 4, null, null, 3, 6]', output: 'false' },
      { input: 'root = [5, 4, 6, null, null, 3, 7]', output: 'false', note: '3 is smaller than its parent 6, but it is in the right subtree of 5.' },
    ],
    starter: `// TreeNode is provided: new TreeNode(val, left, right)
function isValidBST(root) {
  // your code here
}
`,
    tests: () => [
      { args: [{"$tree":[2,1,3]}], expected: true },
      { args: [{"$tree":[5,1,4,null,null,3,6]}], expected: false },
      { args: [{"$tree":[]}], expected: true },
      { args: [{"$tree":[1]}], expected: true },
      { args: [{"$tree":[5,4,6,null,null,3,7]}], expected: false },
      { args: [{"$tree":[2,2,2]}], expected: false },
      { args: [{"$tree":[-2147483648]}], expected: true },
      { args: [{"$tree":[1,1]}], expected: false },
      { args: [{ $tree: range(65535, (i) => { const d = 31 - Math.clz32(i + 1); const p = i + 1 - 2 ** d; return (2 * p + 1) * 2 ** (15 - d) - 1 }) }], expected: true, label: 'valid tree with 65,535 nodes' },
      { args: [{ $tree: (() => { const a = range(65535, (i) => { const d = 31 - Math.clz32(i + 1); const p = i + 1 - 2 ** d; return (2 * p + 1) * 2 ** (15 - d) - 1 }); a[65534] = 0; return a })() }], expected: false, label: 'one wrong node at the very end' },
    ],
    hints: [
      'Checking only that each node is bigger than its left child and smaller than its right child is not enough. A deep node must also respect its far-away ancestors.',
      'Pass down a range (min, max) that the node value must stay inside. The root can be anything: (-Infinity, Infinity).',
      'Going left, the node value becomes the new max. Going right, it becomes the new min. A node is invalid if value <= min or value >= max (equal values are not allowed).',
    ],
    solution: `function isValidBST(root) {
  const ok = (node, low, high) => {
    if (!node) return true
    if (node.val <= low || node.val >= high) return false
    return ok(node.left, low, node.val) && ok(node.right, node.val, high)
  }
  return ok(root, -Infinity, Infinity)
}
`,
    explain: 'Each node must lie strictly between the closest ancestor on its left and the closest ancestor on its right. Passing the allowed range down the tree checks exactly that, and each node is looked at once.',
    time: 'O(n)',
    space: 'O(h)',
  },
  {
    id: 'kth-smallest-bst',
    lc: { n: 230, slug: 'kth-smallest-element-in-a-bst' },
    lesson: 'bst',
    title: 'Kth Smallest Element in a BST',
    diff: 'medium',
    fn: 'kthSmallest',
    prompt: `<p>Given the <code>root</code> of a binary search tree and an integer <code>k</code>, return the <b>k-th smallest value</b> in the tree. Counting starts at 1.</p>
<p>Each node is a <code>TreeNode</code> with <code>val</code>, <code>left</code> and <code>right</code>. The class is available in your code. The tests build trees from level-order arrays, where <code>null</code> means a missing child.</p>`,
    examples: [
      { input: 'root = [3, 1, 4, null, 2], k = 1', output: '1' },
      { input: 'root = [5, 3, 6, 2, 4, null, null, 1], k = 3', output: '3' },
    ],
    starter: `// TreeNode is provided: new TreeNode(val, left, right)
function kthSmallest(root, k) {
  // your code here
}
`,
    tests: () => [
      { args: [{"$tree":[3,1,4,null,2]},1], expected: 1 },
      { args: [{"$tree":[5,3,6,2,4,null,null,1]},3], expected: 3 },
      { args: [{"$tree":[1]},1], expected: 1 },
      { args: [{"$tree":[2,1,3]},2], expected: 2 },
      { args: [{"$tree":[2,1,3]},3], expected: 3 },
      { args: [{"$tree":[5,3,6,2,4,null,null,1]},6], expected: 6 },
      { args: [{ $tree: range(65535, (i) => { const d = 31 - Math.clz32(i + 1); const p = i + 1 - 2 ** d; return (2 * p + 1) * 2 ** (15 - d) - 1 }) }, 40000], expected: 39999, label: 'big tree, k = 40,000' },
      { args: [{ $tree: range(65535, (i) => { const d = 31 - Math.clz32(i + 1); const p = i + 1 - 2 ** d; return (2 * p + 1) * 2 ** (15 - d) - 1 }) }, 1], expected: 0, label: 'big tree, k = 1' },
    ],
    hints: [
      'In a binary search tree, an inorder walk (left, node, right) gives the values in increasing order.',
      'You do not need the whole list. Count the nodes as you visit them in inorder and stop at the k-th one.',
      'Use a stack: go as far left as you can pushing nodes, pop one (that is the next smallest), decrease k, and when k reaches 0 return its value. Then continue with its right child.',
    ],
    solution: `function kthSmallest(root, k) {
  const stack = []
  let cur = root
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()
    k--
    if (k === 0) return cur.val
    cur = cur.right
  }
  return -1
}
`,
    explain: 'An inorder walk of a BST visits the values in sorted order, so the k-th visited node is the k-th smallest. An iterative walk with a stack can stop early, so only the part of the tree that is needed gets visited.',
    time: 'O(h + k)',
    space: 'O(h)',
  },
  {
    id: 'lca-of-bst',
    lc: { n: 235, slug: 'lowest-common-ancestor-of-a-binary-search-tree' },
    lesson: 'bst',
    title: 'Lowest Common Ancestor of a BST',
    diff: 'medium',
    fn: 'lowestCommonAncestor',
    prompt: `<p>Given a binary search tree and two values <code>p</code> and <code>q</code> that exist in it, return the value of their <b>lowest common ancestor</b>: the deepest node that has both <code>p</code> and <code>q</code> in its subtree. A node counts as its own descendant.</p>
<p>On LeetCode you return the node; here you return its <b>value</b>.</p>
<p>Each node is a <code>TreeNode</code> with <code>val</code>, <code>left</code> and <code>right</code>. The class is available in your code. The tests build trees from level-order arrays, where <code>null</code> means a missing child.</p>`,
    examples: [
      { input: 'root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 8', output: '6' },
      { input: 'root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 4', output: '2', note: 'A node can be an ancestor of another.' },
    ],
    starter: `// TreeNode is provided: new TreeNode(val, left, right)
function lowestCommonAncestor(root, p, q) {
  // p and q are values. Return the value of the LCA.
}
`,
    tests: () => [
      { args: [{"$tree":[6,2,8,0,4,7,9,null,null,3,5]},2,8], expected: 6 },
      { args: [{"$tree":[6,2,8,0,4,7,9,null,null,3,5]},2,4], expected: 2 },
      { args: [{"$tree":[2,1]},2,1], expected: 2 },
      { args: [{"$tree":[6,2,8,0,4,7,9,null,null,3,5]},3,5], expected: 4 },
      { args: [{"$tree":[6,2,8,0,4,7,9,null,null,3,5]},0,5], expected: 2 },
      { args: [{"$tree":[6,2,8,0,4,7,9,null,null,3,5]},7,9], expected: 8 },
      { args: [{"$tree":[6,2,8,0,4,7,9,null,null,3,5]},6,9], expected: 6 },
      { args: [{ $tree: range(65535, (i) => { const d = 31 - Math.clz32(i + 1); const p = i + 1 - 2 ** d; return (2 * p + 1) * 2 ** (15 - d) - 1 }) }, 0, 65534], expected: 32767, label: 'big tree, the answer is the root' },
      { args: [{ $tree: range(65535, (i) => { const d = 31 - Math.clz32(i + 1); const p = i + 1 - 2 ** d; return (2 * p + 1) * 2 ** (15 - d) - 1 }) }, 0, 2], expected: 1, label: 'big tree, two leaves near each other' },
    ],
    hints: [
      'In a BST, all values in the left subtree are smaller and all values in the right subtree are bigger. Compare p and q with the current node value.',
      'If both p and q are smaller, the answer is in the left subtree. If both are bigger, it is in the right subtree.',
      'Otherwise (one is smaller or equal and the other is bigger or equal) the paths to p and q split here, so this node is the answer. A loop is enough, no recursion needed.',
    ],
    solution: `function lowestCommonAncestor(root, p, q) {
  let cur = root
  while (cur) {
    if (p < cur.val && q < cur.val) cur = cur.left
    else if (p > cur.val && q > cur.val) cur = cur.right
    else return cur.val
  }
  return null
}
`,
    explain: 'The first node where p and q are not on the same side is where their paths from the root split, so it is the lowest common ancestor. The BST ordering tells you the side by comparing numbers, so you walk down a single path.',
    time: 'O(h)',
    space: 'O(1)',
  },
  {
    id: 'subsets',
    lc: { n: 78, slug: 'subsets' },
    lesson: 'backtracking',
    title: 'Subsets',
    diff: 'medium',
    fn: 'subsets',
    compare: 'unordered',
    prompt: `<p>Given an array <code>nums</code> of <b>different</b> integers, return all possible subsets (the power set), including the empty subset and the full array.</p>
<p>The order of the subsets and the order inside a subset do not matter, but no subset may appear twice.</p>`,
    examples: [
      { input: 'nums = [1, 2, 3]', output: '[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]' },
      { input: 'nums = [0]', output: '[[], [0]]' },
      { input: 'nums = []', output: '[[]]', note: 'Only the empty subset.' },
    ],
    starter: `function subsets(nums) {
  // your code here
}
`,
    tests: () => [
      { args: [[1,2,3]], expected: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]] },
      { args: [[0]], expected: [[],[0]] },
      { args: [[]], expected: [[]] },
      { args: [[1,2]], expected: [[],[1],[1,2],[2]] },
      { args: [[1,2,3,4]], expected: [[],[1],[1,2],[1,2,3],[1,2,3,4],[1,2,4],[1,3],[1,3,4],[1,4],[2],[2,3],[2,3,4],[2,4],[3],[3,4],[4]] },
      { args: [[-1,5,9]], expected: [[],[-1],[-1,5],[-1,5,9],[-1,9],[5],[5,9],[9]] },
      { args: [range(10, (i) => i + 1)], expected: [[],[1],[1,2],[1,2,3],[1,2,3,4],[1,2,3,4,5],[1,2,3,4,5,6],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7,8],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9,10],[1,2,3,4,5,6,7,8,10],[1,2,3,4,5,6,7,9],[1,2,3,4,5,6,7,9,10],[1,2,3,4,5,6,7,10],[1,2,3,4,5,6,8],[1,2,3,4,5,6,8,9],[1,2,3,4,5,6,8,9,10],[1,2,3,4,5,6,8,10],[1,2,3,4,5,6,9],[1,2,3,4,5,6,9,10],[1,2,3,4,5,6,10],[1,2,3,4,5,7],[1,2,3,4,5,7,8],[1,2,3,4,5,7,8,9],[1,2,3,4,5,7,8,9,10],[1,2,3,4,5,7,8,10],[1,2,3,4,5,7,9],[1,2,3,4,5,7,9,10],[1,2,3,4,5,7,10],[1,2,3,4,5,8],[1,2,3,4,5,8,9],[1,2,3,4,5,8,9,10],[1,2,3,4,5,8,10],[1,2,3,4,5,9],[1,2,3,4,5,9,10],[1,2,3,4,5,10],[1,2,3,4,6],[1,2,3,4,6,7],[1,2,3,4,6,7,8],[1,2,3,4,6,7,8,9],[1,2,3,4,6,7,8,9,10],[1,2,3,4,6,7,8,10],[1,2,3,4,6,7,9],[1,2,3,4,6,7,9,10],[1,2,3,4,6,7,10],[1,2,3,4,6,8],[1,2,3,4,6,8,9],[1,2,3,4,6,8,9,10],[1,2,3,4,6,8,10],[1,2,3,4,6,9],[1,2,3,4,6,9,10],[1,2,3,4,6,10],[1,2,3,4,7],[1,2,3,4,7,8],[1,2,3,4,7,8,9],[1,2,3,4,7,8,9,10],[1,2,3,4,7,8,10],[1,2,3,4,7,9],[1,2,3,4,7,9,10],[1,2,3,4,7,10],[1,2,3,4,8],[1,2,3,4,8,9],[1,2,3,4,8,9,10],[1,2,3,4,8,10],[1,2,3,4,9],[1,2,3,4,9,10],[1,2,3,4,10],[1,2,3,5],[1,2,3,5,6],[1,2,3,5,6,7],[1,2,3,5,6,7,8],[1,2,3,5,6,7,8,9],[1,2,3,5,6,7,8,9,10],[1,2,3,5,6,7,8,10],[1,2,3,5,6,7,9],[1,2,3,5,6,7,9,10],[1,2,3,5,6,7,10],[1,2,3,5,6,8],[1,2,3,5,6,8,9],[1,2,3,5,6,8,9,10],[1,2,3,5,6,8,10],[1,2,3,5,6,9],[1,2,3,5,6,9,10],[1,2,3,5,6,10],[1,2,3,5,7],[1,2,3,5,7,8],[1,2,3,5,7,8,9],[1,2,3,5,7,8,9,10],[1,2,3,5,7,8,10],[1,2,3,5,7,9],[1,2,3,5,7,9,10],[1,2,3,5,7,10],[1,2,3,5,8],[1,2,3,5,8,9],[1,2,3,5,8,9,10],[1,2,3,5,8,10],[1,2,3,5,9],[1,2,3,5,9,10],[1,2,3,5,10],[1,2,3,6],[1,2,3,6,7],[1,2,3,6,7,8],[1,2,3,6,7,8,9],[1,2,3,6,7,8,9,10],[1,2,3,6,7,8,10],[1,2,3,6,7,9],[1,2,3,6,7,9,10],[1,2,3,6,7,10],[1,2,3,6,8],[1,2,3,6,8,9],[1,2,3,6,8,9,10],[1,2,3,6,8,10],[1,2,3,6,9],[1,2,3,6,9,10],[1,2,3,6,10],[1,2,3,7],[1,2,3,7,8],[1,2,3,7,8,9],[1,2,3,7,8,9,10],[1,2,3,7,8,10],[1,2,3,7,9],[1,2,3,7,9,10],[1,2,3,7,10],[1,2,3,8],[1,2,3,8,9],[1,2,3,8,9,10],[1,2,3,8,10],[1,2,3,9],[1,2,3,9,10],[1,2,3,10],[1,2,4],[1,2,4,5],[1,2,4,5,6],[1,2,4,5,6,7],[1,2,4,5,6,7,8],[1,2,4,5,6,7,8,9],[1,2,4,5,6,7,8,9,10],[1,2,4,5,6,7,8,10],[1,2,4,5,6,7,9],[1,2,4,5,6,7,9,10],[1,2,4,5,6,7,10],[1,2,4,5,6,8],[1,2,4,5,6,8,9],[1,2,4,5,6,8,9,10],[1,2,4,5,6,8,10],[1,2,4,5,6,9],[1,2,4,5,6,9,10],[1,2,4,5,6,10],[1,2,4,5,7],[1,2,4,5,7,8],[1,2,4,5,7,8,9],[1,2,4,5,7,8,9,10],[1,2,4,5,7,8,10],[1,2,4,5,7,9],[1,2,4,5,7,9,10],[1,2,4,5,7,10],[1,2,4,5,8],[1,2,4,5,8,9],[1,2,4,5,8,9,10],[1,2,4,5,8,10],[1,2,4,5,9],[1,2,4,5,9,10],[1,2,4,5,10],[1,2,4,6],[1,2,4,6,7],[1,2,4,6,7,8],[1,2,4,6,7,8,9],[1,2,4,6,7,8,9,10],[1,2,4,6,7,8,10],[1,2,4,6,7,9],[1,2,4,6,7,9,10],[1,2,4,6,7,10],[1,2,4,6,8],[1,2,4,6,8,9],[1,2,4,6,8,9,10],[1,2,4,6,8,10],[1,2,4,6,9],[1,2,4,6,9,10],[1,2,4,6,10],[1,2,4,7],[1,2,4,7,8],[1,2,4,7,8,9],[1,2,4,7,8,9,10],[1,2,4,7,8,10],[1,2,4,7,9],[1,2,4,7,9,10],[1,2,4,7,10],[1,2,4,8],[1,2,4,8,9],[1,2,4,8,9,10],[1,2,4,8,10],[1,2,4,9],[1,2,4,9,10],[1,2,4,10],[1,2,5],[1,2,5,6],[1,2,5,6,7],[1,2,5,6,7,8],[1,2,5,6,7,8,9],[1,2,5,6,7,8,9,10],[1,2,5,6,7,8,10],[1,2,5,6,7,9],[1,2,5,6,7,9,10],[1,2,5,6,7,10],[1,2,5,6,8],[1,2,5,6,8,9],[1,2,5,6,8,9,10],[1,2,5,6,8,10],[1,2,5,6,9],[1,2,5,6,9,10],[1,2,5,6,10],[1,2,5,7],[1,2,5,7,8],[1,2,5,7,8,9],[1,2,5,7,8,9,10],[1,2,5,7,8,10],[1,2,5,7,9],[1,2,5,7,9,10],[1,2,5,7,10],[1,2,5,8],[1,2,5,8,9],[1,2,5,8,9,10],[1,2,5,8,10],[1,2,5,9],[1,2,5,9,10],[1,2,5,10],[1,2,6],[1,2,6,7],[1,2,6,7,8],[1,2,6,7,8,9],[1,2,6,7,8,9,10],[1,2,6,7,8,10],[1,2,6,7,9],[1,2,6,7,9,10],[1,2,6,7,10],[1,2,6,8],[1,2,6,8,9],[1,2,6,8,9,10],[1,2,6,8,10],[1,2,6,9],[1,2,6,9,10],[1,2,6,10],[1,2,7],[1,2,7,8],[1,2,7,8,9],[1,2,7,8,9,10],[1,2,7,8,10],[1,2,7,9],[1,2,7,9,10],[1,2,7,10],[1,2,8],[1,2,8,9],[1,2,8,9,10],[1,2,8,10],[1,2,9],[1,2,9,10],[1,2,10],[1,3],[1,3,4],[1,3,4,5],[1,3,4,5,6],[1,3,4,5,6,7],[1,3,4,5,6,7,8],[1,3,4,5,6,7,8,9],[1,3,4,5,6,7,8,9,10],[1,3,4,5,6,7,8,10],[1,3,4,5,6,7,9],[1,3,4,5,6,7,9,10],[1,3,4,5,6,7,10],[1,3,4,5,6,8],[1,3,4,5,6,8,9],[1,3,4,5,6,8,9,10],[1,3,4,5,6,8,10],[1,3,4,5,6,9],[1,3,4,5,6,9,10],[1,3,4,5,6,10],[1,3,4,5,7],[1,3,4,5,7,8],[1,3,4,5,7,8,9],[1,3,4,5,7,8,9,10],[1,3,4,5,7,8,10],[1,3,4,5,7,9],[1,3,4,5,7,9,10],[1,3,4,5,7,10],[1,3,4,5,8],[1,3,4,5,8,9],[1,3,4,5,8,9,10],[1,3,4,5,8,10],[1,3,4,5,9],[1,3,4,5,9,10],[1,3,4,5,10],[1,3,4,6],[1,3,4,6,7],[1,3,4,6,7,8],[1,3,4,6,7,8,9],[1,3,4,6,7,8,9,10],[1,3,4,6,7,8,10],[1,3,4,6,7,9],[1,3,4,6,7,9,10],[1,3,4,6,7,10],[1,3,4,6,8],[1,3,4,6,8,9],[1,3,4,6,8,9,10],[1,3,4,6,8,10],[1,3,4,6,9],[1,3,4,6,9,10],[1,3,4,6,10],[1,3,4,7],[1,3,4,7,8],[1,3,4,7,8,9],[1,3,4,7,8,9,10],[1,3,4,7,8,10],[1,3,4,7,9],[1,3,4,7,9,10],[1,3,4,7,10],[1,3,4,8],[1,3,4,8,9],[1,3,4,8,9,10],[1,3,4,8,10],[1,3,4,9],[1,3,4,9,10],[1,3,4,10],[1,3,5],[1,3,5,6],[1,3,5,6,7],[1,3,5,6,7,8],[1,3,5,6,7,8,9],[1,3,5,6,7,8,9,10],[1,3,5,6,7,8,10],[1,3,5,6,7,9],[1,3,5,6,7,9,10],[1,3,5,6,7,10],[1,3,5,6,8],[1,3,5,6,8,9],[1,3,5,6,8,9,10],[1,3,5,6,8,10],[1,3,5,6,9],[1,3,5,6,9,10],[1,3,5,6,10],[1,3,5,7],[1,3,5,7,8],[1,3,5,7,8,9],[1,3,5,7,8,9,10],[1,3,5,7,8,10],[1,3,5,7,9],[1,3,5,7,9,10],[1,3,5,7,10],[1,3,5,8],[1,3,5,8,9],[1,3,5,8,9,10],[1,3,5,8,10],[1,3,5,9],[1,3,5,9,10],[1,3,5,10],[1,3,6],[1,3,6,7],[1,3,6,7,8],[1,3,6,7,8,9],[1,3,6,7,8,9,10],[1,3,6,7,8,10],[1,3,6,7,9],[1,3,6,7,9,10],[1,3,6,7,10],[1,3,6,8],[1,3,6,8,9],[1,3,6,8,9,10],[1,3,6,8,10],[1,3,6,9],[1,3,6,9,10],[1,3,6,10],[1,3,7],[1,3,7,8],[1,3,7,8,9],[1,3,7,8,9,10],[1,3,7,8,10],[1,3,7,9],[1,3,7,9,10],[1,3,7,10],[1,3,8],[1,3,8,9],[1,3,8,9,10],[1,3,8,10],[1,3,9],[1,3,9,10],[1,3,10],[1,4],[1,4,5],[1,4,5,6],[1,4,5,6,7],[1,4,5,6,7,8],[1,4,5,6,7,8,9],[1,4,5,6,7,8,9,10],[1,4,5,6,7,8,10],[1,4,5,6,7,9],[1,4,5,6,7,9,10],[1,4,5,6,7,10],[1,4,5,6,8],[1,4,5,6,8,9],[1,4,5,6,8,9,10],[1,4,5,6,8,10],[1,4,5,6,9],[1,4,5,6,9,10],[1,4,5,6,10],[1,4,5,7],[1,4,5,7,8],[1,4,5,7,8,9],[1,4,5,7,8,9,10],[1,4,5,7,8,10],[1,4,5,7,9],[1,4,5,7,9,10],[1,4,5,7,10],[1,4,5,8],[1,4,5,8,9],[1,4,5,8,9,10],[1,4,5,8,10],[1,4,5,9],[1,4,5,9,10],[1,4,5,10],[1,4,6],[1,4,6,7],[1,4,6,7,8],[1,4,6,7,8,9],[1,4,6,7,8,9,10],[1,4,6,7,8,10],[1,4,6,7,9],[1,4,6,7,9,10],[1,4,6,7,10],[1,4,6,8],[1,4,6,8,9],[1,4,6,8,9,10],[1,4,6,8,10],[1,4,6,9],[1,4,6,9,10],[1,4,6,10],[1,4,7],[1,4,7,8],[1,4,7,8,9],[1,4,7,8,9,10],[1,4,7,8,10],[1,4,7,9],[1,4,7,9,10],[1,4,7,10],[1,4,8],[1,4,8,9],[1,4,8,9,10],[1,4,8,10],[1,4,9],[1,4,9,10],[1,4,10],[1,5],[1,5,6],[1,5,6,7],[1,5,6,7,8],[1,5,6,7,8,9],[1,5,6,7,8,9,10],[1,5,6,7,8,10],[1,5,6,7,9],[1,5,6,7,9,10],[1,5,6,7,10],[1,5,6,8],[1,5,6,8,9],[1,5,6,8,9,10],[1,5,6,8,10],[1,5,6,9],[1,5,6,9,10],[1,5,6,10],[1,5,7],[1,5,7,8],[1,5,7,8,9],[1,5,7,8,9,10],[1,5,7,8,10],[1,5,7,9],[1,5,7,9,10],[1,5,7,10],[1,5,8],[1,5,8,9],[1,5,8,9,10],[1,5,8,10],[1,5,9],[1,5,9,10],[1,5,10],[1,6],[1,6,7],[1,6,7,8],[1,6,7,8,9],[1,6,7,8,9,10],[1,6,7,8,10],[1,6,7,9],[1,6,7,9,10],[1,6,7,10],[1,6,8],[1,6,8,9],[1,6,8,9,10],[1,6,8,10],[1,6,9],[1,6,9,10],[1,6,10],[1,7],[1,7,8],[1,7,8,9],[1,7,8,9,10],[1,7,8,10],[1,7,9],[1,7,9,10],[1,7,10],[1,8],[1,8,9],[1,8,9,10],[1,8,10],[1,9],[1,9,10],[1,10],[2],[2,3],[2,3,4],[2,3,4,5],[2,3,4,5,6],[2,3,4,5,6,7],[2,3,4,5,6,7,8],[2,3,4,5,6,7,8,9],[2,3,4,5,6,7,8,9,10],[2,3,4,5,6,7,8,10],[2,3,4,5,6,7,9],[2,3,4,5,6,7,9,10],[2,3,4,5,6,7,10],[2,3,4,5,6,8],[2,3,4,5,6,8,9],[2,3,4,5,6,8,9,10],[2,3,4,5,6,8,10],[2,3,4,5,6,9],[2,3,4,5,6,9,10],[2,3,4,5,6,10],[2,3,4,5,7],[2,3,4,5,7,8],[2,3,4,5,7,8,9],[2,3,4,5,7,8,9,10],[2,3,4,5,7,8,10],[2,3,4,5,7,9],[2,3,4,5,7,9,10],[2,3,4,5,7,10],[2,3,4,5,8],[2,3,4,5,8,9],[2,3,4,5,8,9,10],[2,3,4,5,8,10],[2,3,4,5,9],[2,3,4,5,9,10],[2,3,4,5,10],[2,3,4,6],[2,3,4,6,7],[2,3,4,6,7,8],[2,3,4,6,7,8,9],[2,3,4,6,7,8,9,10],[2,3,4,6,7,8,10],[2,3,4,6,7,9],[2,3,4,6,7,9,10],[2,3,4,6,7,10],[2,3,4,6,8],[2,3,4,6,8,9],[2,3,4,6,8,9,10],[2,3,4,6,8,10],[2,3,4,6,9],[2,3,4,6,9,10],[2,3,4,6,10],[2,3,4,7],[2,3,4,7,8],[2,3,4,7,8,9],[2,3,4,7,8,9,10],[2,3,4,7,8,10],[2,3,4,7,9],[2,3,4,7,9,10],[2,3,4,7,10],[2,3,4,8],[2,3,4,8,9],[2,3,4,8,9,10],[2,3,4,8,10],[2,3,4,9],[2,3,4,9,10],[2,3,4,10],[2,3,5],[2,3,5,6],[2,3,5,6,7],[2,3,5,6,7,8],[2,3,5,6,7,8,9],[2,3,5,6,7,8,9,10],[2,3,5,6,7,8,10],[2,3,5,6,7,9],[2,3,5,6,7,9,10],[2,3,5,6,7,10],[2,3,5,6,8],[2,3,5,6,8,9],[2,3,5,6,8,9,10],[2,3,5,6,8,10],[2,3,5,6,9],[2,3,5,6,9,10],[2,3,5,6,10],[2,3,5,7],[2,3,5,7,8],[2,3,5,7,8,9],[2,3,5,7,8,9,10],[2,3,5,7,8,10],[2,3,5,7,9],[2,3,5,7,9,10],[2,3,5,7,10],[2,3,5,8],[2,3,5,8,9],[2,3,5,8,9,10],[2,3,5,8,10],[2,3,5,9],[2,3,5,9,10],[2,3,5,10],[2,3,6],[2,3,6,7],[2,3,6,7,8],[2,3,6,7,8,9],[2,3,6,7,8,9,10],[2,3,6,7,8,10],[2,3,6,7,9],[2,3,6,7,9,10],[2,3,6,7,10],[2,3,6,8],[2,3,6,8,9],[2,3,6,8,9,10],[2,3,6,8,10],[2,3,6,9],[2,3,6,9,10],[2,3,6,10],[2,3,7],[2,3,7,8],[2,3,7,8,9],[2,3,7,8,9,10],[2,3,7,8,10],[2,3,7,9],[2,3,7,9,10],[2,3,7,10],[2,3,8],[2,3,8,9],[2,3,8,9,10],[2,3,8,10],[2,3,9],[2,3,9,10],[2,3,10],[2,4],[2,4,5],[2,4,5,6],[2,4,5,6,7],[2,4,5,6,7,8],[2,4,5,6,7,8,9],[2,4,5,6,7,8,9,10],[2,4,5,6,7,8,10],[2,4,5,6,7,9],[2,4,5,6,7,9,10],[2,4,5,6,7,10],[2,4,5,6,8],[2,4,5,6,8,9],[2,4,5,6,8,9,10],[2,4,5,6,8,10],[2,4,5,6,9],[2,4,5,6,9,10],[2,4,5,6,10],[2,4,5,7],[2,4,5,7,8],[2,4,5,7,8,9],[2,4,5,7,8,9,10],[2,4,5,7,8,10],[2,4,5,7,9],[2,4,5,7,9,10],[2,4,5,7,10],[2,4,5,8],[2,4,5,8,9],[2,4,5,8,9,10],[2,4,5,8,10],[2,4,5,9],[2,4,5,9,10],[2,4,5,10],[2,4,6],[2,4,6,7],[2,4,6,7,8],[2,4,6,7,8,9],[2,4,6,7,8,9,10],[2,4,6,7,8,10],[2,4,6,7,9],[2,4,6,7,9,10],[2,4,6,7,10],[2,4,6,8],[2,4,6,8,9],[2,4,6,8,9,10],[2,4,6,8,10],[2,4,6,9],[2,4,6,9,10],[2,4,6,10],[2,4,7],[2,4,7,8],[2,4,7,8,9],[2,4,7,8,9,10],[2,4,7,8,10],[2,4,7,9],[2,4,7,9,10],[2,4,7,10],[2,4,8],[2,4,8,9],[2,4,8,9,10],[2,4,8,10],[2,4,9],[2,4,9,10],[2,4,10],[2,5],[2,5,6],[2,5,6,7],[2,5,6,7,8],[2,5,6,7,8,9],[2,5,6,7,8,9,10],[2,5,6,7,8,10],[2,5,6,7,9],[2,5,6,7,9,10],[2,5,6,7,10],[2,5,6,8],[2,5,6,8,9],[2,5,6,8,9,10],[2,5,6,8,10],[2,5,6,9],[2,5,6,9,10],[2,5,6,10],[2,5,7],[2,5,7,8],[2,5,7,8,9],[2,5,7,8,9,10],[2,5,7,8,10],[2,5,7,9],[2,5,7,9,10],[2,5,7,10],[2,5,8],[2,5,8,9],[2,5,8,9,10],[2,5,8,10],[2,5,9],[2,5,9,10],[2,5,10],[2,6],[2,6,7],[2,6,7,8],[2,6,7,8,9],[2,6,7,8,9,10],[2,6,7,8,10],[2,6,7,9],[2,6,7,9,10],[2,6,7,10],[2,6,8],[2,6,8,9],[2,6,8,9,10],[2,6,8,10],[2,6,9],[2,6,9,10],[2,6,10],[2,7],[2,7,8],[2,7,8,9],[2,7,8,9,10],[2,7,8,10],[2,7,9],[2,7,9,10],[2,7,10],[2,8],[2,8,9],[2,8,9,10],[2,8,10],[2,9],[2,9,10],[2,10],[3],[3,4],[3,4,5],[3,4,5,6],[3,4,5,6,7],[3,4,5,6,7,8],[3,4,5,6,7,8,9],[3,4,5,6,7,8,9,10],[3,4,5,6,7,8,10],[3,4,5,6,7,9],[3,4,5,6,7,9,10],[3,4,5,6,7,10],[3,4,5,6,8],[3,4,5,6,8,9],[3,4,5,6,8,9,10],[3,4,5,6,8,10],[3,4,5,6,9],[3,4,5,6,9,10],[3,4,5,6,10],[3,4,5,7],[3,4,5,7,8],[3,4,5,7,8,9],[3,4,5,7,8,9,10],[3,4,5,7,8,10],[3,4,5,7,9],[3,4,5,7,9,10],[3,4,5,7,10],[3,4,5,8],[3,4,5,8,9],[3,4,5,8,9,10],[3,4,5,8,10],[3,4,5,9],[3,4,5,9,10],[3,4,5,10],[3,4,6],[3,4,6,7],[3,4,6,7,8],[3,4,6,7,8,9],[3,4,6,7,8,9,10],[3,4,6,7,8,10],[3,4,6,7,9],[3,4,6,7,9,10],[3,4,6,7,10],[3,4,6,8],[3,4,6,8,9],[3,4,6,8,9,10],[3,4,6,8,10],[3,4,6,9],[3,4,6,9,10],[3,4,6,10],[3,4,7],[3,4,7,8],[3,4,7,8,9],[3,4,7,8,9,10],[3,4,7,8,10],[3,4,7,9],[3,4,7,9,10],[3,4,7,10],[3,4,8],[3,4,8,9],[3,4,8,9,10],[3,4,8,10],[3,4,9],[3,4,9,10],[3,4,10],[3,5],[3,5,6],[3,5,6,7],[3,5,6,7,8],[3,5,6,7,8,9],[3,5,6,7,8,9,10],[3,5,6,7,8,10],[3,5,6,7,9],[3,5,6,7,9,10],[3,5,6,7,10],[3,5,6,8],[3,5,6,8,9],[3,5,6,8,9,10],[3,5,6,8,10],[3,5,6,9],[3,5,6,9,10],[3,5,6,10],[3,5,7],[3,5,7,8],[3,5,7,8,9],[3,5,7,8,9,10],[3,5,7,8,10],[3,5,7,9],[3,5,7,9,10],[3,5,7,10],[3,5,8],[3,5,8,9],[3,5,8,9,10],[3,5,8,10],[3,5,9],[3,5,9,10],[3,5,10],[3,6],[3,6,7],[3,6,7,8],[3,6,7,8,9],[3,6,7,8,9,10],[3,6,7,8,10],[3,6,7,9],[3,6,7,9,10],[3,6,7,10],[3,6,8],[3,6,8,9],[3,6,8,9,10],[3,6,8,10],[3,6,9],[3,6,9,10],[3,6,10],[3,7],[3,7,8],[3,7,8,9],[3,7,8,9,10],[3,7,8,10],[3,7,9],[3,7,9,10],[3,7,10],[3,8],[3,8,9],[3,8,9,10],[3,8,10],[3,9],[3,9,10],[3,10],[4],[4,5],[4,5,6],[4,5,6,7],[4,5,6,7,8],[4,5,6,7,8,9],[4,5,6,7,8,9,10],[4,5,6,7,8,10],[4,5,6,7,9],[4,5,6,7,9,10],[4,5,6,7,10],[4,5,6,8],[4,5,6,8,9],[4,5,6,8,9,10],[4,5,6,8,10],[4,5,6,9],[4,5,6,9,10],[4,5,6,10],[4,5,7],[4,5,7,8],[4,5,7,8,9],[4,5,7,8,9,10],[4,5,7,8,10],[4,5,7,9],[4,5,7,9,10],[4,5,7,10],[4,5,8],[4,5,8,9],[4,5,8,9,10],[4,5,8,10],[4,5,9],[4,5,9,10],[4,5,10],[4,6],[4,6,7],[4,6,7,8],[4,6,7,8,9],[4,6,7,8,9,10],[4,6,7,8,10],[4,6,7,9],[4,6,7,9,10],[4,6,7,10],[4,6,8],[4,6,8,9],[4,6,8,9,10],[4,6,8,10],[4,6,9],[4,6,9,10],[4,6,10],[4,7],[4,7,8],[4,7,8,9],[4,7,8,9,10],[4,7,8,10],[4,7,9],[4,7,9,10],[4,7,10],[4,8],[4,8,9],[4,8,9,10],[4,8,10],[4,9],[4,9,10],[4,10],[5],[5,6],[5,6,7],[5,6,7,8],[5,6,7,8,9],[5,6,7,8,9,10],[5,6,7,8,10],[5,6,7,9],[5,6,7,9,10],[5,6,7,10],[5,6,8],[5,6,8,9],[5,6,8,9,10],[5,6,8,10],[5,6,9],[5,6,9,10],[5,6,10],[5,7],[5,7,8],[5,7,8,9],[5,7,8,9,10],[5,7,8,10],[5,7,9],[5,7,9,10],[5,7,10],[5,8],[5,8,9],[5,8,9,10],[5,8,10],[5,9],[5,9,10],[5,10],[6],[6,7],[6,7,8],[6,7,8,9],[6,7,8,9,10],[6,7,8,10],[6,7,9],[6,7,9,10],[6,7,10],[6,8],[6,8,9],[6,8,9,10],[6,8,10],[6,9],[6,9,10],[6,10],[7],[7,8],[7,8,9],[7,8,9,10],[7,8,10],[7,9],[7,9,10],[7,10],[8],[8,9],[8,9,10],[8,10],[9],[9,10],[10]], label: '10 numbers, 1,024 subsets' },
    ],
    hints: [
      'For every number there are two choices: it is in the subset or it is not. What does the tree of all choices look like?',
      'Build a list "cur" step by step. At every call, the current list is itself a valid subset, so record a copy of it.',
      'From position start, try each next number i: push nums[i], call the function with i + 1, then pop it (undo). Record [...cur], not cur itself.',
    ],
    solution: `function subsets(nums) {
  const result = []
  const cur = []
  const go = (start) => {
    result.push([...cur])
    for (let i = start; i < nums.length; i++) {
      cur.push(nums[i])
      go(i + 1)
      cur.pop()
    }
  }
  go(0)
  return result
}
`,
    explain: 'Every call records the current choices as one subset, then tries adding each later number. Moving "start" forward means the numbers are chosen in index order, so each subset is built only one way and appears once. The pop undoes a choice before the next one is tried.',
    time: 'O(n × 2ⁿ)',
    space: 'O(n) extra',
  },
  {
    id: 'permutations',
    lc: { n: 46, slug: 'permutations' },
    lesson: 'backtracking',
    title: 'Permutations',
    diff: 'medium',
    fn: 'permute',
    compare: 'unordered',
    prompt: `<p>Given an array <code>nums</code> of <b>different</b> integers, return all possible <b>permutations</b>: every way to arrange all the numbers in a row. The order of the permutations in the result does not matter.</p>`,
    examples: [
      { input: 'nums = [1, 2, 3]', output: '[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]' },
      { input: 'nums = [0, 1]', output: '[[0, 1], [1, 0]]' },
      { input: 'nums = [1]', output: '[[1]]' },
    ],
    starter: `function permute(nums) {
  // your code here
}
`,
    tests: () => [
      { args: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
      { args: [[0,1]], expected: [[0,1],[1,0]] },
      { args: [[1]], expected: [[1]] },
      { args: [[1,2,3,4]], expected: [[1,2,3,4],[1,2,4,3],[1,3,2,4],[1,3,4,2],[1,4,2,3],[1,4,3,2],[2,1,3,4],[2,1,4,3],[2,3,1,4],[2,3,4,1],[2,4,1,3],[2,4,3,1],[3,1,2,4],[3,1,4,2],[3,2,1,4],[3,2,4,1],[3,4,1,2],[3,4,2,1],[4,1,2,3],[4,1,3,2],[4,2,1,3],[4,2,3,1],[4,3,1,2],[4,3,2,1]] },
      { args: [[5,4,3,2,1]], expected: [[5,4,3,2,1],[5,4,3,1,2],[5,4,2,3,1],[5,4,2,1,3],[5,4,1,3,2],[5,4,1,2,3],[5,3,4,2,1],[5,3,4,1,2],[5,3,2,4,1],[5,3,2,1,4],[5,3,1,4,2],[5,3,1,2,4],[5,2,4,3,1],[5,2,4,1,3],[5,2,3,4,1],[5,2,3,1,4],[5,2,1,4,3],[5,2,1,3,4],[5,1,4,3,2],[5,1,4,2,3],[5,1,3,4,2],[5,1,3,2,4],[5,1,2,4,3],[5,1,2,3,4],[4,5,3,2,1],[4,5,3,1,2],[4,5,2,3,1],[4,5,2,1,3],[4,5,1,3,2],[4,5,1,2,3],[4,3,5,2,1],[4,3,5,1,2],[4,3,2,5,1],[4,3,2,1,5],[4,3,1,5,2],[4,3,1,2,5],[4,2,5,3,1],[4,2,5,1,3],[4,2,3,5,1],[4,2,3,1,5],[4,2,1,5,3],[4,2,1,3,5],[4,1,5,3,2],[4,1,5,2,3],[4,1,3,5,2],[4,1,3,2,5],[4,1,2,5,3],[4,1,2,3,5],[3,5,4,2,1],[3,5,4,1,2],[3,5,2,4,1],[3,5,2,1,4],[3,5,1,4,2],[3,5,1,2,4],[3,4,5,2,1],[3,4,5,1,2],[3,4,2,5,1],[3,4,2,1,5],[3,4,1,5,2],[3,4,1,2,5],[3,2,5,4,1],[3,2,5,1,4],[3,2,4,5,1],[3,2,4,1,5],[3,2,1,5,4],[3,2,1,4,5],[3,1,5,4,2],[3,1,5,2,4],[3,1,4,5,2],[3,1,4,2,5],[3,1,2,5,4],[3,1,2,4,5],[2,5,4,3,1],[2,5,4,1,3],[2,5,3,4,1],[2,5,3,1,4],[2,5,1,4,3],[2,5,1,3,4],[2,4,5,3,1],[2,4,5,1,3],[2,4,3,5,1],[2,4,3,1,5],[2,4,1,5,3],[2,4,1,3,5],[2,3,5,4,1],[2,3,5,1,4],[2,3,4,5,1],[2,3,4,1,5],[2,3,1,5,4],[2,3,1,4,5],[2,1,5,4,3],[2,1,5,3,4],[2,1,4,5,3],[2,1,4,3,5],[2,1,3,5,4],[2,1,3,4,5],[1,5,4,3,2],[1,5,4,2,3],[1,5,3,4,2],[1,5,3,2,4],[1,5,2,4,3],[1,5,2,3,4],[1,4,5,3,2],[1,4,5,2,3],[1,4,3,5,2],[1,4,3,2,5],[1,4,2,5,3],[1,4,2,3,5],[1,3,5,4,2],[1,3,5,2,4],[1,3,4,5,2],[1,3,4,2,5],[1,3,2,5,4],[1,3,2,4,5],[1,2,5,4,3],[1,2,5,3,4],[1,2,4,5,3],[1,2,4,3,5],[1,2,3,5,4],[1,2,3,4,5]] },
      { args: [[-1,0,1]], expected: [[-1,0,1],[-1,1,0],[0,-1,1],[0,1,-1],[1,-1,0],[1,0,-1]] },
      { args: [range(6, (i) => i)], expected: [[0,1,2,3,4,5],[0,1,2,3,5,4],[0,1,2,4,3,5],[0,1,2,4,5,3],[0,1,2,5,3,4],[0,1,2,5,4,3],[0,1,3,2,4,5],[0,1,3,2,5,4],[0,1,3,4,2,5],[0,1,3,4,5,2],[0,1,3,5,2,4],[0,1,3,5,4,2],[0,1,4,2,3,5],[0,1,4,2,5,3],[0,1,4,3,2,5],[0,1,4,3,5,2],[0,1,4,5,2,3],[0,1,4,5,3,2],[0,1,5,2,3,4],[0,1,5,2,4,3],[0,1,5,3,2,4],[0,1,5,3,4,2],[0,1,5,4,2,3],[0,1,5,4,3,2],[0,2,1,3,4,5],[0,2,1,3,5,4],[0,2,1,4,3,5],[0,2,1,4,5,3],[0,2,1,5,3,4],[0,2,1,5,4,3],[0,2,3,1,4,5],[0,2,3,1,5,4],[0,2,3,4,1,5],[0,2,3,4,5,1],[0,2,3,5,1,4],[0,2,3,5,4,1],[0,2,4,1,3,5],[0,2,4,1,5,3],[0,2,4,3,1,5],[0,2,4,3,5,1],[0,2,4,5,1,3],[0,2,4,5,3,1],[0,2,5,1,3,4],[0,2,5,1,4,3],[0,2,5,3,1,4],[0,2,5,3,4,1],[0,2,5,4,1,3],[0,2,5,4,3,1],[0,3,1,2,4,5],[0,3,1,2,5,4],[0,3,1,4,2,5],[0,3,1,4,5,2],[0,3,1,5,2,4],[0,3,1,5,4,2],[0,3,2,1,4,5],[0,3,2,1,5,4],[0,3,2,4,1,5],[0,3,2,4,5,1],[0,3,2,5,1,4],[0,3,2,5,4,1],[0,3,4,1,2,5],[0,3,4,1,5,2],[0,3,4,2,1,5],[0,3,4,2,5,1],[0,3,4,5,1,2],[0,3,4,5,2,1],[0,3,5,1,2,4],[0,3,5,1,4,2],[0,3,5,2,1,4],[0,3,5,2,4,1],[0,3,5,4,1,2],[0,3,5,4,2,1],[0,4,1,2,3,5],[0,4,1,2,5,3],[0,4,1,3,2,5],[0,4,1,3,5,2],[0,4,1,5,2,3],[0,4,1,5,3,2],[0,4,2,1,3,5],[0,4,2,1,5,3],[0,4,2,3,1,5],[0,4,2,3,5,1],[0,4,2,5,1,3],[0,4,2,5,3,1],[0,4,3,1,2,5],[0,4,3,1,5,2],[0,4,3,2,1,5],[0,4,3,2,5,1],[0,4,3,5,1,2],[0,4,3,5,2,1],[0,4,5,1,2,3],[0,4,5,1,3,2],[0,4,5,2,1,3],[0,4,5,2,3,1],[0,4,5,3,1,2],[0,4,5,3,2,1],[0,5,1,2,3,4],[0,5,1,2,4,3],[0,5,1,3,2,4],[0,5,1,3,4,2],[0,5,1,4,2,3],[0,5,1,4,3,2],[0,5,2,1,3,4],[0,5,2,1,4,3],[0,5,2,3,1,4],[0,5,2,3,4,1],[0,5,2,4,1,3],[0,5,2,4,3,1],[0,5,3,1,2,4],[0,5,3,1,4,2],[0,5,3,2,1,4],[0,5,3,2,4,1],[0,5,3,4,1,2],[0,5,3,4,2,1],[0,5,4,1,2,3],[0,5,4,1,3,2],[0,5,4,2,1,3],[0,5,4,2,3,1],[0,5,4,3,1,2],[0,5,4,3,2,1],[1,0,2,3,4,5],[1,0,2,3,5,4],[1,0,2,4,3,5],[1,0,2,4,5,3],[1,0,2,5,3,4],[1,0,2,5,4,3],[1,0,3,2,4,5],[1,0,3,2,5,4],[1,0,3,4,2,5],[1,0,3,4,5,2],[1,0,3,5,2,4],[1,0,3,5,4,2],[1,0,4,2,3,5],[1,0,4,2,5,3],[1,0,4,3,2,5],[1,0,4,3,5,2],[1,0,4,5,2,3],[1,0,4,5,3,2],[1,0,5,2,3,4],[1,0,5,2,4,3],[1,0,5,3,2,4],[1,0,5,3,4,2],[1,0,5,4,2,3],[1,0,5,4,3,2],[1,2,0,3,4,5],[1,2,0,3,5,4],[1,2,0,4,3,5],[1,2,0,4,5,3],[1,2,0,5,3,4],[1,2,0,5,4,3],[1,2,3,0,4,5],[1,2,3,0,5,4],[1,2,3,4,0,5],[1,2,3,4,5,0],[1,2,3,5,0,4],[1,2,3,5,4,0],[1,2,4,0,3,5],[1,2,4,0,5,3],[1,2,4,3,0,5],[1,2,4,3,5,0],[1,2,4,5,0,3],[1,2,4,5,3,0],[1,2,5,0,3,4],[1,2,5,0,4,3],[1,2,5,3,0,4],[1,2,5,3,4,0],[1,2,5,4,0,3],[1,2,5,4,3,0],[1,3,0,2,4,5],[1,3,0,2,5,4],[1,3,0,4,2,5],[1,3,0,4,5,2],[1,3,0,5,2,4],[1,3,0,5,4,2],[1,3,2,0,4,5],[1,3,2,0,5,4],[1,3,2,4,0,5],[1,3,2,4,5,0],[1,3,2,5,0,4],[1,3,2,5,4,0],[1,3,4,0,2,5],[1,3,4,0,5,2],[1,3,4,2,0,5],[1,3,4,2,5,0],[1,3,4,5,0,2],[1,3,4,5,2,0],[1,3,5,0,2,4],[1,3,5,0,4,2],[1,3,5,2,0,4],[1,3,5,2,4,0],[1,3,5,4,0,2],[1,3,5,4,2,0],[1,4,0,2,3,5],[1,4,0,2,5,3],[1,4,0,3,2,5],[1,4,0,3,5,2],[1,4,0,5,2,3],[1,4,0,5,3,2],[1,4,2,0,3,5],[1,4,2,0,5,3],[1,4,2,3,0,5],[1,4,2,3,5,0],[1,4,2,5,0,3],[1,4,2,5,3,0],[1,4,3,0,2,5],[1,4,3,0,5,2],[1,4,3,2,0,5],[1,4,3,2,5,0],[1,4,3,5,0,2],[1,4,3,5,2,0],[1,4,5,0,2,3],[1,4,5,0,3,2],[1,4,5,2,0,3],[1,4,5,2,3,0],[1,4,5,3,0,2],[1,4,5,3,2,0],[1,5,0,2,3,4],[1,5,0,2,4,3],[1,5,0,3,2,4],[1,5,0,3,4,2],[1,5,0,4,2,3],[1,5,0,4,3,2],[1,5,2,0,3,4],[1,5,2,0,4,3],[1,5,2,3,0,4],[1,5,2,3,4,0],[1,5,2,4,0,3],[1,5,2,4,3,0],[1,5,3,0,2,4],[1,5,3,0,4,2],[1,5,3,2,0,4],[1,5,3,2,4,0],[1,5,3,4,0,2],[1,5,3,4,2,0],[1,5,4,0,2,3],[1,5,4,0,3,2],[1,5,4,2,0,3],[1,5,4,2,3,0],[1,5,4,3,0,2],[1,5,4,3,2,0],[2,0,1,3,4,5],[2,0,1,3,5,4],[2,0,1,4,3,5],[2,0,1,4,5,3],[2,0,1,5,3,4],[2,0,1,5,4,3],[2,0,3,1,4,5],[2,0,3,1,5,4],[2,0,3,4,1,5],[2,0,3,4,5,1],[2,0,3,5,1,4],[2,0,3,5,4,1],[2,0,4,1,3,5],[2,0,4,1,5,3],[2,0,4,3,1,5],[2,0,4,3,5,1],[2,0,4,5,1,3],[2,0,4,5,3,1],[2,0,5,1,3,4],[2,0,5,1,4,3],[2,0,5,3,1,4],[2,0,5,3,4,1],[2,0,5,4,1,3],[2,0,5,4,3,1],[2,1,0,3,4,5],[2,1,0,3,5,4],[2,1,0,4,3,5],[2,1,0,4,5,3],[2,1,0,5,3,4],[2,1,0,5,4,3],[2,1,3,0,4,5],[2,1,3,0,5,4],[2,1,3,4,0,5],[2,1,3,4,5,0],[2,1,3,5,0,4],[2,1,3,5,4,0],[2,1,4,0,3,5],[2,1,4,0,5,3],[2,1,4,3,0,5],[2,1,4,3,5,0],[2,1,4,5,0,3],[2,1,4,5,3,0],[2,1,5,0,3,4],[2,1,5,0,4,3],[2,1,5,3,0,4],[2,1,5,3,4,0],[2,1,5,4,0,3],[2,1,5,4,3,0],[2,3,0,1,4,5],[2,3,0,1,5,4],[2,3,0,4,1,5],[2,3,0,4,5,1],[2,3,0,5,1,4],[2,3,0,5,4,1],[2,3,1,0,4,5],[2,3,1,0,5,4],[2,3,1,4,0,5],[2,3,1,4,5,0],[2,3,1,5,0,4],[2,3,1,5,4,0],[2,3,4,0,1,5],[2,3,4,0,5,1],[2,3,4,1,0,5],[2,3,4,1,5,0],[2,3,4,5,0,1],[2,3,4,5,1,0],[2,3,5,0,1,4],[2,3,5,0,4,1],[2,3,5,1,0,4],[2,3,5,1,4,0],[2,3,5,4,0,1],[2,3,5,4,1,0],[2,4,0,1,3,5],[2,4,0,1,5,3],[2,4,0,3,1,5],[2,4,0,3,5,1],[2,4,0,5,1,3],[2,4,0,5,3,1],[2,4,1,0,3,5],[2,4,1,0,5,3],[2,4,1,3,0,5],[2,4,1,3,5,0],[2,4,1,5,0,3],[2,4,1,5,3,0],[2,4,3,0,1,5],[2,4,3,0,5,1],[2,4,3,1,0,5],[2,4,3,1,5,0],[2,4,3,5,0,1],[2,4,3,5,1,0],[2,4,5,0,1,3],[2,4,5,0,3,1],[2,4,5,1,0,3],[2,4,5,1,3,0],[2,4,5,3,0,1],[2,4,5,3,1,0],[2,5,0,1,3,4],[2,5,0,1,4,3],[2,5,0,3,1,4],[2,5,0,3,4,1],[2,5,0,4,1,3],[2,5,0,4,3,1],[2,5,1,0,3,4],[2,5,1,0,4,3],[2,5,1,3,0,4],[2,5,1,3,4,0],[2,5,1,4,0,3],[2,5,1,4,3,0],[2,5,3,0,1,4],[2,5,3,0,4,1],[2,5,3,1,0,4],[2,5,3,1,4,0],[2,5,3,4,0,1],[2,5,3,4,1,0],[2,5,4,0,1,3],[2,5,4,0,3,1],[2,5,4,1,0,3],[2,5,4,1,3,0],[2,5,4,3,0,1],[2,5,4,3,1,0],[3,0,1,2,4,5],[3,0,1,2,5,4],[3,0,1,4,2,5],[3,0,1,4,5,2],[3,0,1,5,2,4],[3,0,1,5,4,2],[3,0,2,1,4,5],[3,0,2,1,5,4],[3,0,2,4,1,5],[3,0,2,4,5,1],[3,0,2,5,1,4],[3,0,2,5,4,1],[3,0,4,1,2,5],[3,0,4,1,5,2],[3,0,4,2,1,5],[3,0,4,2,5,1],[3,0,4,5,1,2],[3,0,4,5,2,1],[3,0,5,1,2,4],[3,0,5,1,4,2],[3,0,5,2,1,4],[3,0,5,2,4,1],[3,0,5,4,1,2],[3,0,5,4,2,1],[3,1,0,2,4,5],[3,1,0,2,5,4],[3,1,0,4,2,5],[3,1,0,4,5,2],[3,1,0,5,2,4],[3,1,0,5,4,2],[3,1,2,0,4,5],[3,1,2,0,5,4],[3,1,2,4,0,5],[3,1,2,4,5,0],[3,1,2,5,0,4],[3,1,2,5,4,0],[3,1,4,0,2,5],[3,1,4,0,5,2],[3,1,4,2,0,5],[3,1,4,2,5,0],[3,1,4,5,0,2],[3,1,4,5,2,0],[3,1,5,0,2,4],[3,1,5,0,4,2],[3,1,5,2,0,4],[3,1,5,2,4,0],[3,1,5,4,0,2],[3,1,5,4,2,0],[3,2,0,1,4,5],[3,2,0,1,5,4],[3,2,0,4,1,5],[3,2,0,4,5,1],[3,2,0,5,1,4],[3,2,0,5,4,1],[3,2,1,0,4,5],[3,2,1,0,5,4],[3,2,1,4,0,5],[3,2,1,4,5,0],[3,2,1,5,0,4],[3,2,1,5,4,0],[3,2,4,0,1,5],[3,2,4,0,5,1],[3,2,4,1,0,5],[3,2,4,1,5,0],[3,2,4,5,0,1],[3,2,4,5,1,0],[3,2,5,0,1,4],[3,2,5,0,4,1],[3,2,5,1,0,4],[3,2,5,1,4,0],[3,2,5,4,0,1],[3,2,5,4,1,0],[3,4,0,1,2,5],[3,4,0,1,5,2],[3,4,0,2,1,5],[3,4,0,2,5,1],[3,4,0,5,1,2],[3,4,0,5,2,1],[3,4,1,0,2,5],[3,4,1,0,5,2],[3,4,1,2,0,5],[3,4,1,2,5,0],[3,4,1,5,0,2],[3,4,1,5,2,0],[3,4,2,0,1,5],[3,4,2,0,5,1],[3,4,2,1,0,5],[3,4,2,1,5,0],[3,4,2,5,0,1],[3,4,2,5,1,0],[3,4,5,0,1,2],[3,4,5,0,2,1],[3,4,5,1,0,2],[3,4,5,1,2,0],[3,4,5,2,0,1],[3,4,5,2,1,0],[3,5,0,1,2,4],[3,5,0,1,4,2],[3,5,0,2,1,4],[3,5,0,2,4,1],[3,5,0,4,1,2],[3,5,0,4,2,1],[3,5,1,0,2,4],[3,5,1,0,4,2],[3,5,1,2,0,4],[3,5,1,2,4,0],[3,5,1,4,0,2],[3,5,1,4,2,0],[3,5,2,0,1,4],[3,5,2,0,4,1],[3,5,2,1,0,4],[3,5,2,1,4,0],[3,5,2,4,0,1],[3,5,2,4,1,0],[3,5,4,0,1,2],[3,5,4,0,2,1],[3,5,4,1,0,2],[3,5,4,1,2,0],[3,5,4,2,0,1],[3,5,4,2,1,0],[4,0,1,2,3,5],[4,0,1,2,5,3],[4,0,1,3,2,5],[4,0,1,3,5,2],[4,0,1,5,2,3],[4,0,1,5,3,2],[4,0,2,1,3,5],[4,0,2,1,5,3],[4,0,2,3,1,5],[4,0,2,3,5,1],[4,0,2,5,1,3],[4,0,2,5,3,1],[4,0,3,1,2,5],[4,0,3,1,5,2],[4,0,3,2,1,5],[4,0,3,2,5,1],[4,0,3,5,1,2],[4,0,3,5,2,1],[4,0,5,1,2,3],[4,0,5,1,3,2],[4,0,5,2,1,3],[4,0,5,2,3,1],[4,0,5,3,1,2],[4,0,5,3,2,1],[4,1,0,2,3,5],[4,1,0,2,5,3],[4,1,0,3,2,5],[4,1,0,3,5,2],[4,1,0,5,2,3],[4,1,0,5,3,2],[4,1,2,0,3,5],[4,1,2,0,5,3],[4,1,2,3,0,5],[4,1,2,3,5,0],[4,1,2,5,0,3],[4,1,2,5,3,0],[4,1,3,0,2,5],[4,1,3,0,5,2],[4,1,3,2,0,5],[4,1,3,2,5,0],[4,1,3,5,0,2],[4,1,3,5,2,0],[4,1,5,0,2,3],[4,1,5,0,3,2],[4,1,5,2,0,3],[4,1,5,2,3,0],[4,1,5,3,0,2],[4,1,5,3,2,0],[4,2,0,1,3,5],[4,2,0,1,5,3],[4,2,0,3,1,5],[4,2,0,3,5,1],[4,2,0,5,1,3],[4,2,0,5,3,1],[4,2,1,0,3,5],[4,2,1,0,5,3],[4,2,1,3,0,5],[4,2,1,3,5,0],[4,2,1,5,0,3],[4,2,1,5,3,0],[4,2,3,0,1,5],[4,2,3,0,5,1],[4,2,3,1,0,5],[4,2,3,1,5,0],[4,2,3,5,0,1],[4,2,3,5,1,0],[4,2,5,0,1,3],[4,2,5,0,3,1],[4,2,5,1,0,3],[4,2,5,1,3,0],[4,2,5,3,0,1],[4,2,5,3,1,0],[4,3,0,1,2,5],[4,3,0,1,5,2],[4,3,0,2,1,5],[4,3,0,2,5,1],[4,3,0,5,1,2],[4,3,0,5,2,1],[4,3,1,0,2,5],[4,3,1,0,5,2],[4,3,1,2,0,5],[4,3,1,2,5,0],[4,3,1,5,0,2],[4,3,1,5,2,0],[4,3,2,0,1,5],[4,3,2,0,5,1],[4,3,2,1,0,5],[4,3,2,1,5,0],[4,3,2,5,0,1],[4,3,2,5,1,0],[4,3,5,0,1,2],[4,3,5,0,2,1],[4,3,5,1,0,2],[4,3,5,1,2,0],[4,3,5,2,0,1],[4,3,5,2,1,0],[4,5,0,1,2,3],[4,5,0,1,3,2],[4,5,0,2,1,3],[4,5,0,2,3,1],[4,5,0,3,1,2],[4,5,0,3,2,1],[4,5,1,0,2,3],[4,5,1,0,3,2],[4,5,1,2,0,3],[4,5,1,2,3,0],[4,5,1,3,0,2],[4,5,1,3,2,0],[4,5,2,0,1,3],[4,5,2,0,3,1],[4,5,2,1,0,3],[4,5,2,1,3,0],[4,5,2,3,0,1],[4,5,2,3,1,0],[4,5,3,0,1,2],[4,5,3,0,2,1],[4,5,3,1,0,2],[4,5,3,1,2,0],[4,5,3,2,0,1],[4,5,3,2,1,0],[5,0,1,2,3,4],[5,0,1,2,4,3],[5,0,1,3,2,4],[5,0,1,3,4,2],[5,0,1,4,2,3],[5,0,1,4,3,2],[5,0,2,1,3,4],[5,0,2,1,4,3],[5,0,2,3,1,4],[5,0,2,3,4,1],[5,0,2,4,1,3],[5,0,2,4,3,1],[5,0,3,1,2,4],[5,0,3,1,4,2],[5,0,3,2,1,4],[5,0,3,2,4,1],[5,0,3,4,1,2],[5,0,3,4,2,1],[5,0,4,1,2,3],[5,0,4,1,3,2],[5,0,4,2,1,3],[5,0,4,2,3,1],[5,0,4,3,1,2],[5,0,4,3,2,1],[5,1,0,2,3,4],[5,1,0,2,4,3],[5,1,0,3,2,4],[5,1,0,3,4,2],[5,1,0,4,2,3],[5,1,0,4,3,2],[5,1,2,0,3,4],[5,1,2,0,4,3],[5,1,2,3,0,4],[5,1,2,3,4,0],[5,1,2,4,0,3],[5,1,2,4,3,0],[5,1,3,0,2,4],[5,1,3,0,4,2],[5,1,3,2,0,4],[5,1,3,2,4,0],[5,1,3,4,0,2],[5,1,3,4,2,0],[5,1,4,0,2,3],[5,1,4,0,3,2],[5,1,4,2,0,3],[5,1,4,2,3,0],[5,1,4,3,0,2],[5,1,4,3,2,0],[5,2,0,1,3,4],[5,2,0,1,4,3],[5,2,0,3,1,4],[5,2,0,3,4,1],[5,2,0,4,1,3],[5,2,0,4,3,1],[5,2,1,0,3,4],[5,2,1,0,4,3],[5,2,1,3,0,4],[5,2,1,3,4,0],[5,2,1,4,0,3],[5,2,1,4,3,0],[5,2,3,0,1,4],[5,2,3,0,4,1],[5,2,3,1,0,4],[5,2,3,1,4,0],[5,2,3,4,0,1],[5,2,3,4,1,0],[5,2,4,0,1,3],[5,2,4,0,3,1],[5,2,4,1,0,3],[5,2,4,1,3,0],[5,2,4,3,0,1],[5,2,4,3,1,0],[5,3,0,1,2,4],[5,3,0,1,4,2],[5,3,0,2,1,4],[5,3,0,2,4,1],[5,3,0,4,1,2],[5,3,0,4,2,1],[5,3,1,0,2,4],[5,3,1,0,4,2],[5,3,1,2,0,4],[5,3,1,2,4,0],[5,3,1,4,0,2],[5,3,1,4,2,0],[5,3,2,0,1,4],[5,3,2,0,4,1],[5,3,2,1,0,4],[5,3,2,1,4,0],[5,3,2,4,0,1],[5,3,2,4,1,0],[5,3,4,0,1,2],[5,3,4,0,2,1],[5,3,4,1,0,2],[5,3,4,1,2,0],[5,3,4,2,0,1],[5,3,4,2,1,0],[5,4,0,1,2,3],[5,4,0,1,3,2],[5,4,0,2,1,3],[5,4,0,2,3,1],[5,4,0,3,1,2],[5,4,0,3,2,1],[5,4,1,0,2,3],[5,4,1,0,3,2],[5,4,1,2,0,3],[5,4,1,2,3,0],[5,4,1,3,0,2],[5,4,1,3,2,0],[5,4,2,0,1,3],[5,4,2,0,3,1],[5,4,2,1,0,3],[5,4,2,1,3,0],[5,4,2,3,0,1],[5,4,2,3,1,0],[5,4,3,0,1,2],[5,4,3,0,2,1],[5,4,3,1,0,2],[5,4,3,1,2,0],[5,4,3,2,0,1],[5,4,3,2,1,0]], label: '6 numbers, 720 permutations' },
    ],
    hints: [
      'A permutation is built position by position. For each position, which numbers are allowed?',
      'Any number that has not been used yet in the current permutation. Keep a "used" array (or a Set) to know.',
      'If cur has length n, record a copy. Otherwise loop over all indexes: skip used ones, mark used, push, recurse, then undo both (pop and unmark).',
    ],
    solution: `function permute(nums) {
  const result = []
  const cur = []
  const used = new Array(nums.length).fill(false)
  const go = () => {
    if (cur.length === nums.length) {
      result.push([...cur])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue
      used[i] = true
      cur.push(nums[i])
      go()
      cur.pop()
      used[i] = false
    }
  }
  go()
  return result
}
`,
    explain: 'Each level of the recursion fills one position. A used marker stops a number from appearing twice, and undoing the marker after the recursive call lets the number be used in another position. A permutation is complete when every position is filled.',
    time: 'O(n × n!)',
    space: 'O(n) extra',
  },
  {
    id: 'combination-sum',
    lc: { n: 39, slug: 'combination-sum' },
    lesson: 'backtracking',
    title: 'Combination Sum',
    diff: 'medium',
    fn: 'combinationSum',
    compare: 'unordered',
    prompt: `<p>Given an array of <b>different</b> positive integers <code>candidates</code> and a number <code>target</code>, return all unique combinations of candidates that add up to <code>target</code>.</p>
<p>The same candidate may be used <b>any number of times</b>. Two combinations are different if the count of at least one number differs. The order of the combinations does not matter.</p>`,
    examples: [
      { input: 'candidates = [2, 3, 6, 7], target = 7', output: '[[2, 2, 3], [7]]', note: '2 + 2 + 3 and 7.' },
      { input: 'candidates = [2, 3, 5], target = 8', output: '[[2, 2, 2, 2], [2, 3, 3], [3, 5]]' },
      { input: 'candidates = [2], target = 1', output: '[]' },
    ],
    starter: `function combinationSum(candidates, target) {
  // your code here
}
`,
    tests: () => [
      { args: [[2,3,6,7],7], expected: [[2,2,3],[7]] },
      { args: [[2,3,5],8], expected: [[2,2,2,2],[2,3,3],[3,5]] },
      { args: [[2],1], expected: [] },
      { args: [[1],1], expected: [[1]] },
      { args: [[1],3], expected: [[1,1,1]] },
      { args: [[7,3,2],18], expected: [[2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,3,3],[2,2,2,2,3,7],[2,2,2,3,3,3,3],[2,2,7,7],[2,3,3,3,7],[3,3,3,3,3,3]] },
      { args: [[4,2,8],8], expected: [[2,2,2,2],[2,2,4],[4,4],[8]] },
      { args: [[2, 3, 5], 30], expected: [[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,3,3],[2,2,2,2,2,2,2,2,2,2,2,3,5],[2,2,2,2,2,2,2,2,2,2,5,5],[2,2,2,2,2,2,2,2,2,3,3,3,3],[2,2,2,2,2,2,2,2,3,3,3,5],[2,2,2,2,2,2,2,3,3,5,5],[2,2,2,2,2,2,3,3,3,3,3,3],[2,2,2,2,2,2,3,5,5,5],[2,2,2,2,2,3,3,3,3,3,5],[2,2,2,2,2,5,5,5,5],[2,2,2,2,3,3,3,3,5,5],[2,2,2,3,3,3,3,3,3,3,3],[2,2,2,3,3,3,5,5,5],[2,2,3,3,3,3,3,3,3,5],[2,2,3,3,5,5,5,5],[2,3,3,3,3,3,3,5,5],[2,3,5,5,5,5,5],[3,3,3,3,3,3,3,3,3,3],[3,3,3,3,3,5,5,5],[5,5,5,5,5,5]], label: 'target 30' },
      { args: [[3, 5, 7, 9], 40], expected: [[3,3,3,3,3,3,3,3,3,3,3,7],[3,3,3,3,3,3,3,3,3,3,5,5],[3,3,3,3,3,3,3,3,7,9],[3,3,3,3,3,3,3,5,5,9],[3,3,3,3,3,3,3,5,7,7],[3,3,3,3,3,3,5,5,5,7],[3,3,3,3,3,5,5,5,5,5],[3,3,3,3,3,7,9,9],[3,3,3,3,5,5,9,9],[3,3,3,3,5,7,7,9],[3,3,3,3,7,7,7,7],[3,3,3,5,5,5,7,9],[3,3,3,5,5,7,7,7],[3,3,5,5,5,5,5,9],[3,3,5,5,5,5,7,7],[3,3,7,9,9,9],[3,5,5,5,5,5,5,7],[3,5,5,9,9,9],[3,5,7,7,9,9],[3,7,7,7,7,9],[5,5,5,5,5,5,5,5],[5,5,5,7,9,9],[5,5,7,7,7,9],[5,7,7,7,7,7]], label: 'target 40' },
    ],
    hints: [
      'Each candidate can be used again and again. After you pick a candidate, can the same one be picked next?',
      'Yes, so the recursive call keeps the same index. To avoid building [2, 3] and [3, 2], only allow candidates from the current index onward.',
      'Track the remaining target. If it is 0, record a copy. If a candidate is bigger than the remaining target, skip it (sorting the candidates lets you break out of the loop).',
    ],
    solution: `function combinationSum(candidates, target) {
  const nums = [...candidates].sort((a, b) => a - b)
  const result = []
  const cur = []
  const go = (start, remaining) => {
    if (remaining === 0) {
      result.push([...cur])
      return
    }
    for (let i = start; i < nums.length; i++) {
      if (nums[i] > remaining) break
      cur.push(nums[i])
      go(i, remaining - nums[i])
      cur.pop()
    }
  }
  go(0, target)
  return result
}
`,
    explain: 'Calling the recursion with the same index i lets a candidate repeat. Only moving forward through the candidates stops the same combination from being built in a different order. Sorting plus break prunes every branch where the next candidate is already too big.',
    time: 'O(n^(t/m))',
    space: 'O(t/m)',
  },
  {
    id: 'kth-largest-element',
    lc: { n: 215, slug: 'kth-largest-element-in-an-array' },
    lesson: 'heap',
    title: 'Kth Largest Element in an Array',
    diff: 'medium',
    fn: 'findKthLargest',
    prompt: `<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <b>k-th largest</b> element of the array. It is the k-th largest in sorted order, so duplicates count: in <code>[5, 5, 4]</code> the 2nd largest is 5.</p>
<p>You can sort, but try to do better with a heap of size k.</p>`,
    examples: [
      { input: 'nums = [3, 2, 1, 5, 6, 4], k = 2', output: '5' },
      { input: 'nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4', output: '4' },
    ],
    starter: `function findKthLargest(nums, k) {
  // your code here
}
`,
    tests: () => [
      { args: [[3,2,1,5,6,4],2], expected: 5 },
      { args: [[3,2,3,1,2,4,5,5,6],4], expected: 4 },
      { args: [[1],1], expected: 1 },
      { args: [[2,1],2], expected: 1 },
      { args: [[-1,-1],2], expected: -1 },
      { args: [[7,6,5,4,3,2,1],5], expected: 3 },
      { args: [[5,5,4],2], expected: 5 },
      { args: [range(200000, (i) => (i * 7919) % 200003), 1000], expected: 199003, label: '200,000 numbers, k = 1,000' },
    ],
    hints: [
      'The k-th largest is the smallest of the k largest numbers. Do you need to keep the other numbers?',
      'Keep a MIN-heap that holds at most k numbers. Its top is the smallest of them, which is the current k-th largest.',
      'For each number: if the heap has fewer than k items, add it. Otherwise, if the number is bigger than the top, replace the top. At the end the top is the answer. JavaScript has no heap, so write a small one with an array.',
    ],
    solution: `function findKthLargest(nums, k) {
  const heap = []
  const up = (i) => {
    while (i > 0) {
      const p = (i - 1) >> 1
      if (heap[p] <= heap[i]) break
      ;[heap[p], heap[i]] = [heap[i], heap[p]]
      i = p
    }
  }
  const down = (i) => {
    const n = heap.length
    while (true) {
      let s = i
      const l = 2 * i + 1
      const r = l + 1
      if (l < n && heap[l] < heap[s]) s = l
      if (r < n && heap[r] < heap[s]) s = r
      if (s === i) break
      ;[heap[s], heap[i]] = [heap[i], heap[s]]
      i = s
    }
  }
  for (const x of nums) {
    if (heap.length < k) {
      heap.push(x)
      up(heap.length - 1)
    } else if (x > heap[0]) {
      heap[0] = x
      down(0)
    }
  }
  return heap[0]
}
`,
    explain: 'A min-heap of size k always holds the k largest numbers seen so far, and its smallest one (the top) is the k-th largest. Each new number either gets ignored or replaces the top, and fixing the heap takes O(log k).',
    time: 'O(n log k)',
    space: 'O(k)',
  },
  {
    id: 'top-k-frequent',
    lc: { n: 347, slug: 'top-k-frequent-elements' },
    lesson: 'heap',
    title: 'Top K Frequent Elements',
    diff: 'medium',
    fn: 'topKFrequent',
    compare: 'unordered',
    prompt: `<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code> values that appear <b>most often</b>. The answer is unique (there are no ties at the border), and you may return it in any order.</p>
<p>Aim for better than O(n log n) time.</p>`,
    examples: [
      { input: 'nums = [1, 1, 1, 2, 2, 3], k = 2', output: '[1, 2]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    starter: `function topKFrequent(nums, k) {
  // your code here
}
`,
    tests: () => [
      { args: [[1,1,1,2,2,3],2], expected: [1,2] },
      { args: [[1],1], expected: [1] },
      { args: [[4,4,4,5,5,6],1], expected: [4] },
      { args: [[1,2],2], expected: [1,2] },
      { args: [[-1,-1,2,2,3],2], expected: [-1,2] },
      { args: [[3,0,1,0],1], expected: [0] },
      { args: [[5,3,5,3,5,1,1,1,1],2], expected: [1,5] },
      { args: [range(300, (v) => range(v + 1, () => v)).flat(), 5], expected: [299,298,297,296,295], label: '45,150 numbers' },
    ],
    hints: [
      'First count how often each value appears. Which structure is good for that?',
      'Now you have (value, count) pairs. Sorting them by count works in O(n log n). To do better, notice that a count can never be more than n.',
      'Make buckets: bucket[c] holds the values that appear exactly c times. Then walk the buckets from the largest count down and collect values until you have k.',
    ],
    solution: `function topKFrequent(nums, k) {
  const count = new Map()
  for (const x of nums) count.set(x, (count.get(x) ?? 0) + 1)
  const buckets = Array.from({ length: nums.length + 1 }, () => [])
  for (const [value, c] of count) buckets[c].push(value)
  const out = []
  for (let f = buckets.length - 1; f >= 0 && out.length < k; f--) {
    for (const value of buckets[f]) {
      out.push(value)
      if (out.length === k) break
    }
  }
  return out
}
`,
    explain: 'A count can only be a whole number between 1 and n, so values can be grouped by count in an array of n + 1 buckets. Reading the buckets from the highest count down gives the most frequent values first, without sorting.',
    time: 'O(n)',
    space: 'O(n)',
  },
  {
    id: 'valid-path-in-graph',
    lc: { n: 1971, slug: 'find-if-path-exists-in-graph' },
    lesson: 'graph-repr',
    title: 'Find if Path Exists in Graph',
    diff: 'easy',
    fn: 'validPath',
    prompt: `<p>There are <code>n</code> nodes numbered <code>0</code> to <code>n - 1</code>, joined by <b>undirected</b> edges. <code>edges[i] = [a, b]</code> means a two-way edge between <code>a</code> and <code>b</code>.</p>
<p>Return <code>true</code> if there is a path from <code>source</code> to <code>destination</code>, otherwise <code>false</code>.</p>`,
    examples: [
      { input: 'n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2', output: 'true' },
      { input: 'n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5', output: 'false', note: 'The graph has two separate parts.' },
    ],
    starter: `function validPath(n, edges, source, destination) {
  // your code here
}
`,
    tests: () => [
      { args: [3,[[0,1],[1,2],[2,0]],0,2], expected: true },
      { args: [6,[[0,1],[0,2],[3,5],[5,4],[4,3]],0,5], expected: false },
      { args: [1,[],0,0], expected: true },
      { args: [2,[],0,1], expected: false },
      { args: [4,[[0,1],[2,3]],0,3], expected: false },
      { args: [5,[[0,1],[1,2],[2,3],[3,4]],4,0], expected: true },
      { args: [100000, range(99999, (i) => [i, i + 1]), 0, 99999], expected: true, label: 'a path through 100,000 nodes' },
      { args: [100000, range(99998, (i) => [i, i + 1]), 0, 99999], expected: false, label: 'the last node is cut off' },
    ],
    hints: [
      'A list of edges is hard to search. Turn it into an adjacency list: for each node, the list of its neighbours.',
      'Both directions count: for an edge [a, b], add b to a\'s list and a to b\'s list.',
      'Start at source and explore with a stack (or queue). Mark each node you visit so you never visit it twice. Return true as soon as you reach destination. A very long chain can overflow the call stack, so avoid recursion.',
    ],
    solution: `function validPath(n, edges, source, destination) {
  const adj = Array.from({ length: n }, () => [])
  for (const [a, b] of edges) {
    adj[a].push(b)
    adj[b].push(a)
  }
  const seen = new Array(n).fill(false)
  const stack = [source]
  seen[source] = true
  while (stack.length) {
    const node = stack.pop()
    if (node === destination) return true
    for (const next of adj[node]) {
      if (!seen[next]) {
        seen[next] = true
        stack.push(next)
      }
    }
  }
  return false
}
`,
    explain: 'An adjacency list lets you ask "who are the neighbours of this node?" in one step. Exploring from the source with a visited array reaches exactly the nodes in the same connected part, so destination is found if and only if a path exists.',
    time: 'O(V + E)',
    space: 'O(V + E)',
  },
  {
    id: 'find-town-judge',
    lc: { n: 997, slug: 'find-the-town-judge' },
    lesson: 'graph-repr',
    title: 'Find the Town Judge',
    diff: 'easy',
    fn: 'findJudge',
    prompt: `<p>In a town of <code>n</code> people (labelled <code>1</code> to <code>n</code>) there may be a <b>judge</b>. The judge:</p>
<ul><li>trusts nobody,</li><li>is trusted by everybody else.</li></ul>
<p><code>trust[i] = [a, b]</code> means person <code>a</code> trusts person <code>b</code>. Return the label of the judge, or <code>-1</code> if there is no judge.</p>`,
    examples: [
      { input: 'n = 2, trust = [[1,2]]', output: '2' },
      { input: 'n = 3, trust = [[1,3],[2,3],[3,1]]', output: '-1', note: 'Person 3 trusts someone.' },
      { input: 'n = 1, trust = []', output: '1' },
    ],
    starter: `function findJudge(n, trust) {
  // your code here
}
`,
    tests: () => [
      { args: [2,[[1,2]]], expected: 2 },
      { args: [3,[[1,3],[2,3]]], expected: 3 },
      { args: [3,[[1,3],[2,3],[3,1]]], expected: -1 },
      { args: [1,[]], expected: 1 },
      { args: [3,[[1,2],[2,3]]], expected: -1 },
      { args: [4,[[1,3],[1,4],[2,3],[2,4],[4,3]]], expected: 3 },
      { args: [100000, range(99999, (i) => [i + 1, 100000])], expected: 100000, label: '100,000 people, everyone trusts the last' },
      { args: [100000, []], expected: -1, label: '100,000 people, no trust at all' },
    ],
    hints: [
      'Think of "a trusts b" as an arrow from a to b. The judge has n - 1 arrows pointing in and 0 arrows pointing out.',
      'You do not need the whole graph. For each person you only need (arrows in) minus (arrows out).',
      'Keep a score for every person: +1 when someone trusts them, -1 when they trust someone. The judge is the person whose score is exactly n - 1.',
    ],
    solution: `function findJudge(n, trust) {
  const score = new Array(n + 1).fill(0)
  for (const [a, b] of trust) {
    score[a]--
    score[b]++
  }
  for (let person = 1; person <= n; person++) {
    if (score[person] === n - 1) return person
  }
  return -1
}
`,
    explain: 'The judge has n - 1 incoming and 0 outgoing arrows. Nobody else can reach a score of n - 1, because each of their outgoing arrows lowers it by one and they can have at most n - 1 incoming ones. So one score per person is enough.',
    time: 'O(n + t)',
    space: 'O(n)',
  },
  {
    id: 'rotting-oranges',
    lc: { n: 994, slug: 'rotting-oranges' },
    lesson: 'bfs-graphs',
    title: 'Rotting Oranges',
    diff: 'medium',
    fn: 'orangesRotting',
    prompt: `<p>A grid has cells with <code>0</code> (empty), <code>1</code> (fresh orange) or <code>2</code> (rotten orange). Every minute, each fresh orange that is next to a rotten orange (up, down, left, right) becomes rotten.</p>
<p>Return the number of minutes until no fresh orange is left. If that is impossible, return <code>-1</code>.</p>`,
    examples: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4', note: 'All oranges rot after 4 minutes.' },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1', note: 'The orange at the bottom left is cut off.' },
      { input: 'grid = [[0,2]]', output: '0' },
    ],
    starter: `function orangesRotting(grid) {
  // your code here
}
`,
    tests: () => [
      { args: [[[2,1,1],[1,1,0],[0,1,1]]], expected: 4 },
      { args: [[[2,1,1],[0,1,1],[1,0,1]]], expected: -1 },
      { args: [[[0,2]]], expected: 0 },
      { args: [[[0]]], expected: 0 },
      { args: [[[1]]], expected: -1 },
      { args: [[[2,2],[2,2]]], expected: 0 },
      { args: [[[2,1,1],[1,1,1],[0,1,2]]], expected: 2 },
      { args: [range(300, (r) => range(300, (c) => (r === 0 && c === 0 ? 2 : 1)))], expected: 598, label: '300 × 300 grid, one rotten corner' },
      { args: [range(300, () => range(300, () => 1))], expected: -1, label: 'all fresh, none rotten' },
    ],
    hints: [
      'Every rotten orange spreads at the same time, minute by minute. That is the picture of a breadth first search that starts from many points at once.',
      'Put all the rotten oranges in the queue at the start and count the fresh ones. One round of the queue is one minute.',
      'In each round, take the oranges currently in the queue, rot their fresh neighbours, add them to the queue and lower the fresh count. Count a minute only if the round did something. At the end, return minutes if fresh is 0, otherwise -1.',
    ],
    solution: `function orangesRotting(grid) {
  const rows = grid.length
  const cols = rows ? grid[0].length : 0
  const queue = []
  let fresh = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c])
      else if (grid[r][c] === 1) fresh++
    }
  }
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  let head = 0
  let minutes = 0
  while (head < queue.length && fresh > 0) {
    const size = queue.length - head
    for (let i = 0; i < size; i++) {
      const [r, c] = queue[head++]
      for (const [dr, dc] of dirs) {
        const nr = r + dr
        const nc = c + dc
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2
          fresh--
          queue.push([nr, nc])
        }
      }
    }
    minutes++
  }
  return fresh === 0 ? minutes : -1
}
`,
    explain: 'A multi-source BFS starts with every rotten orange in the queue, so each round of the queue is exactly one minute of spreading. Counting the fresh oranges tells you at the end whether some were never reached.',
    time: 'O(rows × cols)',
    space: 'O(rows × cols)',
  },
  {
    id: 'number-of-provinces',
    lc: { n: 547, slug: 'number-of-provinces' },
    lesson: 'dfs-graphs',
    title: 'Number of Provinces',
    diff: 'medium',
    fn: 'findCircleNum',
    prompt: `<p>There are <code>n</code> cities. <code>isConnected[i][j] = 1</code> means city <code>i</code> and city <code>j</code> are directly connected, and <code>0</code> means they are not. Every city is connected to itself.</p>
<p>A <b>province</b> is a group of cities that are directly or indirectly connected. Return the number of provinces.</p>`,
    examples: [
      { input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]', output: '2' },
      { input: 'isConnected = [[1,0,0],[0,1,0],[0,0,1]]', output: '3' },
    ],
    starter: `function findCircleNum(isConnected) {
  // your code here
}
`,
    tests: () => [
      { args: [[[1,1,0],[1,1,0],[0,0,1]]], expected: 2 },
      { args: [[[1,0,0],[0,1,0],[0,0,1]]], expected: 3 },
      { args: [[[1]]], expected: 1 },
      { args: [[[1,1],[1,1]]], expected: 1 },
      { args: [[[1,0,0,1],[0,1,1,0],[0,1,1,1],[1,0,1,1]]], expected: 1 },
      { args: [[[1,0,1],[0,1,0],[1,0,1]]], expected: 2 },
      { args: [range(1000, () => range(1000, () => 1))], expected: 1, label: '1,000 cities, all connected' },
      { args: [range(1000, (i) => range(1000, (j) => (i === j ? 1 : 0)))], expected: 1000, label: '1,000 cities, none connected' },
    ],
    hints: [
      'Each province is a connected group. If you could visit every city of one group in one go, how many "go"s would you need?',
      'Loop over the cities. When you meet a city that has not been visited, you have found a new province: add 1 and visit everything connected to it.',
      'Use a stack: pop a city, look at row isConnected[city], and push every unvisited j with a 1. Mark cities visited when you push them. The count is the number of times you start a new search.',
    ],
    solution: `function findCircleNum(isConnected) {
  const n = isConnected.length
  const visited = new Array(n).fill(false)
  let provinces = 0
  for (let start = 0; start < n; start++) {
    if (visited[start]) continue
    provinces++
    visited[start] = true
    const stack = [start]
    while (stack.length) {
      const city = stack.pop()
      for (let next = 0; next < n; next++) {
        if (isConnected[city][next] === 1 && !visited[next]) {
          visited[next] = true
          stack.push(next)
        }
      }
    }
  }
  return provinces
}
`,
    explain: 'Each search from an unvisited city covers its whole province, so the number of searches you have to start is the number of provinces. The matrix is read row by row, so every cell is looked at at most once per city.',
    time: 'O(n²)',
    space: 'O(n)',
  },
  {
    id: 'all-paths-source-target',
    lc: { n: 797, slug: 'all-paths-from-source-to-target' },
    lesson: 'dfs-graphs',
    title: 'All Paths From Source to Target',
    diff: 'medium',
    fn: 'allPathsSourceTarget',
    compare: 'unordered',
    prompt: `<p>A directed graph with no cycles has <code>n</code> nodes labelled <code>0</code> to <code>n - 1</code>. <code>graph[i]</code> lists the nodes you can reach directly from node <code>i</code>.</p>
<p>Return <b>all paths</b> from node <code>0</code> to node <code>n - 1</code>. The order of the paths does not matter.</p>`,
    examples: [
      { input: 'graph = [[1,2],[3],[3],[]]', output: '[[0, 1, 3], [0, 2, 3]]' },
      { input: 'graph = [[4,3,1],[3,2,4],[3],[4],[]]', output: '[[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]]' },
    ],
    starter: `function allPathsSourceTarget(graph) {
  // your code here
}
`,
    tests: () => [
      { args: [[[1,2],[3],[3],[]]], expected: [[0,1,3],[0,2,3]] },
      { args: [[[4,3,1],[3,2,4],[3],[4],[]]], expected: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]] },
      { args: [[[1],[]]], expected: [[0,1]] },
      { args: [[[]]], expected: [[0]] },
      { args: [[[1,2,3],[2,3],[3],[]]], expected: [[0,1,2,3],[0,1,3],[0,2,3],[0,3]] },
      { args: [[[1],[2],[]]], expected: [[0,1,2]] },
      { args: [range(12, (i) => range(11 - i, (j) => i + 1 + j))], expected: [[0,1,2,3,4,5,6,7,8,9,10,11],[0,1,2,3,4,5,6,7,8,9,11],[0,1,2,3,4,5,6,7,8,10,11],[0,1,2,3,4,5,6,7,8,11],[0,1,2,3,4,5,6,7,9,10,11],[0,1,2,3,4,5,6,7,9,11],[0,1,2,3,4,5,6,7,10,11],[0,1,2,3,4,5,6,7,11],[0,1,2,3,4,5,6,8,9,10,11],[0,1,2,3,4,5,6,8,9,11],[0,1,2,3,4,5,6,8,10,11],[0,1,2,3,4,5,6,8,11],[0,1,2,3,4,5,6,9,10,11],[0,1,2,3,4,5,6,9,11],[0,1,2,3,4,5,6,10,11],[0,1,2,3,4,5,6,11],[0,1,2,3,4,5,7,8,9,10,11],[0,1,2,3,4,5,7,8,9,11],[0,1,2,3,4,5,7,8,10,11],[0,1,2,3,4,5,7,8,11],[0,1,2,3,4,5,7,9,10,11],[0,1,2,3,4,5,7,9,11],[0,1,2,3,4,5,7,10,11],[0,1,2,3,4,5,7,11],[0,1,2,3,4,5,8,9,10,11],[0,1,2,3,4,5,8,9,11],[0,1,2,3,4,5,8,10,11],[0,1,2,3,4,5,8,11],[0,1,2,3,4,5,9,10,11],[0,1,2,3,4,5,9,11],[0,1,2,3,4,5,10,11],[0,1,2,3,4,5,11],[0,1,2,3,4,6,7,8,9,10,11],[0,1,2,3,4,6,7,8,9,11],[0,1,2,3,4,6,7,8,10,11],[0,1,2,3,4,6,7,8,11],[0,1,2,3,4,6,7,9,10,11],[0,1,2,3,4,6,7,9,11],[0,1,2,3,4,6,7,10,11],[0,1,2,3,4,6,7,11],[0,1,2,3,4,6,8,9,10,11],[0,1,2,3,4,6,8,9,11],[0,1,2,3,4,6,8,10,11],[0,1,2,3,4,6,8,11],[0,1,2,3,4,6,9,10,11],[0,1,2,3,4,6,9,11],[0,1,2,3,4,6,10,11],[0,1,2,3,4,6,11],[0,1,2,3,4,7,8,9,10,11],[0,1,2,3,4,7,8,9,11],[0,1,2,3,4,7,8,10,11],[0,1,2,3,4,7,8,11],[0,1,2,3,4,7,9,10,11],[0,1,2,3,4,7,9,11],[0,1,2,3,4,7,10,11],[0,1,2,3,4,7,11],[0,1,2,3,4,8,9,10,11],[0,1,2,3,4,8,9,11],[0,1,2,3,4,8,10,11],[0,1,2,3,4,8,11],[0,1,2,3,4,9,10,11],[0,1,2,3,4,9,11],[0,1,2,3,4,10,11],[0,1,2,3,4,11],[0,1,2,3,5,6,7,8,9,10,11],[0,1,2,3,5,6,7,8,9,11],[0,1,2,3,5,6,7,8,10,11],[0,1,2,3,5,6,7,8,11],[0,1,2,3,5,6,7,9,10,11],[0,1,2,3,5,6,7,9,11],[0,1,2,3,5,6,7,10,11],[0,1,2,3,5,6,7,11],[0,1,2,3,5,6,8,9,10,11],[0,1,2,3,5,6,8,9,11],[0,1,2,3,5,6,8,10,11],[0,1,2,3,5,6,8,11],[0,1,2,3,5,6,9,10,11],[0,1,2,3,5,6,9,11],[0,1,2,3,5,6,10,11],[0,1,2,3,5,6,11],[0,1,2,3,5,7,8,9,10,11],[0,1,2,3,5,7,8,9,11],[0,1,2,3,5,7,8,10,11],[0,1,2,3,5,7,8,11],[0,1,2,3,5,7,9,10,11],[0,1,2,3,5,7,9,11],[0,1,2,3,5,7,10,11],[0,1,2,3,5,7,11],[0,1,2,3,5,8,9,10,11],[0,1,2,3,5,8,9,11],[0,1,2,3,5,8,10,11],[0,1,2,3,5,8,11],[0,1,2,3,5,9,10,11],[0,1,2,3,5,9,11],[0,1,2,3,5,10,11],[0,1,2,3,5,11],[0,1,2,3,6,7,8,9,10,11],[0,1,2,3,6,7,8,9,11],[0,1,2,3,6,7,8,10,11],[0,1,2,3,6,7,8,11],[0,1,2,3,6,7,9,10,11],[0,1,2,3,6,7,9,11],[0,1,2,3,6,7,10,11],[0,1,2,3,6,7,11],[0,1,2,3,6,8,9,10,11],[0,1,2,3,6,8,9,11],[0,1,2,3,6,8,10,11],[0,1,2,3,6,8,11],[0,1,2,3,6,9,10,11],[0,1,2,3,6,9,11],[0,1,2,3,6,10,11],[0,1,2,3,6,11],[0,1,2,3,7,8,9,10,11],[0,1,2,3,7,8,9,11],[0,1,2,3,7,8,10,11],[0,1,2,3,7,8,11],[0,1,2,3,7,9,10,11],[0,1,2,3,7,9,11],[0,1,2,3,7,10,11],[0,1,2,3,7,11],[0,1,2,3,8,9,10,11],[0,1,2,3,8,9,11],[0,1,2,3,8,10,11],[0,1,2,3,8,11],[0,1,2,3,9,10,11],[0,1,2,3,9,11],[0,1,2,3,10,11],[0,1,2,3,11],[0,1,2,4,5,6,7,8,9,10,11],[0,1,2,4,5,6,7,8,9,11],[0,1,2,4,5,6,7,8,10,11],[0,1,2,4,5,6,7,8,11],[0,1,2,4,5,6,7,9,10,11],[0,1,2,4,5,6,7,9,11],[0,1,2,4,5,6,7,10,11],[0,1,2,4,5,6,7,11],[0,1,2,4,5,6,8,9,10,11],[0,1,2,4,5,6,8,9,11],[0,1,2,4,5,6,8,10,11],[0,1,2,4,5,6,8,11],[0,1,2,4,5,6,9,10,11],[0,1,2,4,5,6,9,11],[0,1,2,4,5,6,10,11],[0,1,2,4,5,6,11],[0,1,2,4,5,7,8,9,10,11],[0,1,2,4,5,7,8,9,11],[0,1,2,4,5,7,8,10,11],[0,1,2,4,5,7,8,11],[0,1,2,4,5,7,9,10,11],[0,1,2,4,5,7,9,11],[0,1,2,4,5,7,10,11],[0,1,2,4,5,7,11],[0,1,2,4,5,8,9,10,11],[0,1,2,4,5,8,9,11],[0,1,2,4,5,8,10,11],[0,1,2,4,5,8,11],[0,1,2,4,5,9,10,11],[0,1,2,4,5,9,11],[0,1,2,4,5,10,11],[0,1,2,4,5,11],[0,1,2,4,6,7,8,9,10,11],[0,1,2,4,6,7,8,9,11],[0,1,2,4,6,7,8,10,11],[0,1,2,4,6,7,8,11],[0,1,2,4,6,7,9,10,11],[0,1,2,4,6,7,9,11],[0,1,2,4,6,7,10,11],[0,1,2,4,6,7,11],[0,1,2,4,6,8,9,10,11],[0,1,2,4,6,8,9,11],[0,1,2,4,6,8,10,11],[0,1,2,4,6,8,11],[0,1,2,4,6,9,10,11],[0,1,2,4,6,9,11],[0,1,2,4,6,10,11],[0,1,2,4,6,11],[0,1,2,4,7,8,9,10,11],[0,1,2,4,7,8,9,11],[0,1,2,4,7,8,10,11],[0,1,2,4,7,8,11],[0,1,2,4,7,9,10,11],[0,1,2,4,7,9,11],[0,1,2,4,7,10,11],[0,1,2,4,7,11],[0,1,2,4,8,9,10,11],[0,1,2,4,8,9,11],[0,1,2,4,8,10,11],[0,1,2,4,8,11],[0,1,2,4,9,10,11],[0,1,2,4,9,11],[0,1,2,4,10,11],[0,1,2,4,11],[0,1,2,5,6,7,8,9,10,11],[0,1,2,5,6,7,8,9,11],[0,1,2,5,6,7,8,10,11],[0,1,2,5,6,7,8,11],[0,1,2,5,6,7,9,10,11],[0,1,2,5,6,7,9,11],[0,1,2,5,6,7,10,11],[0,1,2,5,6,7,11],[0,1,2,5,6,8,9,10,11],[0,1,2,5,6,8,9,11],[0,1,2,5,6,8,10,11],[0,1,2,5,6,8,11],[0,1,2,5,6,9,10,11],[0,1,2,5,6,9,11],[0,1,2,5,6,10,11],[0,1,2,5,6,11],[0,1,2,5,7,8,9,10,11],[0,1,2,5,7,8,9,11],[0,1,2,5,7,8,10,11],[0,1,2,5,7,8,11],[0,1,2,5,7,9,10,11],[0,1,2,5,7,9,11],[0,1,2,5,7,10,11],[0,1,2,5,7,11],[0,1,2,5,8,9,10,11],[0,1,2,5,8,9,11],[0,1,2,5,8,10,11],[0,1,2,5,8,11],[0,1,2,5,9,10,11],[0,1,2,5,9,11],[0,1,2,5,10,11],[0,1,2,5,11],[0,1,2,6,7,8,9,10,11],[0,1,2,6,7,8,9,11],[0,1,2,6,7,8,10,11],[0,1,2,6,7,8,11],[0,1,2,6,7,9,10,11],[0,1,2,6,7,9,11],[0,1,2,6,7,10,11],[0,1,2,6,7,11],[0,1,2,6,8,9,10,11],[0,1,2,6,8,9,11],[0,1,2,6,8,10,11],[0,1,2,6,8,11],[0,1,2,6,9,10,11],[0,1,2,6,9,11],[0,1,2,6,10,11],[0,1,2,6,11],[0,1,2,7,8,9,10,11],[0,1,2,7,8,9,11],[0,1,2,7,8,10,11],[0,1,2,7,8,11],[0,1,2,7,9,10,11],[0,1,2,7,9,11],[0,1,2,7,10,11],[0,1,2,7,11],[0,1,2,8,9,10,11],[0,1,2,8,9,11],[0,1,2,8,10,11],[0,1,2,8,11],[0,1,2,9,10,11],[0,1,2,9,11],[0,1,2,10,11],[0,1,2,11],[0,1,3,4,5,6,7,8,9,10,11],[0,1,3,4,5,6,7,8,9,11],[0,1,3,4,5,6,7,8,10,11],[0,1,3,4,5,6,7,8,11],[0,1,3,4,5,6,7,9,10,11],[0,1,3,4,5,6,7,9,11],[0,1,3,4,5,6,7,10,11],[0,1,3,4,5,6,7,11],[0,1,3,4,5,6,8,9,10,11],[0,1,3,4,5,6,8,9,11],[0,1,3,4,5,6,8,10,11],[0,1,3,4,5,6,8,11],[0,1,3,4,5,6,9,10,11],[0,1,3,4,5,6,9,11],[0,1,3,4,5,6,10,11],[0,1,3,4,5,6,11],[0,1,3,4,5,7,8,9,10,11],[0,1,3,4,5,7,8,9,11],[0,1,3,4,5,7,8,10,11],[0,1,3,4,5,7,8,11],[0,1,3,4,5,7,9,10,11],[0,1,3,4,5,7,9,11],[0,1,3,4,5,7,10,11],[0,1,3,4,5,7,11],[0,1,3,4,5,8,9,10,11],[0,1,3,4,5,8,9,11],[0,1,3,4,5,8,10,11],[0,1,3,4,5,8,11],[0,1,3,4,5,9,10,11],[0,1,3,4,5,9,11],[0,1,3,4,5,10,11],[0,1,3,4,5,11],[0,1,3,4,6,7,8,9,10,11],[0,1,3,4,6,7,8,9,11],[0,1,3,4,6,7,8,10,11],[0,1,3,4,6,7,8,11],[0,1,3,4,6,7,9,10,11],[0,1,3,4,6,7,9,11],[0,1,3,4,6,7,10,11],[0,1,3,4,6,7,11],[0,1,3,4,6,8,9,10,11],[0,1,3,4,6,8,9,11],[0,1,3,4,6,8,10,11],[0,1,3,4,6,8,11],[0,1,3,4,6,9,10,11],[0,1,3,4,6,9,11],[0,1,3,4,6,10,11],[0,1,3,4,6,11],[0,1,3,4,7,8,9,10,11],[0,1,3,4,7,8,9,11],[0,1,3,4,7,8,10,11],[0,1,3,4,7,8,11],[0,1,3,4,7,9,10,11],[0,1,3,4,7,9,11],[0,1,3,4,7,10,11],[0,1,3,4,7,11],[0,1,3,4,8,9,10,11],[0,1,3,4,8,9,11],[0,1,3,4,8,10,11],[0,1,3,4,8,11],[0,1,3,4,9,10,11],[0,1,3,4,9,11],[0,1,3,4,10,11],[0,1,3,4,11],[0,1,3,5,6,7,8,9,10,11],[0,1,3,5,6,7,8,9,11],[0,1,3,5,6,7,8,10,11],[0,1,3,5,6,7,8,11],[0,1,3,5,6,7,9,10,11],[0,1,3,5,6,7,9,11],[0,1,3,5,6,7,10,11],[0,1,3,5,6,7,11],[0,1,3,5,6,8,9,10,11],[0,1,3,5,6,8,9,11],[0,1,3,5,6,8,10,11],[0,1,3,5,6,8,11],[0,1,3,5,6,9,10,11],[0,1,3,5,6,9,11],[0,1,3,5,6,10,11],[0,1,3,5,6,11],[0,1,3,5,7,8,9,10,11],[0,1,3,5,7,8,9,11],[0,1,3,5,7,8,10,11],[0,1,3,5,7,8,11],[0,1,3,5,7,9,10,11],[0,1,3,5,7,9,11],[0,1,3,5,7,10,11],[0,1,3,5,7,11],[0,1,3,5,8,9,10,11],[0,1,3,5,8,9,11],[0,1,3,5,8,10,11],[0,1,3,5,8,11],[0,1,3,5,9,10,11],[0,1,3,5,9,11],[0,1,3,5,10,11],[0,1,3,5,11],[0,1,3,6,7,8,9,10,11],[0,1,3,6,7,8,9,11],[0,1,3,6,7,8,10,11],[0,1,3,6,7,8,11],[0,1,3,6,7,9,10,11],[0,1,3,6,7,9,11],[0,1,3,6,7,10,11],[0,1,3,6,7,11],[0,1,3,6,8,9,10,11],[0,1,3,6,8,9,11],[0,1,3,6,8,10,11],[0,1,3,6,8,11],[0,1,3,6,9,10,11],[0,1,3,6,9,11],[0,1,3,6,10,11],[0,1,3,6,11],[0,1,3,7,8,9,10,11],[0,1,3,7,8,9,11],[0,1,3,7,8,10,11],[0,1,3,7,8,11],[0,1,3,7,9,10,11],[0,1,3,7,9,11],[0,1,3,7,10,11],[0,1,3,7,11],[0,1,3,8,9,10,11],[0,1,3,8,9,11],[0,1,3,8,10,11],[0,1,3,8,11],[0,1,3,9,10,11],[0,1,3,9,11],[0,1,3,10,11],[0,1,3,11],[0,1,4,5,6,7,8,9,10,11],[0,1,4,5,6,7,8,9,11],[0,1,4,5,6,7,8,10,11],[0,1,4,5,6,7,8,11],[0,1,4,5,6,7,9,10,11],[0,1,4,5,6,7,9,11],[0,1,4,5,6,7,10,11],[0,1,4,5,6,7,11],[0,1,4,5,6,8,9,10,11],[0,1,4,5,6,8,9,11],[0,1,4,5,6,8,10,11],[0,1,4,5,6,8,11],[0,1,4,5,6,9,10,11],[0,1,4,5,6,9,11],[0,1,4,5,6,10,11],[0,1,4,5,6,11],[0,1,4,5,7,8,9,10,11],[0,1,4,5,7,8,9,11],[0,1,4,5,7,8,10,11],[0,1,4,5,7,8,11],[0,1,4,5,7,9,10,11],[0,1,4,5,7,9,11],[0,1,4,5,7,10,11],[0,1,4,5,7,11],[0,1,4,5,8,9,10,11],[0,1,4,5,8,9,11],[0,1,4,5,8,10,11],[0,1,4,5,8,11],[0,1,4,5,9,10,11],[0,1,4,5,9,11],[0,1,4,5,10,11],[0,1,4,5,11],[0,1,4,6,7,8,9,10,11],[0,1,4,6,7,8,9,11],[0,1,4,6,7,8,10,11],[0,1,4,6,7,8,11],[0,1,4,6,7,9,10,11],[0,1,4,6,7,9,11],[0,1,4,6,7,10,11],[0,1,4,6,7,11],[0,1,4,6,8,9,10,11],[0,1,4,6,8,9,11],[0,1,4,6,8,10,11],[0,1,4,6,8,11],[0,1,4,6,9,10,11],[0,1,4,6,9,11],[0,1,4,6,10,11],[0,1,4,6,11],[0,1,4,7,8,9,10,11],[0,1,4,7,8,9,11],[0,1,4,7,8,10,11],[0,1,4,7,8,11],[0,1,4,7,9,10,11],[0,1,4,7,9,11],[0,1,4,7,10,11],[0,1,4,7,11],[0,1,4,8,9,10,11],[0,1,4,8,9,11],[0,1,4,8,10,11],[0,1,4,8,11],[0,1,4,9,10,11],[0,1,4,9,11],[0,1,4,10,11],[0,1,4,11],[0,1,5,6,7,8,9,10,11],[0,1,5,6,7,8,9,11],[0,1,5,6,7,8,10,11],[0,1,5,6,7,8,11],[0,1,5,6,7,9,10,11],[0,1,5,6,7,9,11],[0,1,5,6,7,10,11],[0,1,5,6,7,11],[0,1,5,6,8,9,10,11],[0,1,5,6,8,9,11],[0,1,5,6,8,10,11],[0,1,5,6,8,11],[0,1,5,6,9,10,11],[0,1,5,6,9,11],[0,1,5,6,10,11],[0,1,5,6,11],[0,1,5,7,8,9,10,11],[0,1,5,7,8,9,11],[0,1,5,7,8,10,11],[0,1,5,7,8,11],[0,1,5,7,9,10,11],[0,1,5,7,9,11],[0,1,5,7,10,11],[0,1,5,7,11],[0,1,5,8,9,10,11],[0,1,5,8,9,11],[0,1,5,8,10,11],[0,1,5,8,11],[0,1,5,9,10,11],[0,1,5,9,11],[0,1,5,10,11],[0,1,5,11],[0,1,6,7,8,9,10,11],[0,1,6,7,8,9,11],[0,1,6,7,8,10,11],[0,1,6,7,8,11],[0,1,6,7,9,10,11],[0,1,6,7,9,11],[0,1,6,7,10,11],[0,1,6,7,11],[0,1,6,8,9,10,11],[0,1,6,8,9,11],[0,1,6,8,10,11],[0,1,6,8,11],[0,1,6,9,10,11],[0,1,6,9,11],[0,1,6,10,11],[0,1,6,11],[0,1,7,8,9,10,11],[0,1,7,8,9,11],[0,1,7,8,10,11],[0,1,7,8,11],[0,1,7,9,10,11],[0,1,7,9,11],[0,1,7,10,11],[0,1,7,11],[0,1,8,9,10,11],[0,1,8,9,11],[0,1,8,10,11],[0,1,8,11],[0,1,9,10,11],[0,1,9,11],[0,1,10,11],[0,1,11],[0,2,3,4,5,6,7,8,9,10,11],[0,2,3,4,5,6,7,8,9,11],[0,2,3,4,5,6,7,8,10,11],[0,2,3,4,5,6,7,8,11],[0,2,3,4,5,6,7,9,10,11],[0,2,3,4,5,6,7,9,11],[0,2,3,4,5,6,7,10,11],[0,2,3,4,5,6,7,11],[0,2,3,4,5,6,8,9,10,11],[0,2,3,4,5,6,8,9,11],[0,2,3,4,5,6,8,10,11],[0,2,3,4,5,6,8,11],[0,2,3,4,5,6,9,10,11],[0,2,3,4,5,6,9,11],[0,2,3,4,5,6,10,11],[0,2,3,4,5,6,11],[0,2,3,4,5,7,8,9,10,11],[0,2,3,4,5,7,8,9,11],[0,2,3,4,5,7,8,10,11],[0,2,3,4,5,7,8,11],[0,2,3,4,5,7,9,10,11],[0,2,3,4,5,7,9,11],[0,2,3,4,5,7,10,11],[0,2,3,4,5,7,11],[0,2,3,4,5,8,9,10,11],[0,2,3,4,5,8,9,11],[0,2,3,4,5,8,10,11],[0,2,3,4,5,8,11],[0,2,3,4,5,9,10,11],[0,2,3,4,5,9,11],[0,2,3,4,5,10,11],[0,2,3,4,5,11],[0,2,3,4,6,7,8,9,10,11],[0,2,3,4,6,7,8,9,11],[0,2,3,4,6,7,8,10,11],[0,2,3,4,6,7,8,11],[0,2,3,4,6,7,9,10,11],[0,2,3,4,6,7,9,11],[0,2,3,4,6,7,10,11],[0,2,3,4,6,7,11],[0,2,3,4,6,8,9,10,11],[0,2,3,4,6,8,9,11],[0,2,3,4,6,8,10,11],[0,2,3,4,6,8,11],[0,2,3,4,6,9,10,11],[0,2,3,4,6,9,11],[0,2,3,4,6,10,11],[0,2,3,4,6,11],[0,2,3,4,7,8,9,10,11],[0,2,3,4,7,8,9,11],[0,2,3,4,7,8,10,11],[0,2,3,4,7,8,11],[0,2,3,4,7,9,10,11],[0,2,3,4,7,9,11],[0,2,3,4,7,10,11],[0,2,3,4,7,11],[0,2,3,4,8,9,10,11],[0,2,3,4,8,9,11],[0,2,3,4,8,10,11],[0,2,3,4,8,11],[0,2,3,4,9,10,11],[0,2,3,4,9,11],[0,2,3,4,10,11],[0,2,3,4,11],[0,2,3,5,6,7,8,9,10,11],[0,2,3,5,6,7,8,9,11],[0,2,3,5,6,7,8,10,11],[0,2,3,5,6,7,8,11],[0,2,3,5,6,7,9,10,11],[0,2,3,5,6,7,9,11],[0,2,3,5,6,7,10,11],[0,2,3,5,6,7,11],[0,2,3,5,6,8,9,10,11],[0,2,3,5,6,8,9,11],[0,2,3,5,6,8,10,11],[0,2,3,5,6,8,11],[0,2,3,5,6,9,10,11],[0,2,3,5,6,9,11],[0,2,3,5,6,10,11],[0,2,3,5,6,11],[0,2,3,5,7,8,9,10,11],[0,2,3,5,7,8,9,11],[0,2,3,5,7,8,10,11],[0,2,3,5,7,8,11],[0,2,3,5,7,9,10,11],[0,2,3,5,7,9,11],[0,2,3,5,7,10,11],[0,2,3,5,7,11],[0,2,3,5,8,9,10,11],[0,2,3,5,8,9,11],[0,2,3,5,8,10,11],[0,2,3,5,8,11],[0,2,3,5,9,10,11],[0,2,3,5,9,11],[0,2,3,5,10,11],[0,2,3,5,11],[0,2,3,6,7,8,9,10,11],[0,2,3,6,7,8,9,11],[0,2,3,6,7,8,10,11],[0,2,3,6,7,8,11],[0,2,3,6,7,9,10,11],[0,2,3,6,7,9,11],[0,2,3,6,7,10,11],[0,2,3,6,7,11],[0,2,3,6,8,9,10,11],[0,2,3,6,8,9,11],[0,2,3,6,8,10,11],[0,2,3,6,8,11],[0,2,3,6,9,10,11],[0,2,3,6,9,11],[0,2,3,6,10,11],[0,2,3,6,11],[0,2,3,7,8,9,10,11],[0,2,3,7,8,9,11],[0,2,3,7,8,10,11],[0,2,3,7,8,11],[0,2,3,7,9,10,11],[0,2,3,7,9,11],[0,2,3,7,10,11],[0,2,3,7,11],[0,2,3,8,9,10,11],[0,2,3,8,9,11],[0,2,3,8,10,11],[0,2,3,8,11],[0,2,3,9,10,11],[0,2,3,9,11],[0,2,3,10,11],[0,2,3,11],[0,2,4,5,6,7,8,9,10,11],[0,2,4,5,6,7,8,9,11],[0,2,4,5,6,7,8,10,11],[0,2,4,5,6,7,8,11],[0,2,4,5,6,7,9,10,11],[0,2,4,5,6,7,9,11],[0,2,4,5,6,7,10,11],[0,2,4,5,6,7,11],[0,2,4,5,6,8,9,10,11],[0,2,4,5,6,8,9,11],[0,2,4,5,6,8,10,11],[0,2,4,5,6,8,11],[0,2,4,5,6,9,10,11],[0,2,4,5,6,9,11],[0,2,4,5,6,10,11],[0,2,4,5,6,11],[0,2,4,5,7,8,9,10,11],[0,2,4,5,7,8,9,11],[0,2,4,5,7,8,10,11],[0,2,4,5,7,8,11],[0,2,4,5,7,9,10,11],[0,2,4,5,7,9,11],[0,2,4,5,7,10,11],[0,2,4,5,7,11],[0,2,4,5,8,9,10,11],[0,2,4,5,8,9,11],[0,2,4,5,8,10,11],[0,2,4,5,8,11],[0,2,4,5,9,10,11],[0,2,4,5,9,11],[0,2,4,5,10,11],[0,2,4,5,11],[0,2,4,6,7,8,9,10,11],[0,2,4,6,7,8,9,11],[0,2,4,6,7,8,10,11],[0,2,4,6,7,8,11],[0,2,4,6,7,9,10,11],[0,2,4,6,7,9,11],[0,2,4,6,7,10,11],[0,2,4,6,7,11],[0,2,4,6,8,9,10,11],[0,2,4,6,8,9,11],[0,2,4,6,8,10,11],[0,2,4,6,8,11],[0,2,4,6,9,10,11],[0,2,4,6,9,11],[0,2,4,6,10,11],[0,2,4,6,11],[0,2,4,7,8,9,10,11],[0,2,4,7,8,9,11],[0,2,4,7,8,10,11],[0,2,4,7,8,11],[0,2,4,7,9,10,11],[0,2,4,7,9,11],[0,2,4,7,10,11],[0,2,4,7,11],[0,2,4,8,9,10,11],[0,2,4,8,9,11],[0,2,4,8,10,11],[0,2,4,8,11],[0,2,4,9,10,11],[0,2,4,9,11],[0,2,4,10,11],[0,2,4,11],[0,2,5,6,7,8,9,10,11],[0,2,5,6,7,8,9,11],[0,2,5,6,7,8,10,11],[0,2,5,6,7,8,11],[0,2,5,6,7,9,10,11],[0,2,5,6,7,9,11],[0,2,5,6,7,10,11],[0,2,5,6,7,11],[0,2,5,6,8,9,10,11],[0,2,5,6,8,9,11],[0,2,5,6,8,10,11],[0,2,5,6,8,11],[0,2,5,6,9,10,11],[0,2,5,6,9,11],[0,2,5,6,10,11],[0,2,5,6,11],[0,2,5,7,8,9,10,11],[0,2,5,7,8,9,11],[0,2,5,7,8,10,11],[0,2,5,7,8,11],[0,2,5,7,9,10,11],[0,2,5,7,9,11],[0,2,5,7,10,11],[0,2,5,7,11],[0,2,5,8,9,10,11],[0,2,5,8,9,11],[0,2,5,8,10,11],[0,2,5,8,11],[0,2,5,9,10,11],[0,2,5,9,11],[0,2,5,10,11],[0,2,5,11],[0,2,6,7,8,9,10,11],[0,2,6,7,8,9,11],[0,2,6,7,8,10,11],[0,2,6,7,8,11],[0,2,6,7,9,10,11],[0,2,6,7,9,11],[0,2,6,7,10,11],[0,2,6,7,11],[0,2,6,8,9,10,11],[0,2,6,8,9,11],[0,2,6,8,10,11],[0,2,6,8,11],[0,2,6,9,10,11],[0,2,6,9,11],[0,2,6,10,11],[0,2,6,11],[0,2,7,8,9,10,11],[0,2,7,8,9,11],[0,2,7,8,10,11],[0,2,7,8,11],[0,2,7,9,10,11],[0,2,7,9,11],[0,2,7,10,11],[0,2,7,11],[0,2,8,9,10,11],[0,2,8,9,11],[0,2,8,10,11],[0,2,8,11],[0,2,9,10,11],[0,2,9,11],[0,2,10,11],[0,2,11],[0,3,4,5,6,7,8,9,10,11],[0,3,4,5,6,7,8,9,11],[0,3,4,5,6,7,8,10,11],[0,3,4,5,6,7,8,11],[0,3,4,5,6,7,9,10,11],[0,3,4,5,6,7,9,11],[0,3,4,5,6,7,10,11],[0,3,4,5,6,7,11],[0,3,4,5,6,8,9,10,11],[0,3,4,5,6,8,9,11],[0,3,4,5,6,8,10,11],[0,3,4,5,6,8,11],[0,3,4,5,6,9,10,11],[0,3,4,5,6,9,11],[0,3,4,5,6,10,11],[0,3,4,5,6,11],[0,3,4,5,7,8,9,10,11],[0,3,4,5,7,8,9,11],[0,3,4,5,7,8,10,11],[0,3,4,5,7,8,11],[0,3,4,5,7,9,10,11],[0,3,4,5,7,9,11],[0,3,4,5,7,10,11],[0,3,4,5,7,11],[0,3,4,5,8,9,10,11],[0,3,4,5,8,9,11],[0,3,4,5,8,10,11],[0,3,4,5,8,11],[0,3,4,5,9,10,11],[0,3,4,5,9,11],[0,3,4,5,10,11],[0,3,4,5,11],[0,3,4,6,7,8,9,10,11],[0,3,4,6,7,8,9,11],[0,3,4,6,7,8,10,11],[0,3,4,6,7,8,11],[0,3,4,6,7,9,10,11],[0,3,4,6,7,9,11],[0,3,4,6,7,10,11],[0,3,4,6,7,11],[0,3,4,6,8,9,10,11],[0,3,4,6,8,9,11],[0,3,4,6,8,10,11],[0,3,4,6,8,11],[0,3,4,6,9,10,11],[0,3,4,6,9,11],[0,3,4,6,10,11],[0,3,4,6,11],[0,3,4,7,8,9,10,11],[0,3,4,7,8,9,11],[0,3,4,7,8,10,11],[0,3,4,7,8,11],[0,3,4,7,9,10,11],[0,3,4,7,9,11],[0,3,4,7,10,11],[0,3,4,7,11],[0,3,4,8,9,10,11],[0,3,4,8,9,11],[0,3,4,8,10,11],[0,3,4,8,11],[0,3,4,9,10,11],[0,3,4,9,11],[0,3,4,10,11],[0,3,4,11],[0,3,5,6,7,8,9,10,11],[0,3,5,6,7,8,9,11],[0,3,5,6,7,8,10,11],[0,3,5,6,7,8,11],[0,3,5,6,7,9,10,11],[0,3,5,6,7,9,11],[0,3,5,6,7,10,11],[0,3,5,6,7,11],[0,3,5,6,8,9,10,11],[0,3,5,6,8,9,11],[0,3,5,6,8,10,11],[0,3,5,6,8,11],[0,3,5,6,9,10,11],[0,3,5,6,9,11],[0,3,5,6,10,11],[0,3,5,6,11],[0,3,5,7,8,9,10,11],[0,3,5,7,8,9,11],[0,3,5,7,8,10,11],[0,3,5,7,8,11],[0,3,5,7,9,10,11],[0,3,5,7,9,11],[0,3,5,7,10,11],[0,3,5,7,11],[0,3,5,8,9,10,11],[0,3,5,8,9,11],[0,3,5,8,10,11],[0,3,5,8,11],[0,3,5,9,10,11],[0,3,5,9,11],[0,3,5,10,11],[0,3,5,11],[0,3,6,7,8,9,10,11],[0,3,6,7,8,9,11],[0,3,6,7,8,10,11],[0,3,6,7,8,11],[0,3,6,7,9,10,11],[0,3,6,7,9,11],[0,3,6,7,10,11],[0,3,6,7,11],[0,3,6,8,9,10,11],[0,3,6,8,9,11],[0,3,6,8,10,11],[0,3,6,8,11],[0,3,6,9,10,11],[0,3,6,9,11],[0,3,6,10,11],[0,3,6,11],[0,3,7,8,9,10,11],[0,3,7,8,9,11],[0,3,7,8,10,11],[0,3,7,8,11],[0,3,7,9,10,11],[0,3,7,9,11],[0,3,7,10,11],[0,3,7,11],[0,3,8,9,10,11],[0,3,8,9,11],[0,3,8,10,11],[0,3,8,11],[0,3,9,10,11],[0,3,9,11],[0,3,10,11],[0,3,11],[0,4,5,6,7,8,9,10,11],[0,4,5,6,7,8,9,11],[0,4,5,6,7,8,10,11],[0,4,5,6,7,8,11],[0,4,5,6,7,9,10,11],[0,4,5,6,7,9,11],[0,4,5,6,7,10,11],[0,4,5,6,7,11],[0,4,5,6,8,9,10,11],[0,4,5,6,8,9,11],[0,4,5,6,8,10,11],[0,4,5,6,8,11],[0,4,5,6,9,10,11],[0,4,5,6,9,11],[0,4,5,6,10,11],[0,4,5,6,11],[0,4,5,7,8,9,10,11],[0,4,5,7,8,9,11],[0,4,5,7,8,10,11],[0,4,5,7,8,11],[0,4,5,7,9,10,11],[0,4,5,7,9,11],[0,4,5,7,10,11],[0,4,5,7,11],[0,4,5,8,9,10,11],[0,4,5,8,9,11],[0,4,5,8,10,11],[0,4,5,8,11],[0,4,5,9,10,11],[0,4,5,9,11],[0,4,5,10,11],[0,4,5,11],[0,4,6,7,8,9,10,11],[0,4,6,7,8,9,11],[0,4,6,7,8,10,11],[0,4,6,7,8,11],[0,4,6,7,9,10,11],[0,4,6,7,9,11],[0,4,6,7,10,11],[0,4,6,7,11],[0,4,6,8,9,10,11],[0,4,6,8,9,11],[0,4,6,8,10,11],[0,4,6,8,11],[0,4,6,9,10,11],[0,4,6,9,11],[0,4,6,10,11],[0,4,6,11],[0,4,7,8,9,10,11],[0,4,7,8,9,11],[0,4,7,8,10,11],[0,4,7,8,11],[0,4,7,9,10,11],[0,4,7,9,11],[0,4,7,10,11],[0,4,7,11],[0,4,8,9,10,11],[0,4,8,9,11],[0,4,8,10,11],[0,4,8,11],[0,4,9,10,11],[0,4,9,11],[0,4,10,11],[0,4,11],[0,5,6,7,8,9,10,11],[0,5,6,7,8,9,11],[0,5,6,7,8,10,11],[0,5,6,7,8,11],[0,5,6,7,9,10,11],[0,5,6,7,9,11],[0,5,6,7,10,11],[0,5,6,7,11],[0,5,6,8,9,10,11],[0,5,6,8,9,11],[0,5,6,8,10,11],[0,5,6,8,11],[0,5,6,9,10,11],[0,5,6,9,11],[0,5,6,10,11],[0,5,6,11],[0,5,7,8,9,10,11],[0,5,7,8,9,11],[0,5,7,8,10,11],[0,5,7,8,11],[0,5,7,9,10,11],[0,5,7,9,11],[0,5,7,10,11],[0,5,7,11],[0,5,8,9,10,11],[0,5,8,9,11],[0,5,8,10,11],[0,5,8,11],[0,5,9,10,11],[0,5,9,11],[0,5,10,11],[0,5,11],[0,6,7,8,9,10,11],[0,6,7,8,9,11],[0,6,7,8,10,11],[0,6,7,8,11],[0,6,7,9,10,11],[0,6,7,9,11],[0,6,7,10,11],[0,6,7,11],[0,6,8,9,10,11],[0,6,8,9,11],[0,6,8,10,11],[0,6,8,11],[0,6,9,10,11],[0,6,9,11],[0,6,10,11],[0,6,11],[0,7,8,9,10,11],[0,7,8,9,11],[0,7,8,10,11],[0,7,8,11],[0,7,9,10,11],[0,7,9,11],[0,7,10,11],[0,7,11],[0,8,9,10,11],[0,8,9,11],[0,8,10,11],[0,8,11],[0,9,10,11],[0,9,11],[0,10,11],[0,11]], label: '12 nodes, every forward edge (1,024 paths)' },
    ],
    hints: [
      'A path grows by one node at a time. Think of it as a list you extend and shrink while exploring.',
      'Start with the path [0]. At each node, try every neighbour: add it to the path, explore deeper, then remove it again (backtrack).',
      'When the current node is n - 1, record a copy of the path. Because there are no cycles, you do not need a visited set.',
    ],
    solution: `function allPathsSourceTarget(graph) {
  const target = graph.length - 1
  const result = []
  const path = []
  const go = (node) => {
    path.push(node)
    if (node === target) result.push([...path])
    else for (const next of graph[node]) go(next)
    path.pop()
  }
  go(0)
  return result
}
`,
    explain: 'This is DFS with backtracking on a graph: extend the path, explore, then undo. In a graph without cycles a path can never come back to a node, so no visited array is needed, and every route to the target is found exactly once.',
    time: 'O(2ⁿ × n)',
    space: 'O(n)',
  },
  {
    id: 'climbing-stairs',
    lc: { n: 70, slug: 'climbing-stairs' },
    lesson: 'memo-vs-tab',
    title: 'Climbing Stairs',
    diff: 'easy',
    fn: 'climbStairs',
    prompt: `<p>You are climbing a staircase with <code>n</code> steps. Each move you can climb <b>1 or 2</b> steps.</p>
<p>Return the number of <b>different ways</b> you can reach the top (step <code>n</code>).</p>`,
    examples: [
      { input: 'n = 2', output: '2', note: '1 + 1 or 2.' },
      { input: 'n = 3', output: '3', note: '1 + 1 + 1, 1 + 2 or 2 + 1.' },
      { input: 'n = 5', output: '8' },
    ],
    starter: `function climbStairs(n) {
  // your code here
}
`,
    tests: () => [
      { args: [1], expected: 1 },
      { args: [2], expected: 2 },
      { args: [3], expected: 3 },
      { args: [4], expected: 5 },
      { args: [5], expected: 8 },
      { args: [10], expected: 89 },
      { args: [38], expected: 63245986 },
      { args: [45], expected: 1836311903, label: 'n = 45' },
    ],
    hints: [
      'To stand on step n, your last move came from step n - 1 (a 1-step move) or from step n - 2 (a 2-step move). What does that say about the number of ways?',
      'ways(n) = ways(n - 1) + ways(n - 2). The first values are ways(0) = 1 (do nothing) and ways(1) = 1.',
      'A plain recursion repeats the same work and is too slow for n = 45. Keep only the last two values and move forward from step 2 up to n.',
    ],
    solution: `function climbStairs(n) {
  let a = 1
  let b = 1
  for (let i = 2; i <= n; i++) {
    ;[a, b] = [b, a + b]
  }
  return b
}
`,
    explain: 'The ways to reach step n are the ways to reach n - 1 plus the ways to reach n - 2, because the last move was either 1 or 2 steps. Each value depends only on the two before it, so two variables are enough and no step is calculated twice.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'house-robber',
    lc: { n: 198, slug: 'house-robber' },
    lesson: 'memo-vs-tab',
    title: 'House Robber',
    diff: 'medium',
    fn: 'rob',
    prompt: `<p>Houses stand in a row, and <code>nums[i]</code> is the money in house <code>i</code>. You cannot rob two <b>neighbouring</b> houses.</p>
<p>Return the maximum amount of money you can rob.</p>`,
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: '4', note: 'Rob houses 0 and 2: 1 + 3.' },
      { input: 'nums = [2, 7, 9, 3, 1]', output: '12', note: 'Rob houses 0, 2 and 4: 2 + 9 + 1.' },
    ],
    starter: `function rob(nums) {
  // your code here
}
`,
    tests: () => [
      { args: [[1,2,3,1]], expected: 4 },
      { args: [[2,7,9,3,1]], expected: 12 },
      { args: [[5]], expected: 5 },
      { args: [[]], expected: 0 },
      { args: [[2,1]], expected: 2 },
      { args: [[2,1,1,2]], expected: 4 },
      { args: [[10,1,1,10]], expected: 20 },
      { args: [range(100000, (i) => (i * 37) % 100)], expected: 2997000, label: '100,000 houses' },
    ],
    hints: [
      'At house i you have two choices: rob it or skip it. What do you know about the best total up to house i - 1 and up to house i - 2?',
      'If you rob house i, you add nums[i] to the best total up to house i - 2. If you skip it, you keep the best total up to house i - 1. Take the larger.',
      'best[i] = max(best[i - 1], best[i - 2] + nums[i]). You only need the last two values, so keep two variables.',
    ],
    solution: `function rob(nums) {
  let twoBack = 0
  let oneBack = 0
  for (const money of nums) {
    const best = Math.max(oneBack, twoBack + money)
    twoBack = oneBack
    oneBack = best
  }
  return oneBack
}
`,
    explain: 'For each house the best total is either the best total without this house (skip) or this house plus the best total two houses back (rob). The choice at each house only needs the two previous answers, so two variables carry the whole table.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'min-cost-climbing-stairs',
    lc: { n: 746, slug: 'min-cost-climbing-stairs' },
    lesson: 'identify-dp',
    title: 'Min Cost Climbing Stairs',
    diff: 'easy',
    fn: 'minCostClimbingStairs',
    prompt: `<p><code>cost[i]</code> is the price of standing on step <code>i</code>. Once you pay it, you can climb <b>1 or 2</b> steps. You may start from step 0 or step 1.</p>
<p>The top is one position <b>past the last step</b> (index <code>cost.length</code>). Return the minimum total cost to reach the top.</p>`,
    examples: [
      { input: 'cost = [10, 15, 20]', output: '15', note: 'Start at 15, pay 15, jump 2 steps to the top.' },
      { input: 'cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]', output: '6' },
    ],
    starter: `function minCostClimbingStairs(cost) {
  // your code here
}
`,
    tests: () => [
      { args: [[10,15,20]], expected: 15 },
      { args: [[1,100,1,1,1,100,1,1,100,1]], expected: 6 },
      { args: [[0,0]], expected: 0 },
      { args: [[5,5]], expected: 5 },
      { args: [[1,2,3,4]], expected: 4 },
      { args: [[0,2,2,1]], expected: 2 },
      { args: [[10,1,10,1,10]], expected: 2 },
      { args: [range(100000, (i) => (i * 17) % 50)], expected: 1056000, label: '100,000 steps' },
    ],
    hints: [
      'Let cost-to-reach(i) be the cheapest way to stand on step i (before paying cost[i]). Which two steps could you have come from?',
      'You come from step i - 1 (pay cost[i - 1]) or from step i - 2 (pay cost[i - 2]). Take the cheaper total.',
      'cost-to-reach(0) = cost-to-reach(1) = 0, because you may start at either. The answer is cost-to-reach(n). Keep only the last two values.',
    ],
    solution: `function minCostClimbingStairs(cost) {
  const n = cost.length
  let twoBack = 0
  let oneBack = 0
  for (let i = 2; i <= n; i++) {
    const here = Math.min(oneBack + cost[i - 1], twoBack + cost[i - 2])
    twoBack = oneBack
    oneBack = here
  }
  return oneBack
}
`,
    explain: 'The cheapest way to reach a position is the cheaper of two arrivals: from one step below (paying that step) or from two steps below (paying that step). Starting at step 0 or 1 for free gives the two base values, and the loop moves them up to the top.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'decode-ways',
    lc: { n: 91, slug: 'decode-ways' },
    lesson: 'identify-dp',
    title: 'Decode Ways',
    diff: 'medium',
    fn: 'numDecodings',
    prompt: `<p>A message with letters can be turned into digits: <code>A = 1, B = 2, ..., Z = 26</code>. To decode a string of digits you split it into groups that each match a letter. A group such as <code>06</code> (with a leading zero) is <b>not</b> valid.</p>
<p>Given a string <code>s</code> of digits, return the number of ways to decode it. If it cannot be decoded, return <code>0</code>.</p>`,
    examples: [
      { input: 's = "12"', output: '2', note: '"AB" (1, 2) or "L" (12).' },
      { input: 's = "226"', output: '3', note: '"BZ", "VF" or "BBF".' },
      { input: 's = "06"', output: '0', note: '"06" is not valid.' },
    ],
    starter: `function numDecodings(s) {
  // your code here
}
`,
    tests: () => [
      { args: ["12"], expected: 2 },
      { args: ["226"], expected: 3 },
      { args: ["06"], expected: 0 },
      { args: ["0"], expected: 0 },
      { args: ["10"], expected: 1 },
      { args: ["27"], expected: 1 },
      { args: ["11106"], expected: 2 },
      { args: ["2101"], expected: 1 },
      { args: ["100"], expected: 0 },
      { args: ['1'.repeat(45)], expected: 1836311903, label: '45 ones' },
      { args: ['2'.repeat(40) + '7'], expected: 165580141, label: 'long string of 2s' },
    ],
    hints: [
      'Look at the last digit of the string. It is decoded either alone (as 1 to 9) or together with the digit before it (as 10 to 26). How do those two choices split the count?',
      'ways(i) = (ways(i - 1) if the single digit is not 0) + (ways(i - 2) if the last two digits form a number from 10 to 26).',
      'Handle a leading 0 first: the answer is 0. Then walk the string once, keep only the last two ways, and be careful with "0" digits: they can only be the second digit of 10 or 20.',
    ],
    solution: `function numDecodings(s) {
  if (s.length === 0 || s[0] === '0') return 0
  let twoBack = 1
  let oneBack = 1
  for (let i = 1; i < s.length; i++) {
    let ways = 0
    if (s[i] !== '0') ways += oneBack
    const two = Number(s[i - 1] + s[i])
    if (two >= 10 && two <= 26) ways += twoBack
    twoBack = oneBack
    oneBack = ways
  }
  return oneBack
}
`,
    explain: 'The last digit is decoded alone (if it is not 0) or together with the previous digit (if the pair is 10 to 26). These two cases cover every decoding without overlap, so the counts add up. Each count needs only the previous two, so two variables are enough.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'unique-paths',
    lc: { n: 62, slug: 'unique-paths' },
    lesson: 'dp-2d-grid',
    title: 'Unique Paths',
    diff: 'medium',
    fn: 'uniquePaths',
    prompt: `<p>A robot stands in the top-left corner of an <code>m × n</code> grid (<code>m</code> rows, <code>n</code> columns). It can only move <b>right</b> or <b>down</b>, one cell at a time.</p>
<p>Return the number of different paths to the bottom-right corner.</p>`,
    examples: [
      { input: 'm = 3, n = 7', output: '28' },
      { input: 'm = 3, n = 2', output: '3', note: 'Right, down, down; down, down, right; down, right, down.' },
      { input: 'm = 1, n = 1', output: '1' },
    ],
    starter: `function uniquePaths(m, n) {
  // your code here
}
`,
    tests: () => [
      { args: [3,7], expected: 28 },
      { args: [3,2], expected: 3 },
      { args: [1,1], expected: 1 },
      { args: [1,5], expected: 1 },
      { args: [5,1], expected: 1 },
      { args: [3,3], expected: 6 },
      { args: [10,10], expected: 48620 },
      { args: [17,17], expected: 601080390, label: '17 × 17 grid' },
      { args: [50000,1], expected: 1, label: 'a single column of 50,000 cells' },
    ],
    hints: [
      'To stand on a cell, you came from the cell above or the cell on the left. What does that say about the number of ways to reach it?',
      'ways(r, c) = ways(r - 1, c) + ways(r, c - 1). The first row and the first column have exactly one way.',
      'Fill the grid row by row. You only need the previous row, so one array of length n is enough: row[c] += row[c - 1].',
    ],
    solution: `function uniquePaths(m, n) {
  const row = new Array(n).fill(1)
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      row[c] += row[c - 1]
    }
  }
  return row[n - 1]
}
`,
    explain: 'Each cell can be entered from above or from the left, so its number of paths is the sum of those two cells. The first row and column have only one path. Updating a single row in place keeps the memory at O(n): before the update row[c] is the cell above, and row[c - 1] is already the cell on the left.',
    time: 'O(m × n)',
    space: 'O(n)',
  },
  {
    id: 'min-path-sum',
    lc: { n: 64, slug: 'minimum-path-sum' },
    lesson: 'dp-2d-grid',
    title: 'Minimum Path Sum',
    diff: 'medium',
    fn: 'minPathSum',
    prompt: `<p>Given an <code>m × n</code> grid of non-negative numbers, find a path from the top-left corner to the bottom-right corner that gives the <b>smallest sum</b> of the numbers on the way. You can only move <b>right</b> or <b>down</b>.</p>
<p>Return that smallest sum.</p>`,
    examples: [
      { input: 'grid = [[1,3,1],[1,5,1],[4,2,1]]', output: '7', note: '1 → 3 → 1 → 1 → 1 = 7.' },
      { input: 'grid = [[1,2,3],[4,5,6]]', output: '12' },
    ],
    starter: `function minPathSum(grid) {
  // your code here
}
`,
    tests: () => [
      { args: [[[1,3,1],[1,5,1],[4,2,1]]], expected: 7 },
      { args: [[[1,2,3],[4,5,6]]], expected: 12 },
      { args: [[[5]]], expected: 5 },
      { args: [[[1,2]]], expected: 3 },
      { args: [[[1],[2]]], expected: 3 },
      { args: [[[0,0],[0,0]]], expected: 0 },
      { args: [[[9,1,4,8]]], expected: 22 },
      { args: [range(500, (r) => range(500, (c) => (r * 7 + c * 13) % 10))], expected: 1497, label: '500 × 500 grid' },
    ],
    hints: [
      'To stand on a cell you came from above or from the left. Which one do you prefer?',
      'The cheaper one. best(r, c) = grid[r][c] + min(best(r - 1, c), best(r, c - 1)). The first row and column have only one way in.',
      'Keep one array for the previous row. For each cell, the value above is the array entry itself, and the value on the left is the entry before it. Take care at the borders (use Infinity for a missing neighbour).',
    ],
    solution: `function minPathSum(grid) {
  const n = grid[0].length
  const best = new Array(n).fill(Infinity)
  best[0] = 0
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < n; c++) {
      const left = c > 0 ? best[c - 1] : Infinity
      best[c] = Math.min(best[c], left) + grid[r][c]
    }
  }
  return best[n - 1]
}
`,
    explain: 'The cheapest way to a cell is its own number plus the cheaper of the cheapest ways to the cell above and the cell on the left. Filling the grid row by row guarantees that both are ready. One reused row, with Infinity for a missing neighbour, keeps the space at O(n).',
    time: 'O(m × n)',
    space: 'O(n)',
  },
]
