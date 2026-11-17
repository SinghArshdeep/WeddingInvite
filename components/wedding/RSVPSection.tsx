import { FloralDivider } from './FloralDivider'
import { ScrollReveal } from './ScrollReveal'

export function RSVPSection() {
  return (
    <section id="families" aria-labelledby="families-title" className="paper-section px-6 pb-28 sm:pb-36">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <FloralDivider variant="sprig" />
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <h2 id="families-title" className="mt-8 font-script text-[clamp(2.75rem,9vw,4.5rem)] leading-tight text-ink">
            Two Families. One Beautiful Beginning.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.25} className="mt-6 space-y-1 font-serif text-xl italic text-ink/85 sm:text-2xl">
          <p>The love that raised us.</p>
          <p>The blessings that bring us together.</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
