'use client'

import { linkAccountsModels } from '@/entities'
import { Button, SpinIcon, cn } from '@/shared'
import { useUnit } from 'effector-react'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import { EmailAndPhone } from './EmailAndPhone'

export const PlatformSync: FC = () => {
  const t = useTranslations('profilePage')

  const [
    steamLinked,
    faceitLinked,
    twitchLinked,
    steamPending,
    steamDisconnectPending,
    faceitPending,
    faceitDisconnectPending,
    twitchPending,
    steamClicked,
    faceitClicked,
    twitchClicked,
  ] = useUnit([
    linkAccountsModels.stores.$steamLinked,
    linkAccountsModels.stores.$faceitLinked,
    linkAccountsModels.stores.$twitchLinked,
    linkAccountsModels.stores.$steamPending,
    linkAccountsModels.stores.$steamDisconnectPending,
    linkAccountsModels.stores.$faceitPending,
    linkAccountsModels.stores.$faceitDisconnectPending,
    linkAccountsModels.stores.$twitchPending,
    linkAccountsModels.events.steamClicked,
    linkAccountsModels.events.faceitClicked,
    linkAccountsModels.events.twitchClicked,
  ])

  const steamLoading = steamPending || steamDisconnectPending
  const faceitLoading = faceitPending || faceitDisconnectPending
  const twitchLoading = twitchPending

  return (
    <div className={cn('rounded-3xl bg-white/5 backdrop-blur-lg p-4', 'flex flex-col gap-4')}>
      <h3 className='font-bold text-lg tracking-wide'>{t('connectedAccounts.title')}</h3>

      <EmailAndPhone />

      <div className='flex flex-col gap-4'>
        <AppsRows
          icon='/svg/steam.svg'
          title={t('connectedAccounts.providers.steam')}
          loading={steamLoading}
          connected={steamLinked}
          actionText={
            steamLinked ? t('connectedAccounts.disconnect') : t('connectedAccounts.connect')
          }
          onClick={steamClicked}
        />

        <AppsRows
          icon='/svg/faceit.svg'
          title={t('connectedAccounts.providers.faceit')}
          loading={faceitLoading}
          connected={faceitLinked}
          actionText={
            faceitLinked ? t('connectedAccounts.disconnect') : t('connectedAccounts.connect')
          }
          onClick={faceitClicked}
        />

        <AppsRows
          icon='/svg/twitch.svg'
          title={t('connectedAccounts.providers.twitch')}
          loading={twitchLoading}
          connected={twitchLinked}
          // Twitch пока только подключить
          actionText={
            twitchLinked ? t('connectedAccounts.connected') : t('connectedAccounts.connect')
          }
          disabledWhenConnected
          onClick={twitchClicked}
        />
      </div>
    </div>
  )
}

interface AppsRowsProps {
  title: string
  actionText: string
  icon: string
  connected: boolean
  loading?: boolean
  disabledWhenConnected?: boolean
  onClick: () => void
}

const AppsRows: FC<AppsRowsProps> = (props) => {
  const {
    title,
    actionText,
    icon,
    connected,
    loading = false,
    disabledWhenConnected = false,
    onClick,
  } = props

  const disabled = loading || (disabledWhenConnected && connected)

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <div
          className={cn(
            'size-11 shrink-0 bg-[#111111]',
            'border border-white/5 rounded-xl',
            'flex items-center justify-center',
          )}
        >
          <img src={icon} alt='platform' className='size-5.5' />
        </div>

        <p className='font-bold text-base tracking-wide'>{title}</p>
      </div>

      <Button
        variant='secondary'
        size='md'
        className='w-fit px-4 font-medium'
        disabled={disabled}
        onClick={onClick}
      >
        {loading ? <SpinIcon /> : actionText}
      </Button>
    </div>
  )
}
