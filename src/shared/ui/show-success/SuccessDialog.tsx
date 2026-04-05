'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import type { FC, ReactNode } from 'react'

import { cn } from '@/shared'

interface SuccessDialogProps {
  reward: number
  title: ReactNode
}

export const SuccessDialog: FC<SuccessDialogProps> = (props) => {
  const { reward, title } = props

  return (
    <div className='relative perspective-dramatic h-full w-full'>
      {/* Молнии */}
      <Lightning className='fixed top-12 -left-4 -rotate-34 scale-110' />
      <Lightning className='fixed top-6 left-1/2 -translate-x-1/2 scale-130' />
      <Lightning className='fixed top-18 -right-3 rotate-22 scale-90' />
      <Lightning className='fixed bottom-20 -left-6 rotate-14' />
      <Lightning className='fixed bottom-4 left-1/2 -translate-x-1/2 rotate-6 scale-120' />
      <Lightning className='fixed bottom-14 -right-5 -rotate-12' />

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={cn('flex flex-col items-center justify-center gap-6', 'size-full')}
      >
        <div
          className={cn(
            'bg-white/10 px-4 py-2 animate-pulse',
            'border border-white/5 rounded-full',
            'text-center font-extrabold text-[22px] tracking-wider',
          )}
        >
          {title}
        </div>

        <div className='flex items-center justify-center gap-1'>
          <p className='text-[32px] font-extrabold'>+{reward}</p>

          <Image
            loading='eager'
            src='/svg/lightning.svg'
            alt='light'
            height={44}
            width={44}
            className='shrink-0 animate-pulse'
          />
        </div>
      </motion.div>
    </div>
  )
}

interface LightningProps {
  className?: string
}
const Lightning: FC<LightningProps> = (props) => {
  const { className } = props

  return (
    <motion.div
      className={cn('pointer-events-none', className)}
      animate={{ y: [0, -6, 0], z: [0, -4, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Image
        loading='eager'
        src='/svg/lightning.svg'
        alt='light'
        height={100}
        width={100}
        className='drop-shadow-[0_0_30px_rgba(247,145,28,1)]'
      />
    </motion.div>
  )
}
