import type { IconProps } from '@/shared'
import type { FC } from 'react'
import { DEFAULT_COLOR, DEFAULT_SIZE } from './config'

export const TasksIcon: FC<IconProps> = (props) => {
  const { size = DEFAULT_SIZE, color = DEFAULT_COLOR, style, className } = props

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 14 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      style={style}
    >
      <path
        d='M3.75 10.7254H6.40748M3.75 7.62539H9.95M8.7875 0.650391H4.9125C4.60419 0.650391 4.3085 0.772868 4.09049 0.990879C3.87248 1.20889 3.75 1.50458 3.75 1.81289C3.75 2.1212 3.87248 2.41689 4.09049 2.6349C4.3085 2.85291 4.60419 2.97539 4.9125 2.97539H8.7875C9.09581 2.97539 9.3915 2.85291 9.60951 2.6349C9.82752 2.41689 9.95 2.1212 9.95 1.81289C9.95 1.50458 9.82752 1.20889 9.60951 0.990879C9.3915 0.772868 9.09581 0.650391 8.7875 0.650391Z'
        stroke={color}
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.95039 1.8125C11.1547 1.84892 11.8724 1.983 12.3692 2.48055C13.0512 3.161 13.0512 4.25763 13.0512 6.44855V11.5C13.0512 13.6917 13.0512 14.7875 12.3692 15.4688C11.6887 16.15 10.5921 16.15 8.40117 16.15H5.30117C3.10792 16.15 2.01207 16.15 1.33162 15.4688C0.651166 14.7875 0.650391 13.6917 0.650391 11.5V6.44932C0.650391 4.25762 0.650391 3.161 1.33162 2.48055C1.82839 1.983 2.54682 1.84892 3.75039 1.8125'
        stroke={color}
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
