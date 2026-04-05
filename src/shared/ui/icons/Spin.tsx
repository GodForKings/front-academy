import type { FC } from 'react'

import { cn, type IconProps } from '@/shared'

import { DEFAULT_SIZE } from './config'

export const SpinIcon: FC<IconProps> = (props) => {
  const { size = DEFAULT_SIZE, className } = props

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('animate-spin', className)}
    >
      <path
        d='M0.5 8C0.5 9.98912 1.29018 11.8968 2.6967 13.3033C4.10322 14.7098 6.01088 15.5 8 15.5C9.98912 15.5 11.8968 14.7098 13.3033 13.3033C14.7098 11.8968 15.5 9.98912 15.5 8C15.5 6.01088 14.7098 4.10322 13.3033 2.6967C11.8968 1.29018 9.98912 0.5 8 0.5'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.1673 8.00065C12.1673 7.17656 11.9229 6.37098 11.4651 5.68578C11.0073 5.00057 10.3565 4.46652 9.59517 4.15115C8.83381 3.83579 7.99603 3.75328 7.18778 3.91405C6.37952 4.07482 5.63709 4.47166 5.05437 5.05437C4.47166 5.63709 4.07482 6.37952 3.91405 7.18778C3.75328 7.99603 3.83579 8.83381 4.15115 9.59517C4.46652 10.3565 5.00057 11.0073 5.68578 11.4651C6.37098 11.9229 7.17656 12.1673 8.00065 12.1673'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
