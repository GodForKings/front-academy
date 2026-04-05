'use client'

import { useTranslations } from 'next-intl'
import type { FC } from 'react'

import { AimIcon, cn,InfoBlock } from '@/shared'

interface EmptyProps {
  className?: string
  iconSize?: number
  description?: string
}

export const Empty: FC<EmptyProps> = (props) => {
  const { className, iconSize = 100, description } = props
  const t = useTranslations()

  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center gap-5',
        'w-full text-center',
        className,
      )}
    >
      <AimIcon size={iconSize} className='animate-pulse' />

      <InfoBlock
        className='gap-3 items-center'
        headerClass='text-lg font-bold'
        title={t('shared.notFound')}
        paragraph={description}
        paragraphClass='text-sm font-medium'
      />
    </div>
  )
}
