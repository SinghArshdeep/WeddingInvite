import { ScrollReveal } from './ScrollReveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  id?: string
}

export function SectionHeading({ eyebrow, title, subtitle, id }: SectionHeadingProps) {
  return (
    <div className="text-center">
      <ScrollReveal as="p" className="eyebrow text-ink/75">
        {eyebrow}
      </ScrollReveal>
      <ScrollReveal delay={0.12}>
        <h2 id={id} className="mt-4 font-script text-[clamp(3rem,11vw,4.75rem)] leading-tight text-ink">
          {title}
        </h2>
      </ScrollReveal>
      {subtitle ? (
        <ScrollReveal as="p" delay={0.24} className="mt-3 font-serif text-lg italic text-ink/85 sm:text-xl">
          {subtitle}
        </ScrollReveal>
      ) : null}
    </div>
  )
}
