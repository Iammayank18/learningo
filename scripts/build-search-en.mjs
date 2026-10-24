#!/usr/bin/env node
/** Builds src/data/search.en.json from courses + partial English overrides. */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const DATA = path.join(ROOT, 'src/data')
const plain = (h) => String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

const index = JSON.parse(fs.readFileSync(path.join(DATA, 'index.json'), 'utf8'))
const search = []
for (const meta of index) {
  const course = JSON.parse(fs.readFileSync(path.join(DATA, 'courses', meta.id + '.json'), 'utf8'))
  const trFile = path.join(DATA, 'translations/en', meta.id + '.json')
  const tr = fs.existsSync(trFile) ? JSON.parse(fs.readFileSync(trFile, 'utf8')) : { lessons: {} }
  for (const unit of course.units) {
    const ut = tr.units?.[unit.id]
    const utitle = ut?.title || unit.title
    for (const lesson of unit.lessons) {
      const l = { ...lesson, ...(tr.lessons?.[lesson.id] || {}) }
      search.push({
        c: meta.id,
        u: String(unit.id),
        l: l.id,
        n: l.name,
        t: utitle,
        x: [l.desc, l.q, ...(l.terms || []).map((x) => x[0] + ' ' + x[1]), plain(l.what).slice(0, 300)]
          .join(' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 700),
      })
    }
  }
}
fs.writeFileSync(path.join(DATA, 'search.en.json'), JSON.stringify(search))
console.log('search.en.json:', search.length, 'lessons')
