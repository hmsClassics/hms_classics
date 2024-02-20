import cx from 'classnames'
import { Maven_Pro } from 'next/font/google'
import type { Metadata } from 'next'

import Footer from '@components/Footer'
import './globals.scss'
import Header from '@/components/Header'

const maven = Maven_Pro({ subsets: ['latin'], variable: '--font-maven-pro' })

export const metadata: Metadata = {
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
      <body className={cx(maven.className)}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
