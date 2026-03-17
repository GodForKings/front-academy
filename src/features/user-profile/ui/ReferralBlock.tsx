'use client'

import { BOT_NAME, Button, cn } from '@/shared'
import { initData, useSignal } from '@tma.js/sdk-react'
import { useUnit } from 'effector-react'
import { Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import { copyReferral } from '../model/referralList'

export const ReferralBlock: FC = () => {
  const t = useTranslations('profilePage')
  const initDataUser = useSignal(initData.user)
  const copyReferralLink = useUnit(copyReferral)

  /** Реферальная ссылка user-а */
  const referralLink: string = `https://t.me/${BOT_NAME}?start=${initDataUser?.id}`
  /** Функция `copy` */
  const copyLinkFn = () => copyReferralLink(referralLink)

  return (
    <div
      className={cn(
        'rounded-3xl p-4 bg-white/5',
        'relative h-fit w-full backdrop-blur-lg',
        'flex flex-col justify-evenly gap-2',
      )}
    >
      <h3 className='text-lg font-bold tracking-wide'>{t('referral.title')}</h3>

      <p className='text-white/70 text-sm font-medium tracking-wide'>{t('referral.subtitle')}</p>

      <div
        className={cn(
          'h-11 rounded-full',
          'px-4 py-3 bg-white/10 backdrop-blur-xl',
          'text-sm text-white/50',
          'flex items-center',
        )}
      >
        {referralLink}
      </div>

      <div className='flex items-center justify-end'>
        {/* <button className='text-xs text-main-orange font-medium tracking-wide transition hover:opacity-70 active:scale-98'>
          {t('referral.invitedList')}
        </button> */}

        <Button
          variant='secondary'
          size='md'
          className='w-fit px-3 py-1.5 font-medium'
          onClick={copyLinkFn}
        >
          {t('referral.copy')}

          <Copy size={16} className='rotate-180' />
        </Button>
      </div>
    </div>
  )
}
