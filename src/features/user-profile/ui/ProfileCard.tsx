'use client'

import { initData, useSignal } from '@tma.js/sdk-react'
import { useUnit } from 'effector-react'
import type { FC } from 'react'

import { $user } from '@/entities'
import { cn,ImageIcon, PricePoints, ProgressBar } from '@/shared'

export const ProfileCard: FC = () => {
  const user = useUnit($user)
  const initDataUser = useSignal(initData.user)

  const level = user?.level ?? 1
  const progress = user?.levelProgress ?? 0

  return (
    <div className={cn('flex gap-4', 'h-30 w-full min-w-0 overflow-hidden')}>
      <ImageIcon
        height={120}
        width={120}
        srcFile={user?.photoUrl ?? initDataUser?.photo_url}
        className='shrink-0 rounded-4xl border border-white/40'
      />

      <div className={cn('flex min-w-0 flex-1 flex-col justify-between gap-2')}>
        <h3 className='text-[22px] font-extrabold tracking-wider truncate'>
          {initDataUser?.first_name ?? initDataUser?.username}
        </h3>

        <div className='flex min-w-0 flex-wrap items-center gap-2'>
          <p
            className={cn(
              'relative bg-white/10 rounded-full',
              'flex justify-center items-center gap-1',
              'px-3 py-1.5 h-8 max-w-50 overflow-hidden',
              'text-base font-bold',
              'animate-pulse',
            )}
          >
            {level} lvl
          </p>

          <div
            className={cn(
              'relative bg-white/10 rounded-full',
              'flex justify-center items-center gap-1',
              'px-3 py-1.5 h-8 max-w-50 overflow-hidden',
              'animate-pulse',
            )}
          >
            <PricePoints point={user?.balance} iconSize={20} className='text-base' />
          </div>
        </div>

        <ProgressBar
          rightText={`${level + 1} lvl`}
          value={progress}
          className={cn('h-8 bg-white/10 rounded-full gap-2.5', 'p-1.5 pr-3')}
          trackClassName='h-5'
        />
      </div>
    </div>
  )
}
