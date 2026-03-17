'use client'

import { cn } from '@/shared'
import type { FC } from 'react'

const SKELETON_CARDS = Array.from({ length: 6 })
const SKELETON_CHIPS = Array.from({ length: 3 })

export const InventoryTabSkeleton: FC = () => {
  return (
    <div className={cn('flex flex-col gap-4', 'mt-1 animate-pulse')}>
      <div className={cn('flex flex-col gap-2', 'relative w-full')}>
        <div className='flex justify-between items-center'>
          <div className='h-8 w-32 rounded-md bg-white/10' />

          <div className='h-7 w-22 rounded-full bg-white/10' />
        </div>

        <div className='h-5 w-30 rounded-md bg-white/10' />
      </div>

      <div className='flex items-center gap-2 overflow-x-auto'>
        <div className='h-9 w-22 shrink-0 rounded-full bg-white/10' />

        {SKELETON_CHIPS.map((_, index) => (
          <div
            key={index}
            className='flex items-center gap-2 h-9 px-4 shrink-0 rounded-full bg-white/10'
          >
            <div className='size-4.5 rounded-full bg-white/15' />

            <div className='h-4 w-16 rounded-md bg-white/15' />
          </div>
        ))}
      </div>

      <div className={cn('grid grid-cols-2 gap-3', 'min-w-full')}>
        {SKELETON_CARDS.map((_, index) => (
          <div
            key={index}
            className={cn(
              'relative overflow-hidden backdrop-blur-xl p-3',
              'border rounded-2xl',
              'flex flex-col gap-2',
              'bg-white/5 border-white/10',
            )}
          >
            <div className='relative overflow-hidden shrink-0 aspect-square w-full rounded-2xl bg-white/10' />

            <div className='flex flex-col items-center gap-2 pt-1'>
              <div className='h-5 w-32 rounded-md bg-white/12' />
              <div className='h-4 w-20 rounded-md bg-white/10' />
            </div>

            <div className='grid grid-cols-2 gap-2 mt-auto pt-1'>
              <div className='h-7 rounded-full bg-white/10 border border-white/15' />
              <div className='h-7 rounded-full bg-white/10 border border-white/15' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
