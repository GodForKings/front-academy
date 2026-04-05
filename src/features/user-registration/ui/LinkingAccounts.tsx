'use client'

import { useUnit } from 'effector-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

import { linkAccountsModels } from '@/entities'
import { Button, cn, InfoBlock, PageWrapper, usePlatform } from '@/shared'
import { PAGES } from '@/widgets'

import { AccountRow } from './AccountRow'

export const LinkingAccounts: FC = () => {
  const t = useTranslations('registrationEmail')
  const router = useRouter()
  const { isMobile } = usePlatform()

  const [
    steamLinked,
    faceitLinked,
    steamPending,
    steamDisconnectPending,
    faceitPending,
    faceitDisconnectPending,
    canContinue,
    steamClicked,
    faceitClicked,
  ] = useUnit([
    linkAccountsModels.stores.$steamLinked,
    linkAccountsModels.stores.$faceitLinked,
    linkAccountsModels.stores.$steamPending,
    linkAccountsModels.stores.$steamDisconnectPending,
    linkAccountsModels.stores.$faceitPending,
    linkAccountsModels.stores.$faceitDisconnectPending,
    linkAccountsModels.stores.$canContinue,
    linkAccountsModels.events.steamClicked,
    linkAccountsModels.events.faceitClicked,
  ])

  const goNext = () => router.push(PAGES.REGISTRATION_PHONE)

  return (
    <PageWrapper className={cn('flex flex-col gap-7', 'pb-9 pt-10', isMobile && '-mt-24 pt-24')}>
      <InfoBlock
        className='gap-4'
        headerClass='text-2xl/5 font-extrabold tracking-wide'
        title={t('accounts.title')}
        paragraph={t('accounts.subtitle')}
        paragraphClass='text-sm/5'
      />

      <div
        className={cn(
          'p-4 bg-white/5 backdrop-blur-xl shadow',
          'border-b border-white/5 rounded-2xl',
          'flex flex-col gap-7',
        )}
      >
        <AccountRow
          icon={'/svg/steam.svg'}
          title={t('accounts.steam.title')}
          subtitle={t('accounts.steam.subtitle')}
          buttonClassName={cn(steamLinked ? 'border-main-green' : 'bg-main-blue')}
          connected={steamLinked}
          loading={steamPending || steamDisconnectPending}
          onClick={() => steamClicked()}
          tConnect={t('accounts.actions.connect')}
          tConnected={t('accounts.actions.connected')}
          tDisconnect={t('accounts.actions.disconnect')}
        />

        <div className='h-px bg-white/20 rounded-xs' />

        <AccountRow
          icon='/svg/faceit.svg'
          title={t('accounts.faceit.title')}
          subtitle={t('accounts.faceit.subtitle')}
          buttonClassName={cn(faceitLinked ? 'border-main-green' : 'bg-main-orange')}
          connected={faceitLinked}
          loading={faceitPending || faceitDisconnectPending}
          onClick={() => faceitClicked()}
          tConnect={t('accounts.actions.connect')}
          tConnected={t('accounts.actions.connected')}
          tDisconnect={t('accounts.actions.disconnect')}
        />
      </div>

      <Button className='mt-auto' size='lg' variant='primary' onClick={goNext}>
        {canContinue ? t('accounts.actions.continue') : t('accounts.actions.skip')}
      </Button>
    </PageWrapper>
  )
}
