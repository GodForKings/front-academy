import { Check } from 'lucide-react'
import { FC } from 'react'

import { cn } from '@/shared'

interface OptionProps {
  label: string
  checked: boolean
  onClick: () => void
  classNameBlock?: string
  classNameCheck?: string
  classNameLabel?: string
}

export const Option: FC<OptionProps> = (props) => {
  const { label, checked, onClick, classNameBlock, classNameCheck, classNameLabel } = props

  return (
    <button
      type='button'
      onClick={onClick}
      className={cn('flex items-center gap-3', 'transition', classNameBlock)}
    >
      <div
        className={cn(
          'size-6 aspect-square p-px',
          'flex items-center justify-center',
          'border rounded-lg',
          classNameCheck,
        )}
      >
        {checked && <Check />}
      </div>

      <span className={cn('text-sm/5 tracking-wider font-thin', classNameLabel)}>{label}</span>
    </button>
  )
}
