import { dueCards, levelOf, streakOf, useProgress } from '../lib/store'
import { href } from '../lib/router'
import { toggleTheme, useTheme } from '../lib/theme'
import { Rail } from './Rail'
import { Owl } from './Owl'
import { setPref, usePrefs } from '../lib/prefs'
import { sfx } from '../lib/sound'
import { BooksIcon, BrainIcon, ChartIcon, CodeIcon, HomeIcon, GearIcon, MapIcon, MoonIcon, SearchIcon, SpeakerIcon, SunIcon } from './NavIcons'
import { Flame } from './Flame'
import { t, type MessageKey } from '../lib/i18n'
import { BoltIcon } from './Icons'

const NAV: { id: string; Icon: typeof HomeIcon; labelKey: MessageKey }[] = [
  { id: '', Icon: HomeIcon, labelKey: 'nav.learn' },
  { id: 'review', Icon: BrainIcon, labelKey: 'nav.review' },
  { id: 'roadmaps', Icon: MapIcon, labelKey: 'nav.roadmaps' },
  { id: 'courses', Icon: BooksIcon, labelKey: 'nav.courses' },
  { id: 'code', Icon: CodeIcon, labelKey: 'nav.code' },
  { id: 'stats', Icon: ChartIcon, labelKey: 'nav.progress' },
]

export function Shell({ route, onSearch, children }: { route: string; onSearch: () => void; children: React.ReactNode }) {
  const p = useProgress()
  const prefs = usePrefs()
  const due = dueCards(p).length
  const s = streakOf(p)
  const { theme } = useTheme()
  const mac = /Mac|iPhone|iPad/.test(navigator.platform)
  return (
    <div className="shell">
      <nav className="side">
        <a className="brand" href={href()}><Owl size={36} /><span>{t('nav.brand')}</span></a>
        {NAV.map((n) => (
          <a key={n.id} href={n.id ? href(n.id) : href()} className={'nav-item' + (route === n.id ? ' active' : '')}>
            <span className="nav-ico"><n.Icon /></span><span className="nav-label">{t(n.labelKey)}</span>
            {n.id === 'review' && due > 0 && <span className="badge">{due}</span>}
          </a>
        ))}
        <button className="nav-item search-btn" onClick={onSearch}>
          <span className="nav-ico"><SearchIcon /></span><span className="nav-label">{t('nav.search')}</span>
          <kbd>{mac ? '⌘' : 'Ctrl'} K</kbd>
        </button>
        <div className="side-spacer" />
        <a href={href('settings')} className={'nav-item' + (route === 'settings' ? ' active' : '')}>
          <span className="nav-ico"><GearIcon /></span><span className="nav-label">{t('common.settings')}</span>
        </a>
        <button className="nav-item" onClick={() => { setPref('sound', !prefs.sound); if (!prefs.sound) setTimeout(sfx.correct, 30) }}>
          <span className="nav-ico"><SpeakerIcon on={prefs.sound} /></span><span className="nav-label">{prefs.sound ? t('nav.soundOn') : t('nav.soundOff')}</span>
        </button>
        <button className="nav-item" onClick={() => { sfx.tap(); toggleTheme() }}>
          <span className="nav-ico">{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</span><span className="nav-label">{theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}</span>
        </button>
      </nav>
      <div className="mobile-top">
        <span className={'chip fire' + (s.current ? ' on' : '')}><Flame size={20} dim={!s.current} /> {s.current}</span>
        <span className="chip xp"><BoltIcon size={18} /> {p.xp}</span>
        <span className="chip lvl">{t('nav.levelShort', { n: levelOf(p.xp).level })}</span>
        <button className="icon-btn" aria-label={prefs.sound ? t('nav.mute') : t('nav.unmute')} onClick={() => setPref('sound', !prefs.sound)}><SpeakerIcon size={28} on={prefs.sound} /></button>
        <a className="icon-btn" aria-label={t('common.settings')} href={href('settings')}><GearIcon size={28} /></a>
        <button className="icon-btn" aria-label={t('nav.search')} onClick={onSearch}><SearchIcon size={28} /></button>
      </div>
      <main className="main">{children}</main>
      <Rail />
      <nav className="bottom">
        {NAV.map((n) => (
          <a key={n.id} href={n.id ? href(n.id) : href()} className={'bnav' + (route === n.id ? ' active' : '')} aria-label={t(n.labelKey)}>
            <n.Icon size={34} />{n.id === 'review' && due > 0 && <span className="badge">{due}</span>}
          </a>
        ))}
      </nav>
    </div>
  )
}
