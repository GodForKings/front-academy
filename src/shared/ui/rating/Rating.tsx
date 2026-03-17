import { Star } from 'lucide-react'
import type { FC } from 'react'

import { cn } from '@/shared'

interface RatingProps {
  ratingPoints?: number
  className?: string
  iconSize?: number
}

export const Rating: FC<RatingProps> = (props) => {
  const { ratingPoints, className, iconSize = 16 } = props
  return (
    <div className={cn('px-1.5 py-0.5 font-bold text-sm', 'flex gap-1 items-center', className)}>
      <Star stroke='#DEB200' fill='#DEB200' size={iconSize} />

      {ratingPoints || '4.9'}
    </div>
  )
}
