type KhandaProps = {
  className?: string
  title?: string
}

// Khanda geometry adapted from the public-domain Wikimedia Commons "Khanda.svg".
export function KhandaPaths() {
  return (
    <>
      <path d="M114.877 309.764c18.046-10.995 38.956-15.966 70.434-36.418 26.38-17.141 48.25-29.316 75.218-78.287 41.117-74.668-23.026-123.665-23.026-123.665s67.425 23.7 65.455 90.145c-1.97 66.445-31.994 95.986-46.376 111.807-15.2 16.719-24.046 45.267-22.37 46.384l-40.131-33.082c-26.402 15.391-53.042 24.996-79.204 40.864 0 0 6.925 15.211-7.713 20.605-9.158 3.375-13.96 1.322-16.434-3.88-2.828-5.943-.89-19.22 24.147-34.473z" />
      <path d="M188.123 309.764c-18.046-10.995-38.956-15.966-70.434-36.418-26.381-17.141-48.251-29.316-75.218-78.287C1.354 120.391 65.497 71.394 65.497 71.394S-1.928 95.094.042 161.539c1.97 66.445 31.994 95.986 46.376 111.807 15.2 16.719 24.046 45.267 22.37 46.384l40.131-33.082c26.402 15.391 53.042 24.996 79.204 40.864 0 0-6.925 15.211 7.713 20.605 9.158 3.375 13.959 1.322 16.434-3.88 2.828-5.943.889-19.22-24.147-34.473z" />
      <path d="M151.5 44.183c-52.403 0-94.948 42.544-94.948 94.948 0 52.403 42.545 94.948 94.948 94.948 52.403 0 94.948-42.545 94.948-94.948 0-52.404-42.545-94.948-94.948-94.948zm0 18.178c42.37 0 76.77 34.399 76.77 76.77 0 42.37-34.4 76.77-76.77 76.77s-76.77-34.4-76.77-76.77c0-42.371 34.4-76.77 76.77-76.77z" />
      <path d="M139.943 260.95c-10.099-7.418-22.722-13.943-36.098-20.462 36.481-62.959 34.407-129.809 1.226-198.015C123.724 31.617 139.186 17.718 151.423.74l.287.398c12.191 16.797 27.559 30.564 46.065 41.336-33.181 68.206-35.255 135.056 1.226 198.015-13.376 6.52-26 13.043-36.098 20.462v78.12c5.162 3.456 8.54 9.179 8.54 15.648 0 10.543-8.971 19.102-20.02 19.102s-20.02-8.56-20.02-19.102c0-6.47 3.378-12.192 8.54-15.648v-78.12z" />
    </>
  )
}

export function Khanda({ className, title = 'Khanda' }: KhandaProps) {
  return (
    <svg viewBox="0 0 303 374" className={className} role="img" aria-label={title} fill="currentColor">
      <KhandaPaths />
    </svg>
  )
}

export function NishanSahib({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 120 600"
      className={className}
      style={style}
      role="img"
      aria-label="Nishan Sahib, the saffron Sikh flag bearing the Khanda, flying in the Gurudwara courtyard"
    >
      <defs>
        <linearGradient id="nishan-flag" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#E9781A" />
          <stop offset="0.6" stopColor="#F08A24" />
          <stop offset="1" stopColor="#F59E3E" />
        </linearGradient>
        <linearGradient id="nishan-pole" x1="0" x2="1">
          <stop offset="0" stopColor="#C96A12" />
          <stop offset="0.5" stopColor="#F59A3A" />
          <stop offset="1" stopColor="#C96A12" />
        </linearGradient>
      </defs>

      <g className="flag-wave">
        <path d="M97 52 L8 118 L97 186 Z" fill="url(#nishan-flag)" />
        <path d="M97 52 L8 118 L97 186" fill="none" stroke="#B85E10" strokeWidth="1" opacity="0.5" />
        <g transform="translate(52 96) scale(0.14)" fill="#1E2E5C">
          <KhandaPaths />
        </g>
      </g>

      <rect x="96" y="40" width="7" height="536" rx="2" fill="url(#nishan-pole)" />
      {Array.from({ length: 18 }).map((_, i) => (
        <line
          key={i}
          x1="96"
          x2="103"
          y1={70 + i * 28}
          y2={82 + i * 28}
          stroke="#B85E10"
          strokeWidth="1"
          opacity="0.55"
        />
      ))}
      <g transform="translate(91.5 6) scale(0.056)" fill="#C5A15C">
        <KhandaPaths />
      </g>
      <rect x="86" y="572" width="27" height="10" rx="1.5" fill="#EEE9DF" />
      <rect x="82" y="580" width="35" height="14" rx="1.5" fill="#E2DACB" stroke="#C5A15C" strokeWidth="1" />
    </svg>
  )
}

export function IkOnkar({ className }: { className?: string }) {
  return (
    <span lang="pa" className={className} role="img" aria-label="Ik Onkar">
      ੴ
    </span>
  )
}
