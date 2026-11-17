'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

const REVEAL_THRESHOLD = 0.45
const BRUSH = 26

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function tornPolygon(seed: number, depth: number, steps = 28) {
  const rand = seeded(seed)
  const pts: string[] = []
  const j = () => rand() * depth
  for (let i = 0; i <= steps; i++) pts.push(`${(i / steps) * 100}% ${j()}%`)
  for (let i = 1; i <= steps; i++) pts.push(`${100 - j() * 0.6}% ${(i / steps) * 100}%`)
  for (let i = steps - 1; i >= 0; i--) pts.push(`${(i / steps) * 100}% ${100 - j()}%`)
  for (let i = steps - 1; i >= 1; i--) pts.push(`${j() * 0.6}% ${(i / steps) * 100}%`)
  return `polygon(${pts.join(',')})`
}

const OUTER_CLIP = tornPolygon(7, 5)
const INNER_CLIP = tornPolygon(19, 7)

interface ScratchCardProps {
  children: ReactNode
  onReveal: () => void
}

export function ScratchCard({ children, onReveal }: ScratchCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const last = useRef<{ x: number; y: number } | null>(null)
  const moves = useRef(0)
  const [revealed, setRevealed] = useState(false)
  const [started, setStarted] = useState(false)

  const paint = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const { width, height } = wrap.getBoundingClientRect()
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalCompositeOperation = 'source-over'

    const g = ctx.createLinearGradient(0, 0, width, height)
    g.addColorStop(0, '#a35f68')
    g.addColorStop(0.5, '#8c4c55')
    g.addColorStop(1, '#7a3f48')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, width, height)

    const rand = seeded(42)
    for (let i = 0; i < (width * height) / 18; i++) {
      ctx.fillStyle = rand() > 0.5 ? 'rgba(255,230,220,0.05)' : 'rgba(60,20,25,0.07)'
      ctx.fillRect(rand() * width, rand() * height, 1.2, 1.2)
    }

    ctx.strokeStyle = 'rgba(214,190,140,0.55)'
    ctx.lineWidth = 1
    ctx.strokeRect(14, 14, width - 28, height - 28)
    ctx.strokeRect(19, 19, width - 38, height - 38)

    ctx.fillStyle = 'rgba(247,241,230,0.92)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const script = getComputedStyle(document.documentElement).getPropertyValue('--font-pinyon') || 'cursive'
    ctx.font = `${Math.min(46, width / 9)}px ${script}, cursive`
    ctx.fillText('Scratch here', width / 2, height / 2 - 8)
    ctx.font = '500 10px system-ui, sans-serif'
    ctx.fillStyle = 'rgba(247,241,230,0.7)'
    ctx.fillText('U N V E I L   T H E   D A T E', width / 2, height / 2 + 30)
  }, [])

  useEffect(() => {
    if (revealed) return
    paint()
    const ro = new ResizeObserver(() => {
      if (!started) paint()
    })
    if (wrapRef.current) ro.observe(wrapRef.current)
    document.fonts?.ready.then(() => {
      if (!started) paint()
    })
    return () => ro.disconnect()
  }, [paint, revealed, started])

  const reveal = useCallback(() => {
    if (revealed) return
    setRevealed(true)
    onReveal()
  }, [revealed, onReveal])

  const checkProgress = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { willReadFrequently: true })
    if (!canvas || !ctx) return
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let clear = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 24) {
      total++
      if (data[i] < 40) clear++
    }
    if (clear / total >= REVEAL_THRESHOLD) reveal()
  }

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = BRUSH * 2
    ctx.beginPath()
    if (last.current) ctx.moveTo(last.current.x, last.current.y)
    else ctx.moveTo(x - 0.1, y)
    ctx.lineTo(x, y)
    ctx.stroke()
    last.current = { x, y }
    if (++moves.current % 8 === 0) checkProgress()
  }

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        className="relative bg-burgundy p-5 shadow-[0_18px_40px_-18px_rgb(93_75_67/0.55)] sm:p-7"
        style={{
          clipPath: OUTER_CLIP,
          backgroundImage:
            'radial-gradient(ellipse at 20% 10%, rgb(255 220 210 / 0.18), transparent 60%), var(--paper-noise)',
        }}
      >
        <div
          ref={wrapRef}
          className="relative grid aspect-[16/9] min-h-[200px] place-items-center bg-[#f1e3c4] text-center"
          style={{
            clipPath: INNER_CLIP,
            backgroundImage:
              'radial-gradient(ellipse at 50% 40%, #f8eed6 0%, transparent 70%), var(--paper-noise)',
          }}
        >
          <div aria-live="polite" className={revealed ? '' : 'sr-only'}>
            {children}
          </div>
          {!revealed ? (
            <div aria-hidden="true" className="invisible">
              {children}
            </div>
          ) : null}

          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full cursor-grab touch-none transition-opacity duration-1000 ease-out active:cursor-grabbing ${
              revealed ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
            onPointerDown={(e) => {
              drawing.current = true
              last.current = null
              setStarted(true)
              e.currentTarget.setPointerCapture(e.pointerId)
              scratchAt(e.clientX, e.clientY)
            }}
            onPointerMove={(e) => drawing.current && scratchAt(e.clientX, e.clientY)}
            onPointerUp={() => {
              drawing.current = false
              last.current = null
              checkProgress()
            }}
            onPointerCancel={() => {
              drawing.current = false
              last.current = null
            }}
          />
        </div>
      </div>

      {!revealed ? (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={reveal}
            className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.28em] text-ink/70 underline-offset-4 hover:text-burgundy hover:underline focus-visible:outline-2"
          >
            Reveal the date
          </button>
        </div>
      ) : null}
    </div>
  )
}
