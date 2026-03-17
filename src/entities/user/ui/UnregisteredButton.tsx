'use client'

import { $isVerified } from '@/entities/user'
import { dropSkip } from '@/features'
import { Button, cn, usePlatform } from '@/shared'
import { PAGES } from '@/widgets'
import { useUnit } from 'effector-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'

export const UnregisteredButton: FC = () => {
  const [resetSkip, isVerified] = useUnit([dropSkip, $isVerified])
  const router = useRouter()
  const { isMobile } = usePlatform()
  const t = useTranslations()
  /** Переход на регистрацию и обнуление стейта на её игнор */
  const goToRegistration = () => {
    resetSkip()
    router.push(PAGES.REGISTRATION)
  }

  if (isVerified) return null
  return (
    <div
      className={cn(
        'flex justify-center items-center',
        'w-full px-4',
        'fixed bottom-26 left-1/2 -translate-x-1/2 z-3',
        !isMobile && 'max-w-112.5',
      )}
    >
      <Button variant='outline' size='lg' onClick={goToRegistration}>
        {t('shared.register')}
      </Button>
    </div>
  )
}
