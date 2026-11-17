'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { getWeddingTimestamp } from '@/lib/wedding-date'

interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function computeRemaining(target: number): Remaining {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

function Digit({ value }: { value: string }) {
  const reduce = useReducedMotion()
  return (
    <span className="relative inline-flex h-14 w-10 items-center justify-center overflow-hidden rounded-[5px] bg-gradient-to-b from-[#9a5761] to-[#7d414a] font-serif text-4xl font-medium text-[#f7f1e6] shadow-[0_6px_14px_-6px_rgb(93_40_48/0.6),inset_0_1px_0_rgb(255_255_255/0.15)] sm:h-20 sm:w-14 sm:text-5xl">
      <span aria-hidden="true" className="absolute inset-x-0 top-1/2 z-10 h-px bg-black/25" />
      <span aria-hidden="true" className="absolute top-1/2 -left-0.5 z-10 h-3 w-1 -translate-y-1/2 rounded-sm bg-gold/80" />
      <span aria-hidden="true" className="absolute top-1/2 -right-0.5 z-10 h-3 w-1 -translate-y-1/2 rounded-sm bg-gold/80" />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={reduce ? { opacity: 0 } : { y: '-60%', opacity: 0, rotateX: 70 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={reduce ? { opacity: 0 } : { y: '60%', opacity: 0, rotateX: -70 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Unit({ value, label, minDigits = 2 }: { value: number | null; label: string; minDigits?: number }) {
  const text = value === null ? '-'.repeat(minDigits) : String(value).padStart(minDigits, '0')
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1">
        {text.split('').map((d, i) => (
          <Digit key={`${label}-${text.length - i}`} value={d} />
        ))}
      </div>
      <span className="eyebrow text-[0.58rem] text-ink/70">{label}</span>
    </div>
  )
}

export function CountdownTimer() {
  const [remaining, setRemaining] = useState<Remaining | null>(null)

  useEffect(() => {
    const target = getWeddingTimestamp()
    const tick = () => setRemaining(computeRemaining(target))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const done =
    remaining !== null && remaining.days + remaining.hours + remaining.minutes + remaining.seconds === 0

  if (done) {
    return <p className="py-6 font-script text-4xl text-burgundy sm:text-5xl">Today, our forever begins.</p>
  }

  return (
    <div
      role="timer"
      aria-label={
        remaining
          ? `${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes remaining`
          : 'Loading countdown'
      }
      className="grid grid-cols-2 gap-x-6 gap-y-8 sm:flex sm:justify-center sm:gap-6"
    >
      <Unit value={remaining?.days ?? null} label="Days" />
      <Unit value={remaining?.hours ?? null} label="Hours" />
      <Unit value={remaining?.minutes ?? null} label="Minutes" />
      <Unit value={remaining?.seconds ?? null} label="Seconds" />
    </div>
  )
}
