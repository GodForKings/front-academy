'use client'

import { $user } from '@/entities'
import { ImageIcon, PricePoints, ProgressBar, cn, getUserLevel } from '@/shared'
import { initData, useSignal } from '@tma.js/sdk-react'
import { useUnit } from 'effector-react'
import type { FC } from 'react'

export const ProfileCard: FC = () => {
  const user = useUnit($user)
  const initDataUser = useSignal(initData.user)

  const level = getUserLevel(user?.experience ?? 0)
  const progress = (user?.experience ?? 0) % 100

  return (
    <div className={cn('flex gap-4', 'h-30 w-full overflow-hidden')}>
      <ImageIcon
        height={120}
        width={120}
        srcFile={user?.photoUrl ?? initDataUser?.photo_url}
        className='rounded-4xl border border-white/40'
      />

      <div className={cn('flex flex-col justify-between gap-2 w-full')}>
        <h3 className='text-[22px] font-extrabold tracking-wider truncate'>
          {initDataUser?.first_name ?? initDataUser?.username}
        </h3>

        <div className='flex items-center gap-2'>
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
