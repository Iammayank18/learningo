import { useState } from 'react'
import { useCourse } from '../lib/useCourse'
import { lid, useProgress, DAY } from '../lib/store'
import { href } from '../lib/router'
import { HUES } from '../lib/sections'
import { metaOf } from '../data/load'
import type { Course, Lesson } from '../types'

const OFFSETS = [0, 38, 62, 38, 0, -38, -62, -38]

function firstIncomplete(course: Course, done: Record<string, number>) {
  for (const u of course.units) for (const l of u.lessons) if (!done[lid(course.id, l.id)]) return l.id
  return null
}

export function Learn({ courseId }: { courseId: string }) {
  const { course, loading, error } = useCourse(courseId)
  const p = useProgress()
  const [open, setOpen] = useState<string | null>(null)
  const [now] = useState(() => Date.now())
  if (error) return <div className="empty">Course load nahi hua.</div>
  if (loading || !course) return <div className="empty">Loading…</div>

  const meta = metaOf(course.id)
  const hue = HUES[course.hue] ?? '#58cc02'
  const current = firstIncomplete(course, p.done)
  const total = course.units.reduce((n, u) => n + u.lessons.length, 0)
  const done = course.units.reduce((n, u) => n + u.lessons.filter((l) => p.done[lid(course.id, l.id)]).length, 0)

  return (
    <div className="path" style={{ ['--hue' as string]: hue }}>
      <div className="course-head">
        <div>
          <div className="eyebrow">{course.group}</div>
          <h1>{course.icon} {course.title}</h1>
          <div className="muted small">{done}/{total} lessons · {meta?.hasDeep ? 'full lessons + quizzes' : 'concept cards + recall'}</div>
        </div>
        <a className="btn btn-outline" href={href('courses')}>Switch</a>
      </div>
      <div className="pbar slim"><div className="pbar-fill" style={{ width: `${(done / total) * 100}%` }} /></div>

      {course.units.map((u, ui) => {
        const ud = u.lessons.filter((l) => p.done[lid(course.id, l.id)]).length
        return (
          <section key={u.id} className="unit">
            <div className="unit-banner">
              <div>
                <div className="eyebrow">Unit {ui + 1}{u.week ? ` · ${u.week}` : ''}</div>
                <h2>{u.title}</h2>
              </div>
              <div className="unit-count">{ud}/{u.lessons.length}</div>
            </div>
            <div className="nodes">
              {u.lessons.map((l: Lesson, li) => {
                const id = lid(course.id, l.id)
                const card = p.cards[id]
                const isDone = !!p.done[id]
                const isCur = l.id === current
                const isDue = !!card && card.due <= now
                const off = OFFSETS[li % OFFSETS.length]
                const sel = open === id
                return (
                  <div key={l.id} className={'node-wrap' + (sel ? ' open' : '')} style={{ transform: `translateX(${off}px)` }}>
                    {isCur && <div className="start-bubble">START</div>}
                    <button
                      className={'node' + (isDone ? ' done' : '') + (isCur ? ' cur' : '') + (isDue ? ' due' : '')}
                      aria-label={l.name}
                      aria-expanded={sel}
                      onClick={() => setOpen(sel ? null : id)}
                    >
                      {isDone ? (isDue ? '⏰' : '★') : isCur ? '▶' : li + 1}
                      {isDone && card && <span className="crowns">{'●'.repeat(card.stage)}{'○'.repeat(5 - card.stage)}</span>}
                    </button>
                    {sel && (
                      <div className="popover" role="dialog">
                        <h4>{l.name}</h4>
                        <p className="muted small">
                          {isDone && card ? (isDue ? 'Revision due!' : `Next revision ${fmtIn(card.due - now)}`) : l.desc ? l.desc.slice(0, 110) + '…' : ''}
                        </p>
                        <a className="btn btn-green" href={href('lesson', course.id, l.id)}>{isDone ? 'Practice again' : 'Start'} · +{25} XP</a>
                        <a className="btn btn-outline" href={href('read', course.id, l.id)}>Read notes</a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

function fmtIn(ms: number) {
  const d = Math.round(ms / DAY)
  if (d <= 0) return 'today'
  return d === 1 ? 'tomorrow' : `in ${d} days`
}
