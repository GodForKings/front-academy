import type { FC } from 'react'

import { cn, type IconProps } from '@/shared'

export const StormIcon: FC<IconProps> = (props) => {
  const { size = 16, color, className } = props

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 9 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('shrink-0', className)}
    >
      <path
        d='M4.94467 5.5L5.778 0.5L0.5 7.16667H3.83333L3 12.1667L8.278 5.5H4.94467Z'
        stroke={color}
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
