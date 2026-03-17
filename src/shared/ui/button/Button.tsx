'use client'

import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import { cn } from '@/shared'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'lg' | 'md'

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'children'
> {
  children: ReactNode
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    variant = 'primary',
    size = 'lg',
    disabled = false,
    ...anotherProps
  } = props
  /** Общие стили */
  const base = cn(
    'transition select-none will-change-transform',
    'flex justify-center items-center gap-2',
    'font-semibold tracking-wider',
    'w-full relative z-2',
    'active:translate-y-px hover:translate-y-px',
    'active:scale-98 hover:scale-101 focus:outline-none',
  )
  /** Размеры */
  const sizes = cn(size === 'lg' ? 'h-13 text-base/5 rounded-2xl' : 'h-7 text-xs rounded-full')
  /** Три варианта */
  const variants = {
    primary: cn(
      'text-white',
      'bg-[linear-gradient(270deg,#C211E9_0%,#9E15AB_50%,#3C1544_100%)]',
      'shadow hover:opacity-90',
    ),
    secondary: cn(
      'border border-transparent text-white',
      'bg-white/10 backdrop-blur-xl',
      'shadow hover:bg-white/15',
    ),
    outline: cn(
      'text-white',
      'bg-white/10 backdrop-blur-xl',
      'border-[1.5px] border-[#B00CD5]',
      'shadow hover:bg-white/15',
    ),
  } as const
  /** Общее стили для disabled */
  const disabledStyles = cn(
    'pointer-events-none shadow-none',
    'bg-white/10 text-white/40 backdrop-blur-xl',
    'border-transparent transform-none',
  )

  return (
    <button
      disabled={disabled}
      className={cn(base, sizes, variants[variant], className, disabled && disabledStyles)}
      {...anotherProps}
    >
      {children}
    </button>
  )
}
