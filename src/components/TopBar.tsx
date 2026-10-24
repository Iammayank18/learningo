import { t } from '../lib/i18n'

export function TopBar({ progress, onExit, mistakes, combo = 0 }: { progress: number; onExit: () => void; mistakes?: number; combo?: number }) {
  return (
    <header className="topbar">
      <button className="icon-btn" aria-label={t('topbar.exit')} onClick={onExit}>✕</button>
      <div className="pbar" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
        <div className="pbar-fill" style={{ width: `${Math.max(4, progress * 100)}%` }} />
      </div>
      {combo >= 3 && <span key={combo} className="combo-pill">🔥 {t('topbar.combo', { n: combo })}</span>}
      {mistakes !== undefined && <span className="mistakes" title={t('topbar.mistakes')}>🙈 {mistakes}</span>}
    </header>
  )
}
