import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Pirata_One } from 'next/font/google'
import './globals.css'
import { clsx } from 'clsx'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })
const pirataOne = Pirata_One({ subsets: ['latin'], weight: '400', variable: '--font-pirata' })

export const metadata: Metadata = {
  title: 'City Pulse | Style Never Fades',
  description: 'Premium streetwear. The city never sleeps.',
  metadataBase: new URL('https://shopcitypulse.net'),
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    url: 'https://shopcitypulse.net/',
    title: 'City Pulse | Style Never Fades',
    description: 'Premium streetwear. The city never sleeps.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'City Pulse — Style Never Fades',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'City Pulse',
    description: 'Style Never Fades.',
    images: ['/og-image.jpg'],
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.variable, jetbrainsMono.variable, pirataOne.variable, "bg-background text-foreground antialiased font-sans selection:bg-accent selection:text-black")}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
