import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Providers from '../components/Providers'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '500', '700', '900'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Takes Care App',
  description: 'Takes Care application for your health.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} antialiased w-full bg-grey-light h-screen flex flex-col overflow-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="overflow-y-auto mx-auto max-w-[1680px]">
            <Providers>{children}</Providers>
          </main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
