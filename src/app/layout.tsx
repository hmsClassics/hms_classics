import cx from 'classnames'

import type { Metadata } from 'next'
import { Jost, Montserrat } from 'next/font/google'
import './globals.scss'
import Footer from './components/Footer'
import createApolloClient from './utility/apolloClient'
import { ApolloProvider } from '@apollo/client'

const jost = Jost({ subsets: ['latin'], variable: '--font-jost' })
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

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
      <body className={cx(jost.variable, montserrat.variable)}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
