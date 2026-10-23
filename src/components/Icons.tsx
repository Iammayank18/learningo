/** Small original SVG icon set used on the learning path and in the rail. */
export const StarIcon = ({ size = 38 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 6.5 L24 14.9 L33.2 16.1 L26.5 22.5 L28.2 31.6 L20 27.2 L11.8 31.6 L13.5 22.5 L6.8 16.1 L16 14.9Z" fill="#fff" stroke="#fff" strokeWidth="4.5" strokeLinejoin="round" />
  </svg>
)
export const LockIcon = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <path d="M10.5 14 V10.5 a5.5 5.5 0 0 1 11 0 V14" fill="none" stroke="currentColor" strokeWidth="3.6" /><rect x="6.5" y="13" width="19" height="15" rx="4.5" fill="currentColor" />
  </svg>
)
export const CheckIcon = ({ size = 34 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true"><path d="M7 17 L13.5 23.5 L25 9" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const ChestIcon = ({ size = 54, open = false, dim = false }: { size?: number; open?: boolean; dim?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true" style={dim ? { filter: 'grayscale(1) opacity(.55)' } : undefined}>
    <rect x="6" y="24" width="48" height="28" rx="5" fill="#b8793f" /><rect x="6" y="24" width="48" height="8" fill="#9a6230" />
    {open ? <path d="M6 24 L12 8 H48 L54 24Z" fill="#cf9157" transform="translate(0 -6) rotate(-4 30 24)" /> : <path d="M6 26 V20 a10 10 0 0 1 10 -10 H44 a10 10 0 0 1 10 10 V26Z" fill="#cf9157" />}
    <rect x="6" y="30" width="48" height="5" fill="#f2c14e" /><rect x="26" y="29" width="8" height="12" rx="2" fill="#ffd866" stroke="#c9962e" strokeWidth="1.5" />
    {open && <g fill="#ffd866"><circle cx="20" cy="18" r="3" /><circle cx="32" cy="12" r="3.5" /><circle cx="42" cy="19" r="3" /></g>}
  </svg>
)
export const TrophyIcon = ({ size = 54, dim = false }: { size?: number; dim?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true" style={dim ? { filter: 'grayscale(1) opacity(.5)' } : undefined}>
    <path d="M16 8 H44 V24 a14 14 0 0 1 -28 0Z" fill="#ffc800" /><path d="M16 12 H8 a6 6 0 0 0 6 14 H17 M44 12 H52 a6 6 0 0 1 -6 14 H43" fill="none" stroke="#e5a900" strokeWidth="4" strokeLinecap="round" />
    <rect x="26" y="36" width="8" height="10" fill="#e5a900" /><rect x="18" y="46" width="24" height="7" rx="3" fill="#ffd34d" />
    <path d="M30 14 L32.6 19.4 L38.4 20 L34 24 L35.4 29.8 L30 26.8 L24.6 29.8 L26 24 L21.6 20 L27.4 19.4Z" fill="#fff4b8" />
  </svg>
)
export const BoltIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 2 L5 13.5 H11 L9.5 22 L19 9.5 H12.5Z" fill="#ffc800" stroke="#e5a900" strokeWidth="1.5" strokeLinejoin="round" /></svg>
)
export const FastIcon = ({ size = 34 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true"><path d="M6 7 L16 16 L6 25Z M16 7 L26 16 L16 25Z" fill="#fff" /></svg>
)
