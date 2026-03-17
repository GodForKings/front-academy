'use client'

import { $user } from '@/entities'
import { PricePoints, cn } from '@/shared'
import { useUnit } from 'effector-react'
import type { FC } from 'react'

interface PointsPlayerProps {
  className?: string
}

export const PointsPlayer: FC<PointsPlayerProps> = (props) => {
  const { className } = props
  const point = useUnit($user)?.balance

  return (
    <div
      className={cn(
        'relative bg-white/5 rounded-full',
        'flex justify-center items-center gap-1',
        'px-3 py-2 max-w-50 h-9 overflow-hidden',
        'animate-pulse',
        className,
      )}
    >
      <PricePoints point={point} className='max-w-9/10 overflow-clip' />
    </div>
  )
}
