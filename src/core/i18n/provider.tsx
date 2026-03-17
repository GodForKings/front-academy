import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { FC, PropsWithChildren } from 'react'

import { timeZone } from './config'

export const I18nProvider: FC<PropsWithChildren> = async ({ children }) => {
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  )
}
