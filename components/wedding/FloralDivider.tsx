
import Image from 'next/image'
import { cn } from '@/lib/utils'

const variants = {
  bouquet: {
    src: '/images/floral/bouquet.png',
    width: 2048,
    height: 508,
    className: 'w-[min(88vw,30rem)]',
  },
  sprig: {
    src: '/images/floral/sprig.png',
    width: 2048,
    height: 409,
    className: 'w-[min(70vw,18rem)]',
  },
} as const

interface FloralDividerProps {
  variant?: keyof typeof variants
  className?: string
  flip?: boolean
}

export function FloralDivider({
  variant = 'bouquet',
  className,
  flip,
}: FloralDividerProps) {
  const v = variants[variant]

  return (
    <div
      aria-hidden="true"
      className={cn('mx-auto flex justify-center', className)}
    >
      <Image
        src={v.src}
        alt=""
        width={v.width}
        height={v.height}
        sizes="(max-width: 640px) 88vw, 480px"
        className={cn(
          'h-auto',
          v.className,
          flip && 'rotate-180'
        )}
      />
    </div>
  )
}
