'use client'

import { useUnit } from 'effector-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { type FC, useEffect } from 'react'

import { $roles } from '@/entities'
import { Button, CardRole, cn, InfoBlock, PageWrapper, safeReturnTo, usePlatform } from '@/shared'
import { PAGES } from '@/widgets'

import { catalogRolesModels } from '../model/catalogRolesList'

export const CatalogRoles: FC = () => {
  const router = useRouter()
  const sp = useSearchParams()
  const returnTo = safeReturnTo(sp.get('returnTo')) ?? PAGES.GAMES

  const { isMobile } = usePlatform()
  const t = useTranslations()

  const [roles, activeRoleId, shouldProceed, saving, roleSelected, submitClicked, proceedConsumed] =
    useUnit([
      $roles,
      catalogRolesModels.stores.$activeRoleId,
      catalogRolesModels.stores.$shouldProceed,
      catalogRolesModels.stores.$saving,
      catalogRolesModels.events.roleSelected,
      catalogRolesModels.events.submitClicked,
      catalogRolesModels.events.proceedConsumed,
    ])

  useEffect(() => {
    if (!shouldProceed) return
    /* вернёмся туда, откуда пришли или на страницу GAMES */
    router.replace(returnTo)
    proceedConsumed()
  }, [shouldProceed, router, proceedConsumed, returnTo])

  const bottomText = activeRoleId
    ? t('registrationEmail.accounts.actions.continue')
    : t('registrationEmail.accounts.actions.skip')

  return (
    <PageWrapper className={cn('flex flex-col gap-7', 'pt-10 pb-28', isMobile && '-mt-24 pt-24')}>
      <InfoBlock
        className='gap-4'
        headerClass='text-2xl/5 font-extrabold tracking-wide'
        title={t('registration.roles.title')}
        paragraph={t('registration.roles.subtitle')}
        paragraphClass='text-sm/5'
      />

      <div className={cn('grid grid-cols-2 gap-3', 'min-w-full')}>
        {roles.map((role) => (
          <CardRole
            key={role.id}
            role={role}
            selected={role.id === activeRoleId}
            onSelect={roleSelected}
          />
        ))}
      </div>

      <div
        className={cn(
          'flex justify-center items-center',
          'w-full px-4',
          'fixed bottom-5 left-1/2 -translate-x-1/2 z-3',
          !isMobile && 'max-w-112.5',
        )}
      >
        <Button
          variant={activeRoleId ? 'primary' : 'secondary'}
          size='lg'
          disabled={saving}
          onClick={submitClicked}
        >
          {bottomText}
        </Button>
      </div>
    </PageWrapper>
  )
}
