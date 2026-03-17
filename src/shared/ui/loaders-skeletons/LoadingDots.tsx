'use client'

import type { FC } from 'react'

export const LoadingDots: FC = () => {
  return (
    <div className='flex items-center gap-1 animate-pulse'>
      <div className='size-3 rounded-full bg-white animate-bounce [animation-delay:0ms]' />
      <div className='size-3 rounded-full bg-white animate-bounce [animation-delay:200ms]' />
      <div className='size-3 rounded-full bg-white animate-bounce [animation-delay:400ms]' />
    </div>
  )
}
