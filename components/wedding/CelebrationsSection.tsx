'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import { weddingConfig, type CelebrationEvent } from '@/config/wedding'
import { EventLightbox } from './EventLightbox'
import { FloralDivider } from './FloralDivider'
import { ScrollReveal } from './ScrollReveal'
import { SectionHeading } from './SectionHeading'

export function CelebrationsSection() {
  const [active, setActive] = useState<CelebrationEvent | null>(null)
  const close = useCallback(() => setActive(null), [])
  const events = weddingConfig.events

  return (
    <section id="celebrations" aria-labelledby="celebrations-title" className="paper-section px-5 pb-24 sm:pb-32">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="mb-10">
          <FloralDivider />
        </ScrollReveal>
        <SectionHeading
          id="celebrations-title"
          eyebrow="The festivities"
          title="The Celebrations"
          subtitle="Come for the rituals. Stay for the memories."
        />

        <ul className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {events.map((event, i) => (
            <ScrollReveal key={event.src} delay={i * 0.12} className="mx-auto w-full max-w-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setActive(event)}
                  aria-label={`View ${event.title || `invitation ${i + 1}`} in full`}
                  className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <div className="relative overflow-hidden shadow-[0_14px_34px_-16px_rgb(93_75_67/0.5)] ring-1 ring-ink/10 transition-all duration-700 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_44px_-18px_rgb(93_75_67/0.55)]">
                    <Image
                      src={event.src}
                      alt={event.alt}
                      width={event.width}
                      height={event.height}
                      loading="lazy"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
                      className="h-auto w-full transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  {event.title ? (
                    <p className="mt-4 text-center font-script text-3xl text-ink">{event.title}</p>
                  ) : null}
                  {event.description ? (
                    <p className="mt-1 text-center font-serif italic text-ink/80">{event.description}</p>
                  ) : null}
                </button>
              </li>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal as="p" className="mt-10 text-center font-serif text-base italic text-ink/70">
          Tap an invitation to view it in full.
        </ScrollReveal>
      </div>
      <EventLightbox event={active} onClose={close} />
    </section>
  )
}
