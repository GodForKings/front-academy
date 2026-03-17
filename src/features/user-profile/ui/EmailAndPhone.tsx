'use client'

import { $user } from '@/entities'
import { cn, formatPhoneDisplay } from '@/shared'
import { PAGES } from '@/widgets'
import { useUnit } from 'effector-react'
import { UserPen } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'

export const EmailAndPhone: FC = () => {
  const t = useTranslations('profilePage')
  const user = useUnit($user)

  const router = useRouter()
  /** Кинуть на страницу редактирования Phone */
  const goToEditPhone = () => router.push(`${PAGES.REGISTRATION_PHONE}?returnTo=${PAGES.PROFILE}`)
  /** Кинуть на страницу редактирования Email */
  const goToEditEmail = () => router.push(`${PAGES.REGISTRATION_EMAIL}?returnTo=${PAGES.PROFILE}`)

  return (
    <>
      <p className='text-white/70 text-sm font-medium tracking-wide'>
        {t('connectedAccounts.emailLabel')}
      </p>

      <div
        className={cn(
          'h-11 w-full rounded-full -mt-2',
          'px-4 py-3 bg-white/10 backdrop-blur-xl',
          'text-sm font-medium',
          'flex items-center justify-between gap-3',
        )}
      >
        {user?.email ?? 'ivanivanov@gmail.com'}

        <button onClick={goToEditEmail} className='transition hover:opacity-70 active:scale-94'>
          <UserPen size={16} />
        </button>
      </div>

      <p className='text-white/70 text-sm font-medium tracking-wide'>
        {t('connectedAccounts.phoneLabel')}
      </p>

      <div
        className={cn(
          'h-11 w-full rounded-full -mt-2',
          'px-4 py-3 bg-white/10 backdrop-blur-xl',
          'text-sm font-medium',
          'flex items-center justify-between gap-3',
        )}
      >
        {formatPhoneDisplay(user?.phone ?? '')}

        <button onClick={goToEditPhone} className='transition hover:opacity-70 active:scale-94'>
          <UserPen size={16} />
        </button>
      </div>
    </>
  )
}
