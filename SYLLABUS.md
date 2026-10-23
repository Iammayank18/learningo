# BOOK — Google Frontend Engineer · Period-wise Syllabus (v3)

> **v3 — research + aapke level ke hisab se calibrate kiya gaya** (working FE dev: CSS/React aata hai, DSA kamzor).
> Sources: Google FE guide (Frontend Interview Handbook), NeetCode roadmap, Tech Interview Handbook / Grind 75,
> javascript.info, web.dev Learn CSS/HTML/Accessibility/Performance, GreatFrontEnd, MDN curriculum, roadmap.sh, react.dev.

> Har period = **ek atomic topic**. Content is book mein nahi — har row journal ke chapter par point karti hai.
> Exam ke questions `syllabus.html` mein hain aur **locked** hain — tabhi khulenge jab week ke saare topics mastered ho aur exam ka din ho.

---

## RULES

**1 — Atomic topic.** Ek period mein ek hi topic, uske subtopic alag period mein.

**2 — Din ka budget 6 unit.** Light 1 · Medium 1.5 · Heavy ▲ 2. Din ka total budget se upar gaya to **aakhir se period gir jaate hain** buffer mein — isliye zyadatar din 3 period ke hain, kuch 4 ke.

**3 — Weekly grid.** DSA 4 · JavaScript 3 · React/FE 3 · Machine Coding 3 · Browser/Web 2 · SysDesign 2 · Behavioral 1 = 18 + 2 buffer.

| | P1 | P2 | P3 | P4 |
|---|---|---|---|---|
| **Mon** | DSA | JavaScript | Browser/Web | Machine Coding |
| **Tue** | DSA | React/FE | Browser/Web | Machine Coding |
| **Wed** | DSA | JavaScript | SysDesign | *buffer* |
| **Thu** | DSA | JavaScript | React/FE | Machine Coding |
| **Fri** | React/FE | SysDesign | Behavioral | *buffer* |
| **Sat** | Spiral Revision | DSA Volume Block | Machine Coding Lab | |
| **Sun** | **EXAM** | | | |

**4 — Mastery gate.** E = bina notes bolkar explain · I = khaali file se implement · A = unseen problem pe apply · Q = 2 follow-up jhelo. Chaaron ✅ tabhi topic complete.

**5 — Lock system (strict).**

| Kya | Kab khulega |
|---|---|
| Week ka exam | Week ke **saare** topics mastered **aur** exam ka din aa gaya |
| Agla week | Pichhle week ka exam **pass** (≥ 60) |
| Agla term | Pichhle term ke chaaron week cleared |

Jaldi khatam kar loge to bhi exam apne din se pehle nahi khulega. Aur agla term tab tak dikhega hi nahi.

**6 — Spiral revision.** D+7, D+21, D+56. Har Saturday: is hafta + pichhla hafta + 3 hafte pehle.

**7 — Exam se pehle predicted score likho.** Gap hi asli data hai.

**8 — Google Doc rule.** DSA aur frontend-round ki saari practice ek plain Google Doc mein — **no autocomplete, no syntax highlighting, no run button.** Google ka asli interview isi mein hota hai. IDE mein practice karke doc mein fail hona sabse common trap hai.

**9 — Speed rule.** Ek medium 20 minute mein na aaye to woh topic **mastered nahi** hai. Google ka bar 'eventually solve' nahi, '15–20 min mein solve' hai. Isliye A-gate ka matlab hi timed solve hai.

**10 — DSA problem volume.** 16 hafte ka target **190 problems**. Har week ka apna target hai (neeche week heading mein). Sirf topic samajhna kaafi nahi — volume chahiye.

---

---

# TERM 1 — Neev: complexity, JS core, HTML/CSS, polyfills

*Week 1–4 · Exam 1–4*

## Week 1 — Complexity, Strings & HTML/CSS ki neev

*DSA problem target is week: **8***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Big-O & Space Complexity | Light | [DSA → Foundation](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Execution Context & Call Stack | **Heavy ▲** | [JS → Functions & Execution](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | DOM — tree, nodes, traversal | Medium | [CSS/HTML → Rendering & Performance](journal/frontend/css-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Polyfill — Array.prototype.map | Medium | [MachineCoding → Polyfill Core](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Arrays in JS — index, read, write | Light | [DSA → Foundation](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | Cascade, Specificity & Inheritance — interview level | Medium | [CSS/HTML → CSS Core](journal/frontend/css-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | CSSOM & computed styles | Medium | [CSS/HTML → Rendering & Performance](journal/frontend/css-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Polyfill — Array.prototype.filter | Medium | [MachineCoding → Polyfill Core](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Strings & Characters — immutability, charCode | Medium | [DSA → Core Data Structures](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | var / let / const & Hoisting | Medium | [JS → Foundations & Types](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | RADIO framework — FE system design ka structure | **Heavy ▲** | [FE SysDesign → Component Design](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | String building & reversal | Medium | [DSA → Core Data Structures → Arrays & Strings](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Primitive vs Reference Types | Medium | [JS → Foundations & Types](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | Normal Flow & Margin Collapsing | Medium | [CSS/HTML → CSS Core](journal/frontend/css-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Polyfill — Array.prototype.reduce | **Heavy ▲** | [MachineCoding → Polyfill Core](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | DOM bina framework — create, insert, mutate | Medium | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 2 | SysDesign | Requirements Gathering — functional vs non-functional | Medium | [FE SysDesign → Component Design](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | STAR Mechanics — Situation, Task, Action, Result | Medium | [Behavioral → Phase 0 — STAR Framework](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 1 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → Polyfill Core](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 1** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

## Week 2 — Two Pointers, Sliding Window & Cascade

*DSA problem target is week: **12***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Two Pointers — opposite ends | Medium | [DSA → Core Patterns → Two Pointers](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Type Coercion | Medium | [JS → Foundations & Types](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | Critical Rendering Path | **Heavy ▲** | [CSS/HTML → Rendering & Performance](journal/frontend/css-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Polyfill — call / apply / bind | **Heavy ▲** | [MachineCoding → Polyfill Core](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Two Pointers — same direction | Medium | [DSA → Core Patterns → Two Pointers](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | Flexbox — grow / shrink / basis (asli confusing part) | Medium | [CSS/HTML → Layout](journal/frontend/css-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | Reflow vs Repaint vs Composite | **Heavy ▲** | [CSS/HTML → Rendering & Performance](journal/frontend/css-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Flatten Nested Array | Medium | [MachineCoding → JavaScript Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Sliding Window — fixed size | Medium | [DSA → Core Patterns → Sliding Window](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | == vs === (Abstract vs Strict Equality) | Medium | [JS → Foundations & Types](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Component API Design | **Heavy ▲** | [FE SysDesign → Component Design](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | Sliding Window — variable size | **Heavy ▲** | [DSA → Core Patterns → Sliding Window](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | null vs undefined vs NaN | Light | [JS → Foundations & Types](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | CSS Grid — tracks, areas, auto-placement | Medium | [CSS/HTML → Layout](journal/frontend/css-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | DOM Tree Traversal — DFS, predicate se node dhundo | **Heavy ▲** | [MachineCoding → Vanilla Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | Event listeners, delegation & custom events | Medium | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 2 | SysDesign | Composition over Configuration | Medium | [FE SysDesign → Component Design](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Googliness & Leadership — 8 traits jinpe judge hoga | Medium | [Behavioral → Phase 3 → Google / Meta / LinkedIn](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 2 + Week 1 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → Polyfill Core](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 2** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

## Week 3 — Hashing, Closures & Flexbox

*DSA problem target is week: **12***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Hash Map — lookup & frequency counting | Medium | [DSA → Core Data Structures → Hash Map](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Scope Chain & Lexical Environment | Medium | [JS → Foundations & Types](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | Layout Thrashing — reads/writes batch karo | **Heavy ▲** | [CSS/HTML → Rendering & Performance](journal/frontend/css-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Polyfill — find / includes / some / every | Medium | [MachineCoding → Polyfill Core](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Hash Set — membership & dedupe | Medium | [DSA → Core Data Structures → Hash Set](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | Positioning & Stacking Contexts — z-index kyun fail hota hai | **Heavy ▲** | [CSS/HTML → Layout](journal/frontend/css-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | Core Web Vitals — LCP / INP / CLS | Medium | [Performance → Core Web Vitals](journal/devops/performance-journal.html) | | | | |
|  | 4 | Machine Coding | Implement debounce(fn, delay) | Medium | [MachineCoding → JavaScript Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Map/Set vs Object — perf & insertion order | Medium | [DSA → Foundation → Objects, Map and Set](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Closures | **Heavy ▲** | [JS → Foundations & Types](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Controlled vs Uncontrolled — API design view | Medium | [FE SysDesign → Component Design](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | Hash Table Implementation — buckets & collisions | **Heavy ▲** | [DSA → Core Data Structures](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | this Keyword | **Heavy ▲** | [JS → Functions & Execution](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | Fluid sizing — clamp() / min() / max() | Medium | [CSS/HTML → Responsive Design](journal/frontend/css-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Implement throttle(fn, delay) | Medium | [MachineCoding → JavaScript Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | Container Queries | Medium | [CSS/HTML → Layout](journal/frontend/css-mastery-journal.html) | | | | |
|  | 2 | SysDesign | State Colocation | Medium | [FE SysDesign → Component Design](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Story Bank — top 5 projects, 8 story slots map karo | Light | [Behavioral → Phase 1 → Story Research](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 3 + Week 2 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → Polyfill Core](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 3** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

## Week 4 — Stack, call/apply/bind & Grid

*DSA problem target is week: **12***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Stack — LIFO & valid parentheses | Medium | [DSA → Core Data Structures → Stack](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | call / apply / bind | Medium | [JS → Functions & Execution](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | DevTools — flame chart, paint flashing, profiling | **Heavy ▲** | [Performance → Advanced & Monitoring](journal/devops/performance-journal.html) | | | | |
|  | 4 | Machine Coding | Accordion — vanilla DOM | Medium | [MachineCoding → Vanilla Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Stack — expression evaluation & parsing | **Heavy ▲** | [DSA → Core Data Structures → Stack](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | Animation Performance — compositor-friendly | **Heavy ▲** | [CSS/HTML → Animations & Transitions](journal/frontend/css-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | Event Capturing & Bubbling | Medium | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Tabs with keyboard navigation | **Heavy ▲** | [MachineCoding → Vanilla Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Monotonic Stack | **Heavy ▲** | [DSA → Core Data Structures → Monotonic Stack](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Arrow Functions | Light | [JS → Functions & Execution](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | State Management Architecture | **Heavy ▲** | [FE SysDesign → App Architecture](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | Queue & Deque | Medium | [DSA → Core Data Structures → Queue](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Higher-Order Functions | Medium | [JS → Functions & Execution](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | Semantic HTML & Landmarks | Light | [CSS/HTML → HTML Foundations](journal/frontend/css-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Implement curry(fn) | **Heavy ▲** | [MachineCoding → JavaScript Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | Forms & Native Validation | Medium | [CSS/HTML → HTML Foundations](journal/frontend/css-mastery-journal.html) | | | | |
|  | 2 | SysDesign | Accessibility-first Design | Medium | [FE SysDesign → Component Design](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Story 1 — Biggest Technical Challenge | Medium | [Behavioral → Phase 1 → Story Writing](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 4 + Week 3 + Week 1 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → Vanilla Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 4 — TERM EXAM** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

---

# TERM 2 — Machinery: search, prototypes, async, layout, security

*Week 5–8 · Exam 5–8*

## Week 5 — Binary Search, Prototypes & Responsive

*DSA problem target is week: **12***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Linear & Binary Search — exact match | Medium | [DSA → Core Algorithms → Binary Search](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Prototype Chain & new Keyword | **Heavy ▲** | [JS → OOP & Prototypes](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | Event Delegation | Medium | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Modal with focus trap | **Heavy ▲** | [MachineCoding → Vanilla Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Binary Search — rotated sorted array | **Heavy ▲** | [DSA → Core Patterns → Binary Search](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | ARIA Roles — kab lagana, kab nahi | Medium | [CSS/HTML → HTML Foundations → Accessibility Roles & ARIA](journal/frontend/css-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | fetch / XHR — request, abort, streaming | Medium | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Toast Notification System | Medium | [MachineCoding → Vanilla Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Binary Search — on answer / search space | **Heavy ▲** | [DSA → Core Algorithms → Binary Search on a Range](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Object.create / assign / freeze / seal | Medium | [JS → OOP & Prototypes](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Keyboard Navigation Design | Medium | [FE SysDesign → Search & Input](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | Kadane's Algorithm | Medium | [DSA → Core Algorithms](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Property Descriptors, Getters & Setters | Medium | [JS → OOP & Prototypes](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | Keyboard Focus Management — tabindex & focus trap | **Heavy ▲** | [CSS/HTML → HTML Foundations](journal/frontend/css-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Implement once(fn) | Light | [MachineCoding → JavaScript Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | Accessible Forms — labels, errors, live regions | Medium | [CSS/HTML → HTML Foundations](journal/frontend/css-mastery-journal.html) | | | | |
|  | 2 | SysDesign | Loading / Error / Empty States | Light | [FE SysDesign → Data Display](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Story 2 — Handling Ambiguity (Google ka #1 trait) | Medium | [Behavioral → Phase 1 → Story Writing](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 5 + Week 4 + Week 2 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → Vanilla Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 5** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

## Week 6 — Prefix Sum, Inheritance & Animations

*DSA problem target is week: **12***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Prefix Sum — 1D | Medium | [DSA → Core Patterns → Prefix Sum](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Prototypal vs Classical Inheritance | **Heavy ▲** | [JS → OOP & Prototypes](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | HTTP methods & status codes | Light | [API Design → What is an API? (Week 0)](journal/backend/api-design-journal.html) | | | | |
|  | 4 | Machine Coding | Implement memoize(fn) | Medium | [MachineCoding → JavaScript Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Intervals — sort, merge, overlap | Medium | [DSA → Core Patterns → Intervals](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | Color, Contrast & a11y audit — axe / Lighthouse | Medium | [CSS/HTML → HTML Foundations](journal/frontend/css-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | HTTP Headers & Content Negotiation | Medium | [API Design → Request & Response Patterns](journal/backend/api-design-journal.html) | | | | |
|  | 4 | Machine Coding | Implement deepEqual(a, b) | **Heavy ▲** | [MachineCoding → JavaScript Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | 2D Matrix Traversal | Medium | [DSA → Core Data Structures](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | ES6 Classes & static members | Medium | [JS → OOP & Prototypes](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Optimistic Updates | **Heavy ▲** | [FE SysDesign → Data Display](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | Matrix Rotation — in place | **Heavy ▲** | [DSA → Core Data Structures → 2D Matrix Traversal](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Mixins & Composition | Medium | [JS → OOP & Prototypes](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | Vanilla component — state manage karna bina framework | **Heavy ▲** | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Implement groupBy(array, key) | Medium | [MachineCoding → JavaScript Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | Vanilla component — teardown & memory leaks | **Heavy ▲** | [JS → Memory & Performance](journal/frontend/js-mastery-journal.html) | | | | |
|  | 2 | SysDesign | Pagination vs Infinite Scroll | Medium | [FE SysDesign → Data Display](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Story 3 — Ownership: jo kaam tumhara tha hi nahi | Medium | [Behavioral → Phase 1 → Story Writing](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 6 + Week 5 + Week 3 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → JavaScript Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 6** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

## Week 7 — Sorting, HOF & Forms

*DSA problem target is week: **14***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Sorting fundamentals & sort() comparator gotchas | Medium | [DSA → Core Algorithms](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Currying & Partial Application | Medium | [JS → Functions & Execution](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | Same Origin Policy | Medium | [Security → Web Security](journal/devops/security-journal.html) | | | | |
|  | 4 | Machine Coding | Star Rating — event delegation | Medium | [MachineCoding → Vanilla Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Merge Sort | Medium | [DSA → Core Algorithms](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | React — State & Re-renders, bolkar samjhao | Medium | [React → Core Fundamentals](journal/frontend/react-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | CORS — preflight, credentials | **Heavy ▲** | [API Design → API Security & Governance](journal/backend/api-design-journal.html) | | | | |
|  | 4 | Machine Coding | Implement pipe() and compose() | Medium | [MachineCoding → JavaScript Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Quick Select — Kth largest / Top-K | **Heavy ▲** | [DSA → Core Algorithms](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Memoization | Medium | [JS → Functions & Execution](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Virtualization / Windowing | **Heavy ▲** | [FE SysDesign → Data Display](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | Timed Practice 1 — arrays, strings, window, stack | **Heavy ▲** | [DSA → Interview Ready → Timed Mock Sessions](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Debounce & Throttle | Medium | [JS → Memory & Performance](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | React — Lists, Keys & Reconciliation | Medium | [React → Core Fundamentals](journal/frontend/react-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Deep Clone an Object | **Heavy ▲** | [MachineCoding → JavaScript Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | React — Controlled vs Uncontrolled forms | Medium | [React → Core Fundamentals](journal/frontend/react-mastery-journal.html) | | | | |
|  | 2 | SysDesign | Data Normalization | **Heavy ▲** | [FE SysDesign → Data Display](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Story 4 — Conflict / manager se disagree | Medium | [Behavioral → Phase 1 → Story Writing](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 7 + Week 6 + Week 4 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → Vanilla Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 7** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

## Week 8 — Linked List, Event Loop & Accessibility

*DSA problem target is week: **12***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Singly Linked List — traverse & insert | Medium | [DSA → Core Data Structures → Singly Linked List](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Array methods & sort() comparator gotchas | Medium | [JS → Modern JS & Utilities](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | XSS — reflected, stored, DOM-based | **Heavy ▲** | [Security → Web Security](journal/devops/security-journal.html) | | | | |
|  | 4 | Machine Coding | Build Promise from scratch | **Heavy ▲** | [MachineCoding → JavaScript Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Singly Linked List — reverse | Medium | [DSA → Core Data Structures → Singly Linked List](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | React — useEffect deps & cleanup | **Heavy ▲** | [React → Hooks — Deep Dive](journal/frontend/react-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | CSRF & SameSite cookies | **Heavy ▲** | [Security → Web Security](journal/devops/security-journal.html) | | | | |
|  | 4 | Machine Coding | Implement Promise.all / race / allSettled / any | **Heavy ▲** | [MachineCoding → JavaScript Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Fast & Slow Pointer — cycle & middle | Medium | [DSA → Core Data Structures → Linked List](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Event Loop — call stack & queues | **Heavy ▲** | [JS → Async JavaScript](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Table Design Patterns | Medium | [FE SysDesign → Data Display](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | LRU Cache — DLL + HashMap design | **Heavy ▲** | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Microtasks vs Macrotasks | **Heavy ▲** | [JS → Async JavaScript](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | React — useRef & DOM interop | Medium | [React → Hooks — Deep Dive](journal/frontend/react-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Async Concurrency Limiter | **Heavy ▲** | [MachineCoding → JavaScript Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | React — Custom Hooks | Medium | [React → Hooks — Deep Dive](journal/frontend/react-mastery-journal.html) | | | | |
|  | 2 | SysDesign | SPA Routing Architecture | Medium | [FE SysDesign → App Architecture](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Story 5 — Failure + intellectual humility | Medium | [Behavioral → Phase 1 → Story Writing](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 8 + Week 7 + Week 5 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → JavaScript Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 8 — TERM EXAM** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

---

# TERM 3 — Depth: trees, graphs, React, UI components, system design

*Week 9–12 · Exam 9–12*

## Week 9 — Recursion, Trees, Promises & React shuru

*DSA problem target is week: **12***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Recursion — base case & call stack | **Heavy ▲** | [DSA → Foundation → Recursion](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Try / Catch / Finally & Custom Error Classes | Medium | [JS → Error Handling & Debugging](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | Content Security Policy (CSP) | **Heavy ▲** | [Security → Web Security](journal/devops/security-journal.html) | | | | |
|  | 4 | Machine Coding | Retry with exponential backoff | Medium | [MachineCoding → JavaScript Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Recursion drills — iterative vs recursive, timed | Medium | [DSA → Interview Ready → Timed Mock Sessions](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | React — useReducer & Context, practical | Medium | [React → State Management](journal/frontend/react-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | Clickjacking & X-Frame-Options | Medium | [Security → Web Security](journal/devops/security-journal.html) | | | | |
|  | 4 | Machine Coding | Promise with timeout | Medium | [MachineCoding → JavaScript Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Binary Tree — structure & DFS pre/in/post | **Heavy ▲** | [DSA → Trees](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Callbacks & Callback Hell | Light | [JS → Async JavaScript](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Auth & Authorization — frontend side | **Heavy ▲** | [FE SysDesign → App Architecture](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | BFS — level order traversal | Medium | [DSA → Trees](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Promises — states & then chain | **Heavy ▲** | [JS → Async JavaScript](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | React — Error Boundaries | Medium | [React → Patterns & Architecture](journal/frontend/react-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Build EventEmitter (on / off / emit / once) | Medium | [MachineCoding → JavaScript Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | React — memo / useMemo / useCallback: kab aur kab nahi | **Heavy ▲** | [React → Performance Optimization](journal/frontend/react-mastery-journal.html) | | | | |
|  | 2 | SysDesign | WebSockets vs SSE vs Polling | **Heavy ▲** | [FE SysDesign → Real-Time Features](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Story 6 — Data-Driven Decision | Medium | [Behavioral → Phase 1 → Story Writing](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 9 + Week 8 + Week 6 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → JavaScript Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 9** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

## Week 10 — BST, Trie, async/await & React state

*DSA problem target is week: **14***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Binary Search Tree | Medium | [DSA → Trees](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Promise Combinators — all / allSettled / race / any | Medium | [JS → Async JavaScript](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | Cookies — attributes, HttpOnly, Secure | Medium | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | LRU Cache — O(1) get & put | **Heavy ▲** | [MachineCoding → JavaScript Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Height, Depth, Diameter | Medium | [DSA → Trees](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | React — Code splitting & Suspense | Medium | [React → Performance Optimization](journal/frontend/react-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | localStorage & sessionStorage | Light | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Polyfill — Object.create | Medium | [MachineCoding → Polyfill Core](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Trie — insert, search, prefix | Medium | [DSA → Tries & Bit Manipulation](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | async / await | Medium | [JS → Async JavaScript](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Reconnection & Offline Strategy | **Heavy ▲** | [FE SysDesign → Real-Time Features](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | Timed Practice 2 — trees, linked list, recursion | **Heavy ▲** | [DSA → Interview Ready → Timed Mock Sessions](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Async Error Handling — unhandled rejections | Medium | [JS → Error Handling & Debugging](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | TypeScript — type vs interface & generics | Medium | [TypeScript → Core Type System](journal/frontend/typescript-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Polyfill — Object.assign | Medium | [MachineCoding → Polyfill Core](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | TypeScript — typing props, hooks & DOM events | **Heavy ▲** | [TypeScript → TypeScript with React](journal/frontend/typescript-mastery-journal.html) | | | | |
|  | 2 | SysDesign | Notification Architecture | Medium | [FE SysDesign → Real-Time Features](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Story 7 — Influencing Without Authority | Medium | [Behavioral → Phase 1 → Story Writing](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 10 + Week 9 + Week 7 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → JavaScript Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 10** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

## Week 11 — Heap, Backtracking, Generators & Hooks

*DSA problem target is week: **12***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Heap / Priority Queue — usage & Top-K | **Heavy ▲** | [DSA → Advanced Patterns → Heap](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Generators & Iterators | **Heavy ▲** | [JS → Async JavaScript](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | IndexedDB | Medium | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Autocomplete with debounce + keyboard | **Heavy ▲** | [MachineCoding → Vanilla Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Backtracking — subsets vs combinations | **Heavy ▲** | [DSA → Advanced Patterns → Backtracking](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | Testing — RTL philosophy & queries | Medium | [Testing → React Testing Library](journal/devops/testing-journal.html) | | | | |
|  | 3 | Browser/Web | IntersectionObserver & MutationObserver | Medium | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Infinite Scroll — IntersectionObserver | Medium | [MachineCoding → Vanilla Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Backtracking — permutations | Medium | [DSA → Advanced Patterns → Backtracking](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Iterable & Iterator Protocol | Medium | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Client-side caching — SWR, dedup, invalidation | **Heavy ▲** | [FE SysDesign → App Architecture](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | K-way Merge — heap based | **Heavy ▲** | [DSA → Advanced Patterns](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Destructuring & Spread / Rest | Light | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | Testing — vanilla DOM code | Medium | [Testing → Vitest Fundamentals](journal/devops/testing-journal.html) | | | | |
|  | 4 | Machine Coding | Client-side Pagination | Medium | [MachineCoding → Vanilla Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | FE Round Drill 1 — 45 min, plain doc, no autocomplete | **Heavy ▲** | [MachineCoding → Vanilla Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
|  | 2 | SysDesign | Performance Budget & Monitoring | Medium | [FE SysDesign → App Architecture](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Story 8 — Quality bar uthana / process improvement | Medium | [Behavioral → Phase 1 → Story Writing](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 11 + Week 10 + Week 8 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → Vanilla Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 11** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

## Week 12 — Graphs, Collections & React architecture

*DSA problem target is week: **12***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Graph Representation & BFS | Medium | [DSA → Graphs](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Map & Set (incl. WeakMap / WeakSet) | Medium | [JS → Modern JS & Utilities](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | HTTP Caching — Cache-Control | **Heavy ▲** | [API Design → Performance & Reliability](journal/backend/api-design-journal.html) | | | | |
|  | 4 | Machine Coding | Sortable + Filterable Data Table | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Graph DFS | Medium | [DSA → Graphs](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | CSS Layout Challenge — 30 min timed | Medium | [CSS/HTML → Layout](journal/frontend/css-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | ETag & Conditional Requests | Medium | [API Design → Performance & Reliability](journal/backend/api-design-journal.html) | | | | |
|  | 4 | Machine Coding | Nested Comments — Reddit style | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Grid Problems — islands, flood fill | Medium | [DSA → Graphs](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | ES Modules vs CommonJS | Medium | [JS → Design Patterns & Modules](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Analytics / metrics SDK design | **Heavy ▲** | [FE SysDesign → App Architecture](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | Topological Sort | **Heavy ▲** | [DSA → Graphs](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Garbage Collection & Memory Leaks | **Heavy ▲** | [JS → Memory & Performance](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | FE Round Drill 2 — 45 min, plain doc | **Heavy ▲** | [MachineCoding → Vanilla Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
|  | 4 | Machine Coding | Virtual Scroll List | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | FE Round Drill 3 — 45 min, plain doc | **Heavy ▲** | [MachineCoding → Vanilla Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
|  | 2 | SysDesign | REST vs GraphQL & BFF pattern for frontend | Medium | [API Design → Performance & Reliability](journal/backend/api-design-journal.html) | | | | |
|  | 3 | Behavioral | Story Calibration — har story mein quantified result | Medium | [Behavioral → Phase 1 → Story Calibration](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 12 + Week 11 + Week 9 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 12 — TERM EXAM** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

---

# TERM 4 — Advanced & Google Simulation

*Week 13–16 · Exam 13–16*

## Week 13 — Greedy vs DP, Regex & React performance

*DSA problem target is week: **10***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Greedy vs DP — kaunsa kab | **Heavy ▲** | [DSA → Advanced Patterns → Greedy](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Deep Clone & structuredClone | Medium | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | DNS + TCP handshake — latency & RTT | Medium | [WebProtocols → Networking Foundations](journal/cs-fundamentals/web-protocols-journal.html) | | | | |
|  | 4 | Machine Coding | File Explorer — folder tree | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Interval Scheduling — greedy | Medium | [DSA → Core Patterns → Intervals](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | A11y audit drill — ek toota component fix karo | Medium | [CSS/HTML → HTML Foundations](journal/frontend/css-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | HTTPS & TLS handshake | **Heavy ▲** | [WebProtocols → HTTP Protocol Evolution](journal/cs-fundamentals/web-protocols-journal.html) | | | | |
|  | 4 | Machine Coding | Drag-and-sort list — vanilla | **Heavy ▲** | [MachineCoding → Vanilla Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Memoization vs Tabulation | **Heavy ▲** | [DSA → Dynamic Programming](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | JSON — parse, stringify, reviver, replacer | Medium | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Design a Data Table | **Heavy ▲** | [FE SysDesign → Design a Data Table](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | Identifying DP — state & transition | **Heavy ▲** | [DSA → Dynamic Programming](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Regular Expressions — groups, lookaheads | **Heavy ▲** | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | FE Round Drill 4 — 45 min, plain doc | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
|  | 4 | Machine Coding | Todo App — vanilla DOM + localStorage | Medium | [MachineCoding → Vanilla Beginner](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | FE Round Drill 5 — 45 min, plain doc | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
|  | 2 | SysDesign | Design an Autocomplete / Typeahead | **Heavy ▲** | [FE SysDesign → Design an Autocomplete / Typeahead](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Delivery — 90–120 second answer, result pehle | Medium | [Behavioral → Phase 4 → Delivery Skills](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 13 + Week 12 + Week 10 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 13** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

## Week 14 — DP patterns, Proxy & TypeScript

*DSA problem target is week: **12***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | 1D DP — climbing stairs, house robber | Medium | [DSA → Dynamic Programming](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Observer / PubSub Pattern | Medium | [JS → Design Patterns & Modules](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | HTTP/2 & HTTP/3 — multiplexing, QUIC, kab kya | **Heavy ▲** | [WebProtocols → HTTP Protocol Evolution](journal/cs-fundamentals/web-protocols-journal.html) | | | | |
|  | 4 | Machine Coding | Kanban Board — drag & drop | **Heavy ▲** | [MachineCoding → React Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Unbounded Knapsack — coin change | **Heavy ▲** | [DSA → Dynamic Programming](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | Explain-out-loud drill — CSS/React concepts bolkar | Medium | [React → (progress log se chuno)](journal/frontend/react-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | CDN — edge caching, origin shield | Medium | [WebProtocols → Load Balancing & Proxies](journal/cs-fundamentals/web-protocols-journal.html) | | | | |
|  | 4 | Machine Coding | Undo / Redo — command pattern | **Heavy ▲** | [MachineCoding → React Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | 2D Grid DP — unique paths, min path sum | Medium | [DSA → Dynamic Programming](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Proxy & Reflect | **Heavy ▲** | [JS → Design Patterns & Modules](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Design a Real-Time Chat UI | **Heavy ▲** | [FE SysDesign → Design a Real-Time Chat UI](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | 0-1 Knapsack | **Heavy ▲** | [DSA → Dynamic Programming](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Debugging — console, debugger, DevTools | Light | [JS → Error Handling & Debugging](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | FE Round Drill 6 — 45 min, plain doc | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
|  | 4 | Machine Coding | Form builder with validation — vanilla | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | FE Round Drill 7 — 45 min, plain doc | **Heavy ▲** | [MachineCoding → React Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
|  | 2 | SysDesign | Design a Social Media Feed | **Heavy ▲** | [FE SysDesign → Design a Social Media Feed](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Handling Follow-Ups — 'kya alag karte?' | Medium | [Behavioral → Phase 4 → Handling Follow-Ups](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 14 + Week 13 + Week 11 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → React Medium](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 14** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

## Week 15 — Pitfalls, Drills & Testing

*DSA problem target is week: **14***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | JS interview pitfalls — precision, sort, closures in recursion | Medium | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Drill — closures + prototype + this combo | **Heavy ▲** | [JS → Foundations & Types](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | Resource hints & image optimization — preload, srcset, lazy | Medium | [Performance → Images & Assets](journal/devops/performance-journal.html) | | | | |
|  | 4 | Machine Coding | Serialize / deserialize a DOM tree | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Design a Data Structure — Min Stack, Design HashMap | Medium | [DSA → Core Data Structures](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | FE Round Drill 8 — 45 min, plain doc | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
|  | 3 | Browser/Web | Compression & bundle delivery — gzip, brotli | Medium | [Performance → Bundle & Network](journal/devops/performance-journal.html) | | | | |
|  | 4 | Machine Coding | Prototype-based widget — bina framework | **Heavy ▲** | [MachineCoding → JavaScript Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Timed Practice 3 — graph & DP mediums | **Heavy ▲** | [DSA → Interview Ready → Timed Mock Sessions](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Drill — async / promise / event-loop combo | **Heavy ▲** | [JS → Async JavaScript](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Design a File Upload System | **Heavy ▲** | [FE SysDesign → Design a File Upload System](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | Weak-area targeted drill | Medium | [DSA → Interview Ready → Spaced Repetition](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Drill — DOM API bolkar samjhana | Medium | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | FE Round Drill 9 — 45 min, plain doc | **Heavy ▲** | [MachineCoding → React Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
|  | 4 | Machine Coding | Timed Mock 1 — 45 min, unseen | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | Spiral Revision — CSS / React weak topics | Medium | [CSS/HTML → (progress log se chuno)](journal/frontend/css-mastery-journal.html) | | | | |
|  | 2 | SysDesign | Design a Video Player | **Heavy ▲** | [FE SysDesign → Design a Video Player](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | "Tell me about yourself" + "Why Google" — 2 min pitch | Medium | [Behavioral → Phase 0 / Phase 3](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 15 + Week 14 + Week 12 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 15** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

## Week 16 — Mock Week — Google Simulation

*DSA problem target is week: **10***

| Day | P | Subject | Topic | Weight | Chapter | E | I | A | Q |
|---|---|---|---|---|---|---|---|---|---|
| **Mon** | 1 | DSA | Full Mock 1 — 45 min, 2 mediums | **Heavy ▲** | [DSA → Interview Ready → Timed Mock Sessions](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Spiral Revision — JS weak topics (1) | Medium | [JS → (progress log se chuno)](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | Browser/Web | Web Workers | **Heavy ▲** | [JS → Memory & Performance](journal/frontend/js-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Timed Mock 2 — 45 min, unseen | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Tue** | 1 | DSA | Full Mock 2 — 45 min, 2 mediums | **Heavy ▲** | [DSA → Interview Ready → Timed Mock Sessions](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | React/FE | Google FE Mock 1 — 45 min, plain doc | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
|  | 3 | Browser/Web | Service Workers, Cache API & PWA basics | **Heavy ▲** | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 4 | Machine Coding | Timed Mock 3 — 45 min, unseen | **Heavy ▲** | [MachineCoding → React Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Wed** | 1 | DSA | Spaced repetition — arrays, hashing, pointers, window, stack | Medium | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | Spiral Revision — JS weak topics (2) | Medium | [JS → (progress log se chuno)](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | SysDesign | Analytics SDK mock — poora RADIO run | **Heavy ▲** | [FE SysDesign → App Architecture](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Thu** | 1 | DSA | Spaced repetition — trees, graphs, DP | Medium | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
|  | 2 | JavaScript | JS Mock — 30 min rapid fire | **Heavy ▲** | [JS → Advanced & Browser APIs](journal/frontend/js-mastery-journal.html) | | | | |
|  | 3 | React/FE | Google FE Mock 2 — 45 min, plain doc | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
|  | 4 | Machine Coding | Timed Mock 4 — cumulative, examiner style | **Heavy ▲** | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Fri** | 1 | React/FE | Google FE Mock 3 — 45 min, plain doc | **Heavy ▲** | [MachineCoding → React Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
|  | 2 | SysDesign | Timed synthesis mock — 35 min, apni choice | **Heavy ▲** | [FE SysDesign → Component Design](journal/frontend/frontend-system-design-journal.html) | | | | |
|  | 3 | Behavioral | Behavioral Mock — 8 stories, timed, recorded | **Heavy ▲** | [Behavioral → Phase 4 → Mock Practice](behavioral-roadmap.html) | | | | |
|  | 4 | *buffer* | *pending topic ya extra practice* | — | — | | | | |
| **Sat** | 1 | Revision | Spiral: Week 16 + Week 15 + Week 13 ke topics | — | (progress log se) | | | | |
| | 2 | DSA Lab | DSA volume block — is hafte ke pattern se 3 problem + 1 purana, **timed** | — | [DSA → Interview Ready](journal/cs-fundamentals/dsa-journal.html) | | | | |
| | 3 | MC Lab | Is hafte ke 3 MC problems mein se 1, **45 min timed, bina notes** | — | [MachineCoding → Vanilla Advanced](journal/machine-coding/machine-coding-journal.html) | | | | |
| **Sun** | — | Exam | **EXAM 16 — FINAL GOOGLE SIMULATION** · 🔒 questions `syllabus.html` mein, locked | — | — | | | | |

---

## CHAPTER INDEX

| Journal | Path |
|---|---|
| DSA | [dsa-journal.html](journal/cs-fundamentals/dsa-journal.html) |
| JS | [js-mastery-journal.html](journal/frontend/js-mastery-journal.html) |
| React | [react-mastery-journal.html](journal/frontend/react-mastery-journal.html) |
| CSS/HTML | [css-mastery-journal.html](journal/frontend/css-mastery-journal.html) |
| TypeScript | [typescript-mastery-journal.html](journal/frontend/typescript-mastery-journal.html) |
| Testing | [testing-journal.html](journal/devops/testing-journal.html) |
| MachineCoding | [machine-coding-journal.html](journal/machine-coding/machine-coding-journal.html) |
| FE SysDesign | [frontend-system-design-journal.html](journal/frontend/frontend-system-design-journal.html) |
| WebProtocols | [web-protocols-journal.html](journal/cs-fundamentals/web-protocols-journal.html) |
| API Design | [api-design-journal.html](journal/backend/api-design-journal.html) |
| Security | [security-journal.html](journal/devops/security-journal.html) |
| Performance | [performance-journal.html](journal/devops/performance-journal.html) |
| Behavioral | [behavioral-roadmap.html](behavioral-roadmap.html) |

---

## KYA-KYA BADLA — aur kyun

### v1 → v2 (research ke baad)

| Badla | Kyun |
|---|---|
| React 31 slot → 15 | Google ka FE round framework-agnostic hai; Fiber/render-phase/React Query reported *over-studied* |
| Machine Coding: polyfill 30 → 14, vanilla UI W11 → W4 | Google ka round hi hai *live vanilla UI banao* |
| OS + DB ke 6 slot hataye | Google FE loop mein report hi nahi hote |
| Web security W14 → W8 | Google ki apni guide mein XSS/XSRF naam lekar likha hai |
| DSA: Dijkstra, Union-Find, Bit Manipulation cut; LRU, rotated search, Top-K, K-way merge, combinations, Min Stack add | NeetCode/Grind-75 core jo v1 mein tha hi nahi |
| JS: Execution Context W1 pe, Prototypes W5 pe, try/catch async se pehle | Prerequisite violations theek kiye |

### v2 → v3 (aapke level ke hisab se + adversarial audit)

| Badla | Kyun |
|---|---|
| **CSS/HTML 24 slot → 14** — box model, selectors, units, media query basics, pseudo-classes cut | Aap working FE dev ho, ye aata hai. Sirf woh bache jo React devs ka aksar kamzor hota hai: stacking context, container queries, focus management, ARIA, accessible forms, compositor animation |
| **15 slot timed FE-round drills** add (Week 11–16) | Google ka FE round *performance* hai, knowledge nahi. Aapki taakat ko speed mein badalna hai |
| **4 slot vanilla-DOM rustiness** add | React dev ka sabse bada blind spot — bina framework DOM banana, delegation, state, teardown |
| **DSA problem volume target: 190 problems**, har week ka apna number | v2 mein volume ka koi target hi nahi tha. Grind 75 = 75, NeetCode 150 = 150. Sirf topic padhna kaafi nahi |
| **Saturday ab 3 block** — spiral revision + **DSA volume block** + MC lab | DSA weekly touch 4 se 6 ho gaya, bina aapka weekday grid chhede |
| **Day budget 4 → 6 unit** (arithmetic fix) | Mera v1/v2 ka rule galat tha: 18 sessions × avg 1.68 = ~30 unit/week, yaani 6 unit/din. 4 likhna meri galti thi |
| **Google Doc rule** add | Google ka interview plain doc mein hota hai — no autocomplete, no highlighting. IDE mein practice karna sabse common trap hai |
| **Speed rule** add — medium 20 min mein na aaye to mastered nahi | Google ka bar speed hai, aur yahi sabse likely rejection reason hai |

---

## JO ABHI BHI RISK HAI — honest

| Risk | Baat |
|---|---|
| **DSA 22%% study time, ~50%% loop weight** | Aapne DSA 4/week fix rakha. Phone screen aur 2 onsite round pure DSA hain aur wahan frontend ki taakat ka credit nahi milta. Saturday block se weekly touch 6 ho gaya, lekin structural mismatch abhi bhi hai. Agar Week 4 ke exam mein DSA section 60%% se neeche aaye — DSA 5 ya 6 sessions/week karna padega. |
| **Content ≈ capacity, buffer thoda kam** | 30.3 unit/week content vs 30 unit capacity. ~39 period buffer mein girenge, buffer capacity 32. Yaani 16 hafte mein ~7 topic week-extension mein jayenge. Ye plan hai, failure nahi — lekin jaan lo. |
| **System design round inconsistent hai** | Google FE ka design round kabhi frontend-specific hota hai kabhi generic backend HLD — reports conflict karti hain. Plan sirf frontend-side cover karta hai. Agar backend HLD aaya to woh gap hai. |
