'use client'

import { useCallback, useState } from 'react'
import { getWeddingDateLabels } from '@/lib/wedding-date'
import { FloralDivider } from './FloralDivider'
import { PetalAnimation } from './PetalAnimation'
import { ScratchCard } from './ScratchCard'
import { ScrollReveal } from './ScrollReveal'
import { SectionHeading } from './SectionHeading'

export function DateRevealSection() {
  const labels = getWeddingDateLabels()
  const [petals, setPetals] = useState(false)
  const handleReveal = useCallback(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPetals(true)
  }, [])
  const clearPetals = useCallback(() => setPetals(false), [])

  return (
    <section id="date" aria-labelledby="date-title" className="paper-section px-5 pb-24 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          id="date-title"
          eyebrow="A little secret awaits"
          title="A Date to Remember"
          subtitle="Scratch the keepsake to reveal the special day."
        />
        <ScrollReveal delay={0.2} className="mt-12">
          <ScratchCard onReveal={handleReveal}>
            <p className="eyebrow text-ink/80">{labels.weekday}</p>
            <p className="mt-3 font-serif text-[clamp(2.25rem,8vw,3.5rem)] font-medium leading-none text-burgundy">
              {labels.day} {labels.month} {labels.year}
            </p>
            <p className="mt-3 font-script text-3xl text-ink sm:text-4xl">Our forever begins.</p>
          </ScratchCard>
        </ScrollReveal>
        <ScrollReveal className="mt-20">
          <FloralDivider variant="sprig" />
        </ScrollReveal>
      </div>
      {petals ? <PetalAnimation onComplete={clearPetals} /> : null}
    </section>
  )
}
