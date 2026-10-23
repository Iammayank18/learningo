# DSA Roadmap Fixes — Complete Implementation Plan

## Changes to `Mayank_DSA_Journal.html` — PHASES array only

---

### 1. Phase 0 — Foundation (id: 0)
**Changes:** Add 2 problems, duration 5→7 days

**Replace entire object with:**
```js
      {
        id: 0, title: "Foundation", week: "Week 1", duration: "7 days",
        intro: "Before you touch a single problem, you need these tools. One day each. Don't rush.",
        topics: [
          "Big O notation — O(n), O(n²), O(log n), O(n log n)",
          "Arrays in JavaScript — indexing, push, pop, splice, slice",
          "Objects, Map, and Set — when to use each",
          "Recursion basics — write one simple recursive function",
          "The 5-step framework — understand → edge cases → brute force → optimise → code"
        ],
        problems: [
          { name: "Reverse String", diff: "Easy", link: "https://leetcode.com/problems/reverse-string/", pattern: "Arrays" },
          { name: "Running Sum of 1d Array", diff: "Easy", link: "https://leetcode.com/problems/running-sum-of-1d-array/", pattern: "Arrays / Prefix" },
          { name: "FizzBuzz", diff: "Easy", link: "https://leetcode.com/problems/fizz-buzz/", pattern: "Loops / Logic" },
          { name: "Palindrome Number", diff: "Easy", link: "https://leetcode.com/problems/palindrome-number/", pattern: "Math / Logic" },
          { name: "Happy Number", diff: "Easy", link: "https://leetcode.com/problems/happy-number/", pattern: "Math / Hash Set" },
          { name: "Plus One", diff: "Easy", link: "https://leetcode.com/problems/plus-one/", pattern: "Array / Math" },
          { name: "Search Insert Position", diff: "Easy", link: "https://leetcode.com/problems/search-insert-position/", pattern: "Arrays / Search" },
          { name: "Fibonacci Number", diff: "Easy", link: "https://leetcode.com/problems/fibonacci-number/", pattern: "Recursion" },
          { name: "Power of Two", diff: "Easy", link: "https://leetcode.com/problems/power-of-two/", pattern: "Recursion / Math" },
          { name: "Jewels and Stones", diff: "Easy", link: "https://leetcode.com/problems/jewels-and-stones/", pattern: "Hash Set" },
          { name: "Squares of a Sorted Array", diff: "Easy", link: "https://leetcode.com/problems/squares-of-a-sorted-array/", pattern: "Arrays" },
          { name: "Longest Common Prefix", diff: "Easy", link: "https://leetcode.com/problems/longest-common-prefix/", pattern: "Strings" }
        ],
        stuck: "If Big O feels abstract, watch 'Big O Notation — CS Dojo' on YouTube. It's 20 minutes and makes everything click.",
        moveOn: "You can explain what O(n log n) means out loud. You've written one recursive function yourself without looking it up."
      },
```

---

### 2. Phase 1 — Core Data Structures (id: 1)
**Changes:** Add 1 topic (Queue), add 5 problems, duration 10→15 days, weeks "Weeks 2-3"→"Weeks 2-4"

**Replace with:**
```js
      {
        id: 1, title: "Core Data Structures", week: "Weeks 2–4", duration: "15 days",
        intro: "Five structures that appear in the majority of all interview problems. Learn them well — not just what they are, but when to reach for each one. Linked Lists are here because they share the same foundational importance as arrays and stacks.",
        topics: [
          "Arrays & strings — manipulation, reversal, slicing",
          "Hash Map / Hash Set — frequency counting, lookups in O(1)",
          "Stack — LIFO, undo operations, matching brackets",
          "Queue — FIFO, implement from scratch, use in BFS level-order traversal",
          "Linked List — nodes with next/prev pointers, fast & slow pointers, reversal",
          "Dummy node trick — simplifies edge cases in linked list problems",
          "Floyd's Cycle Detection — fast & slow pointer meeting point",
          "Matrix traversal — row/column iteration, spiral order, in-place rotation"
        ],
        problems: [
          { name: "Two Sum", diff: "Easy", link: "https://leetcode.com/problems/two-sum/", pattern: "Hash Map" },
          { name: "Contains Duplicate", diff: "Easy", link: "https://leetcode.com/problems/contains-duplicate/", pattern: "Hash Set" },
          { name: "Valid Anagram", diff: "Easy", link: "https://leetcode.com/problems/valid-anagram/", pattern: "Hash Map" },
          { name: "Number of Recent Calls", diff: "Easy", link: "https://leetcode.com/problems/number-of-recent-calls/", pattern: "Queue" },
          { name: "Implement Queue using Stacks", diff: "Easy", link: "https://leetcode.com/problems/implement-queue-using-stacks/", pattern: "Queue / Stack" },
          { name: "Group Anagrams", diff: "Medium", link: "https://leetcode.com/problems/group-anagrams/", pattern: "Hash Map" },
          { name: "Valid Parentheses", diff: "Easy", link: "https://leetcode.com/problems/valid-parentheses/", pattern: "Stack" },
          { name: "Min Stack", diff: "Medium", link: "https://leetcode.com/problems/min-stack/", pattern: "Stack" },
          { name: "Daily Temperatures", diff: "Medium", link: "https://leetcode.com/problems/daily-temperatures/", pattern: "Monotonic Stack" },
          { name: "Maximum Subarray", diff: "Medium", link: "https://leetcode.com/problems/maximum-subarray/", pattern: "Kadane's" },
          { name: "Product of Array Except Self", diff: "Medium", link: "https://leetcode.com/problems/product-of-array-except-self/", pattern: "Prefix / Suffix" },
          { name: "Longest Consecutive Sequence", diff: "Medium", link: "https://leetcode.com/problems/longest-consecutive-sequence/", pattern: "Hash Set" },
          { name: "Spiral Matrix", diff: "Medium", link: "https://leetcode.com/problems/spiral-matrix/", pattern: "Matrix Traversal" },
          { name: "Rotate Image", diff: "Medium", link: "https://leetcode.com/problems/rotate-image/", pattern: "Matrix In-place" },
          { name: "Set Matrix Zeroes", diff: "Medium", link: "https://leetcode.com/problems/set-matrix-zeroes/", pattern: "Matrix In-place" },
          { name: "Evaluate Reverse Polish Notation", diff: "Medium", link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", pattern: "Stack" },
          { name: "Reverse Linked List", diff: "Easy", link: "https://leetcode.com/problems/reverse-linked-list/", pattern: "Linked List" },
          { name: "Merge Two Sorted Lists", diff: "Easy", link: "https://leetcode.com/problems/merge-two-sorted-lists/", pattern: "Linked List" },
          { name: "Linked List Cycle", diff: "Easy", link: "https://leetcode.com/problems/linked-list-cycle/", pattern: "Fast & Slow Pointers" },
          { name: "Middle of the Linked List", diff: "Easy", link: "https://leetcode.com/problems/middle-of-the-linked-list/", pattern: "Fast & Slow Pointers" },
          { name: "Palindrome Linked List", diff: "Easy", link: "https://leetcode.com/problems/palindrome-linked-list/", pattern: "Fast & Slow Pointers" },
          { name: "Remove Nth Node From End of List", diff: "Medium", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", pattern: "Two Pointers" },
          { name: "Reorder List", diff: "Medium", link: "https://leetcode.com/problems/reorder-list/", pattern: "Fast & Slow + Reverse" },
          { name: "Copy List with Random Pointer", diff: "Medium", link: "https://leetcode.com/problems/copy-list-with-random-pointer/", pattern: "Hash Map" },
          { name: "Add Two Numbers", diff: "Medium", link: "https://leetcode.com/problems/add-two-numbers/", pattern: "Linked List Simulation" },
          { name: "Find the Duplicate Number", diff: "Medium", link: "https://leetcode.com/problems/find-the-duplicate-number/", pattern: "Floyd's Cycle Detection" },
          { name: "Sort List", diff: "Medium", link: "https://leetcode.com/problems/sort-list/", pattern: "Merge Sort on Linked List" },
          { name: "LRU Cache", diff: "Medium", link: "https://leetcode.com/problems/lru-cache/", pattern: "Hash Map + Doubly Linked List" },
          { name: "Merge K Sorted Lists", diff: "Hard", link: "https://leetcode.com/problems/merge-k-sorted-lists/", pattern: "Heap / Divide & Conquer" },
          { name: "Reverse Nodes in k-Group", diff: "Hard", link: "https://leetcode.com/problems/reverse-nodes-in-k-group/", pattern: "Linked List Reversal" }
        ],
        stuck: "If you're stuck on any problem for more than 25 minutes, read just the approach on NeetCode (not the code). Try for 10 more minutes. Then watch the solution. For linked lists — draw the nodes and arrows on paper before writing a single line of code. For queues — think about who gets served first (FIFO) and trace each enqueue/dequeue on paper.",
        moveOn: "You immediately reach for a Map or Set when you see 'find duplicates', you can reverse a linked list and detect a cycle from memory, and you can explain how a queue differs from a stack — without looking anything up."
      },
```

---

### 3. Phase 2 — Core Algorithms (id: 10 → 2)
**Changes:** id 10→2, add 2 topics (Quick Select + Searching), add 2 problems (Kth Largest + First Bad Version), duration 5→10 days, weeks "Weeks 3-4"→"Weeks 5-6"

**Replace with:**
```js
      {
        id: 2, title: "Core Algorithms", week: "Weeks 5–6", duration: "10 days",
        intro: "These are the algorithms that come up directly in FAANG interviews — not theory for its own sake. Bubble/Selection/Insertion sort are skipped; no interviewer asks you to implement them. Focus on Merge Sort, Quick Sort, Binary Search, and the three named algorithms below — these appear regularly at Google, Meta, and Amazon.",
        topics: [
          "Merge Sort — O(n log n), stable, divide & conquer — implement from scratch, used in Sort List",
          "Quick Sort — O(n log n) avg, in-place, pivot + partition — know the partition step cold",
          "Merge Sort vs Quick Sort — when to use each (stable vs in-place, worst-case trade-off)",
          "Binary Search — O(log n), fundamental divide-and-conquer search. Master the template: while (left <= right)",
          "Quick Select — find kth element using partition logic; O(n) average, uses the same partition step as Quick Sort",
          "Kadane's Algorithm — max subarray in O(n); extend or restart at each step",
          "Boyer-Moore Voting — majority element in O(n) time O(1) space; classic Meta question",
          "Dutch National Flag — 3-way partition in one pass; the logic behind Sort Colors"
        ],
        problems: [
          { name: "First Bad Version", diff: "Easy", link: "https://leetcode.com/problems/first-bad-version/", pattern: "Binary Search" },
          { name: "Merge Sorted Array", diff: "Easy", link: "https://leetcode.com/problems/merge-sorted-array/", pattern: "Merge Sort" },
          { name: "Sort List", diff: "Medium", link: "https://leetcode.com/problems/sort-list/", pattern: "Merge Sort" },
          { name: "Largest Number", diff: "Medium", link: "https://leetcode.com/problems/largest-number/", pattern: "Custom Comparator Sort" },
          { name: "Kth Largest Element in an Array", diff: "Medium", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", pattern: "Quick Select / Partition" },
          { name: "Sort Colors", diff: "Medium", link: "https://leetcode.com/problems/sort-colors/", pattern: "Dutch National Flag" },
          { name: "Maximum Subarray", diff: "Medium", link: "https://leetcode.com/problems/maximum-subarray/", pattern: "Kadane's Algorithm" },
          { name: "Maximum Sum Circular Subarray", diff: "Medium", link: "https://leetcode.com/problems/maximum-sum-circular-subarray/", pattern: "Kadane's Algorithm" },
          { name: "Majority Element", diff: "Easy", link: "https://leetcode.com/problems/majority-element/", pattern: "Boyer-Moore Voting" },
          { name: "Majority Element II", diff: "Medium", link: "https://leetcode.com/problems/majority-element-ii/", pattern: "Boyer-Moore Voting" }
        ],
        stuck: "For Merge Sort — implement it on a plain array first, then on a linked list. For Kadane's — at each index ask: is it better to extend the current subarray or start fresh? That one question is the entire algorithm. For Binary Search — always ask 'what am I eliminating with each step?' If the search space shrinks by half every step, you're binary searching.",
        moveOn: "You can implement Merge Sort from scratch, solve Sort Colors without hints, run a binary search without off-by-one errors, and explain Boyer-Moore Voting out loud in under 60 seconds."
      },
```

---

### 4. Phase 3 — Core Patterns (id: 2 → 3)
**Changes:** id 2→3, add Intervals topic, weeks "Weeks 4-6"→"Weeks 7-9"

**Replace with:**
```js
      {
        id: 3, title: "Core Patterns", week: "Weeks 7–9", duration: "15 days",
        intro: "This is the real unlock. Once you see these patterns in 3–4 problems each, you start recognising them everywhere. Don't memorise solutions — memorise the shape of the problem.",
        topics: [
          "Two Pointers — sorted array, find pair, palindrome checks",
          "Sliding Window — subarray/substring problems with a fixed or variable window",
          "Binary Search — not just for sorted arrays, also for 'minimise/maximise' problems",
          "Prefix Sum — precompute cumulative sums for range queries",
          "Intervals — merge overlapping, insert into sorted list, find non-overlapping max count"
        ],
        problems: [
          { name: "Valid Palindrome", diff: "Easy", link: "https://leetcode.com/problems/valid-palindrome/", pattern: "Two Pointers" },
          { name: "Two Sum II (sorted)", diff: "Medium", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", pattern: "Two Pointers" },
          { name: "3Sum", diff: "Medium", link: "https://leetcode.com/problems/3sum/", pattern: "Two Pointers" },
          { name: "Best Time to Buy & Sell Stock", diff: "Easy", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", pattern: "Sliding Window" },
          { name: "Longest Substring Without Repeating", diff: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", pattern: "Sliding Window" },
          { name: "Minimum Window Substring", diff: "Hard", link: "https://leetcode.com/problems/minimum-window-substring/", pattern: "Sliding Window" },
          { name: "Binary Search", diff: "Easy", link: "https://leetcode.com/problems/binary-search/", pattern: "Binary Search" },
          { name: "Search in Rotated Array", diff: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/", pattern: "Binary Search" },
          { name: "Container With Most Water", diff: "Medium", link: "https://leetcode.com/problems/container-with-most-water/", pattern: "Two Pointers" },
          { name: "Move Zeroes", diff: "Easy", link: "https://leetcode.com/problems/move-zeroes/", pattern: "Two Pointers" },
          { name: "Permutation in String", diff: "Medium", link: "https://leetcode.com/problems/permutation-in-string/", pattern: "Sliding Window" },
          { name: "Find Minimum in Rotated Array", diff: "Medium", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", pattern: "Binary Search" },
          { name: "Koko Eating Bananas", diff: "Medium", link: "https://leetcode.com/problems/koko-eating-bananas/", pattern: "Binary Search" },
          { name: "Time Based Key-Value Store", diff: "Medium", link: "https://leetcode.com/problems/time-based-key-value-store/", pattern: "Binary Search" },
          { name: "Insert Interval", diff: "Medium", link: "https://leetcode.com/problems/insert-interval/", pattern: "Intervals" },
          { name: "Merge Intervals", diff: "Medium", link: "https://leetcode.com/problems/merge-intervals/", pattern: "Intervals" },
          { name: "Non-overlapping Intervals", diff: "Medium", link: "https://leetcode.com/problems/non-overlapping-intervals/", pattern: "Intervals / Greedy" },
          { name: "Minimum Number of Arrows to Burst Balloons", diff: "Medium", link: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/", pattern: "Intervals / Greedy" },
          { name: "Range Sum Query - Immutable", diff: "Easy", link: "https://leetcode.com/problems/range-sum-query-immutable/", pattern: "Prefix Sum" },
          { name: "Subarray Sum Equals K", diff: "Medium", link: "https://leetcode.com/problems/subarray-sum-equals-k/", pattern: "Prefix Sum + Hash Map" }
        ],
        stuck: "For sliding window — always define 'what does my window represent?' before coding. For binary search — always ask 'what am I eliminating with each step?' That mental model solves 90% of stuck moments. For intervals — sort by start time, then look at the overlap condition: does end[i] > start[j]?",
        moveOn: "You recognise 'sorted array + find pair' means two pointers, 'longest/shortest subarray with condition' means sliding window, and 'merge/insert intervals' means sorting by start — without being told."
      },
```

---

### 5. Phase 4 — Trees (id: 3 → 4)
**Changes:** id 3→4, add 2 problems, weeks "Weeks 5-7"→"Weeks 10-12"

**Replace with:**
```js
      {
        id: 4, title: "Trees", week: "Weeks 10–12", duration: "15 days",
        intro: "Trees feel scary at first. They're not. Almost every tree problem is DFS or BFS with a small twist. Learn those two cold, and the rest is pattern recognition.",
        topics: [
          "Binary tree structure — nodes, left, right, parent, leaf",
          "DFS — preorder, inorder, postorder (recursive + iterative)",
          "BFS — level order traversal using a queue",
          "BST — insert, search, validate",
          "Height, depth, diameter — the common measurement problems"
        ],
        problems: [
          { name: "Invert Binary Tree", diff: "Easy", link: "https://leetcode.com/problems/invert-binary-tree/", pattern: "DFS" },
          { name: "Max Depth of Binary Tree", diff: "Easy", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", pattern: "DFS" },
          { name: "Same Tree", diff: "Easy", link: "https://leetcode.com/problems/same-tree/", pattern: "DFS" },
          { name: "Subtree of Another Tree", diff: "Easy", link: "https://leetcode.com/problems/subtree-of-another-tree/", pattern: "DFS" },
          { name: "Binary Tree Level Order Traversal", diff: "Medium", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", pattern: "BFS" },
          { name: "Validate BST", diff: "Medium", link: "https://leetcode.com/problems/validate-binary-search-tree/", pattern: "DFS" },
          { name: "Lowest Common Ancestor of BST", diff: "Medium", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", pattern: "DFS / BST" },
          { name: "Binary Tree Right Side View", diff: "Medium", link: "https://leetcode.com/problems/binary-tree-right-side-view/", pattern: "BFS" },
          { name: "Diameter of Binary Tree", diff: "Easy", link: "https://leetcode.com/problems/diameter-of-binary-tree/", pattern: "DFS" },
          { name: "Balanced Binary Tree", diff: "Easy", link: "https://leetcode.com/problems/balanced-binary-tree/", pattern: "DFS" },
          { name: "Construct Binary Tree from Preorder and Inorder", diff: "Medium", link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", pattern: "DFS / Recursion" },
          { name: "Path Sum", diff: "Easy", link: "https://leetcode.com/problems/path-sum/", pattern: "DFS" },
          { name: "Binary Tree Maximum Path Sum", diff: "Hard", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", pattern: "DFS" },
          { name: "Count Good Nodes in Binary Tree", diff: "Medium", link: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/", pattern: "DFS" },
          { name: "Kth Smallest in BST", diff: "Medium", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", pattern: "DFS / BST" }
        ],
        stuck: "If recursion confuses you: draw the tree on paper. Trace one function call at a time with a pen. Trees become easy once you can see the call stack. Do this for at least 3 problems.",
        moveOn: "You can write DFS and BFS on a binary tree from memory, without looking anything up."
      },
```

---

### 6. Phase 5 — Graphs (id: 4 → 5)
**Changes:** id 4→5, add 2 topics (Dijkstra + Topo Sort), add 4 problems, weeks "Weeks 8-10"→"Weeks 13-15"

**Replace with:**
```js
      {
        id: 5, title: "Graphs", week: "Weeks 13–15", duration: "15 days",
        intro: "Good news: if you did Phase 4 well, graphs are mostly the same ideas on a different structure. BFS + DFS + visited set — that's 80% of graph problems. The remaining 20% is Dijkstra for shortest paths and Topological Sort for dependency ordering.",
        topics: [
          "Graph representation — adjacency list vs matrix",
          "BFS on graphs — shortest path, level-by-level exploration",
          "DFS on graphs — cycle detection, connected components",
          "Visited set — critical, prevents infinite loops",
          "Grid problems — treat each cell as a node",
          "Dijkstra's algorithm — shortest path in weighted graphs, O((V+E) log V) with min-heap",
          "Topological Sort — Kahn's algorithm (BFS with in-degree) and DFS-based ordering"
        ],
        problems: [
          { name: "Number of Islands", diff: "Medium", link: "https://leetcode.com/problems/number-of-islands/", pattern: "BFS / DFS" },
          { name: "Clone Graph", diff: "Medium", link: "https://leetcode.com/problems/clone-graph/", pattern: "DFS" },
          { name: "Max Area of Island", diff: "Medium", link: "https://leetcode.com/problems/max-area-of-island/", pattern: "DFS" },
          { name: "Course Schedule", diff: "Medium", link: "https://leetcode.com/problems/course-schedule/", pattern: "Topological Sort" },
          { name: "Course Schedule II", diff: "Medium", link: "https://leetcode.com/problems/course-schedule-ii/", pattern: "Topological Sort" },
          { name: "Rotting Oranges", diff: "Medium", link: "https://leetcode.com/problems/rotting-oranges/", pattern: "BFS" },
          { name: "Pacific Atlantic Water Flow", diff: "Medium", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/", pattern: "DFS / BFS" },
          { name: "Walls and Gates", diff: "Medium", link: "https://leetcode.com/problems/walls-and-gates/", pattern: "BFS" },
          { name: "Number of Connected Components", diff: "Medium", link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", pattern: "Union Find" },
          { name: "Graph Valid Tree", diff: "Medium", link: "https://leetcode.com/problems/graph-valid-tree/", pattern: "Union Find / BFS" },
          { name: "Surrounded Regions", diff: "Medium", link: "https://leetcode.com/problems/surrounded-regions/", pattern: "DFS" },
          { name: "Network Delay Time", diff: "Medium", link: "https://leetcode.com/problems/network-delay-time/", pattern: "Dijkstra / Shortest Path" },
          { name: "Alien Dictionary", diff: "Hard", link: "https://leetcode.com/problems/alien-dictionary/", pattern: "Topological Sort" },
          { name: "Word Ladder", diff: "Hard", link: "https://leetcode.com/problems/word-ladder/", pattern: "BFS / Shortest Path" }
        ],
        stuck: "Stuck on graphs? Almost always means you forgot the visited set, or you're not sure when to use BFS vs DFS. Rule: BFS for shortest path (unweighted), DFS for connectivity and cycle detection. For Dijkstra — it's BFS with a priority queue instead of a regular queue. For Topo Sort — compute in-degrees, push 0-degree nodes into queue, process.",
        moveOn: "You can solve Number of Islands without hints. You can explain Dijkstra's algorithm and implement Topological Sort using Kahn's algorithm."
      },
```

---

### 7. Phase 6 — Tries & Bit Manipulation (id: 8 → 6)
**Changes:** id 8→6, duration 6→7 days, week "Weeks 11-12"→"Week 16"

**Replace with:**
```js
      {
        id: 6, title: "Tries & Bit Manipulation", week: "Week 16", duration: "7 days",
        intro: "Tries power every autocomplete/search system. Bit manipulation is fast, space-efficient, and shows up regularly at Google and Meta. Both are learnable in a week — high ROI for the effort.",
        topics: [
          "Trie structure — each node is a letter, paths form words, isEnd marks word boundary",
          "Insert and search in O(m) where m = word length",
          "XOR trick — x ^ x = 0, x ^ 0 = x. Cancels duplicate numbers instantly",
          "Bit shifts — left shift × 2, right shift ÷ 2",
          "n & (n-1) trick — removes the lowest set bit. Count set bits in O(number of set bits)"
        ],
        problems: [
          { name: "Implement Trie (Prefix Tree)", diff: "Medium", link: "https://leetcode.com/problems/implement-trie-prefix-tree/", pattern: "Trie" },
          { name: "Design Add and Search Words", diff: "Medium", link: "https://leetcode.com/problems/design-add-and-search-words-data-structure/", pattern: "Trie + DFS" },
          { name: "Search Suggestions System", diff: "Medium", link: "https://leetcode.com/problems/search-suggestions-system/", pattern: "Trie / Binary Search" },
          { name: "Word Search II", diff: "Hard", link: "https://leetcode.com/problems/word-search-ii/", pattern: "Trie + Backtracking" },
          { name: "Single Number", diff: "Easy", link: "https://leetcode.com/problems/single-number/", pattern: "Bit Manipulation / XOR" },
          { name: "Missing Number", diff: "Easy", link: "https://leetcode.com/problems/missing-number/", pattern: "Bit Manipulation / XOR" },
          { name: "Number of 1 Bits", diff: "Easy", link: "https://leetcode.com/problems/number-of-1-bits/", pattern: "Bit Manipulation" },
          { name: "Counting Bits", diff: "Easy", link: "https://leetcode.com/problems/counting-bits/", pattern: "Bit Manipulation / DP" },
          { name: "Reverse Bits", diff: "Easy", link: "https://leetcode.com/problems/reverse-bits/", pattern: "Bit Manipulation" },
          { name: "Sum of Two Integers", diff: "Medium", link: "https://leetcode.com/problems/sum-of-two-integers/", pattern: "Bit Manipulation" }
        ],
        stuck: "For Trie — draw it as a tree where each edge is a letter. It's just a HashMap of HashMaps (or arrays). For XOR — trace it on 2–3 small numbers with actual 0s and 1s. The pattern clicks immediately.",
        moveOn: "You can implement a basic Trie from scratch and solve Single Number + Missing Number using XOR in under 5 minutes each."
      },
```

---

### 8. Phase 7 — DP (id: 11 → 7)
**Changes:** id 11→7, weeks "Weeks 10-13"→"Weeks 17-19"

**Replace with:**
```js
      {
        id: 7, title: "Dynamic Programming", week: "Weeks 17–19", duration: "15 days",
        intro: "Dynamic Programming is the most frequently tested hard topic at FAANG. The key insight: DP is just recursion with caching. Always solve recursively first, then add memoization, then convert to tabulation. Master 1D DP cold before touching 2D.",
        topics: [
          "Memoization vs Tabulation — top-down (recursive + cache) vs bottom-up (iterative table)",
          "Identifying DP — overlapping subproblems + optimal substructure",
          "DP 1D — dp[i] depends on dp[i-1] or dp[i-2]; Fibonacci, House Robber patterns",
          "DP 1D unbounded — item can be reused; Coin Change pattern",
          "DP 2D grid — dp[i][j] from dp[i-1][j] and dp[i][j-1]; Unique Paths pattern",
          "DP 2D sequence — compare two strings/arrays; LCS and Edit Distance pattern",
          "0-1 Knapsack — include or exclude each item; Partition Equal Subset pattern"
        ],
        problems: [
          { name: "Climbing Stairs", diff: "Easy", link: "https://leetcode.com/problems/climbing-stairs/", pattern: "DP 1D" },
          { name: "Min Cost Climbing Stairs", diff: "Easy", link: "https://leetcode.com/problems/min-cost-climbing-stairs/", pattern: "DP 1D" },
          { name: "House Robber", diff: "Medium", link: "https://leetcode.com/problems/house-robber/", pattern: "DP 1D" },
          { name: "House Robber II", diff: "Medium", link: "https://leetcode.com/problems/house-robber-ii/", pattern: "DP 1D" },
          { name: "Coin Change", diff: "Medium", link: "https://leetcode.com/problems/coin-change/", pattern: "DP 1D Unbounded" },
          { name: "Coin Change II", diff: "Medium", link: "https://leetcode.com/problems/coin-change-ii/", pattern: "DP 1D Unbounded" },
          { name: "Word Break", diff: "Medium", link: "https://leetcode.com/problems/word-break/", pattern: "DP 1D" },
          { name: "Decode Ways", diff: "Medium", link: "https://leetcode.com/problems/decode-ways/", pattern: "DP 1D" },
          { name: "Longest Increasing Subsequence", diff: "Medium", link: "https://leetcode.com/problems/longest-increasing-subsequence/", pattern: "DP 1D / Binary Search" },
          { name: "Maximum Product Subarray", diff: "Medium", link: "https://leetcode.com/problems/maximum-product-subarray/", pattern: "DP 1D" },
          { name: "Partition Equal Subset Sum", diff: "Medium", link: "https://leetcode.com/problems/partition-equal-subset-sum/", pattern: "0-1 Knapsack" },
          { name: "Target Sum", diff: "Medium", link: "https://leetcode.com/problems/target-sum/", pattern: "0-1 Knapsack" },
          { name: "Unique Paths", diff: "Medium", link: "https://leetcode.com/problems/unique-paths/", pattern: "DP 2D" },
          { name: "Minimum Path Sum", diff: "Medium", link: "https://leetcode.com/problems/minimum-path-sum/", pattern: "DP 2D" },
          { name: "Longest Common Subsequence", diff: "Medium", link: "https://leetcode.com/problems/longest-common-subsequence/", pattern: "DP 2D" },
          { name: "Edit Distance", diff: "Medium", link: "https://leetcode.com/problems/edit-distance/", pattern: "DP 2D" },
          { name: "Longest Palindromic Substring", diff: "Medium", link: "https://leetcode.com/problems/longest-palindromic-substring/", pattern: "DP 2D / Expand Around Centre" },
          { name: "Longest Palindromic Subsequence", diff: "Medium", link: "https://leetcode.com/problems/longest-palindromic-subsequence/", pattern: "DP 2D" }
        ],
        stuck: "DP is just recursion + caching. If stuck: write the brute-force recursive solution first, identify repeated subproblems by drawing the call tree, then add a memo object. Converting to bottom-up is mechanical — fill a table in the order subproblems are needed.",
        moveOn: "You can solve Climbing Stairs, House Robber, Coin Change, and LCS — and explain the recurrence relation for each one out loud without notes."
      },
```

---

### 9. Phase 8 — Advanced Patterns (id: 5 → 8)
**Changes:** id 5→8, weeks "Weeks 13-16"→"Weeks 20-22"

**Replace the `id: 5` field and week field only:**
```js
      {
        id: 8, title: "Advanced Patterns", week: "Weeks 20–22", duration: "12 days",
        intro: "Heap is fast to learn. Backtracking is tricky but has one template that covers 90% of problems. Greedy and Monotonic Stack round out the patterns you'll see in FAANG interviews. After DP, these will feel manageable.",
        topics: [
          "Heap / Priority Queue — min-heap and max-heap, top K problems, 'most/least' signal",
          "Two Heaps pattern — median of stream, balance elements across two heaps",
          "Backtracking template — choose → explore → unchoose; prune invalid branches early",
          "Backtracking vs DP — backtracking generates all possibilities, DP finds the optimum",
          "Greedy — locally optimal choice leads to global optimum; prove or disprove the greedy",
          "Monotonic Stack — maintain increasing or decreasing stack for next greater/smaller element"
        ],
        problems: [
          { name: "Kth Largest Element in Array", diff: "Medium", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", pattern: "Heap" },
          { name: "Top K Frequent Elements", diff: "Medium", link: "https://leetcode.com/problems/top-k-frequent-elements/", pattern: "Heap" },
          { name: "K Closest Points to Origin", diff: "Medium", link: "https://leetcode.com/problems/k-closest-points-to-origin/", pattern: "Heap" },
          { name: "Task Scheduler", diff: "Medium", link: "https://leetcode.com/problems/task-scheduler/", pattern: "Heap / Greedy" },
          { name: "Find Median from Data Stream", diff: "Hard", link: "https://leetcode.com/problems/find-median-from-data-stream/", pattern: "Two Heaps" },
          { name: "Subsets", diff: "Medium", link: "https://leetcode.com/problems/subsets/", pattern: "Backtracking" },
          { name: "Subsets II", diff: "Medium", link: "https://leetcode.com/problems/subsets-ii/", pattern: "Backtracking" },
          { name: "Combination Sum", diff: "Medium", link: "https://leetcode.com/problems/combination-sum/", pattern: "Backtracking" },
          { name: "Combination Sum II", diff: "Medium", link: "https://leetcode.com/problems/combination-sum-ii/", pattern: "Backtracking" },
          { name: "Permutations", diff: "Medium", link: "https://leetcode.com/problems/permutations/", pattern: "Backtracking" },
          { name: "Letter Combinations of Phone Number", diff: "Medium", link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", pattern: "Backtracking" },
          { name: "Palindrome Partitioning", diff: "Medium", link: "https://leetcode.com/problems/palindrome-partitioning/", pattern: "Backtracking" },
          { name: "Jump Game", diff: "Medium", link: "https://leetcode.com/problems/jump-game/", pattern: "Greedy" },
          { name: "Jump Game II", diff: "Medium", link: "https://leetcode.com/problems/jump-game-ii/", pattern: "Greedy" },
          { name: "Gas Station", diff: "Medium", link: "https://leetcode.com/problems/gas-station/", pattern: "Greedy" },
          { name: "Hand of Straights", diff: "Medium", link: "https://leetcode.com/problems/hand-of-straights/", pattern: "Greedy / Hash Map" },
          { name: "Next Greater Element I", diff: "Easy", link: "https://leetcode.com/problems/next-greater-element-i/", pattern: "Monotonic Stack" },
          { name: "Next Greater Element II", diff: "Medium", link: "https://leetcode.com/problems/next-greater-element-ii/", pattern: "Monotonic Stack" },
          { name: "Car Fleet", diff: "Medium", link: "https://leetcode.com/problems/car-fleet/", pattern: "Monotonic Stack" },
          { name: "Largest Rectangle in Histogram", diff: "Hard", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/", pattern: "Monotonic Stack" }
        ],
        stuck: "For backtracking — there is one template: loop over choices, make a choice, recurse, undo the choice. If you're stuck, write that skeleton first and fill in the specifics. For greedy — always ask 'can I prove that taking the locally best option never blocks a better global solution?' If you can't prove it, it's probably DP.",
        moveOn: "You can solve Subsets, Combination Sum, and Permutations using the backtracking template, and explain why Jump Game is greedy and not DP."
      },
```

---

### 10. Phase 9 — Interview Ready (id: 6 → 9)
**Changes:** id 6→9, expand topics, add 3 problems, duration 20→30 days, weeks "Weeks 18-20"→"Weeks 23-27"

**Replace with:**
```js
      {
        id: 9, title: "Interview Ready", week: "Weeks 23–27", duration: "30 days",
        intro: "Stop learning new patterns. Start performing under pressure. The gap between solving at home and solving in an interview is entirely about practice under timed, observed conditions. Use these 30 days to do mock interviews, polish your behavioral stories, and review your weak spots.",
        topics: [
          "Timed mock sessions — 45 min, no hints, talk out loud. Do 1 every 2 days (aim for 10+ mocks total)",
          "System design basics — URL shortener, rate limiter, chat app. Resources: 'Grokking System Design', 'Hello Interview', 'System Design Interview by Alex Xu'",
          "Behavioural prep — prepare 5 STAR stories: (1) toughest technical challenge (2) conflict with a teammate (3) failure and what you learned (4) mentored/led someone (5) data-driven decision that impacted the business",
          "Revisit every problem you got wrong in phases 0–8. Re-solve without looking at old notes",
          "OOD practice — Design HashMap, Design Tic-Tac-Toe, Design Parking Lot — common Amazon/Microsoft style",
          "Platforms: neetcode.io, interviewing.io, Pramp, LeetCode weekly contest"
        ],
        problems: [
          { name: "Word Search", diff: "Medium", link: "https://leetcode.com/problems/word-search/", pattern: "Backtracking" },
          { name: "Merge Intervals", diff: "Medium", link: "https://leetcode.com/problems/merge-intervals/", pattern: "Intervals" },
          { name: "Meeting Rooms II", diff: "Medium", link: "https://leetcode.com/problems/meeting-rooms-ii/", pattern: "Heap / Intervals" },
          { name: "LRU Cache", diff: "Medium", link: "https://leetcode.com/problems/lru-cache/", pattern: "Hash Map + LinkedList" },
          { name: "Trapping Rain Water", diff: "Hard", link: "https://leetcode.com/problems/trapping-rain-water/", pattern: "Two Pointers" },
          { name: "First Missing Positive", diff: "Hard", link: "https://leetcode.com/problems/first-missing-positive/", pattern: "Array / Cycle Sort" },
          { name: "Insert Delete GetRandom O(1)", diff: "Medium", link: "https://leetcode.com/problems/insert-delete-getrandom-o1/", pattern: "Hash Map + Array" },
          { name: "Median of Two Sorted Arrays", diff: "Hard", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/", pattern: "Binary Search" },
          { name: "Maximum Product Subarray", diff: "Medium", link: "https://leetcode.com/problems/maximum-product-subarray/", pattern: "DP" },
          { name: "Decode Ways", diff: "Medium", link: "https://leetcode.com/problems/decode-ways/", pattern: "DP 1D" },
          { name: "Task Scheduler", diff: "Medium", link: "https://leetcode.com/problems/task-scheduler/", pattern: "Heap / Greedy" },
          { name: "Palindrome Partitioning", diff: "Medium", link: "https://leetcode.com/problems/palindrome-partitioning/", pattern: "Backtracking" },
          { name: "Serialize and Deserialize Binary Tree", diff: "Hard", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", pattern: "BFS / DFS" }
        ],
        stuck: "If mock interviews feel terrible, that's normal and correct — you're supposed to feel pressure. Do one every other day for two weeks. By day 5 it feels different. Review your recordings (yes, record yourself) to catch rambling, long silences, or unclear explanations.",
        moveOn: "You can solve most mediums in under 30 minutes while explaining your thought process out loud, and you have 5 polished STAR stories ready. Apply now."
      },
```
