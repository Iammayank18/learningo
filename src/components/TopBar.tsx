export function TopBar({ progress, onExit, mistakes }: { progress: number; onExit: () => void; mistakes?: number }) {
  return (
    <header className="topbar">
      <button className="icon-btn" aria-label="Exit lesson" onClick={onExit}>✕</button>
      <div className="pbar" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
        <div className="pbar-fill" style={{ width: `${Math.max(4, progress * 100)}%` }} />
      </div>
      {mistakes !== undefined && <span className="mistakes" title="Galtiyaan">🙈 {mistakes}</span>}
    </header>
  )
}
