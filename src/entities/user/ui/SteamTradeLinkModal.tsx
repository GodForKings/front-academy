'use client'

import { useUnit } from 'effector-react'
import { Link, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC, useState } from 'react'

import { Button, cn, SpinIcon } from '@/shared'
import { closeModal } from '@/widgets'

import { handleOpenSteamTradeLink, isValidSteamTradeLink } from '../lib'
import { $steamTradeLinkLoading, $user, updateSteamTradeLinkData } from '../model/userList'

export const SteamTradeLinkModal: FC = () => {
  const t = useTranslations('profilePage')
  const sharedTr = useTranslations('shared')

  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const [onClose, saveTradeLink, isLoading, user] = useUnit([
    closeModal,
    updateSteamTradeLinkData,
    $steamTradeLinkLoading,
    $user,
  ])

  const handleSave = () => {
    const link = value.trim()

    if (Boolean(!user?.steam?.steamId)) return setError(t('inventory.tradeLinkSteamNotLinked'))

    if (!link) {
      return setError(t('inventory.tradeLinkRequired'))
    }

    if (!isValidSteamTradeLink(link)) {
      return setError(t('inventory.tradeLinkInvalid'))
    }

    setError(null)
    saveTradeLink(link)
  }

  return (
    <div className={cn('flex justify-center flex-col gap-8', 'px-10 pt-4 pb-26')}>
      <div className={cn('flex items-center justify-between gap-2')}>
        <h2 className={cn('text-[22px] font-medium tracking-wide')}>
          {t('inventory.tradeLinkModalTitle')}
        </h2>

        <Button
          size='md'
          onClick={onClose}
          variant='secondary'
          className='size-9 rounded-2xl shrink-0'
        >
          <X size={22} />
        </Button>
      </div>

      <p className='text-sm/5 tracking-wider'>{t('inventory.tradeLinkModalText')}</p>

      <button
        type='button'
        onClick={handleOpenSteamTradeLink}
        className={cn(
          'flex items-center gap-3',
          'w-fit -mt-2 transition hover:opacity-80 active:scale-98',
          'font-medium text-main-violet text-lg',
        )}
      >
        {t('inventory.tradeLinkHelp')}

        <Link size={18} />
      </button>

      <div className='flex flex-col gap-2'>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (error) setError(null)
          }}
          placeholder={t('inventory.tradeLinkPlaceholder')}
          className={cn(
            'w-full rounded-full px-4 py-3 outline-none',
            'bg-white/5 border border-white/10',
            'text-sm placeholder:text-white/50',
            'focus:border-main-violet transition',
          )}
        />

        {error && <p className='text-sm/4 text-main-red tracking-wide'>{error}</p>}
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <Button onClick={onClose} variant='secondary' size='md'>
          {sharedTr('closed')}
        </Button>

        <Button
          disabled={Boolean(isLoading || error)}
          onClick={handleSave}
          variant={Boolean(isLoading || error) ? 'secondary' : 'primary'}
          size='md'
        >
          {isLoading ? <SpinIcon /> : t('inventory.tradeLinkSave')}
        </Button>
      </div>
    </div>
  )
}
