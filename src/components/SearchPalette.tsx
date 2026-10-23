import { useEffect, useMemo, useRef, useState } from 'react'
import { courseIndex, metaOf } from '../data/load'
import { ensureSearch, highlightParts, search, snippet } from '../lib/search'
import { go } from '../lib/router'
import { dueCards, getProgress, setActiveCourse } from '../lib/store'
import { toggleTheme } from '../lib/theme'

interface Item { key: string; icon: string; title: string; sub?: string; group: string; run: (practice?: boolean) => void; q?: string }

const Hl = ({ text, q }: { text: string; q: string }) => (
  <>{highlightParts(text, q).map((p, i) => (p.hit ? <mark key={i}>{p.s}</mark> : <span key={i}>{p.s}</span>))}</>
)

export function SearchPalette({ open, onClose, courseId }: { open: boolean; onClose: () => void; courseId: string }) {
  if (!open) return null
  return <Palette onClose={onClose} courseId={courseId} />
}

function Palette({ onClose, courseId }: { onClose: () => void; courseId: string }) {
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const [scoped, setScoped] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLDivElement>(null)

  const [ready, setReady] = useState(false)
  useEffect(() => { input.current?.focus(); ensureSearch().then(() => setReady(true)) }, [])

  const items = useMemo<Item[]>(() => {
    const dueN = dueCards(getProgress()).length
    const nav = (path: string[]) => () => { go(...path); onClose() }
    const commands: Item[] = [
      { key: 'c-learn', icon: '🏠', title: 'Go to Learn path', group: 'Actions', run: nav([]) },
      { key: 'c-review', icon: '🔁', title: `Start revision${dueN ? ` (${dueN} due)` : ''}`, group: 'Actions', run: nav(['review']) },
      { key: 'c-courses', icon: '📚', title: 'All courses', group: 'Actions', run: nav(['courses']) },
      { key: 'c-stats', icon: '📈', title: 'Progress & stats', group: 'Actions', run: nav(['stats']) },
      { key: 'c-theme', icon: '🌓', title: 'Toggle light / dark theme', group: 'Actions', run: () => { toggleTheme(); onClose() } },
    ]
    const courses: Item[] = courseIndex.map((c) => ({
      key: 'course-' + c.id, icon: c.icon, title: `Open ${c.title}`, sub: `${c.lessons} lessons`, group: 'Courses',
      run: () => { setActiveCourse(c.id); go(); onClose() },
    }))
    const t = q.trim().toLowerCase()
    if (!t) return [...commands, ...courses.slice(0, 6)]
    const matchCmd = [...commands, ...courses].filter((c) => c.title.toLowerCase().includes(t)).slice(0, 4)
    const hits = (ready ? search(q, 40, scoped ? courseId : undefined) : []).map<Item>((h) => ({
      key: `${h.e.c}/${h.e.l}`,
      icon: metaOf(h.e.c)?.icon ?? '📄',
      title: h.e.n,
      sub: h.field === 'text' ? snippet(h.e, q) : h.e.t,
      group: metaOf(h.e.c)?.title ?? h.e.c,
      q,
      run: (practice) => { go(practice ? 'lesson' : 'read', h.e.c, h.e.l); onClose() },
    }))
    return [...matchCmd, ...hits]
  }, [q, scoped, courseId, onClose, ready])

  const sel = Math.min(idx, Math.max(0, items.length - 1))

  useEffect(() => {
    list.current?.querySelector('[data-sel="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [sel, items])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(Math.min(items.length - 1, sel + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx(Math.max(0, sel - 1)) }
    else if (e.key === 'Enter') { e.preventDefault(); items[sel]?.run(e.shiftKey) }
    else if (e.key === 'Escape') { e.preventDefault(); onClose() }
    else if (e.key === 'Tab') { e.preventDefault(); setScoped(!scoped); setIdx(0) }
  }

  let lastGroup = ''
  return (
    <div className="palette-back" onMouseDown={onClose}>
      <div className="palette" role="dialog" aria-label="Search" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <div className="palette-input">
          <span>🔍</span>
          <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setIdx(0) }} placeholder="Search topics, concepts, terms…  (e.g. useEffect, closure, index)" aria-label="Search" />
          <button className={'scope' + (scoped ? ' on' : '')} onClick={() => { setScoped(!scoped); input.current?.focus() }} title="Tab to toggle">
            {scoped ? (metaOf(courseId)?.title ?? 'This course') : 'All courses'}
          </button>
        </div>
        <div className="palette-list" ref={list} role="listbox">
          {items.length === 0 && <div className="palette-empty">{ready ? `“${q}” ke liye kuch nahi mila. Chhota ya alag keyword try karo.` : 'Index load ho raha hai…'}</div>}
          {items.map((it, i) => {
            const head = it.group !== lastGroup ? it.group : null
            lastGroup = it.group
            return (
              <div key={it.key + i}>
                {head && <div className="palette-group">{head}</div>}
                <div role="option" aria-selected={i === sel} data-sel={i === sel} className={'palette-item' + (i === sel ? ' sel' : '')}
                  onMouseMove={() => setIdx(i)} onClick={(e) => it.run(e.shiftKey)}>
                  <span className="pi-ico">{it.icon}</span>
                  <div className="pi-main">
                    <div className="pi-title">{it.q ? <Hl text={it.title} q={it.q} /> : it.title}</div>
                    {it.sub && <div className="pi-sub">{it.q ? <Hl text={it.sub} q={it.q} /> : it.sub}</div>}
                  </div>
                  {i === sel && <span className="pi-hint">{it.q ? '↵ read · ⇧↵ practice' : '↵'}</span>}
                </div>
              </div>
            )
          })}
        </div>
        <div className="palette-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>⇧↵</kbd> practice</span><span><kbd>Tab</kbd> scope</span><span><kbd>Esc</kbd> close</span></div>
      </div>
    </div>
  )
}
