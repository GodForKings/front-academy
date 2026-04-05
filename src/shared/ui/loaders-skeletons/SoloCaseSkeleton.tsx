'use client'

import type { FC } from 'react'

import { cn,PageWrapper, SkinCardSkeleton } from '@/shared'

export const SoloCaseSkeleton: FC = () => {
  return (
    <PageWrapper className={cn('flex flex-col gap-4', 'pb-40 animate-pulse')}>
      <div className='flex flex-col gap-3'>
        <div className='mx-auto h-6 w-2/3 rounded-lg bg-white/10' />

        <div className='flex items-center justify-center gap-2'>
          <div
            className={cn(
              'h-9 w-47.5 rounded-full bg-white/5 backdrop-blur-md',
              'border border-white/5',
            )}
          />

          <div
            className={cn(
              'h-9 w-23 rounded-full bg-white/5 backdrop-blur-md',
              'border border-main-orange/80',
            )}
          />
        </div>

        <div className='mt-3 flex justify-center'>
          <div
            className={cn(
              'h-45 w-60 max-w-full rounded-2xl bg-white/10',
              'border border-white/5 backdrop-blur-md',
            )}
          />
        </div>

        <div
          className={cn('mt-1 h-13.5 w-full bg-white/10 ', 'border border-white/5 rounded-2xl')}
        />
      </div>

      <div className='mt-1 h-6 w-28 rounded-lg bg-white/10' />

      <div className={cn('grid grid-cols-2 gap-3', 'min-w-full')}>
        {Array.from({ length: 4 }).map((_, i) => (
          <SkinCardSkeleton key={i} />
        ))}
      </div>
    </PageWrapper>
  )
}
