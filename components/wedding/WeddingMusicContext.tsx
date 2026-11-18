
'use client'

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { weddingConfig } from '@/config/wedding'

export type MusicStatus = 'idle' | 'playing' | 'paused' | 'unavailable'

type WeddingMusicContextType = {
  status: MusicStatus
  play: () => Promise<void>
  pause: () => void
  toggle: () => Promise<void>
}

const WeddingMusicContext = createContext<WeddingMusicContextType | null>(null)

export function WeddingMusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [status, setStatus] = useState<MusicStatus>('idle')

  const play = useCallback(async () => {
    const audio = audioRef.current

    if (!audio || status === 'unavailable') return

    try {
      audio.volume = 0.55
      await audio.play()
    } catch {
      setStatus('paused')
    }
  }, [status])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || status === 'unavailable') return

    if (audio.paused) {
      await play()
    } else {
      pause()
    }
  }, [play, pause, status])

  return (
    <WeddingMusicContext.Provider value={{ status, play, pause, toggle }}>
      <audio
        ref={audioRef}
        src={weddingConfig.music.src}
        loop
        preload="none"
        onPlay={() => setStatus('playing')}
        onPause={() => setStatus('paused')}
        onError={() => setStatus('unavailable')}
      />

      {children}
    </WeddingMusicContext.Provider>
  )
}

export function useWeddingMusic() {
  const context = useContext(WeddingMusicContext)

  if (!context) {
    throw new Error(
      'useWeddingMusic must be used inside WeddingMusicProvider'
    )
  }

  return context
}
