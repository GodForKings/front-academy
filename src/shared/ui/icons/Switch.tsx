import { cn, type IconProps } from '@/shared'
import type { FC } from 'react'

export const SwitchIcon: FC<IconProps> = (props) => {
  const { size = 16, color = '#f7911c', className } = props

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 11 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('shrink-0', className)}
    >
      <path d='M4 7H9V0.5' stroke={color} strokeLinecap='round' strokeLinejoin='round' />

      <path
        d='M7 4.5H2V10M10.5 2L9 0.5L7.5 2'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      <path d='M3.5 8.5L2 10L0.5 8.5' stroke={color} strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
