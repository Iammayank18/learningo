#!/usr/bin/env node
/**
 * Incrementally translate Hinglish lesson content into English with Ollama.
 * Writes partial overrides to src/data/translations/en/<course>.json, so the
 * app can fall back to Hinglish for any lesson that is not translated yet.
 *
 *   node scripts/translate-content.mjs dsa
 *   node scripts/translate-content.mjs dsa --lesson big-o --force
 *   node scripts/translate-content.mjs --all --concurrency 1
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const COURSES = path.join(ROOT, 'src/data/courses')
const OUT = path.join(ROOT, 'src/data/translations/en')
const OLLAMA = process.env.OLLAMA_URL || 'http://localhost:11434'
const MODEL = process.env.TRANSLATE_MODEL || 'gpt-oss:120b-cloud'

const args = process.argv.slice(2)
function argValue(name) {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : undefined
}
const force = args.includes('--force')
const dry = args.includes('--dry')
const all = args.includes('--all')
const batchSize = Number(argValue('--batch') || 2)
const concurrency = Number(argValue('--concurrency') || 1)
const limit = Number(argValue('--limit') || 0)
const lessonFilter = argValue('--lesson')
const optionValues = new Set(['--batch', '--concurrency', '--limit', '--lesson', '--model'].map(argValue).filter(Boolean))
const ids = all
  ? fs.readdirSync(COURSES).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5))
  : args.filter((a) => !a.startsWith('--') && !optionValues.has(a))

if (!ids.length) {
  console.error('Usage: node scripts/translate-content.mjs <course-id...> | --all')
  process.exit(1)
}

const SYSTEM = `You are a professional Hinglish-to-English translator for a technical interview-prep app.
Rules:
1. Translate every translatable string from Hinglish (Hindi in Latin script) into clear, natural English.
2. Keep the friendly, direct, concise tone. Do not add or remove facts, examples, or advice.
3. Leave already-English text unchanged. Keep technical terms, product names, and identifiers in English. Convert Indian numbering (lakh, crore) to international formatting (100,000, 10,000,000) and use standard English grammar.
4. Preserve HTML tags, attributes, entities and emojis exactly. Never translate or remove text inside <code> or <pre>. Do not add or remove tags.
5. Keep arrays the same length and order. Keep ids and keys unchanged.
6. The output must be 100% English. Do not leave Hindi/Hinglish words such as hai, hain, ka, ki, ke, ko, mein, nahi, kya, kyun, aur, ya, par, se, jo, hota, karta, leta, deta, wala, chahiye. Translate them.
7. Return ONLY valid JSON with exactly the same shape as the input. No markdown fences, no commentary.`

const STR_FIELDS = ['name', 'desc', 'q', 'qsub', 'what', 'analogy', 'why', 'answer']
const ARR_FIELDS = ['pros', 'cons', 'gotchas']
const PAIR_FIELDS = ['terms', 'where']
const QA_FIELD = 'qa'

const TRANSLATABLE = [...STR_FIELDS, ...ARR_FIELDS, ...PAIR_FIELDS, QA_FIELD, 'visualCap']
const HINGLISH = /\b(hai|hain|nahi|nahin|kya|kyun|kyu|aap|tum|hum|karta|karti|karte|hota|hoti|hote|leta|leti|deta|deti|sakta|sakti|sakte|chahiye|liye|wala|wali|bahut|thoda|abhi|phir|lekin|magar|aur|ya|jo|mein|ka|ki|ke|ko|se|par|ek|bhi|toh|wahi|jaise|saath|bina|saare|koi|kuch|yahan|wahan|kaise|kaun|kitna|kitne|zyada|accha|matlab|yaani|dobara|pehle|baad|andar|bahar|upar|neeche|aage|peeche|raha|rahi|rahe|gaya|gayi|gaye|kiya|kiye|kar|karo|hoga|hogi|honge|tha|thi|the|isliye|kyunki|jab|tab|agar|sirf|bas|bilkul|sab|har|hazaar|lakh|crore)\b/i

function needsTranslation(v) {
  if (typeof v === 'string') return HINGLISH.test(v.replace(/<[^>]+>/g, ' '))
  if (Array.isArray(v)) return v.some((x) => needsTranslation(Array.isArray(x) ? x.join(' ') : x))
  if (v && typeof v === 'object') return Object.values(v).some(needsTranslation)
  return false
}

function payloadFor(lessons) {
  return lessons.map((l) => {
    const o = { id: l.id }
    for (const f of STR_FIELDS) if (l[f] && needsTranslation(l[f])) o[f] = l[f]
    for (const f of ARR_FIELDS) if (l[f]?.length && needsTranslation(l[f])) o[f] = l[f]
    for (const f of PAIR_FIELDS) if (l[f]?.length && needsTranslation(l[f])) o[f] = l[f]
    if (l[QA_FIELD]?.length && needsTranslation(l[QA_FIELD])) o[QA_FIELD] = l[QA_FIELD]
    if (l.visual?.cap && needsTranslation(l.visual.cap)) o.visualCap = l.visual.cap
    return o
  })
}

const normTag = (t) => t.replace(/^<\s*\/?\s*/, '').replace(/\s*\/?>$/, '').toLowerCase()
  .replace(/^strong$/, 'b').replace(/^em$/, 'i').replace(/^h[1-6]$/, 'h')
function tagSeq(s) {
  return [...String(s).matchAll(/<\/?([a-zA-Z][\w-]*)\b[^>]*>/g)].map((m) => (m[0].startsWith('</') ? '/' : '') + normTag(m[1]))
}
function sameTags(a, b) {
  const x = tagSeq(a), y = tagSeq(b)
  return x.length === y.length && x.every((t, i) => t === y[i])
}

function valid(input, output) {
  if (!Array.isArray(output) || output.length !== input.length) return false
  for (let i = 0; i < input.length; i++) {
    const a = input[i], b = output[i]
    if (!b || b.id !== a.id) return false
    for (const f of STR_FIELDS) {
      if (a[f] && (typeof b[f] !== 'string' || !b[f].trim())) return false
    }
    for (const f of ARR_FIELDS) if (a[f] && (!Array.isArray(b[f]) || b[f].length !== a[f].length)) return false
    for (const f of PAIR_FIELDS) if (a[f] && (!Array.isArray(b[f]) || b[f].length !== a[f].length || b[f].some((p) => !Array.isArray(p) || p.length !== 2))) return false
    if (a[QA_FIELD] && (!Array.isArray(b[QA_FIELD]) || b[QA_FIELD].length !== a[QA_FIELD].length)) return false
  }
  return true
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function parseLoose(text) {
  try { return JSON.parse(text) } catch { /* try extraction */ }
  const start = text.search(/[\[{]/)
  if (start < 0) throw new Error('no JSON value')
  let depth = 0, inStr = false, esc = false
  for (let i = start; i < text.length; i++) {
    const c = text[i]
    if (inStr) {
      if (esc) esc = false
      else if (c === '\\') esc = true
      else if (c === '"') inStr = false
      continue
    }
    if (c === '"') { inStr = true; continue }
    if (c === '[' || c === '{') depth++
    else if (c === ']' || c === '}') {
      depth--
      if (depth === 0) {
        const sub = text.slice(start, i + 1)
        try { return JSON.parse(sub) } catch { /* keep scanning */ }
      }
    }
  }
  throw new Error('unbalanced JSON')
}

async function callOllama(payload, attempt = 1, maxAttempts = 3) {
  const prompt = `Translate this JSON array from Hinglish to English. Return only a JSON array of the same length, in the same order, with the same keys.\n\n${JSON.stringify(payload)}`
  let res
  try {
    res = await fetch(`${OLLAMA}/api/generate`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: AbortSignal.timeout(120_000),
      body: JSON.stringify({
      model: MODEL,
      prompt,
      system: SYSTEM,
      stream: false,
      format: 'json',
        options: { temperature: 0.1, top_p: 0.9, num_predict: 8192 },
      }),
    })
  } catch (err) {
    if (attempt >= maxAttempts) throw err
    console.warn(`  request failed (${err.message}), retrying`)
    await sleep(3000)
    return callOllama(payload, attempt + 1, maxAttempts)
  }
  if (res.status === 429) {
    if (attempt >= 8) throw new Error('Ollama 429 after retries')
    const wait = Math.min(60000, 5000 * attempt)
    console.warn(`  429, waiting ${wait / 1000}s`)
    await sleep(wait)
    return callOllama(payload, attempt + 1, maxAttempts)
  }
  if (!res.ok) throw new Error(`Ollama ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const data = await res.json()
  const text = String(data.response || '').trim().replace(/^```json\s*|\s*```$/g, '')
  let parsed
  try { parsed = parseLoose(text) } catch (e) { throw new Error('invalid JSON: ' + e.message) }
  if (!Array.isArray(parsed) && parsed && typeof parsed === 'object' && Array.isArray(parsed.lessons)) parsed = parsed.lessons
  if (!Array.isArray(parsed) && payload.length === 1 && parsed && parsed.id === payload[0].id) parsed = [parsed]
  if (!valid(payload, parsed)) {
    if (process.env.DEBUG) console.error('INVALID OUTPUT:', JSON.stringify(parsed).slice(0, 3000))
    if (attempt >= maxAttempts) throw new Error('shape/tag validation failed')
    console.warn('  validation failed, retrying')
    return callOllama(payload, attempt + 1, maxAttempts)
  }
  return parsed
}

function loadOverrides(id) {
  const f = path.join(OUT, id + '.json')
  if (!fs.existsSync(f)) return { lessons: {} }
  try { return JSON.parse(fs.readFileSync(f, 'utf8')) } catch { return { lessons: {} } }
}
function saveOverrides(id, data) {
  if (dry) return
  fs.mkdirSync(OUT, { recursive: true })
  fs.writeFileSync(path.join(OUT, id + '.json'), JSON.stringify(data, null, 2) + '\n')
}

function balanceTags(html) {
  const voidTags = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'area', 'base', 'col', 'embed', 'param', 'track', 'wbr'])
  const stack = []
  return String(html).replace(/<(\/?)([a-zA-Z][\w-]*)\b[^>]*>/g, (m, close, name) => {
    const tag = name.toLowerCase()
    if (voidTags.has(tag)) return m
    if (close) {
      const i = stack.lastIndexOf(tag)
      if (i === -1) return ''
      stack.splice(i, 1)
      return m
    }
    stack.push(tag)
    return m
  }) + stack.reverse().map((t) => `</${t}>`).join('')
}

function restoreCode(original, translated) {
  const pick = (s) => [...String(s).matchAll(/<(code|pre)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => m[2])
  const src = pick(original)
  if (!src.length) return translated
  let i = 0
  return String(translated).replace(/<(code|pre)\b([^>]*)>[\s\S]*?<\/\1>/gi, (m, tag, attrs) => {
    if (i >= src.length) return m
    return `<${tag}${attrs}>${src[i++]}</${tag}>`
  })
}

function cleanPatch(t, source) {
  const o = {}
  for (const f of TRANSLATABLE) {
    if (t[f] === undefined) continue
    if (f === 'visualCap') o.visualCap = t[f]
    else if (typeof t[f] === 'string') o[f] = balanceTags(restoreCode(source[f], t[f]))
    else if (Array.isArray(t[f])) o[f] = t[f].map((v) => Array.isArray(v) ? v.map((x) => typeof x === 'string' ? restoreCode(source[f]?.flat?.()?.[0] || '', x) : x) : v)
    else o[f] = t[f]
  }
  return o
}

async function translateCourse(id) {
  const file = path.join(COURSES, id + '.json')
  if (!fs.existsSync(file)) { console.warn(`skip ${id}: not found`); return }
  const course = JSON.parse(fs.readFileSync(file, 'utf8'))
  const overrides = loadOverrides(id)
  overrides.lessons ||= {}

  let lessons = course.units.flatMap((u) => u.lessons)
  if (lessonFilter) lessons = lessons.filter((l) => l.id === lessonFilter)
  if (!force) lessons = lessons.filter((l) => !overrides.lessons[l.id])
  if (limit) lessons = lessons.slice(0, limit)
  if (!lessons.length) { console.log(`skip ${id}: nothing to translate`); return }

  const noWork = lessons.filter((l) => Object.keys(payloadFor([l])[0]).length === 1)
  if (noWork.length) {
    for (const l of noWork) overrides.lessons[l.id] = {}
    saveOverrides(id, overrides)
    lessons = lessons.filter((l) => !noWork.includes(l))
    console.log(`${id}: ${noWork.length} already English`)
  }
  if (!lessons.length) { console.log(`skip ${id}: nothing to translate`); return }

  const batches = []
  for (let i = 0; i < lessons.length; i += batchSize) batches.push(lessons.slice(i, i + batchSize))
  console.log(`${id}: ${lessons.length} lessons in ${batches.length} batches`)

  let next = 0, done = 0, failed = 0

  async function translateBatch(batch) {
    try {
      return await callOllama(payloadFor(batch), 1, batch.length > 1 ? 1 : 3)
    } catch (err) {
      if (batch.length === 1) throw err
      console.warn(`  splitting batch of ${batch.length}: ${err.message}`)
      const mid = Math.ceil(batch.length / 2)
      const a = await translateBatch(batch.slice(0, mid))
      const b = await translateBatch(batch.slice(mid))
      return [...a, ...b]
    }
  }

  async function worker() {
    while (next < batches.length) {
      const bi = next++
      try {
        const translated = await translateBatch(batches[bi])
        for (const t of translated) { const src = batches[bi].find((l) => l.id === t.id); overrides.lessons[t.id] = cleanPatch(t, src || {}) }
        saveOverrides(id, overrides)
        done++
        console.log(`  batch ${bi + 1}/${batches.length} ok (${done} done, ${failed} failed)`)
      } catch (err) {
        failed++
        console.error(`  batch ${bi + 1}/${batches.length} FAILED: ${err.message}`)
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, batches.length) }, worker))
  console.log(`${id}: finished ${done}/${batches.length} batches${failed ? `, ${failed} failed` : ''}`)
}

for (const id of ids) await translateCourse(id)
