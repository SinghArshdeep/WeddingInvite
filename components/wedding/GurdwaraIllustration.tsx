'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'

export function GurdwaraIllustration() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[46svh] min-h-[260px] w-full sm:h-[52svh] lg:h-[58svh]"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 88%, transparent 100%)',
      }}
    >
      <Image
        src="/images/gurdwara.png"
        alt="Watercolour illustration of a white marble Gurudwara with golden domes beside a sacred sarovar, framed by mountains and flowering trees"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_78%] mix-blend-multiply"
      />
    </motion.div>
  )
}
