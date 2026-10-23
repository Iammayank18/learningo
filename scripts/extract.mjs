// Extracts structured course data from the legacy HTML journals into src/data/courses/*.json
import fs from 'fs'
import path from 'path'
import vm from 'vm'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT = path.join(ROOT, 'src/data')

function grab(src, name) {
  const re = new RegExp('^\\s*const ' + name + '\\s*=\\s*([\\[{])', 'm')
  const m = re.exec(src)
  if (!m) return null
  const i = m.index + m[0].length - 1
  let depth = 0, str = null, esc = false
  const tpl = []
  for (let j = i; j < src.length; j++) {
    const c = src[j]
    if (str) {
      if (esc) { esc = false; continue }
      if (c === '\\') { esc = true; continue }
      if (str === '`' && c === '$' && src[j + 1] === '{') { tpl.push(depth); depth++; str = null; j++; continue }
      if (c === str) str = null
      continue
    }
    if (c === "'" || c === '"' || c === '`') { str = c; continue }
    if (c === '/' && src[j + 1] === '/') { while (src[j] !== '\n') j++; continue }
    if (c === '/' && src[j + 1] === '*') { j = src.indexOf('*/', j) + 1; continue }
    if (c === '{' || c === '[' || c === '(') depth++
    if (c === '}' || c === ']' || c === ')') {
      depth--
      if (tpl.length && depth === tpl[tpl.length - 1] && c === '}') { tpl.pop(); str = '`'; continue }
      if (depth === 0) return src.slice(i, j + 1)
    }
  }
  return null
}
const evalLit = (s) => vm.runInNewContext('(' + s + ')')

const META = {
  'frontend/react-mastery': ['React', '⚛️', 'Frontend', 'sky'],
  'frontend/js-mastery': ['JavaScript', '⚡', 'Frontend', 'amber'],
  'frontend/typescript-mastery': ['TypeScript', '🔷', 'Frontend', 'blue'],
  'frontend/css-mastery': ['CSS & HTML', '🎨', 'Frontend', 'pink'],
  'frontend/frontend-system-design': ['FE System Design', '🏗️', 'Frontend', 'violet'],
  'backend/nodejs-internals': ['Node.js Internals', '🟢', 'Backend', 'green'],
  'backend/api-design': ['API Design', '🔌', 'Backend', 'teal'],
  'cs-fundamentals/database': ['Databases', '🗄️', 'CS Fundamentals', 'orange'],
  'cs-fundamentals/os-fundamentals': ['Operating Systems', '💻', 'CS Fundamentals', 'slate'],
  'cs-fundamentals/web-protocols': ['Web Protocols', '🌐', 'CS Fundamentals', 'cyan'],
  'cs-fundamentals/concurrency': ['Concurrency', '🧵', 'CS Fundamentals', 'rose'],
  'architecture/design-patterns': ['Design Patterns', '🧩', 'Architecture', 'indigo'],
  'architecture/microservices': ['Microservices', '🕸️', 'Architecture', 'lime'],
  'devops/devops': ['DevOps', '🚢', 'DevOps', 'emerald'],
  'devops/security': ['Security', '🔒', 'DevOps', 'red'],
  'machine-coding/backend-machine-coding': ['Backend Machine Coding', '🔨', 'Machine Coding', 'fuchsia'],
  'frontend/nextjs': ['Next.js', '▲', 'Frontend', 'slate'],
  'frontend/frontend-system-design': ['FE System Design', '🏗️', 'Frontend', 'violet'],
  'frontend/build-mini-react': ['Build Mini React', '🧱', 'Frontend', 'sky'],
  'devops/performance': ['Web Performance', '🚀', 'DevOps', 'amber'],
  'devops/testing': ['Testing', '🧪', 'DevOps', 'green'],
  'devops/observability': ['Observability', '📡', 'DevOps', 'cyan'],
  'cs-fundamentals/dsa': ['DSA', '🧮', 'CS Fundamentals', 'indigo'],
  'cs-fundamentals/oop': ['OOP (TypeScript)', '🏛️', 'CS Fundamentals', 'orange'],
  'architecture/system-design': ['System Design Problems', '🗺️', 'Architecture', 'teal'],
  'ai/ai-agents': ['AI Agents', '🤖', 'AI', 'fuchsia'],
  'ai/ai-system-design': ['AI System Design', '🧠', 'AI', 'violet'],
  'ai/build-rag': ['Build: Codebase RAG', '📚', 'AI', 'blue'],
  'ai/build-voice-rag': ['Build: Voice RAG', '🎙️', 'AI', 'rose'],
  'ai/build-git-rag': ['Build: Git Archaeology RAG', '🕵️', 'AI', 'emerald'],
  'ai/build-opencode': ['Build: Mini-opencode', '🛠️', 'AI', 'lime'],
  'machine-coding/machine-coding': ['Machine Coding (JS/React)', '🔨', 'Machine Coding', 'fuchsia'],
  'machine-coding/fullstack': ['Fullstack Projects', '🧩', 'Machine Coding', 'pink'],
  'machine-coding/real-world-scenarios': ['Real-world Scenarios', '🌍', 'Machine Coding', 'red'],
}

const FEATURED = ['react-mastery', 'js-mastery', 'typescript-mastery', 'css-mastery']

fs.mkdirSync(path.join(OUT, 'courses'), { recursive: true })

const ul = (a) => '<ul>' + a.map((x) => `<li>${x}</li>`).join('') + '</ul>'
const arr = (x) => (Array.isArray(x) ? x : [])
const str = (x) => (typeof x === 'string' ? x : '')

/** Normalise the different journal item shapes (LEARN-keyed topics, inline learn{}, DSA samjho, problems...) into one Lesson. */
function toLesson(t, L, phase) {
  const name = t.name || t.title || t.label || t.id
  const les = {
    id: t.id, name, cat: t.cat || '', desc: str(t.desc) || str(t.brief), q: '', qsub: '',
    terms: [], what: '', analogy: '', why: '', visual: null, code: '', where: [], pros: [], cons: [], gotchas: [], qa: [], answer: '',
  }
  if (L) {
    Object.assign(les, {
      terms: arr(L.terms), what: str(L.what), analogy: str(L.analogy), why: str(L.why), visual: L.visual || null,
      code: str(L.code), where: arr(L.where), pros: arr(L.pros), cons: arr(L.cons), gotchas: arr(L.gotchas),
    })
  }
  if (t.learn && typeof t.learn === 'object') {
    les.what = str(t.learn.what) || les.what
    les.why = [str(t.learn.why) && `<p>${t.learn.why}</p>`.replace(/^<p>(<p>)/, '$1'), str(t.learn.how) && `<p><b>Kaise karna hai:</b></p>${t.learn.how.startsWith('<') ? t.learn.how : `<p>${t.learn.how}</p>`}`].filter(Boolean).join('\n') || les.why
  }
  if (arr(t.terms).length) les.terms = t.terms
  if (str(t.try)) les.code = t.try
  if (t.visual && typeof t.visual === 'object') les.visual = t.visual
  if (arr(t.gotchas).length) les.gotchas = t.gotchas
  if (str(t.example)) les.analogy = t.example
  // DSA
  if (t.samjho) {
    les.what = str(t.samjho.kya) || les.what
    les.analogy = str(t.samjho.analogy) || les.analogy
    les.why = [t.samjho.kyun, t.samjho.kaise && `<p><b>Kaise sochein:</b></p><p>${t.samjho.kaise}</p>`].filter(Boolean).join('\n')
  }
  if (arr(t.complexity).length) les.where = t.complexity.map((c) => [c.op, [c.time, c.space && `space: ${c.space}`].filter(Boolean).join(' · ')])
  if (Array.isArray(t.q)) {
    les.qa = t.q.filter((x) => x && x.q && x.a).map((x) => ({ q: x.q, a: x.a }))
    les.q = les.qa[0]?.q || ''
  } else les.q = str(t.q)
  les.qsub = Array.isArray(t.qsub) ? t.qsub.join(' · ') : str(t.qsub)
  // observability-style
  if (str(t.what) && !les.what) les.what = t.what
  if (str(t.why) && !les.why) les.why = `<p>${t.why}</p>`
  if (arr(t.points).length) les.what += ul(t.points)
  // problems (machine coding / system design / scenarios)
  if (str(t.statement)) {
    const sections = []
    const stmt = t.statement.trim()
    sections.push(stmt.startsWith('<') ? stmt : `<p>${stmt}</p>`)
    for (const [k, label] of [['requirements', 'Requirements'], ['functional', 'Functional requirements'], ['nonfunctional', 'Non-functional / scale'], ['components', 'Building blocks']]) {
      if (arr(t[k]).length) sections.push(`<h4>${label}</h4>${ul(t[k])}`)
    }
    if (arr(t.concepts).length) sections.push(`<p><b>Concepts:</b> ${t.concepts.join(' · ')}</p>`)
    if (str(t.testing)) sections.push(`<p><b>Kya test hota hai:</b> ${t.testing}</p>`)
    if (arr(t.stack).length) sections.push(`<p><b>Stack:</b> ${t.stack.map((x) => x.label).join(' · ')}</p>`)
    les.what = sections.join('\n')
    les.why = arr(t.hints).length ? `<ul>${t.hints.map((h) => `<li>${h}</li>`).join('')}</ul>` : ''
    les.answer = [str(t.answer), str(t.senior), str(t.followups) && `<h4>Follow-ups</h4><p>${t.followups}</p>`].filter(Boolean).join('\n')
    les.kind = 'problem'
    les.q = `Is problem ko kaise solve karoge? ${name}`
    les.qa = []
    les.diff = t.diff || ''
  }
  if (!les.desc) les.desc = plainText(les.what).slice(0, 220)
  return les
}
const plainText = (h) => String(h).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

const ENRICH_DIR = path.join(ROOT, 'scripts/enrich')
/** Hand-written lesson content for journals that only have title + description (scripts/enrich/<course>.json). */
function loadEnrich(courseId) {
  const f = path.join(ENRICH_DIR, courseId + '.json')
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {}
}
const FIELDS = ['terms', 'what', 'analogy', 'why', 'visual', 'code', 'where', 'pros', 'cons', 'gotchas']

const index = []
const search = []
for (const [key, [title, icon, group, hue]] of Object.entries(META)) {
  const file = path.join(ROOT, 'journal', key + '-journal.html')
  if (!fs.existsSync(file)) { console.log('missing', key); continue }
  const html = fs.readFileSync(file, 'utf8')
  const s = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).sort((a, b) => b.length - a.length)[0] || ''
  let chapters = null
  for (const n of ['chapters', 'PHASES', 'phases']) {
    const lit = grab(s, n)
    if (!lit) continue
    try { const v = evalLit(lit); if (Array.isArray(v) && v.length && typeof v[0] === 'object') { chapters = v; break } } catch { /* try next */ }
  }
  if (!chapters) { console.log('skip', key); continue }
  const L = grab(s, 'LEARN')
  let learn = {}
  try { if (L) learn = evalLit(L) } catch (e) { console.log('LEARN err', key, e.message) }
  const id = key.split('/')[1]
  const cats = (() => { const a = grab(s, 'ALL_CATS'); try { return a ? evalLit(a) : [] } catch { return [] } })()
  const kidsKey = ['topics', 'lessons', 'items', 'problems'].find((k) => chapters.some((c) => Array.isArray(c[k]) && c[k].length))
  if (!kidsKey) { console.log('no kids', key); continue }
  const enrich = loadEnrich(id)
  let enriched = 0
  let n = 0
  const usedIds = new Set()
  const course = {
    id, title, icon, group, hue, source: `journal/${key}-journal.html`, cats,
    units: chapters.filter((c) => arr(c[kidsKey]).length).map((c) => {
      const uid = c.id || c.title
      const utitle = c.title || c.label || c.lang || String(c.id)
      return {
        id: String(uid), title: utitle, week: c.week || c.level || c.eyebrow || '',
        lessons: c[kidsKey].filter((t) => t && t.id).map((t) => {
          n++
          const lesson = toLesson(t, learn[t.id], c)
          const extra = enrich[t.id]
          if (extra && !lesson.what) { for (const k of FIELDS) if (extra[k] !== undefined) lesson[k] = extra[k]; enriched++ }
          while (usedIds.has(lesson.id)) lesson.id += '-2'
          usedIds.add(lesson.id)
          search.push({ c: id, u: String(uid), l: lesson.id, n: lesson.name, t: utitle, x: [lesson.desc, lesson.q, ...lesson.terms.map((x) => x[0] + ' ' + x[1]), plainText(lesson.what).slice(0, 300)].join(' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 700) })
          return lesson
        }),
      }
    }),
  }
  fs.writeFileSync(path.join(OUT, 'courses', id + '.json'), JSON.stringify(course))
  const hasDeep = course.units.some((u) => u.lessons.some((l) => l.what))
  index.push({ id, title, icon, group, hue, source: course.source, lessons: n, units: course.units.length, featured: FEATURED.includes(id), hasDeep })
  console.log(id.padEnd(28), course.units.length, 'units', String(n).padStart(3), 'lessons', (fs.statSync(path.join(OUT, 'courses', id + '.json')).size / 1024).toFixed(0) + 'KB', enriched ? `(+${enriched} enriched)` : '')
}
fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index))
fs.writeFileSync(path.join(OUT, 'search.json'), JSON.stringify(search))
console.log('courses', index.length, 'lessons', search.length)
