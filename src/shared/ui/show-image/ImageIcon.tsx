import Image from 'next/image'
import type { FC } from 'react'

import { cn, getPhotoUrl } from '@/shared'

interface ImageIconProps {
  className?: string
  height?: number
  width?: number
  srcFile?: string | null
}

export const ImageIcon: FC<ImageIconProps> = (props) => {
  const { className, height = 36, width = 36, srcFile } = props

  return (
    <Image
      placeholder='blur'
      blurDataURL='/svg/blur.svg'
      src={srcFile ? getPhotoUrl(srcFile) : '/images/profile.png'}
      alt='img'
      height={height}
      width={width}
      className={cn('shrink-0', className)}
      unoptimized
    />
  )
}
