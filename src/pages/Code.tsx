import { useMemo, useState } from 'react'
import { problemById } from '../data/practice/dsa'
import { CATALOG, TOPICS, lcUrl, topicLabel, topicsInOrder, type CatalogItem } from '../data/practice/catalog'
import { solveProblem, useProgress } from '../lib/store'
import { href } from '../lib/router'
import { t } from '../lib/i18n'
import { ProblemFlow } from '../components/ProblemFlow'
import { dsaProblemExtra } from '../data/dsa'


const XP = { easy: 10, medium: 20, hard: 30 }
const PAGE = 40
type Status = '' | 'todo' | 'done' | 'app'
type Sort = 'path' | 'diff' | 'az'
type Tier = 'must' | 'important' | 'optional'
const RANK = { easy: 0, medium: 1, hard: 2 }
const TIERS: Tier[] = ['must', 'important', 'optional']

export function CodeIndex({ topic: startTopic = '' }: { topic?: string }) {
  const prog = useProgress()
  const [q, setQ] = useState('')
  const [diff, setDiff] = useState('')
  const [topic, setTopic] = useState(startTopic)
  const [status, setStatus] = useState<Status>('')
  const [tier, setTier] = useState('')
  const [sort, setSort] = useState<Sort>('path')
  const [shown, setShown] = useState(PAGE)
  const solved = (c: CatalogItem) => !!prog.solved[c.key]
  const done = CATALOG.filter(solved).length
  const byTier = TIERS.map((k) => { const all = CATALOG.filter((c) => c.tier === k); return { k, total: all.length, done: all.filter(solved).length } })
  const next = useMemo(() => CATALOG.filter((c) => c.tier === 'must' && !prog.solved[c.key]).sort((a, b) => a.rank - b.rank).slice(0, 3), [prog.solved])
  const active = !!(q || diff || topic || status || tier || sort !== 'path')
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase()
    let r = CATALOG.filter((c) =>
      (!s || c.name.toLowerCase().includes(s) || c.topics.some((x) => topicLabel(x).toLowerCase().includes(s))) &&
      (!diff || c.diff === diff) && (!tier || c.tier === tier) && (!topic || c.topics.includes(topic)) &&
      (!status || (status === 'app' ? !!c.app : status === 'done' ? !!prog.solved[c.key] : !prog.solved[c.key])))
    if (sort === 'path') r = [...r].sort((a, b) => a.rank - b.rank || RANK[a.diff] - RANK[b.diff])
    if (sort === 'diff') r = [...r].sort((a, b) => RANK[a.diff] - RANK[b.diff] || a.rank - b.rank)
    if (sort === 'az') r = [...r].sort((a, b) => a.name.localeCompare(b.name))
    return r
  }, [q, diff, tier, topic, status, sort, prog.solved])
  const reset = () => { setQ(''); setDiff(''); setTier(''); setTopic(''); setStatus(''); setSort('path'); setShown(PAGE) }
  const on = <T,>(set: (v: T) => void) => (v: T) => { set(v); setShown(PAGE) }
  const visible = rows.slice(0, shown)
  const grouped = sort === 'path'
  const unitStats = useMemo(() => {
    const m = new Map<string, { done: number; total: number }>()
    for (const c of rows) { const e = m.get(c.unitId) ?? { done: 0, total: 0 }; e.total++; if (prog.solved[c.key]) e.done++; m.set(c.unitId, e) }
    return m
  }, [rows, prog.solved])

  return (
    <div className="page code-page">
      <header className="code-hero card">
        <div className="code-hero-top">
          <div>
            <h1>{t('code.title')}</h1>
            <p className="muted small">{t('code.intro')}</p>
          </div>
          <div className="code-big"><b>{done}</b><span>/ {CATALOG.length}</span><small>{t('code.solved')}</small></div>
        </div>
        <div className="pbar"><div className="pbar-fill" style={{ width: `${(done / CATALOG.length) * 100}%` }} /></div>
        <div className="code-tiers">
          {byTier.map((x) => (
            <button key={x.k} className={'code-tier' + (tier === x.k ? ' on' : '')} onClick={() => on(setTier)(tier === x.k ? '' : x.k)}>
              <span className={'tier-badge ' + x.k}>{t(`tier.${x.k}`)}</span>
              <b>{x.done}<small>/{x.total}</small></b>
            </button>
          ))}
        </div>
      </header>

      {next.length > 0 && !active && (
        <section className="code-next">
          <div className="eyebrow">{t('code.nextUp')}</div>
          <div className="code-next-grid">
            {next.map((c) => (
              <a key={c.key} className="code-next-card" href={c.app ? href('code', c.app.id) : lcUrl(c.slug)} {...(c.app ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
                <span className={'diff-pill ' + c.diff}>{t(`code.${c.diff}`)}</span>
                <b>{c.name}</b>
                <small className="muted">{topicLabel(topicsInOrder(c)[0])}</small>
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="code-bar">
        <div className="code-search-wrap">
          <span aria-hidden>🔍</span>
          <input className="code-search" type="search" value={q} placeholder={t('code.search')} onChange={(e) => on(setQ)(e.target.value)} />
        </div>
        <div className="code-seg" role="tablist" aria-label={t('code.fTier')}>
          {[['', t('code.allTiers')], ...TIERS.map((k) => [k, t(`tier.${k}`)])].map(([k, label]) => (
            <button key={k} role="tab" aria-selected={tier === k} className={tier === k ? 'on' : ''} onClick={() => on(setTier)(k)}>{label}</button>
          ))}
        </div>
        <div className="code-selects">
          <select value={diff} onChange={(e) => on(setDiff)(e.target.value)} aria-label={t('code.fDiff')}>
            <option value="">{t('code.allDiff')}</option>
            <option value="easy">{t('code.easy')}</option><option value="medium">{t('code.medium')}</option><option value="hard">{t('code.hard')}</option>
          </select>
          <select value={topic} onChange={(e) => on(setTopic)(e.target.value)} aria-label={t('code.fTopic')}>
            <option value="">{t('code.allTopics')}</option>
            {TOPICS.map((x) => <option key={x} value={x}>{topicLabel(x)}</option>)}
          </select>
          <select value={status} onChange={(e) => on(setStatus)(e.target.value as Status)} aria-label={t('code.fStatus')}>
            <option value="">{t('code.allStatus')}</option>
            <option value="todo">{t('code.unsolved')}</option><option value="done">{t('code.solved')}</option><option value="app">{t('code.fullPractice')}</option>
          </select>
          <select value={sort} onChange={(e) => on(setSort)(e.target.value as Sort)} aria-label={t('code.fSort')}>
            <option value="path">{t('code.sortPath')}</option><option value="diff">{t('code.sortDiff')}</option><option value="az">{t('code.sortAz')}</option>
          </select>
          {active && <button className="linklike" onClick={reset}>{t('code.clear')}</button>}
        </div>
        <div className="small muted">{t('code.showing', { n: rows.length, total: CATALOG.length })}</div>
      </div>

      <div className="code-list">
        {visible.map((c, i) => {
          const head = grouped && (i === 0 || visible[i - 1].unitId !== c.unitId)
          const st = unitStats.get(c.unitId)
          return (
            <div key={c.key}>
              {head && (
                <div className="code-unit">
                  <span>{c.unitTitle}</span>
                  {st && <small>{st.done}/{st.total}</small>}
                </div>
              )}
              <CodeRow c={c} solved={solved(c)} />
            </div>
          )
        })}
      </div>
      {rows.length === 0 && <div className="empty">{t('code.noMatch')}</div>}
      {rows.length > shown && <button className="btn btn-outline code-more" onClick={() => setShown(shown + PAGE)}>{t('code.more', { n: rows.length - shown })}</button>}
    </div>
  )
}

function CodeRow({ c, solved }: { c: CatalogItem; solved: boolean }) {
  const topics = topicsInOrder(c)
  const ext = c.app ? {} : { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <div className={'cr' + (solved ? ' done' : '')}>
      <span className={'cr-bar ' + c.diff} aria-hidden />
      <div className="cr-main">
        <a className="cr-title" href={c.app ? href('code', c.app.id) : lcUrl(c.slug)} {...ext}>{c.name}{c.app ? '' : ' ↗'}</a>
        <div className="cr-meta">
          <span className={'tier-badge ' + c.tier}>{t(`tier.${c.tier}`)}</span>
          {c.app && <span className="full-badge">{t('code.fullPractice')}</span>}
          <span className="cr-topic">{topics.slice(0, 2).map(topicLabel).join(' · ')}{topics.length > 2 ? ` +${topics.length - 2}` : ''}</span>
        </div>
      </div>
      <span className={'diff-pill ' + c.diff}>{t(`code.${c.diff}`)}</span>
      <div className="cr-act">
        {solved ? <span className="cr-check on" title={t('code.solved')}>✓</span>
          : c.app ? <a className="btn btn-green btn-sm" href={href('code', c.app.id)}>{t('code.openProblem')}</a>
          : <>
              <a className="btn btn-outline btn-sm" href={lcUrl(c.slug)} {...ext}>LeetCode ↗</a>
              <button className="cr-check" title={t('code.markSolved')} aria-label={t('code.markSolved')} onClick={() => solveProblem(c.key, XP[c.diff])}>✓</button>
            </>}
      </div>
    </div>
  )
}

export function CodeProblem({ id }: { id: string }) {
  const problem = problemById(id)
  if (!problem) return <div className="empty">{t('code.notFound')}</div>
  return <ProblemFlow key={id} problem={problem} extra={dsaProblemExtra(id)} />
}
