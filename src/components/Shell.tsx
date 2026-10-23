import { dueCards, levelOf, streakOf, useProgress } from '../lib/store'
import { href } from '../lib/router'
import { currentTheme, toggleTheme } from '../lib/theme'
import { Rail } from './Rail'
import { Owl } from './Owl'
import { setPref, usePrefs } from '../lib/prefs'
import { sfx } from '../lib/sound'
import { useState } from 'react'

const NAV = [
  { id: '', icon: '🏠', label: 'Learn' },
  { id: 'review', icon: '🔁', label: 'Review' },
  { id: 'roadmaps', icon: '🗺️', label: 'Roadmaps' },
  { id: 'courses', icon: '📚', label: 'Courses' },
  { id: 'stats', icon: '📈', label: 'Progress' },
]

export function Shell({ route, onSearch, children }: { route: string; onSearch: () => void; children: React.ReactNode }) {
  const p = useProgress()
  const prefs = usePrefs()
  const due = dueCards(p).length
  const s = streakOf(p)
  const [, force] = useState(0)
  const mac = /Mac|iPhone|iPad/.test(navigator.platform)
  return (
    <div className="shell">
      <nav className="side">
        <a className="brand" href={href()}><Owl size={36} /><span>Prep</span></a>
        {NAV.map((n) => (
          <a key={n.id} href={n.id ? href(n.id) : href()} className={'nav-item' + (route === n.id ? ' active' : '')}>
            <span className="nav-ico">{n.icon}</span><span className="nav-label">{n.label}</span>
            {n.id === 'review' && due > 0 && <span className="badge">{due}</span>}
          </a>
        ))}
        <button className="nav-item search-btn" onClick={onSearch}>
          <span className="nav-ico">🔍</span><span className="nav-label">Search</span>
          <kbd>{mac ? '⌘' : 'Ctrl'} K</kbd>
        </button>
        <div className="side-spacer" />
        <button className="nav-item" onClick={() => { setPref('sound', !prefs.sound); if (!prefs.sound) setTimeout(sfx.correct, 30) }}>
          <span className="nav-ico">{prefs.sound ? '🔊' : '🔇'}</span><span className="nav-label">Sound {prefs.sound ? 'on' : 'off'}</span>
        </button>
        <button className="nav-item" onClick={() => { toggleTheme(); force((n) => n + 1) }}>
          <span className="nav-ico">{currentTheme() === 'dark' ? '☀️' : '🌙'}</span><span className="nav-label">Theme</span>
        </button>
      </nav>
      <div className="mobile-top">
        <span className="chip fire on">🔥 {s.current}</span>
        <span className="chip xp">⚡ {p.xp}</span>
        <span className="chip lvl">Lv {levelOf(p.xp).level}</span>
        <button className="icon-btn" aria-label={prefs.sound ? 'Mute' : 'Unmute'} onClick={() => setPref('sound', !prefs.sound)}>{prefs.sound ? '🔊' : '🔇'}</button>
        <button className="icon-btn" aria-label="Search" onClick={onSearch}>🔍</button>
      </div>
      <main className="main">{children}</main>
      <Rail />
      <nav className="bottom">
        {NAV.map((n) => (
          <a key={n.id} href={n.id ? href(n.id) : href()} className={'bnav' + (route === n.id ? ' active' : '')} aria-label={n.label}>
            {n.icon}{n.id === 'review' && due > 0 && <span className="badge">{due}</span>}
          </a>
        ))}
      </nav>
    </div>
  )
}
