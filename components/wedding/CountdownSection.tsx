import { weddingConfig } from '@/config/wedding'
import { getWeddingDateLabels } from '@/lib/wedding-date'
import { CountdownTimer } from './CountdownTimer'
import { FloralDivider } from './FloralDivider'
import { ScrollReveal } from './ScrollReveal'

function formatTime(time: string) {
  const [h, m] = time.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${suffix}`
}

export function CountdownSection() {
  const labels = getWeddingDateLabels()
  const tzLabel = weddingConfig.wedding.timeZone === 'Asia/Kolkata' ? 'IST' : weddingConfig.wedding.timeZone
  return (
    <section id="countdown" aria-labelledby="countdown-title" className="paper-section px-5 pb-24 sm:pb-32">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal as="p" className="eyebrow text-ink/75">
          Every moment brings us closer
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <h2 id="countdown-title" className="mt-4 font-serif text-[clamp(2.25rem,8vw,3.25rem)] font-medium text-burgundy">
            Countdown to Forever
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-10">
          <FloralDivider variant="sprig" />
          <div className="relative mx-auto my-4 max-w-2xl rounded-[3rem] border border-gold/45 p-1.5 sm:rounded-full">
            <div className="rounded-[2.6rem] border border-gold/30 bg-ivory/60 px-6 py-8 sm:rounded-full sm:px-12 sm:py-10">
              <CountdownTimer />
            </div>
          </div>
          <FloralDivider variant="sprig" flip />
        </ScrollReveal>

        <ScrollReveal as="p" delay={0.3} className="mt-8 font-serif text-lg text-ink/85">
          {labels.full} &middot; {formatTime(weddingConfig.wedding.time)} {tzLabel}
        </ScrollReveal>
      </div>
    </section>
  )
}
