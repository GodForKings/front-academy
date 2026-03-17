'use client'

import { cn } from '@/shared'
import { motion } from 'motion/react'
import type { FC } from 'react'

interface ProgressBarProps {
  value?: number // 0 - 100
  className?: string

  /* Тексты слева/справа */
  leftText?: string
  rightText?: string

  /* Кастомизация */
  trackClassName?: string
  barClassName?: string
}

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { value = 50, leftText, rightText, className, trackClassName, barClassName } = props

  const percentage = Math.max(0, Math.min(100, value))

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {leftText && <p className='text-sm/5 text-white shrink-0 font-medium'>{leftText}</p>}

      <div
        className={cn(
          'relative flex-1 h-3 rounded-full',
          'bg-white/10 overflow-hidden',
          trackClassName,
        )}
      >
        <motion.div
          initial={false}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className={cn(
            'h-full rounded-full',
            'bg-linear-to-r from-fuchsia-500 via-pink-500 to-purple-600',
            barClassName,
          )}
        />
      </div>

      {rightText && <p className='text-sm/5 text-white shrink-0 font-medium'>{rightText}</p>}
    </div>
  )
}
