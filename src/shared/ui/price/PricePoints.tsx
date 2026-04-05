import Image from 'next/image'
import type { FC } from 'react'

import { cn } from '@/shared'

interface PricePointsProps {
  className?: string // стиль для текста
  iconSize?: number // размер иконки
  point?: number // текст
}

export const PricePoints: FC<PricePointsProps> = (props) => {
  const { className, iconSize = 18, point } = props
  return (
    <>
      <p className={cn('text-sm/5 font-bold tracking-wider', className)}>
        {point ? Number(point) : 0}
      </p>

      <Image
        loading='eager'
        src='/svg/lightning.svg'
        alt='light'
        height={iconSize}
        width={iconSize}
        className='shrink-0'
      />
    </>
  )
}
