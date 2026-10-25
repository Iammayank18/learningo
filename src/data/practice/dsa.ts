import type { Problem } from './types'
import { DSA_MORE } from './dsa-more'

const range = (n: number, f: (i: number) => number) => Array.from({ length: n }, (_, i) => f(i))

const BASE_PROBLEMS: Problem[] = [
  {
    id: 'valid-palindrome',
    lc: { n: 125, slug: 'valid-palindrome' },
    lesson: 'strings',
    title: 'Valid Palindrome',
    diff: 'easy',
    fn: 'isPalindrome',
    prompt: `<p>A phrase is a <b>palindrome</b> if, after converting every letter to lowercase and removing everything that is not a letter or digit, it reads the same forwards and backwards.</p>
<p>Given a string <code>s</code>, return <code>true</code> if it is a palindrome, otherwise <code>false</code>.</p>`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', note: 'Cleaned: "amanaplanacanalpanama"' },
      { input: 's = "race a car"', output: 'false' },
      { input: 's = " "', output: 'true', note: 'An empty cleaned string reads the same both ways.' },
    ],
    starter: `function isPalindrome(s) {
  // your code here
}
`,
    tests: () => [
      { args: ['A man, a plan, a canal: Panama'], expected: true },
      { args: ['race a car'], expected: false },
      { args: [' '], expected: true },
      { args: [''], expected: true },
      { args: ['0P'], expected: false },
      { args: ['ab_a'], expected: true },
      { args: ['No lemon, no melon'], expected: true },
      { args: [range(200000, () => 97).map((c) => String.fromCharCode(c)).join('') + 'b'], expected: false, label: 'long string' },
    ],
    hints: [
      'You do not need to build a cleaned copy of the string. Compare characters from both ends instead.',
      'Keep two indexes, one at the start and one at the end. Move each one inward, skipping any character that is not a letter or digit.',
      'Test a character with /[a-z0-9]/i. When both pointers sit on valid characters, compare them in lowercase. Stop at the first mismatch.',
    ],
    solution: `function isPalindrome(s) {
  const isAlnum = (c) => /[a-z0-9]/i.test(c)
  let l = 0
  let r = s.length - 1
  while (l < r) {
    if (!isAlnum(s[l])) { l++; continue }
    if (!isAlnum(s[r])) { r--; continue }
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false
    l++
    r--
  }
  return true
}
`,
    explain: 'Two pointers walk towards the middle. Each step skips characters that do not count, then compares the two that do. The first mismatch ends the search, and if the pointers meet, every pair matched.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'two-sum',
    lc: { n: 1, slug: 'two-sum' },
    lesson: 'hashmaps',
    title: 'Two Sum',
    diff: 'easy',
    fn: 'twoSum',
    prompt: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indexes of the two numbers that add up to <code>target</code>.</p>
<p>Exactly one valid pair exists. You may not use the same element twice. Return the two indexes in <b>ascending order</b>.</p>`,
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', note: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', output: '[0, 1]' },
    ],
    starter: `function twoSum(nums, target) {
  // your code here
}
`,
    tests: () => [
      { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { args: [[3, 2, 4], 6], expected: [1, 2] },
      { args: [[3, 3], 6], expected: [0, 1] },
      { args: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
      { args: [[1, 5, 6, 9], 10], expected: [0, 3] },
      { args: [[0, 4, 3, 0], 0], expected: [0, 3] },
      {
        args: [range(100000, (i) => i * 2), 399994],
        expected: [99998, 99999],
        label: 'large input (100,000 numbers)',
      },
    ],
    hints: [
      'The brute-force answer checks every pair, which is O(n²). The large test will time out, so look for something faster.',
      'For each number x, the partner you need is target - x. The real question is how to find out if you have already seen it.',
      'Keep a Map from value to index. Before storing the current number, check whether target - nums[i] is already in the map.',
    ],
    solution: `function twoSum(nums, target) {
  const seen = new Map() // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]
    if (seen.has(need)) return [seen.get(need), i]
    seen.set(nums[i], i)
  }
  return []
}
`,
    explain: 'One pass with a hash map. For every number, look up its partner in O(1) before storing the number itself. Checking before storing also guarantees the same element is never used twice.',
    time: 'O(n)',
    space: 'O(n)',
  },
  {
    id: 'group-anagrams',
    lc: { n: 49, slug: 'group-anagrams' },
    lesson: 'hashmaps',
    title: 'Group Anagrams',
    diff: 'medium',
    fn: 'groupAnagrams',
    compare: 'unordered',
    prompt: `<p>Given an array of strings <code>strs</code>, group the anagrams together. Two words are anagrams if they use exactly the same letters the same number of times.</p>
<p>The order of the groups, and of the words inside each group, does not matter.</p>`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' },
    ],
    starter: `function groupAnagrams(strs) {
  // your code here
}
`,
    tests: () => [
      { args: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']], expected: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']] },
      { args: [['']], expected: [['']] },
      { args: [['a']], expected: [['a']] },
      { args: [['ab', 'ba', 'abc', 'cab', 'bca', 'c']], expected: [['ab', 'ba'], ['abc', 'cab', 'bca'], ['c']] },
      { args: [['abc', 'def', 'ghi']], expected: [['abc'], ['def'], ['ghi']] },
      { args: [['aab', 'aba', 'baa', 'abb']], expected: [['aab', 'aba', 'baa'], ['abb']] },
    ],
    hints: [
      'All anagrams of a word share something. What is the same about "eat", "tea" and "ate"?',
      'If you sort the letters of each word, all anagrams turn into the same string. Use that as a key.',
      'Build a Map from the sorted-letters key to an array of words. At the end, return Array.from(map.values()).',
    ],
    solution: `function groupAnagrams(strs) {
  const groups = new Map()
  for (const word of strs) {
    const key = word.split('').sort().join('')
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(word)
  }
  return Array.from(groups.values())
}
`,
    explain: 'Sorting the letters gives every anagram the same canonical key, so a Map can bucket them in one pass. For words of length k this costs O(k log k) per word.',
    time: 'O(n · k log k)',
    space: 'O(n · k)',
  },
  {
    id: 'valid-parentheses',
    lc: { n: 20, slug: 'valid-parentheses' },
    lesson: 'stacks',
    title: 'Valid Parentheses',
    diff: 'easy',
    fn: 'isValid',
    prompt: `<p>Given a string <code>s</code> containing only the characters <code>( ) [ ] { }</code>, decide whether it is <b>valid</b>.</p>
<p>A string is valid if every opening bracket is closed by the same type of bracket, and brackets close in the correct order.</p>`,
    examples: [
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
      { input: 's = "([)]"', output: 'false', note: 'The brackets close in the wrong order.' },
    ],
    starter: `function isValid(s) {
  // your code here
}
`,
    tests: () => [
      { args: ['()'], expected: true },
      { args: ['()[]{}'], expected: true },
      { args: ['(]'], expected: false },
      { args: ['([)]'], expected: false },
      { args: ['{[]}'], expected: true },
      { args: ['('], expected: false },
      { args: [']'], expected: false },
      { args: ['(((())))'], expected: true },
      { args: ['('.repeat(50000) + ')'.repeat(50000)], expected: true, label: 'deeply nested' },
    ],
    hints: [
      'The most recent opening bracket is always the first one that must be closed. Which data structure gives you the most recent item?',
      'Push every opening bracket on a stack. When you see a closing bracket, the top of the stack must be its matching opener.',
      'Do not forget the two failure cases: a closing bracket arrives when the stack is empty, or the stack is not empty at the end.',
    ],
    solution: `function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' }
  const stack = []
  for (const c of s) {
    if (c in pairs) {
      if (stack.pop() !== pairs[c]) return false
    } else {
      stack.push(c)
    }
  }
  return stack.length === 0
}
`,
    explain: 'A stack mirrors how nesting works: the last bracket opened must be the first one closed. Popping from an empty stack gives undefined, which never matches, so that case is handled for free.',
    time: 'O(n)',
    space: 'O(n)',
  },
  {
    id: 'daily-temperatures',
    lc: { n: 739, slug: 'daily-temperatures' },
    lesson: 'monotonic-stack',
    title: 'Daily Temperatures',
    diff: 'medium',
    fn: 'dailyTemperatures',
    prompt: `<p>Given an array <code>temperatures</code> of daily temperatures, return an array <code>answer</code> where <code>answer[i]</code> is the number of days you have to wait after day <code>i</code> to get a warmer temperature.</p>
<p>If there is no future day that is warmer, <code>answer[i]</code> is <code>0</code>.</p>`,
    examples: [
      { input: 'temperatures = [73, 74, 75, 71, 69, 72, 76, 73]', output: '[1, 1, 4, 2, 1, 1, 0, 0]' },
      { input: 'temperatures = [30, 40, 50, 60]', output: '[1, 1, 1, 0]' },
      { input: 'temperatures = [30, 60, 90]', output: '[1, 1, 0]' },
    ],
    starter: `function dailyTemperatures(temperatures) {
  // your code here
}
`,
    tests: () => [
      { args: [[73, 74, 75, 71, 69, 72, 76, 73]], expected: [1, 1, 4, 2, 1, 1, 0, 0] },
      { args: [[30, 40, 50, 60]], expected: [1, 1, 1, 0] },
      { args: [[30, 60, 90]], expected: [1, 1, 0] },
      { args: [[90, 80, 70]], expected: [0, 0, 0] },
      { args: [[50]], expected: [0] },
      { args: [[70, 70, 70]], expected: [0, 0, 0] },
      { args: [range(100000, (i) => 100000 - i)], expected: range(100000, () => 0), label: 'large input (100,000 days)' },
    ],
    hints: [
      'Scanning forward from every day is O(n²). The large input will time out.',
      'Walk through the days once. Keep a stack of days that are still waiting for a warmer day.',
      'When today is warmer than the day on top of the stack, pop it and set its answer to (today - that day). Keep popping while that stays true, then push today.',
    ],
    solution: `function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0)
  const stack = [] // indexes of days still waiting for a warmer day
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const j = stack.pop()
      answer[j] = i - j
    }
    stack.push(i)
  }
  return answer
}
`,
    explain: 'The stack holds days in decreasing temperature order. A warmer day resolves every colder day sitting on top of the stack. Each index is pushed once and popped at most once, so the whole thing is linear.',
    time: 'O(n)',
    space: 'O(n)',
  },
  {
    id: 'binary-search',
    lc: { n: 704, slug: 'binary-search' },
    lesson: 'binary-search',
    title: 'Binary Search',
    diff: 'easy',
    fn: 'search',
    prompt: `<p>Given an array of integers <code>nums</code> sorted in ascending order and an integer <code>target</code>, return the index of <code>target</code> in <code>nums</code>, or <code>-1</code> if it is not there.</p>
<p>Your solution must run in <code>O(log n)</code> time.</p>`,
    examples: [
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', output: '4' },
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1' },
    ],
    starter: `function search(nums, target) {
  // your code here
}
`,
    tests: () => [
      { args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { args: [[5], 5], expected: 0 },
      { args: [[5], -5], expected: -1 },
      { args: [[1, 3, 5, 7, 9, 11], 1], expected: 0 },
      { args: [[1, 3, 5, 7, 9, 11], 11], expected: 5 },
      { args: [[], 3], expected: -1 },
      { args: [range(5000000, (i) => i * 2), 9999998], expected: 4999999, label: 'large input (5 million numbers)' },
    ],
    hints: [
      'Because the array is sorted, one comparison with the middle element lets you throw away half of it.',
      'Keep two bounds, left and right. Compute mid, then move left up or right down depending on how nums[mid] compares to target.',
      'Use a loop that runs while left <= right. Set left = mid + 1 or right = mid - 1, otherwise the loop can run forever.',
    ],
    solution: `function search(nums, target) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) return mid
    if (nums[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}
`,
    explain: 'Every step halves the search range, so 5 million elements need only about 23 comparisons. Moving the bound past mid (mid ± 1) is what guarantees progress on every iteration.',
    time: 'O(log n)',
    space: 'O(1)',
  },
  {
    id: 'max-subarray',
    lc: { n: 53, slug: 'maximum-subarray' },
    lesson: 'kadanes',
    title: 'Maximum Subarray',
    diff: 'medium',
    fn: 'maxSubArray',
    prompt: `<p>Given an integer array <code>nums</code>, find the contiguous subarray (containing at least one number) with the <b>largest sum</b>, and return that sum.</p>`,
    examples: [
      { input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6', note: 'The subarray [4, -1, 2, 1] has the largest sum.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5, 4, -1, 7, 8]', output: '23' },
    ],
    starter: `function maxSubArray(nums) {
  // your code here
}
`,
    tests: () => [
      { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { args: [[1]], expected: 1 },
      { args: [[5, 4, -1, 7, 8]], expected: 23 },
      { args: [[-3, -2, -5]], expected: -2 },
      { args: [[-1]], expected: -1 },
      { args: [[2, -1, 2, -1, 2]], expected: 4 },
      { args: [range(100000, () => 1)], expected: 100000, label: 'large input (100,000 numbers)' },
    ],
    hints: [
      'Trying every start and end is O(n²) and will time out on the large input.',
      'Walk left to right and track the best sum of a subarray that ends at the current index.',
      'At each number, either extend the previous subarray (current = previous + x) or start fresh at x. Take whichever is larger, and keep a running maximum.',
    ],
    solution: `function maxSubArray(nums) {
  let current = nums[0]
  let best = nums[0]
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i])
    best = Math.max(best, current)
  }
  return best
}
`,
    explain: 'This is Kadane\'s algorithm. If the running sum so far is negative, it can only hurt, so you restart at the current element. Initialising with nums[0] (not 0) keeps all-negative arrays correct.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'longest-substring',
    lc: { n: 3, slug: 'longest-substring-without-repeating-characters' },
    lesson: 'sliding-window',
    title: 'Longest Substring Without Repeating Characters',
    diff: 'medium',
    fn: 'lengthOfLongestSubstring',
    prompt: `<p>Given a string <code>s</code>, return the length of the <b>longest substring</b> that contains no repeated characters.</p>`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', note: 'The answer is "abc".' },
      { input: 's = "bbbbb"', output: '1' },
      { input: 's = "pwwkew"', output: '3', note: '"wke" counts. "pwke" does not, because a substring must be contiguous.' },
    ],
    starter: `function lengthOfLongestSubstring(s) {
  // your code here
}
`,
    tests: () => [
      { args: ['abcabcbb'], expected: 3 },
      { args: ['bbbbb'], expected: 1 },
      { args: ['pwwkew'], expected: 3 },
      { args: [''], expected: 0 },
      { args: [' '], expected: 1 },
      { args: ['dvdf'], expected: 3 },
      { args: ['abba'], expected: 2 },
      { args: ['tmmzuxt'], expected: 5 },
      {
        args: [range(100000, (i) => 97 + (i % 26)).map((c) => String.fromCharCode(c)).join('')],
        expected: 26,
        label: 'large input (100,000 characters)',
      },
    ],
    hints: [
      'Think of a window [left, right] that always contains unique characters. You grow it on the right and shrink it on the left.',
      'Store the last index at which you saw each character. When the new character was already inside the window, jump left past its previous position.',
      'Careful with "abba": only move left forward (left = max(left, lastSeen + 1)), never backwards.',
    ],
    solution: `function lengthOfLongestSubstring(s) {
  const last = new Map() // char -> last index
  let left = 0
  let best = 0
  for (let right = 0; right < s.length; right++) {
    const c = s[right]
    if (last.has(c) && last.get(c) >= left) left = last.get(c) + 1
    last.set(c, right)
    best = Math.max(best, right - left + 1)
  }
  return best
}
`,
    explain: 'A sliding window with a "last seen" map. When a duplicate appears inside the window, the left edge jumps just past the earlier copy, so no character is ever visited more than twice.',
    time: 'O(n)',
    space: 'O(min(n, alphabet size))',
  },
  {
    id: 'subarray-sum-k',
    lc: { n: 560, slug: 'subarray-sum-equals-k' },
    lesson: 'prefix-sum',
    title: 'Subarray Sum Equals K',
    diff: 'medium',
    fn: 'subarraySum',
    prompt: `<p>Given an array of integers <code>nums</code> and an integer <code>k</code>, return the <b>number of contiguous subarrays</b> whose sum equals <code>k</code>.</p>
<p>The array can contain negative numbers and zeros, so a sliding window will not work here.</p>`,
    examples: [
      { input: 'nums = [1, 1, 1], k = 2', output: '2' },
      { input: 'nums = [1, 2, 3], k = 3', output: '2', note: '[1, 2] and [3]' },
      { input: 'nums = [1, -1, 0], k = 0', output: '3' },
    ],
    starter: `function subarraySum(nums, k) {
  // your code here
}
`,
    tests: () => [
      { args: [[1, 1, 1], 2], expected: 2 },
      { args: [[1, 2, 3], 3], expected: 2 },
      { args: [[1, -1, 0], 0], expected: 3 },
      { args: [[3, 4, 7, 2, -3, 1, 4, 2], 7], expected: 4 },
      { args: [[0, 0, 0], 0], expected: 6 },
      { args: [[1], 0], expected: 0 },
      { args: [[-1, -1, 1], 0], expected: 1 },
      { args: [range(100000, () => 1), 1], expected: 100000, label: 'large input (100,000 numbers)' },
    ],
    hints: [
      'Let prefix[i] be the sum of the first i numbers. The sum of nums[a..b] is prefix[b+1] - prefix[a].',
      'You want prefix[j] - prefix[i] = k for i < j. So at each j, count how many earlier prefixes equal prefix[j] - k.',
      'Keep a Map from prefix sum to how many times you have seen it, seeded with {0: 1} for the empty prefix. Update the map after counting.',
    ],
    solution: `function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]) // prefix sum -> times seen
  let sum = 0
  let count = 0
  for (const x of nums) {
    sum += x
    count += seen.get(sum - k) ?? 0
    seen.set(sum, (seen.get(sum) ?? 0) + 1)
  }
  return count
}
`,
    explain: 'Prefix sums turn "subarray sum = k" into "two prefix sums differ by k". A hash map counting earlier prefixes finds all matching starts in O(1). Seeding the map with 0 handles subarrays that start at index 0.',
    time: 'O(n)',
    space: 'O(n)',
  },
  {
    id: 'fibonacci-memo',
    lc: { n: 509, slug: 'fibonacci-number' },
    lesson: 'fibonacci',
    title: 'Fibonacci Number',
    diff: 'easy',
    fn: 'fib',
    prompt: `<p>The Fibonacci sequence starts <code>0, 1, 1, 2, 3, 5, 8, ...</code> where each number is the sum of the previous two. Return <code>fib(n)</code>.</p>
<p>Careful: the obvious recursive version recomputes the same values over and over, so the bigger inputs will time out.</p>`,
    examples: [
      { input: 'n = 2', output: '1' },
      { input: 'n = 10', output: '55' },
    ],
    starter: `function fib(n) {
  // your code here
}
`,
    tests: () => [
      { args: [0], expected: 0 },
      { args: [1], expected: 1 },
      { args: [2], expected: 1 },
      { args: [10], expected: 55 },
      { args: [20], expected: 6765 },
      { args: [30], expected: 832040 },
      { args: [45], expected: 1134903170, label: 'n = 45 (naive recursion takes too long)' },
      { args: [70], expected: 190392490709135, label: 'n = 70' },
    ],
    hints: [
      'fib(5) calls fib(4) and fib(3). fib(4) also calls fib(3). The same work is repeated an exponential number of times.',
      'Either cache results you have already computed (memoization), or build up from the bottom.',
      'Bottom-up needs only the last two values: keep a and b, and repeat n times: [a, b] = [b, a + b].',
    ],
    solution: `function fib(n) {
  let a = 0
  let b = 1
  for (let i = 0; i < n; i++) {
    ;[a, b] = [b, a + b]
  }
  return a
}
`,
    explain: 'Naive recursion is O(2^n) because the call tree recomputes the same subproblems. Iterating from the bottom visits each value once and keeps only two numbers, so it is O(n) time and O(1) space.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'merge-intervals',
    lc: { n: 56, slug: 'merge-intervals' },
    lesson: 'intervals',
    title: 'Merge Intervals',
    diff: 'medium',
    fn: 'merge',
    prompt: `<p>Given an array of <code>intervals</code> where <code>intervals[i] = [start, end]</code>, merge all overlapping intervals and return the non-overlapping intervals that cover the same ranges, sorted by start.</p>
<p>Intervals that only touch (like <code>[1, 4]</code> and <code>[4, 5]</code>) count as overlapping.</p>`,
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' },
    ],
    starter: `function merge(intervals) {
  // your code here
}
`,
    tests: () => [
      { args: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
      { args: [[[1, 4], [4, 5]]], expected: [[1, 5]] },
      { args: [[[1, 4], [0, 4]]], expected: [[0, 4]] },
      { args: [[[1, 4], [2, 3]]], expected: [[1, 4]] },
      { args: [[[5, 6], [1, 2], [3, 4]]], expected: [[1, 2], [3, 4], [5, 6]] },
      { args: [[[1, 10], [2, 3], [4, 5], [6, 7]]], expected: [[1, 10]] },
      { args: [[[1, 4], [0, 0]]], expected: [[0, 0], [1, 4]] },
      { args: [[[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]]], expected: [[1, 10]] },
    ],
    hints: [
      'If the intervals are in random order, overlaps can be anywhere. What happens if you sort them first?',
      'After sorting by start, an interval can only overlap the last interval you kept in the result.',
      'For each interval: if its start is <= the end of the last result interval, extend that end with Math.max. Otherwise push it as a new interval.',
    ],
    solution: `function merge(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0])
  const result = []
  for (const [start, end] of sorted) {
    const last = result[result.length - 1]
    if (last && start <= last[1]) last[1] = Math.max(last[1], end)
    else result.push([start, end])
  }
  return result
}
`,
    explain: 'Sorting by start puts overlapping intervals next to each other, so one sweep is enough. Using Math.max when extending handles the case where a later interval is fully inside the previous one.',
    time: 'O(n log n)',
    space: 'O(n)',
  },
  {
    id: 'reverse-linked-list',
    lc: { n: 206, slug: 'reverse-linked-list' },
    lesson: 'linked-lists',
    title: 'Reverse Linked List',
    diff: 'easy',
    fn: 'reverseList',
    out: 'list',
    prompt: `<p>Given the <code>head</code> of a singly linked list, reverse the list and return the new head.</p>
<p>Each node is a <code>ListNode</code> with <code>val</code> and <code>next</code>. The class is already available in your code, so you do not need to define it. The tests show lists as arrays for readability.</p>`,
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' },
      { input: 'head = [1, 2]', output: '[2, 1]' },
      { input: 'head = []', output: '[]' },
    ],
    starter: `// ListNode is provided: new ListNode(val, next)
function reverseList(head) {
  // your code here
}
`,
    tests: () => [
      { args: [{ $list: [1, 2, 3, 4, 5] }], expected: [5, 4, 3, 2, 1] },
      { args: [{ $list: [1, 2] }], expected: [2, 1] },
      { args: [{ $list: [] }], expected: [] },
      { args: [{ $list: [7] }], expected: [7] },
      { args: [{ $list: range(50000, (i) => i) }], expected: range(50000, (i) => 49999 - i), label: 'long list (50,000 nodes)' },
    ],
    hints: [
      'You only need to flip each node\'s next pointer so it points backwards instead of forwards.',
      'Walk the list with a current node and keep a prev node (start with null). Before you flip current.next, save the original next node, otherwise you lose the rest of the list.',
      'Loop: next = cur.next; cur.next = prev; prev = cur; cur = next. When cur becomes null, prev is the new head.',
    ],
    solution: `function reverseList(head) {
  let prev = null
  let cur = head
  while (cur) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
}
`,
    explain: 'Three pointers (prev, cur, next) reverse the links in place with one pass. Saving next before overwriting cur.next is the step people forget, and it is what stops you from losing the tail of the list.',
    time: 'O(n)',
    space: 'O(1)',
  },
  {
    id: 'max-depth-tree',
    lc: { n: 104, slug: 'maximum-depth-of-binary-tree' },
    lesson: 'tree-measurements',
    title: 'Maximum Depth of Binary Tree',
    diff: 'easy',
    fn: 'maxDepth',
    prompt: `<p>Given the <code>root</code> of a binary tree, return its <b>maximum depth</b>: the number of nodes along the longest path from the root down to the farthest leaf.</p>
<p>Each node is a <code>TreeNode</code> with <code>val</code>, <code>left</code> and <code>right</code>. The class is available in your code. The tests build trees from level-order arrays, where <code>null</code> means a missing child.</p>`,
    examples: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', output: '3' },
      { input: 'root = [1, null, 2]', output: '2' },
      { input: 'root = []', output: '0' },
    ],
    starter: `// TreeNode is provided: new TreeNode(val, left, right)
function maxDepth(root) {
  // your code here
}
`,
    tests: () => [
      { args: [{ $tree: [3, 9, 20, null, null, 15, 7] }], expected: 3 },
      { args: [{ $tree: [1, null, 2] }], expected: 2 },
      { args: [{ $tree: [] }], expected: 0 },
      { args: [{ $tree: [1] }], expected: 1 },
      { args: [{ $tree: [1, 2, 3, 4, null, null, 5, 6] }], expected: 4 },
      { args: [{ $tree: [1, 2, null, 3, null, 4, null, 5] }], expected: 5 },
    ],
    hints: [
      'The depth of a tree depends on the depths of its subtrees. That is a recursive definition.',
      'An empty tree (null) has depth 0. Otherwise the depth is 1 plus the larger of the left and right depths.',
      'Base case: if (!root) return 0. Then return 1 + Math.max(maxDepth(root.left), maxDepth(root.right)).',
    ],
    solution: `function maxDepth(root) {
  if (!root) return 0
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}
`,
    explain: 'Depth-first recursion: the answer for a node is one more than the deeper of its two children. Each node is visited exactly once. The recursion stack is as deep as the tree is tall.',
    time: 'O(n)',
    space: 'O(h)',
  },
  {
    id: 'number-of-islands',
    lc: { n: 200, slug: 'number-of-islands' },
    lesson: 'grid-problems',
    title: 'Number of Islands',
    diff: 'medium',
    fn: 'numIslands',
    prompt: `<p>Given a 2D grid of <code>1</code>s (land) and <code>0</code>s (water), return the number of <b>islands</b>.</p>
<p>An island is a group of land cells connected horizontally or vertically (not diagonally). You may modify the grid.</p>`,
    examples: [
      { input: 'grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]', output: '3' },
      { input: 'grid = [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]', output: '1' },
    ],
    starter: `function numIslands(grid) {
  // your code here
}
`,
    tests: () => [
      { args: [[[1, 1, 1, 1, 0], [1, 1, 0, 1, 0], [1, 1, 0, 0, 0], [0, 0, 0, 0, 0]]], expected: 1 },
      { args: [[[1, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 1]]], expected: 3 },
      { args: [[[0]]], expected: 0 },
      { args: [[[1]]], expected: 1 },
      { args: [[[1, 0, 1], [0, 1, 0], [1, 0, 1]]], expected: 5 },
      { args: [[]], expected: 0 },
      { args: [range(300, () => 1).map(() => range(300, () => 1))], expected: 1, label: 'one big island (300 × 300)' },
    ],
    hints: [
      'Scan every cell. When you find land that you have not seen, you have found a new island.',
      'Once you find land, explore the whole island (DFS or BFS in 4 directions) and mark every cell you reach, so it is never counted twice.',
      'Mark visited land by setting it to 0. Count one island per DFS you start. For the big grid, use an explicit stack instead of recursion to avoid stack overflow.',
    ],
    solution: `function numIslands(grid) {
  let count = 0
  const rows = grid.length
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] !== 1) continue
      count++
      const stack = [[r, c]]
      grid[r][c] = 0
      while (stack.length) {
        const [y, x] = stack.pop()
        for (const [dy, dx] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const ny = y + dy
          const nx = x + dx
          if (ny >= 0 && ny < rows && nx >= 0 && nx < grid[ny].length && grid[ny][nx] === 1) {
            grid[ny][nx] = 0
            stack.push([ny, nx])
          }
        }
      }
    }
  }
  return count
}
`,
    explain: 'Each unvisited land cell starts a flood fill that sinks the whole island, so every island is counted once. Marking a cell as visited when you push it (not when you pop it) prevents duplicates on the stack.',
    time: 'O(rows × cols)',
    space: 'O(rows × cols)',
  },
  {
    id: 'coin-change',
    lc: { n: 322, slug: 'coin-change' },
    lesson: 'dp-1d',
    title: 'Coin Change',
    diff: 'medium',
    fn: 'coinChange',
    prompt: `<p>You are given an array <code>coins</code> of coin denominations and an integer <code>amount</code>. Return the <b>fewest number of coins</b> needed to make up that amount, or <code>-1</code> if it cannot be made.</p>
<p>You have an unlimited supply of each coin. Always picking the biggest coin first does not always work.</p>`,
    examples: [
      { input: 'coins = [1, 2, 5], amount = 11', output: '3', note: '5 + 5 + 1' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1, 3, 4], amount = 6', output: '2', note: '3 + 3. Greedy would pick 4 + 1 + 1 = 3 coins.' },
    ],
    starter: `function coinChange(coins, amount) {
  // your code here
}
`,
    tests: () => [
      { args: [[1, 2, 5], 11], expected: 3 },
      { args: [[2], 3], expected: -1 },
      { args: [[1], 0], expected: 0 },
      { args: [[1, 3, 4], 6], expected: 2 },
      { args: [[2, 5, 10, 1], 27], expected: 4 },
      { args: [[5], 5], expected: 1 },
      { args: [[186, 419, 83, 408], 6249], expected: 20, label: 'larger amount' },
    ],
    hints: [
      'Greedy fails on [1, 3, 4] with amount 6. You need to consider every coin choice, but you can reuse answers for smaller amounts.',
      'Let dp[a] be the fewest coins needed for amount a. dp[0] = 0. For each amount, try every coin and look at dp[a - coin].',
      'Initialise dp with Infinity (except dp[0] = 0). dp[a] = min(dp[a], dp[a - coin] + 1) for every coin <= a. At the end, return -1 if dp[amount] is still Infinity.',
    ],
    solution: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1)
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}
`,
    explain: 'Classic 1D dynamic programming. The best way to make amount a is one coin plus the best way to make a - coin, and we try all coins. Building from 0 upward guarantees dp[a - coin] is already known.',
    time: 'O(amount × coins)',
    space: 'O(amount)',
  },
]

export const DSA_PROBLEMS: Problem[] = [...BASE_PROBLEMS, ...DSA_MORE]

export const problemsForLesson = (lessonId: string) => DSA_PROBLEMS.filter((p) => p.lesson === lessonId)
export const problemById = (id: string) => DSA_PROBLEMS.find((p) => p.id === id)
