'use client'

import { GRADIENT_ORANGE, cn } from '@/shared'
import { motion } from 'motion/react'
import type { FC } from 'react'

interface TabButtonProps {
  active: boolean
  title: string
  onClick: () => void
}

export const TabButton: FC<TabButtonProps> = (props) => {
  const { active, title, onClick } = props

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex-1 rounded-full py-2 transition',
        'text-center text-sm/5 font-semibold tracking-wide',
        active ? 'text-white' : 'text-white/70 hover:opacity-70',
      )}
    >
      {active && (
        <motion.span
          layoutId='tabs-pill'
          transition={{ type: 'spring', stiffness: 520, damping: 40 }}
          className={cn('absolute inset-0 rounded-full', GRADIENT_ORANGE)}
        />
      )}

      <span className='relative z-2'>{title}</span>
    </button>
  )
}
