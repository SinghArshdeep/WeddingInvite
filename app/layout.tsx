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

const description =
  'With the blessings of the Almighty, Jasneet Singh and Harpreet Kaur are getting married.'

export const metadata: Metadata = {
  title: 'Jasneet & Harpreet | Anand Karaj',
  description,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    title: 'Jasneet & Harpreet | Anand Karaj',
    description,
    type: 'website',
    images: [{ url: '/hj-monogram.png', width: 1200, height: 630, alt: 'An illustrated Sikh Gurudwara Sahib at dusk' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasneet & Harpreet | Anand Karaj',
    description,
    images: ['/hj-monogram.png'],
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
