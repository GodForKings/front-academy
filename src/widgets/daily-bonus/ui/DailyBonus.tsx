'use client'

import { useUnit } from 'effector-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC,useEffect, useMemo, useRef, useState } from 'react'

import { publicConfigModels } from '@/entities'
import { cn, formatHMS,GRADIENT_DAILY_BONUS } from '@/shared'

import { dailyBonusModels } from '../model/dailyBonusList'
import { DailyDialogController } from './DailyDialogController'

export const DailyBonus: FC = () => {
  const t = useTranslations('profilePage')

  const [loadingConfig, balanceBonus] = useUnit([
    publicConfigModels.stores.$publicConfigIsLoading,
    publicConfigModels.stores.$publicConfig,
  ])

  const [daily, dailyLoading, claimLoading, claim, refetch] = useUnit([
    dailyBonusModels.stores.$dailyBonus,
    dailyBonusModels.stores.$dailyBonusLoading,
    dailyBonusModels.stores.$claimLoading,
    dailyBonusModels.events.claimBonus,
    dailyBonusModels.events.fetchDailyBonus,
  ])

  const disabled = !daily.available || claimLoading || dailyLoading
  const isCD = !daily.available && Boolean(daily.nextAvailableAt)

  const [now, setNow] = useState<number>(() => Date.now())

  useEffect(() => {
    if (!daily.nextAvailableAt) return
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [daily.nextAvailableAt])

  const leftMs = useMemo(() => {
    if (!daily.nextAvailableAt) return null
    return Math.max(0, daily.nextAvailableAt - now)
  }, [daily.nextAvailableAt, now])

  const timer = useMemo(() => (leftMs == null ? null : formatHMS(leftMs)), [leftMs])

  const firedRef = useRef(false)

  useEffect(() => {
    if (!isCD) {
      firedRef.current = false
      return
    }
    if (leftMs === 0 && !firedRef.current) {
      firedRef.current = true
      refetch()
    }
  }, [isCD, leftMs])

  return (
    <>
      <div
        className={cn(
          'p-4 backdrop-blur-lg rounded-3xl select-none',
          'flex items-center justify-between gap-3',
          GRADIENT_DAILY_BONUS,
        )}
      >
        <div className='flex flex-col gap-3'>
          <h4 className='font-bold text-lg tracking-wide'>{t('profile.dailyBonus')}</h4>

          {loadingConfig ? (
            <p className='animate-pulse h-5 w-21 bg-white rounded-lg' />
          ) : (
            <p className={cn('text-sm font-medium tracking-wide', 'flex items-center gap-0.5')}>
              {balanceBonus?.dailyBonus.balance &&
                t('profile.dailyBonusHint', { amount: balanceBonus.dailyBonus.balance })}

              <Image
                loading='eager'
                src='/svg/lightning.svg'
                alt='light'
                height={18}
                width={18}
                className='shrink-0'
              />
            </p>
          )}
        </div>

        <button
          disabled={disabled}
          onClick={claim}
          className={cn(
            'text-xs font-bold tracking-wide',
            'h-7 px-3 py-1.5 rounded-full',
            'bg-black/25 backdrop-blur-xl',
            'flex items-center',
            'transition hover:opacity-70 active:scale-96',
            'disabled:pointer-events-none disabled:text-white/40',
          )}
        >
          {isCD && timer ? timer : t('profile.receive')}
        </button>
      </div>

      <DailyDialogController />
    </>
  )
}
