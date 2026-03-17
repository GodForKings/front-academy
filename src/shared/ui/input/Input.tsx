import type { FC, InputHTMLAttributes } from 'react'

import { cn } from '@/shared'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  labelClassName?: string
}

export const Input: FC<InputProps> = (properties) => {
  const { label, error, labelClassName, className, ...props } = properties

  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label className={cn('text-sm font-normal tracking-wider', labelClassName)}>{label}</label>
      )}

      <input
        {...props}
        className={cn(
          'h-14 w-full px-3 py-4 max-w-full',
          'rounded-2xl bg-transparent',
          'border transition',
          'placeholder:text-gray-600',
          'focus:outline-none focus:border-2',
          error && 'border-red-500',
          className,
        )}
      />

      {error && (
        <span
          className={cn(
            'bg-black rounded-md px-2 py-1 w-fit',
            'text-xs/3 text-red-500 tracking-wide',
          )}
        >
          {error}
        </span>
      )}
    </div>
  )
}
