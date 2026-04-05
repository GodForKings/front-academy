import './_assets/globals.css'

import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import type { PropsWithChildren } from 'react'

import { PlatformContainer, Root, SharedGates, ToasterProvider } from '@/app/_providers'
import { I18nProvider } from '@/core/i18n/provider'
import { cn } from '@/shared'

export const metadata: Metadata = {
  title: 'Zeus Academy',
  description: 'Zeus Academy',
}

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: 'white',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body className={cn(manrope.className, 'text-white', 'isolate')}>
        <I18nProvider>
          <PlatformContainer>
            <Root>
              <SharedGates />

              {children}

              <ToasterProvider />
            </Root>
          </PlatformContainer>
        </I18nProvider>
      </body>
    </html>
  )
}
