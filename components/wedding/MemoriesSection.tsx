import { weddingConfig } from '@/config/wedding'
import { FloralDivider } from './FloralDivider'
import { PhotoCarousel } from './PhotoCarousel'
import { ScrollReveal } from './ScrollReveal'
import { SectionHeading } from './SectionHeading'

export function MemoriesSection() {
  return (
    <section id="moments" aria-labelledby="moments-title" className="paper-section scroll-mt-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="px-6">
          <SectionHeading
            id="moments-title"
            eyebrow=""
            title="Moments to treasure"
            subtitle="The little moments. The lasting memories."
          />
        </div>
        <ScrollReveal delay={0.2} className="mt-10">
          <PhotoCarousel memories={weddingConfig.memories} />
        </ScrollReveal>
        <ScrollReveal className="mt-20">
          <FloralDivider />
        </ScrollReveal>
      </div>
    </section>
  )
}
