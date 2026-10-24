import { useState } from 'react'
import { courseIndex } from '../data/load'
import { DAY, dayKey, levelOf, setGoal, streakOf, useProgress } from '../lib/store'
import { href } from '../lib/router'
import { t, getLocale, type MessageKey } from '../lib/i18n'

export function Stats() {
  const p = useProgress()
  const [now] = useState(() => Date.now())
  const s = streakOf(p)
  const lv = levelOf(p.xp)
  const days = Array.from({ length: 14 }, (_, i) => {
    const t = now - (13 - i) * DAY
    return { k: dayKey(t), xp: p.days[dayKey(t)] ?? 0, label: new Date(t).toLocaleDateString(getLocale(), { weekday: 'narrow' }) }
  })
  const max = Math.max(p.goal, ...days.map((d) => d.xp))
  const total = Object.keys(p.done).length
  const mastered = Object.values(p.cards).filter((c) => c.stage >= 4).length


  return (
    <div className="page">
      <h1>{t('stats.title')}</h1>
      <div className="tiles">
        <div className="tile"><small>{t('stats.streak')}</small><b>🔥 {s.current}</b><span className="muted small">{t('stats.best', { n: s.best })}</span></div>
        <div className="tile"><small>{t('stats.totalXp')}</small><b>⚡ {p.xp}</b><span className="muted small">{t('stats.level', { n: lv.level })}</span></div>
        <div className="tile"><small>{t('stats.lessons')}</small><b>📘 {total}</b><span className="muted small">{t('stats.completed')}</span></div>
        <div className="tile"><small>{t('stats.strong')}</small><b>👑 {mastered}</b><span className="muted small">{t('stats.crown4plus')}</span></div>
      </div>

      <section className="card">
        <h3>{t('stats.last14')}</h3>
        <div className="bars" role="img" aria-label={t('stats.xpPerDayAria')}>
          {days.map((d) => (
            <div key={d.k} className="bar-col" title={`${d.k}: ${d.xp} XP`}>
              <div className={'bar' + (d.xp >= p.goal ? ' hit' : '')} style={{ height: `${(d.xp / max) * 100}%` }} />
              <small>{d.label}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h3>{t('stats.dailyGoal')}</h3>
        <div className="seg">
          {[
            [20, 'options.goal.casual'], [30, 'options.goal.regular'], [50, 'options.goal.serious'], [100, 'options.goal.intense'],
          ].map(([g, key]) => <button key={g} className={'seg-btn' + (p.goal === g ? ' on' : '')} onClick={() => setGoal(g as number)}>{t(key as MessageKey)} · {g}</button>)}
        </div>
      </section>

      <section className="card">
        <h3>{t('stats.courses')}</h3>
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

      <a className="btn btn-outline" href={href('settings')}>⚙️ {t('common.settings')}</a>
    </div>
  )
}
