'use client'

import { Ban, BotMessageSquare, Check, X } from 'lucide-react'
import { FC } from 'react'
import type { Toast } from 'react-hot-toast'
import { toast } from 'react-hot-toast'

import { cn, usePlatform } from '@/shared'

function Icon({ type }: { type: Toast['type'] }) {
  if (type === 'success') {
    return (
      <span className='grid size-6 place-items-center rounded-full bg-[#11CC07]'>
        <Check className='size-4 text-white' strokeWidth={2.6} />
      </span>
    )
  }

  if (type === 'error') {
    return (
      <span className='grid size-6 place-items-center rounded-full bg-main-red'>
        <Ban className='size-4 text-white' strokeWidth={2.6} />
      </span>
    )
  }

  return (
    <span className='grid size-6 place-items-center rounded-lg bg-main-violet'>
      <BotMessageSquare className='size-5 text-white' strokeWidth={2} />
    </span>
  )
}

export interface ToastCardProps {
  toastData: Toast
}

export const ToastCard: FC<ToastCardProps> = (props) => {
  const { isMobile } = usePlatform()
  const { toastData } = props

  return (
    <div
      className={cn(
        'pointer-events-auto w-full px-4 py-3',
        'bg-white/10 shadow backdrop-blur-2xl',
        'rounded-2xl border border-white/5	',
        'flex items-center gap-3',
        'transition duration-200',
        toastData.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        !isMobile && 'max-w-112.5',
      )}
    >
      <Icon type={toastData.type} />

      <div className='text-sm/4.5 font-medium tracking-wide flex-1'>
        {String(toastData.message)}
      </div>

      <button
        type='button'
        aria-label='Close toast'
        onClick={() => toast.dismiss(toastData.id)}
        className={cn(
          'grid place-items-center rounded-full text-white/60',
          'transition hover:text-white active:scale-94',
        )}
      >
        <X size={18} strokeWidth={2} />
      </button>
    </div>
  )
}
