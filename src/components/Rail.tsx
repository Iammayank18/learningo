import { dueCards, levelOf, streakOf, useProgress, dayKey } from '../lib/store'
import { href } from '../lib/router'

export function Ring({ value, size = 64, children }: { value: number; size?: number; children?: React.ReactNode }) {
  const r = (size - 10) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} className="ring-bg" />
        <circle cx={size / 2} cy={size / 2} r={r} className="ring-fg" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, value))} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      <div className="ring-in">{children}</div>
    </div>
  )
}

export function Rail() {
  const p = useProgress()
  const s = streakOf(p)
  const lv = levelOf(p.xp)
  const today = p.days[dayKey()] ?? 0
  const due = dueCards(p).length
  return (
    <aside className="rail">
      <div className="card stat-card">
        <div className="stat-row">
          <span className={'chip fire' + (s.todayDone ? ' on' : '')}>🔥 {s.current}</span>
          <span className="chip xp">⚡ {p.xp}</span>
          <span className="chip lvl">Lv {lv.level}</span>
        </div>
        <div className="lvl-bar"><div style={{ width: `${(lv.into / lv.need) * 100}%` }} /></div>
        <div className="muted small">{lv.need - lv.into} XP → Level {lv.level + 1}</div>
      </div>
      <div className="card goal-card">
        <Ring value={today / p.goal}><b>{Math.min(today, p.goal)}</b><small>/{p.goal}</small></Ring>
        <div>
          <h4>Daily goal</h4>
          <p className="muted small">{today >= p.goal ? 'Goal complete! 🎉' : `${p.goal - today} XP baaki aaj ke liye`}</p>
        </div>
      </div>
      <a className={'card review-card' + (due ? ' due' : '')} href={href('review')}>
        <div className="review-ico">{due ? '⏰' : '✅'}</div>
        <div>
          <h4>{due ? `${due} revision due` : 'Revision clear'}</h4>
          <p className="muted small">{due ? 'Spaced repetition — abhi karo, yaad rahega' : 'Jo seekha wo apne time pe wapas aayega'}</p>
        </div>
      </a>
    </aside>
  )
}
