'use client'

import { TabButton, cn } from '@/shared'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import type { ProfileTab } from '../lib/types'

interface ProfileTabsProps {
  tab: ProfileTab
  onChange: (tab: ProfileTab) => void
}

export const ProfileTabs: FC<ProfileTabsProps> = (props) => {
  const { tab, onChange } = props
  const t = useTranslations('profilePage')

  return (
    <div className={cn('mt-2 rounded-full p-0.5 bg-white/5 h-9.5', 'flex relative')}>
      <TabButton
        active={tab === 'profile'}
        onClick={() => onChange('profile')}
        title={t('profile.title')}
      />

      <TabButton
        active={tab === 'inventory'}
        onClick={() => onChange('inventory')}
        title={t('inventory.title')}
      />
    </div>
  )
}
