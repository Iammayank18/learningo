# Interview Prep — Duolingo-style React app

Vite + React 19 + TypeScript. Content comes from the existing HTML journals (`content/journal/**`), extracted into JSON.

## Run

```bash
yarn install
yarn dev            # http://localhost:5173
yarn build          # type-check + production build
```

## Features

- **Learn path** — zig-zag skill path per course, units = journal chapters, lessons = topics. Start / practice / read notes from any node.
- **Lessons** — story cards (concept → analogy → why + diagram → code → trade-offs → gotchas), then a quiz (MCQ, match-the-pairs, interview-question recall). Wrong answers are re-queued once.
- **XP, levels, streak, daily goal** — stored in `localStorage` (Progress tab can export / import / reset).
- **Spaced-repetition revision** — a completed lesson comes back after 1 → 3 → 7 → 21 → 56 days; correct = crown up, wrong = crown down.
- **Global search** — `Cmd/Ctrl + K` or `/`. Searches every topic, term and description across all courses. `Enter` = read notes, `Shift+Enter` = practice, `Tab` = scope to current course.

## Content pipeline

```bash
node scripts/extract.mjs   # content/journal/**/*.html  ->  src/data/courses/*.json, index.json, search.json
```

Re-run after editing a journal. Courses are listed in `scripts/extract.mjs` (`META`); a journal needs a `chapters` array
(and optionally `LEARN`) in its main script to be picked up. Quiz questions are generated at runtime from lesson data
(`src/lib/quiz.ts`), so new topics get exercises automatically.
