import { t } from '../lib/i18n'

export type OwlMood = 'idle' | 'happy' | 'sad' | 'cheer' | 'sleep'

/** Original owl mascot drawn in SVG so it can change pose/expression. */
export function Owl({ mood = 'idle', size = 96 }: { mood?: OwlMood; size?: number }) {
  const sleep = mood === 'sleep'
  const happy = mood === 'happy' || mood === 'cheer'
  const sad = mood === 'sad'
  const cheer = mood === 'cheer'
  const ink = '#3b4658'
  return (
    <svg className={'owl owl-' + mood} width={size} height={size} viewBox="0 0 200 200" role="img" aria-label={t('common.owlMascot')}>
      {/* wings (behind body when down, raised when cheering) */}
      {cheer ? (
        <>
          <path className="wing wl" d="M44 118 C20 100 10 70 22 44 C40 54 54 80 58 112Z" fill="#8a5434" />
          <path className="wing wr" d="M156 118 C180 100 190 70 178 44 C160 54 146 80 142 112Z" fill="#8a5434" />
        </>
      ) : null}
      {/* ear tufts + body */}
      <path d="M34 62 L40 22 Q60 30 76 46 Q100 40 124 46 Q140 30 160 22 L166 62 C176 80 176 100 172 120 C168 165 140 188 100 188 C60 188 32 165 28 120 C24 100 24 80 34 62Z" fill="#a66a45" />
      {!cheer && (
        <>
          <path d="M36 112 C48 124 54 142 56 156" stroke="#85573a" strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M164 112 C152 124 146 142 144 156" stroke="#85573a" strokeWidth="9" strokeLinecap="round" fill="none" />
        </>
      )}
      <ellipse cx="100" cy="142" rx="33" ry="40" fill="#f6efcf" />
      {/* feet */}
      <ellipse cx="78" cy="188" rx="17" ry="7" fill="#f39c1f" />
      <ellipse cx="122" cy="188" rx="17" ry="7" fill="#f39c1f" />
      {/* eyes */}
      <circle cx="68" cy="90" r="29" fill="#fff" />
      <circle cx="132" cy="90" r="29" fill="#fff" />
      {sleep ? (
        <>
          <path d="M48 92 Q68 104 88 92" stroke={ink} strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M112 92 Q132 104 152 92" stroke={ink} strokeWidth="6" strokeLinecap="round" fill="none" />
          <text className="zzz" x="150" y="40" fontSize="30" fontWeight="900" fill="#8fa3ab">z</text>
          <text className="zzz z2" x="168" y="22" fontSize="22" fontWeight="900" fill="#8fa3ab">z</text>
        </>
      ) : happy ? (
        <>
          <path d="M52 96 Q68 70 84 96" stroke={ink} strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M116 96 Q132 70 148 96" stroke={ink} strokeWidth="7" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <g className="pupils">
          <circle cx={sad ? 70 : 68} cy={sad ? 100 : 90} r="10" fill={ink} />
          <circle cx={sad ? 130 : 132} cy={sad ? 100 : 90} r="10" fill={ink} />
          <circle cx={sad ? 73 : 71} cy={sad ? 96 : 86} r="3" fill="#fff" />
          <circle cx={sad ? 133 : 135} cy={sad ? 96 : 86} r="3" fill="#fff" />
        </g>
      )}
      {sad && (
        <>
          <path d="M44 64 L84 74" stroke="#6b4129" strokeWidth="6" strokeLinecap="round" />
          <path d="M156 64 L116 74" stroke="#6b4129" strokeWidth="6" strokeLinecap="round" />
          <path className="tear" d="M52 112 q-6 12 0 16 q6 -4 0 -16Z" fill="#6fd0ff" />
        </>
      )}
      {/* beak */}
      {cheer ? (
        <>
          <path d="M86 108 Q100 100 114 108 Q112 128 100 132 Q88 128 86 108Z" fill="#f39c1f" />
          <path d="M92 116 Q100 126 108 116 Q104 124 100 125 Q96 124 92 116Z" fill="#c4512f" />
        </>
      ) : (
        <path d="M89 106 Q100 96 111 106 L100 126Z" fill="#f39c1f" transform={sad ? 'translate(0 4)' : undefined} />
      )}
      {cheer && <circle cx="48" cy="112" r="7" fill="#ff8a8a" opacity=".5" />}
      {cheer && <circle cx="152" cy="112" r="7" fill="#ff8a8a" opacity=".5" />}
    </svg>
  )
}
