'use client'

import type { ClipboardEvent, FC, KeyboardEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/shared'

interface OtpInputProps {
  length?: 4 | 6
  disabled?: boolean
  error?: boolean
  onChange?: (code: string) => void
  onComplete?: (code: string) => void
  className?: string
}

export const OtpInput: FC<OtpInputProps> = (props) => {
  const { length = 4, disabled, error, onChange, onComplete, className } = props

  const refs = useRef<Array<HTMLInputElement | null>>([])
  const [active, setActive] = useState(0)

  const init = useMemo(() => Array.from({ length }, () => ''), [length])
  const [digits, setDigits] = useState<string[]>(init)

  const code = digits.join('')

  const emit = (next: string[]) => {
    const c = next.join('')
    onChange?.(c)
    if (next.every(Boolean) && c.length === length) onComplete?.(c)
  }

  const focus = (i: number) => {
    const idx = Math.max(0, Math.min(length - 1, i))
    refs.current[idx]?.focus()
    setActive(idx)
  }

  const setAt = (i: number, v: string) => {
    const next = digits.slice()
    next[i] = v
    setDigits(next)
    emit(next)
  }

  const onInputChange = (i: number, raw: string) => {
    if (disabled) return
    const v = raw.replace(/\D/g, '').slice(-1)
    setAt(i, v)
    if (v && i < length - 1) focus(i + 1)
  }

  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    if (e.key === 'Backspace') {
      e.preventDefault()
      if (digits[i]) {
        setAt(i, '')
        return
      }
      if (i > 0) {
        setAt(i - 1, '')
        focus(i - 1)
      }
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focus(i - 1)
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      focus(i + 1)
    }
  }

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return
    e.preventDefault()

    const pasted = e.clipboardData.getData('text').replace(/\D/g, '')
    if (!pasted) return

    const next = digits.slice()
    let idx = active
    for (const ch of pasted) {
      if (idx >= length) break
      next[idx] = ch
      idx++
    }
    setDigits(next)
    emit(next)

    const nextEmpty = next.findIndex((d) => d === '')
    focus(nextEmpty === -1 ? length - 1 : nextEmpty)
  }

  // Если ошибка кидаем фокус на первый
  useEffect(() => {
    if (error) focus(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {digits.map((d, i) => {
        const filled = d !== ''
        return (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            value={d}
            onChange={(e) => onInputChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
            onFocus={() => setActive(i)}
            inputMode='numeric'
            autoComplete='one-time-code'
            disabled={disabled}
            className={cn(
              'w-11 h-11 rounded-xl text-center',
              'text-bse font-medium text-white',
              'bg-white/10 backdrop-blur-md',
              'outline-none border border-transparent',
              !filled && !error && 'border-white/5',
              (filled || i === active) && !error && 'border-main-violet',
              error && 'border-main-red',
              'focus:border-main-violet',
              disabled && 'bg-white/10 text-white/40 border-transparent',
            )}
          />
        )
      })}
    </div>
  )
}
