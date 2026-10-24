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
- **Code practice (DSA)** — `#/code`. 15 runnable problems linked to DSA lessons: write JS in the browser, run it against tests in a Web Worker
  (infinite loops are killed after 2.5 s, large inputs expose O(n²) solutions), progressive hints, solution + complexity after your first run,
  XP for the first solve (half XP if you looked at the solution first). Problems live in `src/data/practice/dsa.ts` (`Problem` type in `types.ts`);
  the runner is `src/lib/runner.ts` + `runner.worker.js`. `{ $list: [...] }` and `{ $tree: [...] }` args become `ListNode` / `TreeNode`.
- **Global search** — `Cmd/Ctrl + K` or `/`. Searches every topic, term and description across all courses. `Enter` = read notes, `Shift+Enter` = practice, `Tab` = scope to current course.

## Content pipeline

```bash
node scripts/extract.mjs   # content/journal/**/*.html  ->  src/data/courses/*.json, index.json, search.json
```

Re-run after editing a journal. Courses are listed in `scripts/extract.mjs` (`META`); a journal needs a `chapters` array
(and optionally `LEARN`) in its main script to be picked up. Quiz questions are generated at runtime from lesson data
(`src/lib/quiz.ts`), so new topics get exercises automatically.

## Languages (i18n)

The UI ships in **English (default)** and **Hinglish (optional, switch in Settings or onboarding)**. Base lesson content
is authored in Hinglish; English overrides live in `src/data/translations/en/<course>.json` and are merged over the base
course at load time when English is active. Lessons without an override fall back to Hinglish. The choice is stored in `localStorage` under `interview-prep:lang`.

- Catalogs: `src/lib/i18n/catalog/hi.ts` and `en.ts`. `en.ts` is the source of truth for `MessageKey`;
  `hi.ts` (Hinglish) is typed as `Record<MessageKey, string>`, so a missing translation fails the build.
- API: `t('nav.learn')`, `t('lesson.progress', { n })`, `tp('review.dueOne', 'review.dueOther', n)`,
  `getLang()`, `setLang(lang)`, `useLang()`, `getLocale()` from `src/lib/i18n`.
- **Never pass user-facing text to `t()`** — add a key to both catalogs instead. Data files
  (`src/data/roadmaps.ts`, `src/lib/options.ts`) store key names (`titleKey`, `labelKey`) and stable
  English values for persistence, not display strings.
- The app remounts on language change (`<AppInner key={lang} />`), so plain `t()` calls re-render.
- SEO: `src/lib/seo.ts` syncs `<title>`, description, OG/Twitter tags and `<html lang>` with the active
  language. Static defaults in `index.html` are English for crawlers without JS.

### Translating lesson content

Content translation is incremental and resumable:

```bash
yarn translate dsa                      # translate missing DSA lessons
yarn translate dsa --lesson big-o       # one lesson
yarn translate --all                    # every course (slow; Ollama cloud rate-limits concurrency)
yarn translate:search                   # rebuild src/data/search.en.json
```

`scripts/translate-content.mjs` sends batches to Ollama (`gpt-oss:120b-cloud` by default; override with
`TRANSLATE_MODEL` / `OLLAMA_URL`), preserves HTML tags and `<code>` blocks, and writes partial overrides after
every batch. It skips lessons already in the override file unless `--force` is passed.
