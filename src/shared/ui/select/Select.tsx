'use client'

import { ChevronsUpDown } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type FC } from 'react'

import { cn } from '@/shared'

interface SelectOption {
  value: number | string
  label: string
}

interface SelectProps {
  label?: string
  error?: string
  labelClassName?: string
  className?: string
  inputClassName?: string

  options: SelectOption[]
  value: number | string
  onChange: (value: number | string) => void

  searchable?: boolean
  placeholder?: string
  direction?: 'up' | 'down'
}

export const Select: FC<SelectProps> = (props) => {
  const {
    label,
    error,
    labelClassName,
    className,
    inputClassName,
    options,
    value,
    onChange,

    searchable = false,
    placeholder = 'Поиск...',
    direction = 'down',
  } = props

  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const ref = useRef<HTMLDivElement>(null)

  /* Закрытие при клике вне */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectedOption = options.find((o) => o.value === value)

  /* Фильтрация */
  const filteredOptions = useMemo(() => {
    if (!searchable || !search.trim()) return options

    return options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()))
  }, [options, search, searchable])

  const handleSelect = (opt: SelectOption) => {
    onChange(opt.value)
    setOpen(false)
    setSearch('')
  }

  /* Позиция списка */
  const dropdownPosition = direction === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'

  return (
    <div ref={ref} className='relative flex flex-col gap-2 w-full'>
      {label && (
        <label className={cn('text-sm text-white font-normal tracking-wider', labelClassName)}>
          {label}
        </label>
      )}

      {/* Control */}
      <div
        className={cn(
          'flex items-center',
          'h-14 px-3 py-4',
          'border border-default_gray rounded-standard',
          'bg-transparent transition',
          'hover:border-white',
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <input
          readOnly={!searchable}
          value={searchable ? search : (selectedOption?.label ?? '')}
          placeholder={selectedOption?.label ?? placeholder}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
          className={cn(
            'w-full bg-transparent outline-none',
            'text-gray-600 placeholder:text-gray-600',
            'cursor-pointer focus:border-gray-800',
            inputClassName,
          )}
        />

        <ChevronsUpDown className={cn('transition', open ? 'text-white' : 'text-default_gray')} />
      </div>

      {open && (
        <div
          className={cn(
            'absolute z-20 w-full overflow-hidden bg-white',
            'border border-default_gray rounded-standard',
            dropdownPosition,
          )}
        >
          <ul className='max-h-44 overflow-auto'>
            {filteredOptions.length ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    'px-4 py-3 cursor-pointer transition',
                    'text-sm text-black',
                    'hover:bg-black/10 active:bg-black/5',
                  )}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className='px-4 py-3 text-sm text-default_gray'>Ничего не найдено</li>
            )}
          </ul>
        </div>
      )}

      {error && (
        <span className='bg-black/30 rounded-md px-2 py-1 w-fit text-xs text-red-500'>{error}</span>
      )}
    </div>
  )
}
