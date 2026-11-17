
import { weddingConfig } from '@/config/wedding'
import { FloralDivider } from './FloralDivider'
import { ScrollReveal } from './ScrollReveal'
import { IkOnkar } from './sacred-symbols'

export function InvitationSection() {
  const { couple, gurbani } = weddingConfig

  return (
    <section
      id="invitation"
      aria-labelledby="invitation-title"
      className="paper-section px-5 pb-20 pt-8 sm:px-6 sm:pb-28 sm:pt-12"
    >
      <div className="mx-auto max-w-3xl text-center">

        {/* Sacred opening */}
<ScrollReveal className="flex flex-col items-center">
  <IkOnkar className="font-gurmukhi text-3xl leading-none text-gold sm:text-4xl" />

  <div
    lang="pa"
    className="mt-6 space-y-3 font-gurmukhi text-base leading-none text-ink/85 sm:text-xl"
  >
    {gurbani.gurmukhi.map((line) => (
      <p key={line}>{line}</p>
    ))}
  </div>

  {/* Divider after Gurbani */}
  <div className="mt-8 h-px w-20 bg-gold/70 sm:mt-10 sm:w-200" />
</ScrollReveal>

        {/* Family blessings */}
        <div className="mt-9 sm:mt-12">
          <ScrollReveal as="p" className="eyebrow text-ink/70">
            With the blessings of
          </ScrollReveal>

          <div className="mt-4 space-y-2">
            <ScrollReveal delay={0.15}>
              <p className="font-serif text-lg italic leading-none text-ink/85 sm:text-4xl">
                Late Sdn. Sewa Kaur &amp; Late S. Jagir Singh
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="font-serif text-lg italic leading-none text-ink/85 sm:text-4xl">
                Sdn. Baljeet Kaur &amp; S. Avtar Singh
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Invitation wording */}
        <ScrollReveal delay={0.2} className="mt-4 sm:mt-6">
          <p className="font-serif text-lg italic leading-none text-ink/80 sm:text-2xl">
            Invite you to celebrate the wedding of their
          </p>
          <p className="mt-1 font-serif text-lg italic text-ink/80 sm:text-2xl">
            beloved son
          </p>
        </ScrollReveal>

        {/* Couple's names */}
        <div className="mt-10 font-script text-burgundy sm:mt-6">
          <ScrollReveal delay={0.3} y={24}>
            <h2
              id="invitation-title"
              className="text-[clamp(4.5rem,16vw,8rem)] leading-[0.95]"
            >
              {couple.firstName} Singh
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="my-3 font-serif text-lg italic text-ink/70 sm:my-5 sm:text-2xl">
              with
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5} y={24}>
            <p className="text-[clamp(4.5rem,16vw,8rem)] leading-[0.95]">
              {couple.secondName} Kaur
            </p>
          </ScrollReveal>
        </div>

        {/* Parents of the groom */}
        <ScrollReveal delay={0.3} className="mt-7 sm:mt-9">
          <p className="font-serif text-lg italic leading-none text-ink/85 sm:text-3xl">
            (D/o Sdn. Amarjeet Kaur &amp; S. Prakash Singh)
          </p>
        </ScrollReveal>

        {/* Floral finishing detail */}
        <ScrollReveal className="mt-14 sm:mt-20">
          <FloralDivider />
        </ScrollReveal>

      </div>
    </section>
  )
}
