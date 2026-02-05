import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { clsx } from 'clsx'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title: 'CITY PULSE',
  description: 'Streetwear Storefront',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.variable, jetbrainsMono.variable, "bg-background text-foreground antialiased font-sans selection:bg-accent selection:text-black")}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
