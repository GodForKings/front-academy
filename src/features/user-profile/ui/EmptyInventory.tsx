'use client'

import { Button, Empty, cn } from '@/shared'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

interface EmptyInventoryProps {
  onClick: () => void
}

/** Пустышка под инвентарь скинов */
export const EmptyInventory: FC<EmptyInventoryProps> = (props) => {
  const { onClick } = props
  const t = useTranslations('profilePage')
  return (
    <div className={cn('flex flex-col justify-center items-center gap-5', 'mt-4')}>
      <Empty description={t('inventory.emptyText')} />

      <Button onClick={onClick} variant='primary' size='md' className='max-w-45'>
        {t('inventory.emptyButton')}
      </Button>
    </div>
  )
}
