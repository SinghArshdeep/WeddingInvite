const PETALS = [
  { left: 8, size: 10, duration: 19, delay: 0, drift: 60 },
  { left: 22, size: 7, duration: 23, delay: 6, drift: -40 },
  { left: 41, size: 9, duration: 21, delay: 11, drift: 50 },
  { left: 63, size: 8, duration: 25, delay: 3, drift: -60 },
  { left: 78, size: 11, duration: 20, delay: 9, drift: 40 },
  { left: 91, size: 7, duration: 24, delay: 15, drift: -30 },
]

export function HeroPetals() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.3,
              opacity: 0,
              animation: `drift-petal ${p.duration}s linear ${p.delay}s infinite`,
              '--drift': `${p.drift}px`,
              '--spin': `${i % 2 ? -320 : 380}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
