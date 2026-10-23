import { useState } from 'react'
import { courseIndex } from '../data/load'
import { DAY, dayKey, levelOf, resetAll, setGoal, streakOf, importState, useProgress, getProgress } from '../lib/store'

export function Stats() {
  const p = useProgress()
  const [now] = useState(() => Date.now())
  const s = streakOf(p)
  const lv = levelOf(p.xp)
  const days = Array.from({ length: 14 }, (_, i) => {
    const t = now - (13 - i) * DAY
    return { k: dayKey(t), xp: p.days[dayKey(t)] ?? 0, label: new Date(t).toLocaleDateString(undefined, { weekday: 'narrow' }) }
  })
  const max = Math.max(p.goal, ...days.map((d) => d.xp))
  const total = Object.keys(p.done).length
  const mastered = Object.values(p.cards).filter((c) => c.stage >= 4).length

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(getProgress(), null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob); a.download = 'interview-prep-progress.json'; a.click()
    URL.revokeObjectURL(a.href)
  }
  const importJson = (f: File | undefined) => f?.text().then((t) => { try { importState(t) } catch { alert('Invalid file') } })

  return (
    <div className="page">
      <h1>Progress</h1>
      <div className="tiles">
        <div className="tile"><small>STREAK</small><b>🔥 {s.current}</b><span className="muted small">best {s.best}</span></div>
        <div className="tile"><small>TOTAL XP</small><b>⚡ {p.xp}</b><span className="muted small">Level {lv.level}</span></div>
        <div className="tile"><small>LESSONS</small><b>📘 {total}</b><span className="muted small">completed</span></div>
        <div className="tile"><small>STRONG</small><b>👑 {mastered}</b><span className="muted small">crown 4+</span></div>
      </div>

      <section className="card">
        <h3>Last 14 days (XP)</h3>
        <div className="bars" role="img" aria-label="XP per day, last 14 days">
          {days.map((d) => (
            <div key={d.k} className="bar-col" title={`${d.k}: ${d.xp} XP`}>
              <div className={'bar' + (d.xp >= p.goal ? ' hit' : '')} style={{ height: `${(d.xp / max) * 100}%` }} />
              <small>{d.label}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h3>Daily goal</h3>
        <div className="seg">
          {[
            [20, 'Casual · 20'], [30, 'Regular · 30'], [50, 'Serious · 50'], [100, 'Intense · 100'],
          ].map(([g, l]) => <button key={g} className={'seg-btn' + (p.goal === g ? ' on' : '')} onClick={() => setGoal(g as number)}>{l}</button>)}
        </div>
      </section>

      <section className="card">
        <h3>Courses</h3>
        {courseIndex.map((c) => {
          const d = Object.keys(p.done).filter((k) => k.startsWith(c.id + '/')).length
          return (
            <div key={c.id} className="crow">
              <span>{c.icon} {c.title}</span>
              <div className="pbar slim"><div className="pbar-fill" style={{ width: `${(d / c.lessons) * 100}%` }} /></div>
              <span className="muted small">{d}/{c.lessons}</span>
            </div>
          )
        })}
      </section>

      <section className="card">
        <h3>Data</h3>
        <p className="muted small">Progress is browser mein save hoti hai. Backup/restore ke liye export-import karo.</p>
        <div className="row-btns">
          <button className="btn btn-outline" onClick={exportJson}>Export</button>
          <label className="btn btn-outline">Import<input type="file" accept="application/json" hidden onChange={(e) => importJson(e.target.files?.[0])} /></label>
          <button className="btn btn-outline danger" onClick={() => { if (confirm('Saari progress delete ho jaayegi. Pakka?')) resetAll() }}>Reset</button>
        </div>
      </section>
    </div>
  )
}
