import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Montserrat, Pinyon_Script } from 'next/font/google'
import { weddingConfig } from '@/config/wedding'
import './globals.css'

const pinyon = Pinyon_Script({ subsets: ['latin'], weight: '400', variable: '--font-pinyon', display: 'swap' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-montserrat', display: 'swap' })

const { firstName, secondName } = weddingConfig.couple

export const metadata: Metadata = {
  title: `${firstName} & ${secondName} — We are getting married`,
  description: `Together with our families, we joyfully invite you to celebrate the wedding of ${firstName} & ${secondName}.`,
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f3e9d5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${pinyon.variable} ${cormorant.variable} ${montserrat.variable} bg-ivory`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
