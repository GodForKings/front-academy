import type { FC } from 'react'

import { cn, InfoBlock } from '@/shared'

interface StepRowProps {
  number: string | number
  title: string
  text: string
}

export const StepRow: FC<StepRowProps> = (props) => {
  const { number, title, text } = props
  return (
    <div className='flex gap-3'>
      <div
        className={cn(
          'size-9 shrink-0 bg-white/5 backdrop-blur-md',
          'border-b border-white/5 rounded-xl',
          'flex items-center justify-center',
          'text-white font-extrabold text-lg/5.5',
        )}
      >
        {number}
      </div>

      <InfoBlock
        title={title}
        paragraph={text}
        headerClass='font-bold'
        paragraphClass='text-sm/5 font-medium'
        className='gap-2'
      />
    </div>
  )
}
