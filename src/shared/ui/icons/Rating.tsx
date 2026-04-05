import type { FC } from 'react'

import type { IconProps } from '@/shared'

import { DEFAULT_COLOR, DEFAULT_SIZE } from './config'

export const RatingIcon: FC<IconProps> = (props) => {
  const { size = DEFAULT_SIZE, color = DEFAULT_COLOR, style, className } = props

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 19 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      style={style}
    >
      <path
        d='M13.6511 1.04579C14.2933 1.16799 14.6746 1.30319 15.0031 1.70879C15.4165 2.21666 15.3948 2.76526 15.3506 3.86246C15.1946 7.80839 14.3106 12.7839 9.31859 12.7839C4.32659 12.7839 3.44173 7.80925 3.28399 3.86246C3.24066 2.76526 3.21899 2.21579 3.63066 1.70879C4.04319 1.20092 4.53633 1.11772 5.52346 0.951323C6.77767 0.745872 8.04681 0.64528 9.31772 0.65059C9.94057 0.651746 10.5183 0.67139 11.0511 0.709524'
        stroke={color}
        strokeWidth='1.3'
        strokeLinecap='round'
      />

      <path
        d='M15.3837 3.25098L16.2062 3.52484C17.0642 3.81084 17.4932 3.95384 17.7384 4.29444C17.9837 4.63504 17.9837 5.08831 17.9837 5.99138V6.05464C17.9837 6.79998 17.9837 7.17351 17.8043 7.47858C17.6249 7.78364 17.2982 7.96477 16.6465 8.32791L14.0837 9.75097M3.25039 3.25098L2.42792 3.52484C1.56992 3.81084 1.14092 3.95384 0.895657 4.29444C0.650391 4.63504 0.650391 5.08831 0.650391 5.99138V6.05464C0.650391 6.79998 0.650391 7.17351 0.829791 7.47858C1.00919 7.78364 1.33592 7.96477 1.98766 8.32791L4.55039 9.75097'
        stroke={color}
        strokeWidth='1.3'
      />

      <path d='M9.31641 13.6504V15.3837' stroke={color} strokeWidth='1.3' strokeLinecap='round' />

      <path
        d='M12.3499 17.984H6.2832L6.57787 16.5142C6.61712 16.3178 6.72319 16.141 6.87803 16.014C7.03287 15.887 7.22692 15.8175 7.4272 15.8174H11.2059C11.4061 15.8175 11.6002 15.887 11.755 16.014C11.9099 16.141 12.0159 16.3178 12.0552 16.5142L12.3499 17.984Z'
        stroke={color}
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      <path d='M14.5172 17.9844H4.11719' stroke={color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  )
}
