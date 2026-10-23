import type { Lesson } from '../types'
import { sectionMeta, type SectionKind } from '../lib/sections'

const Rich = ({ html }: { html: string }) => <div className="rich" dangerouslySetInnerHTML={{ __html: html }} />

export function LessonSection({ lesson, kind, bare = false }: { lesson: Lesson; kind: SectionKind; bare?: boolean }) {
  const meta = sectionMeta(kind, lesson)
  let body
  switch (kind) {
    case 'concept':
      body = (
        <>
          {lesson.what ? <Rich html={lesson.what} /> : <p className="rich">{lesson.desc}</p>}
          {lesson.terms.length > 0 && (
            <dl className="terms">
              {lesson.terms.map(([t, d]) => (
                <div key={t}><dt dangerouslySetInnerHTML={{ __html: t }} /><dd dangerouslySetInnerHTML={{ __html: d }} /></div>
              ))}
            </dl>
          )}
        </>
      )
      break
    case 'analogy':
      body = <Rich html={lesson.analogy} />
      break
    case 'why':
      body = (
        <>
          {lesson.why && <Rich html={lesson.why} />}
          {lesson.visual && (
            <figure className="visual">
              <div className="visual-box" dangerouslySetInnerHTML={{ __html: lesson.visual.svg }} />
              {lesson.visual.cap && <figcaption>{lesson.visual.cap}</figcaption>}
            </figure>
          )}
        </>
      )
      break
    case 'code':
      body = <pre className="code"><code>{lesson.code}</code></pre>
      break
    case 'use':
      body = (
        <div className="use">
          {lesson.where.length > 0 && (
            <div className="use-block"><h4>📍 Kahan use hota hai</h4>
              <ul>{lesson.where.map(([t, d]) => <li key={t}><b dangerouslySetInnerHTML={{ __html: t }} /> — <span dangerouslySetInnerHTML={{ __html: d }} /></li>)}</ul></div>
          )}
          {lesson.pros.length > 0 && (
            <div className="use-block pro"><h4>✅ Fayde</h4><ul>{lesson.pros.map((p) => <li key={p} dangerouslySetInnerHTML={{ __html: p }} />)}</ul></div>
          )}
          {lesson.cons.length > 0 && (
            <div className="use-block con"><h4>⛔ Nuksaan / limits</h4><ul>{lesson.cons.map((p) => <li key={p} dangerouslySetInnerHTML={{ __html: p }} />)}</ul></div>
          )}
        </div>
      )
      break
    case 'answer':
      body = <Rich html={lesson.answer ?? ''} />
      break
    case 'gotchas':
      body = <ul className="gotchas">{lesson.gotchas.map((g) => <li key={g} dangerouslySetInnerHTML={{ __html: g }} />)}</ul>
      break
    case 'interview':
      body = (
        <>
          <p className="rich"><b>{lesson.q}</b></p>
          {lesson.qsub && <p className="rich muted">Follow-up: {lesson.qsub}</p>}
        </>
      )
      break
  }
  return (
    <section className={'lsec' + (bare ? ' bare' : '')}>
      <h3 className="lsec-title"><span>{meta.icon}</span> {meta.title}</h3>
      {body}
    </section>
  )
}
