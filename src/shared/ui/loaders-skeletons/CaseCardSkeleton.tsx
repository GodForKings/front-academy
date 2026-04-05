'use client'

import type { FC } from 'react'

import { cn } from '@/shared'

interface CaseCardSkeletonProps {
  className?: string
}

export const CaseCardSkeleton: FC<CaseCardSkeletonProps> = (props) => {
  const { className } = props

  return (
    <div
      className={cn(
        'relative min-h-63 max-h-63 w-full overflow-hidden',
        'flex flex-col gap-2',
        'border border-white/5 rounded-2xl',
        'bg-white/5 backdrop-blur-xl p-3',
        'animate-pulse',
        className,
      )}
    >
      <div className='h-27.5 w-full rounded-xl bg-white/10' />

      <div className='flex items-center gap-1'>
        <div className='h-5 w-16 rounded-md bg-white/10' />

        <div className='h-5 w-5 rounded-full bg-white/10' />
      </div>

      <div className='h-5 w-3/4 rounded-lg bg-white/10' />

      <div className='mt-auto h-7 rounded-2xl bg-white/10' />
    </div>
  )
}
