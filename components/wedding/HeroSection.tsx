
'use client'

import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { weddingConfig } from '@/config/wedding'
import { useWeddingMusic } from '@/components/wedding/WeddingMusicContext'
import { GurdwaraIllustration } from './GurdwaraIllustration'
import { HeroPetals } from './HeroPetals'

export function HeroSection() {
  const reduce = useReducedMotion()
  const { play } = useWeddingMusic()

  const { firstName, secondName } = weddingConfig.couple

  const fade = (delay: number, y = 16) => ({
    initial: { opacity: 0, y: reduce ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 1.3,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  })

  const handleUnfold = () => {
    // Start the shared background music
    void play()

    // Scroll to the moments section
    document.getElementById('moments')?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col overflow-hidden bg-parchment"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 50% 30%, #faf3e2 0%, transparent 65%), radial-gradient(ellipse at 0% 0%, #eadcbf 0%, transparent 45%), radial-gradient(ellipse at 100% 10%, #ecdfc4 0%, transparent 40%)',
      }}
    >
      <HeroPetals />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pt-16 pb-4 text-center sm:pt-20">
        <motion.p {...fade(0.1)} className="eyebrow text-ink/80">
          Together, a beautiful beginning
        </motion.p>

        <h1 className="mt-6 font-script text-burgundy">
          <motion.span
            {...fade(0.35, 24)}
            className="block text-[clamp(4.25rem,17vw,8.5rem)] leading-[0.95]"
          >
            {firstName}
          </motion.span>

          <motion.span
            {...fade(0.6, 16)}
            className="block font-serif text-[clamp(2rem,7vw,3.25rem)] italic leading-tight text-rose"
          >
            &amp;
          </motion.span>

          <motion.span
            {...fade(0.85, 24)}
            className="block text-[clamp(4.25rem,17vw,8.5rem)] leading-[0.95]"
          >
            {secondName}
          </motion.span>
        </h1>

        <motion.p
          {...fade(1.15)}
          className="mt-8 font-serif text-xl italic text-ink sm:text-2xl"
        >
          are getting married.
        </motion.p>

        <motion.button
          {...fade(1.4)}
          type="button"
          onClick={handleUnfold}
          className="group mt-8 inline-flex items-center gap-3 border-b border-ink/40 pb-2 font-sans text-[0.68rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors hover:border-burgundy hover:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Unfold the story

          <ArrowDown
            aria-hidden="true"
            className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5"
          />
        </motion.button>
      </div>

      <div className="relative -mt-10">
        <GurdwaraIllustration />

        <p className="absolute inset-x-0 bottom-6 text-center font-serif text-base italic text-ink/80 sm:bottom-10 sm:text-lg">
          A celebration of love, rooted in family.
        </p>
      </div>
    </section>
  )
}
