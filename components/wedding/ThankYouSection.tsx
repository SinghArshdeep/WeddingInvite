'use client'

import { ArrowUp } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { weddingConfig } from '@/config/wedding'
import { ScrollReveal } from './ScrollReveal'

export function ThankYouSection() {
  const reduce = useReducedMotion()
  const { first, second } = weddingConfig.families
  return (
    <section
      id="thank-you"
      aria-labelledby="thanks-title"
      className="relative px-6 pt-40 pb-32 text-center text-[#fbf5ec]"
      style={{
        background:
          'linear-gradient(to bottom, var(--color-ivory) 0%, #e6c9c3 12%, #b77a80 30%, #9a5a63 70%, #8c4c55 100%)',
      }}
    >
      <div className="mx-auto max-w-2xl">
        <ScrollReveal as="p" className="eyebrow text-[#fbf5ec]/85">
          Thank you
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <h2 id="thanks-title" className="mt-5 font-script text-[clamp(3rem,11vw,5.5rem)] leading-[1.05]">
            For being a part of our story.
          </h2>
        </ScrollReveal>
        <ScrollReveal as="p" delay={0.3} className="mt-6 font-serif text-xl text-[#fbf5ec]/90 sm:text-2xl">
          We cannot wait to celebrate this beautiful beginning with you.
        </ScrollReveal>
        <ScrollReveal delay={0.45} className="mt-12">
          <p className="eyebrow text-[#fbf5ec]/80">With love</p>
          <p className="mt-4 font-serif text-3xl font-medium sm:text-4xl">
            {first} &amp; {second} Families
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.6} className="mt-16">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
            className="inline-flex items-center gap-2 border-b border-[#fbf5ec]/60 pb-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.28em] transition-colors hover:border-[#fbf5ec] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fbf5ec]"
          >
            Back to the beginning
            <ArrowUp aria-hidden="true" className="size-3.5" />
          </button>
        </ScrollReveal>
      </div>
    </section>
  )
}
