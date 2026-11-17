'use client'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { CelebrationEvent } from '@/config/wedding'

interface EventLightboxProps {
  event: CelebrationEvent | null
  onClose: () => void
}

export function EventLightbox({ event, onClose }: EventLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!event) return
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [event, onClose])

  return (
    <AnimatePresence>
      {event ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={event.title || event.alt}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#2e2420]/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-full"
            initial={{ scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={event.src}
              alt={event.alt}
              width={event.width}
              height={event.height}
              sizes="(max-width: 640px) 92vw, 560px"
              className="h-auto max-h-[88svh] w-auto max-w-[92vw] object-contain shadow-2xl"
            />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close invitation"
              className="absolute -top-3 -right-3 grid size-10 place-items-center rounded-full bg-ivory text-ink shadow-lg transition-colors hover:text-burgundy focus-visible:outline-2 focus-visible:outline-gold"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
