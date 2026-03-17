import type { FC, TextareaHTMLAttributes } from 'react'

import { cn } from '@/shared'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  labelClassName?: string
}

export const Textarea: FC<TextareaProps> = (properties) => {
  const { label, error, labelClassName, className, ...props } = properties

  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label className={cn('text-sm font-normal tracking-wider', labelClassName)}>{label}</label>
      )}

      <textarea
        {...props}
        className={cn(
          'min-h-24 max-h-50 w-full',
          'rounded-2xl border bg-transparent',
          'px-3 py-4 resize-y transition',
          'placeholder:text-gray-600',
          'focus:outline-none focus:border-2',
          error && 'border-red-500',
          className,
        )}
      />

      {error && (
        <span
          className={cn(
            'bg-black/30 rounded-md px-2 py-1 w-fit',
            'text-xs/5 text-red-500 tracking-wide',
          )}
        >
          {error}
        </span>
      )}
    </div>
  )
}
