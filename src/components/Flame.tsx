/** Streak flame — original vector, flickers via CSS. */
export function Flame({ size = 120, dim = false }: { size?: number; dim?: boolean }) {
  return (
    <svg className={'flame' + (dim ? ' dim' : '')} width={size} height={size * 1.15} viewBox="0 0 100 115" aria-hidden="true">
      <path className="flame-out" d="M50 4 C58 24 84 38 84 70 C84 96 68 110 50 110 C32 110 16 96 16 70 C16 54 26 44 32 34 C34 46 40 52 44 52 C40 34 42 16 50 4Z" fill={dim ? '#9aa6ab' : '#ff9600'} />
      <path className="flame-mid" d="M50 34 C56 50 72 58 72 78 C72 94 62 104 50 104 C38 104 28 94 28 78 C28 66 36 60 40 52 C42 60 46 62 48 62 C46 52 46 42 50 34Z" fill={dim ? '#b9c3c7' : '#ffc800'} />
      <path className="flame-in" d="M50 66 C54 74 62 78 62 88 C62 97 57 102 50 102 C43 102 38 97 38 88 C38 80 46 76 50 66Z" fill={dim ? '#dfe6e8' : '#fff3a8'} />
    </svg>
  )
}
