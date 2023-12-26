import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.scss'
import Header from './components/Header'
import Footer from './components/Footer'

const heebo = Heebo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HSM Classics',
  description:
    'Where Passion Meets Precision in Every Classic Car. We specialize in BMW, VW, and Porsche.',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      url: '/icon.svg',
      type: 'image/svg+xml',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      url: '/site.webmanifest',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={heebo.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
