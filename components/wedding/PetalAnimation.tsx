'use client'

import { useEffect, useMemo } from 'react'

interface PetalAnimationProps {
  onComplete: () => void
  count?: number
}

const MAX_DURATION_MS = 7500

export function PetalAnimation({ onComplete, count = 26 }: PetalAnimationProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 9 + Math.random() * 12,
        duration: 4.2 + Math.random() * 2.6,
        delay: Math.random() * 1.6,
        drift: (Math.random() - 0.5) * 220,
        spin: (Math.random() > 0.5 ? 1 : -1) * (240 + Math.random() * 360),
        hue: Math.random() > 0.5,
      })),
    [count],
  )

  useEffect(() => {
    const id = window.setTimeout(onComplete, MAX_DURATION_MS)
    return () => window.clearTimeout(id)
  }, [onComplete])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.35,
              opacity: 0,
              background: p.hue
                ? 'linear-gradient(135deg,#e7b9bb,#c98f95 60%,#a96870)'
                : 'linear-gradient(135deg,#d9a3a6,#b77a80 60%,#8c4c55)',
              animation: `drift-petal ${p.duration}s cubic-bezier(.35,.1,.55,1) ${p.delay}s forwards`,
              '--drift': `${p.drift}px`,
              '--spin': `${p.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
