import type { IconProps } from '@/shared'
import type { FC } from 'react'
import { DEFAULT_COLOR, DEFAULT_SIZE } from './config'

export const WorkShopIcon: FC<IconProps> = (props) => {
  const { size = DEFAULT_SIZE, color = DEFAULT_COLOR, style, className } = props

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      style={style}
    >
      <path
        d='M5.75 3.70049V15.5797M10.75 0.900485V12.7797M0.75 5.41049C0.75 4.13799 0.75 3.50215 1.0775 3.13132C1.19333 2.99882 1.33417 2.89382 1.49167 2.82132C2.67167 2.27715 4.21833 3.70965 5.46667 3.66549C5.63167 3.65937 5.79472 3.6366 5.95583 3.59715C7.77583 3.15132 8.91583 1.03049 10.7875 0.772152C11.86 0.622152 13.0375 1.27049 14.0408 1.61715C14.8658 1.90215 15.2783 2.04465 15.5142 2.38382C15.75 2.72299 15.75 3.17465 15.75 4.07465V11.093C15.75 12.3647 15.75 13.0013 15.4225 13.3722C15.3075 13.5029 15.1664 13.6082 15.0083 13.6813C13.8283 14.2255 12.2817 12.7938 11.0333 12.838C10.8684 12.8443 10.7046 12.8669 10.5442 12.9055C8.72417 13.3513 7.58417 15.4722 5.7125 15.7313C4.645 15.8797 1.67333 15.1063 0.985833 14.1188C0.75 13.7797 0.75 13.3297 0.75 12.428V5.41049Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
