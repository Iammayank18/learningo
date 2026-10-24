// Original chunky nav illustrations (40×40). Flat colours + a darker "lip" tone, Duolingo-ish feel.
type P = { size?: number }
const S = ({ size = 38, children }: P & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="nav-svg">{children}</svg>
)

export const HomeIcon = ({ size }: P) => (
  <S size={size}>
    <rect x="25.5" y="7" width="5" height="10" rx="1.6" fill="#d33131" />
    <path d="M8 19.5 L20 9.5 L32 19.5 V32 a3.5 3.5 0 0 1 -3.5 3.5 H11.5 A3.5 3.5 0 0 1 8 32Z" fill="#ffd27a" />
    <path d="M8 30 H32 V32 a3.5 3.5 0 0 1 -3.5 3.5 H11.5 A3.5 3.5 0 0 1 8 32Z" fill="#f2b04a" />
    <path d="M4.5 21 L20 7.5 L35.5 21" fill="none" stroke="#ff4b4b" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 35.5 V27.5 a4 4 0 0 1 8 0 V35.5Z" fill="#a0612e" />
    <circle cx="22" cy="31" r="0.9" fill="#ffd27a" />
    <circle cx="20" cy="19.5" r="2.8" fill="#84d8ff" stroke="#fff" strokeWidth="1.2" />
  </S>
)

export const BrainIcon = ({ size }: P) => (
  <S size={size}>
    <path d="M20 8.5c-2.6-2.6-8.4-1.8-9.4 2.6-3.9.9-5.2 5.6-2.5 8.6-2 3.1.2 7.6 4 7.6.9 3 5.6 3.8 7.9 1.2 2.3 2.6 7 1.8 7.9-1.2 3.8 0 6-4.5 4-7.6 2.7-3 1.4-7.7-2.5-8.6-1-4.4-6.8-5.2-9.4-2.6Z" fill="#ff8fd2" />
    <path d="M20 9v19.5M14 13.5c1.6.4 2.6 1.6 2.6 3.2M26 13.5c-1.6.4-2.6 1.6-2.6 3.2M12.5 21.5c1.8-.6 3.6 0 4.4 1.4M27.5 21.5c-1.8-.6-3.6 0-4.4 1.4" fill="none" stroke="#e25aae" strokeWidth="2" strokeLinecap="round" />
    <circle cx="30.5" cy="30.5" r="7" fill="#1cb0f6" stroke="var(--nav-cut, #fff)" strokeWidth="2" />
    <path d="M27.4 30.5a3.1 3.1 0 1 1 1.2 2.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M26.2 28.6 L27.4 30.9 L29.6 29.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </S>
)

export const MapIcon = ({ size }: P) => (
  <S size={size}>
    <path d="M4.5 12 L14 8.5 L26 12 L35.5 8.5 V30 L26 33.5 L14 30 L4.5 33.5Z" fill="#58cc02" strokeLinejoin="round" />
    <path d="M14 8.5 L26 12 V33.5 L14 30Z" fill="#89e219" />
    <path d="M4.5 31 L14 27.5 L26 31 L35.5 27.5 V30 L26 33.5 L14 30 L4.5 33.5Z" fill="#46a302" />
    <path d="M8.5 26.5c3-4.5 7-1 10-5.5s6-6.5 9.5-6" fill="none" stroke="#fff" strokeWidth="2.2" strokeDasharray="2.4 2.6" strokeLinecap="round" />
    <path d="M29.5 4.5a5.5 5.5 0 0 1 5.5 5.5c0 4.3-5.5 8.7-5.5 8.7S24 14.3 24 10a5.5 5.5 0 0 1 5.5-5.5Z" fill="#ff4b4b" />
    <circle cx="29.5" cy="10" r="2" fill="#fff" />
  </S>
)

export const BooksIcon = ({ size }: P) => (
  <S size={size}>
    <rect x="4.5" y="27" width="31" height="8.5" rx="2.5" fill="#1cb0f6" />
    <rect x="28" y="28.8" width="5.5" height="5" rx="1" fill="#fff" />
    <rect x="7" y="18" width="27" height="8.5" rx="2.5" fill="#58cc02" />
    <rect x="9" y="19.8" width="5.5" height="5" rx="1" fill="#fff" />
    <g transform="rotate(-8 20 13)">
      <rect x="8.5" y="9" width="23" height="8.5" rx="2.5" fill="#ff4b4b" />
      <rect x="24" y="10.8" width="5.5" height="5" rx="1" fill="#fff" />
    </g>
    <path d="M17.5 27 V35.5 M20 18 V26.5" stroke="rgba(0,0,0,.15)" strokeWidth="2" />
  </S>
)

export const ChartIcon = ({ size }: P) => (
  <S size={size}>
    <rect x="5.5" y="22" width="8" height="13.5" rx="2.5" fill="#1cb0f6" />
    <rect x="16" y="15" width="8" height="20.5" rx="2.5" fill="#ffc800" />
    <rect x="26.5" y="8" width="8" height="27.5" rx="2.5" fill="#58cc02" />
    <path d="M5.5 32h8v1a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 5.5 33Zm10.5 0h8v1a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 16 33Zm10.5 0h8v1a2.5 2.5 0 0 1-2.5 2.5h-3a2.5 2.5 0 0 1-2.5-2.5Z" fill="rgba(0,0,0,.18)" />
    <path d="M30.5 2.5l1.3 2.7 2.9.4-2.1 2 .5 2.9-2.6-1.4-2.6 1.4.5-2.9-2.1-2 2.9-.4Z" fill="#ffc800" />
  </S>
)

export const SearchIcon = ({ size }: P) => (
  <S size={size}>
    <path d="M25 25 L34 34" stroke="#ff9600" strokeWidth="6.5" strokeLinecap="round" />
    <circle cx="17" cy="17" r="10.5" fill="#c6edff" stroke="#1cb0f6" strokeWidth="4.5" />
    <path d="M11.5 15a6 6 0 0 1 4.5-4.6" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
  </S>
)

export const SpeakerIcon = ({ size, on }: P & { on: boolean }) => (
  <S size={size}>
    <path d="M7 15.5h5.5L20.5 9v22l-8-6.5H7a2.5 2.5 0 0 1-2.5-2.5v-4A2.5 2.5 0 0 1 7 15.5Z" fill="#ffc800" />
    <path d="M4.5 21h8l8 6.5V31l-8-6.5H7A2.5 2.5 0 0 1 4.5 22Z" fill="#e5a800" />
    {on ? (
      <path d="M25 15.5a6.5 6.5 0 0 1 0 9M29 11.5a12 12 0 0 1 0 17" fill="none" stroke="#1cb0f6" strokeWidth="3.2" strokeLinecap="round" />
    ) : (
      <path d="M25.5 15.5l8 9M33.5 15.5l-8 9" stroke="#ff4b4b" strokeWidth="3.4" strokeLinecap="round" />
    )}
  </S>
)

export const MoonIcon = ({ size }: P) => (
  <S size={size}>
    <path d="M24 5.5a15 15 0 1 0 11 24.5A12 12 0 0 1 24 5.5Z" fill="#ffc800" />
    <circle cx="14" cy="22" r="2.2" fill="#e5a800" /><circle cx="20" cy="29" r="1.5" fill="#e5a800" />
    <path d="M31 7.5l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3Z" fill="#84d8ff" />
  </S>
)

export const SunIcon = ({ size }: P) => (
  <S size={size}>
    <g stroke="#ffc800" strokeWidth="3.4" strokeLinecap="round">
      <path d="M20 3.5v4M20 32.5v4M3.5 20h4M32.5 20h4M8.3 8.3l2.8 2.8M28.9 28.9l2.8 2.8M8.3 31.7l2.8-2.8M28.9 11.1l2.8-2.8" />
    </g>
    <circle cx="20" cy="20" r="8.5" fill="#ff9600" />
    <path d="M15.5 18a5 5 0 0 1 3.5-3" fill="none" stroke="#ffd27a" strokeWidth="2.2" strokeLinecap="round" />
  </S>
)

export const GearIcon = ({ size }: P) => (
  <S size={size}>
    <path d="M20 4.5l3 .5.9 3.4a12 12 0 0 1 2.7 1.6l3.4-1 2.2 3.8-2.5 2.5a12 12 0 0 1 0 3.1l2.5 2.5-2.2 3.8-3.4-1a12 12 0 0 1-2.7 1.6L23 31.5l-3 .5-3-.5-.9-3.4a12 12 0 0 1-2.7-1.6l-3.4 1-2.2-3.8 2.5-2.5a12 12 0 0 1 0-3.1l-2.5-2.5 2.2-3.8 3.4 1a12 12 0 0 1 2.7-1.6L17 5Z" fill="#afafaf" transform="translate(0 1.5)" />
    <path d="M20 4.5l3 .5.9 3.4a12 12 0 0 1 2.7 1.6l3.4-1 2.2 3.8-2.5 2.5a12 12 0 0 1 0 3.1l2.5 2.5-2.2 3.8-3.4-1a12 12 0 0 1-2.7 1.6L23 31.5l-3 .5-3-.5-.9-3.4a12 12 0 0 1-2.7-1.6l-3.4 1-2.2-3.8 2.5-2.5a12 12 0 0 1 0-3.1l-2.5-2.5 2.2-3.8 3.4 1a12 12 0 0 1 2.7-1.6L17 5Z" fill="#cfcfcf" />
    <circle cx="20" cy="18" r="5.5" fill="var(--nav-cut, #fff)" />
    <circle cx="20" cy="18" r="3" fill="#1cb0f6" />
  </S>
)

export const CodeIcon = ({ size }: P) => (
  <S size={size}>
    <rect x="4.5" y="8" width="31" height="24" rx="5" fill="#3c4f58" />
    <rect x="4.5" y="8" width="31" height="7" rx="3.5" fill="#1cb0f6" />
    <circle cx="9.5" cy="11.5" r="1.3" fill="#fff" />
    <circle cx="13.5" cy="11.5" r="1.3" fill="#fff" />
    <path d="M14.5 21 L10.5 24.5 L14.5 28" fill="none" stroke="#58cc02" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M25.5 21 L29.5 24.5 L25.5 28" fill="none" stroke="#58cc02" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 20 L18 29" fill="none" stroke="#ffc800" strokeWidth="2.6" strokeLinecap="round" />
  </S>
)
