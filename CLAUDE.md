# Interview-Prep: project rules (read first, every session)

These rules are strict. Follow them for every change. Update this file whenever a rule changes.

## 1. Architecture: it must feel like Duolingo

The app exists for better learning and better revision. Every screen, flow and piece of content must follow this:

- **One path, small steps.** Learning is a path of short lessons (bite-size cards, progress bar, XP, streak). Never a wall of text or a long list.
- **Basic to advanced, 0 to 100.** Content is always ordered from the simplest idea to the hardest. A learner must never meet a topic before its prerequisites.
- **Topic families stay together.** Related topics sit next to each other (for example Singly, Doubly, Circular linked list in a row), easiest first. No topic is taught in two places. If a topic needs a second pass, it is a revision or a harder lesson, not a duplicate.
- **Order is by dependency, not by when content was written.** Adding a lesson means placing it where its prerequisites end, not appending it to the end of a unit.
- **Tricky comes later.** Simple version first, tricky versions in later chapters.

## 2. Lesson flow (every concept lesson, same shape)

1. Learn: word, then sentence, then example, then code structure and methods (with return values and time cost).
2. Trace: a dry-run table.
3. Think: short MCQs with explanations.
4. Try it: small task done on the learner's own machine.
5. Takeaway: key line and common mistakes.
6. Problem: exactly ONE related problem that uses what was just learned (not the whole list).

The number and kind of tasks depend on the topic (for arrays: push, retrieve, traverse). Every problem shows its time and space complexity and has questions that help revision.

## 2b. Build lessons (machine coding and every build course)

Applies to Machine Coding (JS/React), Backend Machine Coding (Node), Build Mini React, Build Mini-opencode and the RAG builds. These are practical: the learner understands what to build and then builds it. No theory-style concept flow here.

1. Understand: what you are building, where it is used, the final result, the rules.
2. Quick check: 0 to 3 MCQs, only when the topic is asked in interviews. No questions = step skipped.
3. Build: a timer, then numbered steps. Each step says the file to create, the code to write, the command to run and the expected output, with an honest tick. Hint and full solution stay closed.

No trace tables, no 5-MCQ blocks, no in-app editor. Every expected output must come from really running the code.
Data: `src/data/build/<course-id>.json` ({course, items}, type `BuildLesson` in `src/data/build/types.ts`). Machine Coding problems in `src/data/mc/batch-*.json` are converted automatically by `src/data/build/fromMc.ts` (starter file, test.mjs, expected output). Component: `src/components/BuildFlow.tsx`.
Codebase RAG (`build-rag`, 42 lessons) is generated from a real, runnable project: `Claude outputs/codebase-rag-course/` (lesson files, commands, harness, real outputs, lesson text). Never edit expected outputs by hand; rerun the harness.

## 3. Revision: strict and spaced

- Schedule: D+1, D+3, D+7, D+21, D+56 (Leitner).
- Revision content: short MCQs on the toughest part, dry-run / predict-output questions, and re-solving the problem with an honest tick.
- Revision is shown first in the daily flow, then new lessons.

## 4. Problems

- **No in-app code editor anywhere.** The app gives only: timer, starter code, copyable tests, hints, and honest self-check ticks. The learner codes on their own machine.
- **Every DSA problem has its LeetCode link.**
- Code page (`#/code`) lists all problems with search and filters (difficulty, topic, status, sort). Link-only problems open LeetCode; "Full practice" problems open the in-app 5-step page.
- Lesson end shows one problem only. The rest live in the Code page, filtered by topic.

## 5. Language and content

- English is the default. Hinglish is optional (every UI string must exist in both `en.ts` and `hi.ts`).
- Teach with simple words, real examples and diagrams. No interviewer framing in learning text.

## 6. Technical facts

- Stack: React 19, Vite, TypeScript, Tailwind 4. Hash router. Progress in localStorage (`src/lib/store.ts`).
- DSA concept data: `src/data/dsa/concept-NN.json`. Problems: `src/data/practice/dsa.ts`, `dsa-more.ts`, catalog in `catalog.json` / `catalog.ts`.
- Before finishing any change: `npx tsc -b` must be clean and `npx vite build` must pass.
- Changing lesson order must not change lesson ids (progress and revision depend on ids).

## 7. DSA course order (final, 12 units, 90 lessons)

Source: the beginner roadmap Mayank researched (NeetCode, LeetCode, GFG). Order is by dependency. Lesson ids never change. A lesson's prerequisites must appear before it. Every lesson has a `tier` in `src/data/courses/dsa.json`: `must` (Must-do), `important`, `optional`. Every problem inherits the label of its lesson. No hide/show toggle for tiers; labels only.

1. Foundations: Big O, Space Complexity, 5-Step Framework, Arrays in JS, Objects/Map/Set, Recursion, Fibonacci
2. Arrays, Strings & Hashing: Arrays & Strings, Strings, Static vs Dynamic Arrays, Hash Map, Hash Set, Prefix Sum, Kadane's, 2D Matrix, Hash Table Impl, Boyer-Moore, String Matching
3. Two Pointers & Sliding Window: Two Pointers, Sliding Window
4. Stack, Queue & Linked Lists: Stack, Queue, Deque, Singly Linked List, Monotonic Stack, Doubly, Circular, Monotonic Stack (advanced)
5. Binary Search & Sorting: Linear Search, Binary Search, Binary Search on a Range, Binary Search on Answer, Insertion Sort, Merge Sort, Quick Sort, Dutch National Flag, Quick Select, Bucket Sort
6. Trees: Binary Tree, DFS, BFS, Height/Depth/Diameter, BST, Construct Tree, Iterative DFS, Balanced BSTs
7. Heap / Priority Queue: Heap, Heapify, Heap Variations, Two Heaps
8. Intervals, Greedy & Backtracking: Intervals, Greedy, Backtracking
9. Graphs: Representation, BFS, DFS, Grid Problems, Topological Sort, Union-Find, Dijkstra, MST, Bellman-Ford, Floyd-Warshall, Euler Path
10. Dynamic Programming: Memo vs Tabulation, Identifying DP, 1D, 2D Grid, 2D Sequence, Unbounded Knapsack, 0-1 Knapsack, State Machine, Interval DP, Bitmask DP, Digit DP
11. Tries & Bit Manipulation: Trie Structure, Trie Ops, XOR, Bit Shifts, n & (n-1)
12. Interview Preparation: Weekly Mock, Timed Mocks, Spaced Repetition, Practice Platforms, System Design, Behavioral

Problems:
- Each lesson ends with 1 to 2 hand-picked problems, easier first. They live in `src/data/practice/lessonProblems.ts` (lesson id to LeetCode slugs). Change them there.
- The Code page lists all problems in path order with search and filters (difficulty, priority, topic, status, sort).

Lessons added to the path (90 lessons now): Frequency Counting (Unit 2, after Hash Set), Fast & Slow Pointers (Unit 4, after Singly Linked List), Top-K Pattern (Unit 7, after Heap), Cycle Detection (Unit 9, after Grid Problems). Their concept data is in `src/data/dsa/concept-16.json`; text is in `courses/dsa.json` (Hinglish) with an English overlay in `translations/en/dsa.json`. Optional later: split Backtracking into Subsets / Permutations / Combinations.

Still open: arrays-2 and monotonic-stack-2 may overlap with arrays and monotonic-stack (check content). System Design and Behavioral are not DSA and may move to their own course. About 40 of the roadmap's 72 essential problems still have no full in-app data (only a LeetCode link); fill Must-do ones first.

## 8. JavaScript course order (js-mastery, 9 units, 57 lessons)

Concept course: every lesson uses the section 2 flow (Learn, Trace, Think, Try, Takeaway, then a Problem when one fits). The Problem is a LeetCode "30 Days of JavaScript" problem or a Machine Coding lesson. Data: `src/data/concepts/js-mastery-0N.json`; source and validator: `Claude outputs/js-mastery-batches/`. Predict-output answers come from really running the code with node.

1. Basics & Types: variables, datatypes, nullish, coercion, equality, destructuring, map-set, json-methods
2. Scope & Functions: scope, hoisting, execution-context, closures, iife, arrow-fn, this, call-apply-bind, hof, currying, memoization
3. Objects & Prototypes: prototype-chain, new-keyword, class, inheritance, object-methods, mixins, symbol, iterators-protocol, generators, proxy-reflect
4. Errors & Debugging: try-catch, error-types, custom-errors, debugging
5. Async JavaScript: callbacks, event-loop, microtask-macrotask, promises, async-await, promise-combinators, async-errors
6. Memory & Performance: garbage-collection, weakmap-weakset (includes WeakRef), memory-leaks, lazy-evaluation, debounce-throttle, web-workers
7. Modules & Patterns: modules, singleton, factory, observer
8. Browser APIs: dom-manipulation, event-delegation, fetch-xhr, storage, service-workers
9. Practical Utilities: regex, date-time

Removed: weakref (merged into weakmap-weakset), es6-features (its topics live in nullish, destructuring and map-set).
