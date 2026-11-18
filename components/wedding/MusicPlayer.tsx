
'use client'

import { Music2, Pause } from 'lucide-react'
import { useWeddingMusic } from '@/components/wedding/WeddingMusicContext'
import { cn } from '@/lib/utils'

export function MusicPlayer() {
  const { status, toggle } = useWeddingMusic()

  const playing = status === 'playing'

  const label =
    status === 'unavailable'
      ? 'Music unavailable'
      : playing
        ? 'Music on'
        : 'Music off'

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      aria-pressed={playing}
      aria-label={playing ? 'Pause background music' : 'Play background music'}
      disabled={status === 'unavailable'}
      className={cn(
        'fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[65] inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-ivory/85 py-2.5 pr-4 pl-3 text-ink shadow-[0_8px_24px_-10px_rgb(93_75_67/0.45)] backdrop-blur-md transition-all hover:border-gold/60 hover:text-burgundy focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60 sm:right-6 sm:bottom-6',
      )}
    >
      <span className="relative grid size-6 place-items-center">
        {playing ? (
          <Pause aria-hidden="true" className="size-4" />
        ) : (
          <Music2 aria-hidden="true" className="size-4" />
        )}

        {playing && (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-rose/20"
          />
        )}
      </span>

      <span className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.18em]">
        {label}
      </span>
    </button>
  )
}
