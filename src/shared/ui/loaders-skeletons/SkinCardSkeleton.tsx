import { cn } from '@/shared'
import type { FC } from 'react'

interface SkinCardSkeletonProps {
  className?: string
}

export const SkinCardSkeleton: FC<SkinCardSkeletonProps> = (props) => {
  const { className } = props

  return (
    <div
      className={cn(
        'relative overflow-hidden backdrop-blur-xl p-3',
        'border border-white/10 rounded-2xl',
        'flex flex-col gap-2',
        'bg-white/5',
        className,
      )}
    >
      <div className='aspect-square w-full rounded-2xl bg-white/10' />

      <div className='mt-1 h-5 w-full rounded-2xl bg-white/10' />

      <div className='mt-1 mx-auto h-4 w-16 rounded bg-white/10' />
    </div>
  )
}
