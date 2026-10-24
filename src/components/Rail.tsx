import { useState } from 'react'
import { claimQuest, dayKey, dueCards, levelOf, streakOf, useProgress, DAY } from '../lib/store'
import { href } from '../lib/router'
import { sfx } from '../lib/sound'
import { Flame } from './Flame'
import { BoltIcon, ChestIcon } from './Icons'
import { t } from '../lib/i18n'

export function Ring({ value, size = 64, light = false, children }: { value: number; size?: number; light?: boolean; children?: React.ReactNode }) {
  const r = (size - 10) / 2
  const c = 2 * Math.PI * r
  return (
    <div className={'prog-ring' + (light ? ' light' : '')} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} className="ring-bg" />
        {value > 0 && <circle cx={size / 2} cy={size / 2} r={r} className="ring-fg" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, value))} transform={`rotate(-90 ${size / 2} ${size / 2})`} />}
      </svg>
      <div className="ring-in">{children}</div>
    </div>
  )
}

export function Rail() {
  const p = useProgress()
  const s = streakOf(p)
  const lv = levelOf(p.xp)
  const k = dayKey()
  const today = p.days[k] ?? 0
  const acts = p.acts[k] ?? { l: 0, r: 0 }
  const due = dueCards(p).length
  const [now] = useState(() => Date.now())
  const dow = (new Date(now).getDay() + 6) % 7
  const week = Array.from({ length: 7 }, (_, i) => ({ label: 'MTWTFSS'[i], on: (p.days[dayKey(now + (i - dow) * DAY)] ?? 0) > 0, today: i === dow }))

  const quests = [
    { id: 'xp', label: t('rail.questXp', { g: p.goal }), now: today, goal: p.goal, reward: 10, icon: <BoltIcon size={34} /> },
    { id: 'lessons', label: t('rail.questLessons'), now: acts.l, goal: 2, reward: 15, icon: <span className="q-emoji">📘</span> },
    { id: 'review', label: t('rail.questReview'), now: acts.r, goal: 3, reward: 10, icon: <span className="q-emoji">🔁</span> },
  ]

  return (
    <aside className="rail">
      <div className="stat-bar">
        <span className={'sb fire' + (s.todayDone ? ' on' : '')} title={t('rail.streak')}><Flame size={20} dim={!s.todayDone} /> {s.current}</span>
        <span className="sb xp" title={t('rail.totalXp')}><BoltIcon size={20} /> {p.xp}</span>
        <span className="sb lvl" title={t('rail.level')}>{t('nav.levelShort', { n: lv.level })}</span>
      </div>
      <div className="lvl-bar" title={t('rail.xpToLevel', { x: lv.need - lv.into, l: lv.level + 1 })}><div style={{ width: `${(lv.into / lv.need) * 100}%` }} /></div>

      <div className="card streak-card">
        <div className="streak-card-top">
          <div><h4>{t('common.dayStreak', { n: s.current })}</h4><p className="muted small">{s.todayDone ? t('rail.streakSafe') : t('rail.streakDo')}</p></div>
          <Flame size={44} dim={!s.todayDone} />
        </div>
        <div className="week-mini">
          {week.map((w, i) => <div key={i} className={'wm' + (w.on ? ' on' : '') + (w.today ? ' today' : '')}><span>{w.on ? '✓' : ''}</span><small>{w.label}</small></div>)}
        </div>
      </div>

      <div className="card quests">
        <div className="quests-head"><h4>{t('rail.dailyQuests')}</h4><span className="muted small">{quests.filter((q) => q.now >= q.goal).length}/3</span></div>
        {quests.map((q) => {
          const complete = q.now >= q.goal
          const claimed = !!p.claimed[`${k}:${q.id}`]
          return (
            <div key={q.id} className="quest">
              <div className="q-ico">{q.icon}</div>
              <div className="q-main">
                <b>{q.label}</b>
                <div className="q-bar"><div style={{ width: `${Math.min(100, (q.now / q.goal) * 100)}%` }} /><span>{Math.min(q.now, q.goal)} / {q.goal}</span></div>
              </div>
              <button className={'q-chest' + (complete && !claimed ? ' ready' : '')} disabled={!complete || claimed} aria-label={claimed ? t('common.claimed') : t('rail.claimAria', { n: q.reward })}
                onClick={() => { claimQuest(q.id, q.reward); sfx.goal() }}>
                {claimed ? <span className="q-done">✓</span> : <ChestIcon size={40} open={complete} dim={!complete} />}
              </button>
            </div>
          )
        })}
      </div>

      <a className={'card review-card' + (due ? ' due' : '')} href={href('review')}>
        <div className="review-ico">{due ? '⏰' : '✅'}</div>
        <div>
          <h4>{due ? t('rail.revisionDue', { n: due }) : t('rail.revisionClear')}</h4>
          <p className="muted small">{due ? t('rail.spaced') : t('rail.learned')}</p>
        </div>
      </a>
    </aside>
  )
}
