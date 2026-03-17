'use client'

import { motion } from 'motion/react'
import type { FC } from 'react'

import { cn } from '@/shared'

interface InfoBlockProps {
  title: string
  paragraph?: string
  headerClass?: string
  paragraphClass?: string
  className?: string
}

export const InfoBlock: FC<InfoBlockProps> = (props) => {
  const { title, paragraph, headerClass, paragraphClass, className } = props

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(2px)' }}
      animate={{ opacity: 1, filter: 'blur(0)' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn('flex flex-col gap-0.5 justify-center', 'relative w-full', className)}
    >
      <h2 className={cn('text-base font-medium tracking-wider', headerClass)}>{title ?? '-'}</h2>

      {paragraph && (
        <p className={cn('text-xs text-balance wrap-break-word text-white/70', paragraphClass)}>
          {paragraph || '-'}
        </p>
      )}
    </motion.div>
  )
}
