'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Memory } from '@/config/wedding'

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 16"
      className={`h-4 w-20 sm:w-24 ${direction === 'left' ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M2 8h88" />
      <path d="M84 3l7 5-7 5" />
      <path d="M8 8l-5-5M8 8l-5 5M14 8l-5-5M14 8l-5 5M20 8l-5-5M20 8l-5 5" />
    </svg>
  )
}

const pad = (n: number) => String(n).padStart(2, '0')

export function PhotoCarousel({ memories }: { memories: Memory[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const items = Array.from(track.children) as HTMLElement[]
    const left = track.scrollLeft
    let closest = 0
    let best = Infinity
    items.forEach((el, i) => {
      const dist = Math.abs(el.offsetLeft - track.offsetLeft - left)
      if (dist < best) {
        best = dist
        closest = i
      }
    })
    const end = left + track.clientWidth >= track.scrollWidth - 4
    setIndex(end ? items.length - 1 : closest)
    setAtStart(left <= 4)
    setAtEnd(end)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    update()
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      track.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current
    const card = track?.children[0] as HTMLElement | undefined
    if (!track || !card) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Our moments photographs"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') scrollByCard(1)
        if (e.key === 'ArrowLeft') scrollByCard(-1)
      }}
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-6 py-8 focus-visible:outline-2 focus-visible:outline-offset-2 sm:gap-7 md:px-2"
      >
        {memories.map((m, i) => (
          <li
            key={m.src}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${memories.length}`}
            className="w-[78%] shrink-0 snap-center sm:w-[calc((100%-1.75rem)/2)] md:snap-start lg:w-[calc((100%-3.5rem)/3)]"
          >
            <figure
              className={`group bg-[#fdfbf6] p-3 pb-5 shadow-[0_10px_30px_-12px_rgb(93_75_67/0.35),0_2px_6px_rgb(93_75_67/0.08)] ring-1 ring-ink/5 transition-transform duration-700 ease-out hover:-translate-y-1.5 ${
                i % 2 ? 'rotate-[0.6deg]' : '-rotate-[0.6deg]'
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 300px"
                  className="object-cover sepia-[0.18] saturate-[0.85] transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgb(93_75_67/0.25)]" />
              </div>
              <figcaption className="mt-4 text-center font-serif text-lg italic text-ink">{m.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-center gap-6 text-rose">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Previous photograph"
          className="p-2 transition-opacity hover:text-burgundy disabled:opacity-30 focus-visible:outline-2"
        >
          <Arrow direction="left" />
        </button>
        <p aria-live="polite" className="font-sans text-xs tracking-[0.2em] text-ink">
          {pad(index + 1)} / {pad(memories.length)}
        </p>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Next photograph"
          className="p-2 transition-opacity hover:text-burgundy disabled:opacity-30 focus-visible:outline-2"
        >
          <Arrow direction="right" />
        </button>
      </div>
    </div>
  )
}
