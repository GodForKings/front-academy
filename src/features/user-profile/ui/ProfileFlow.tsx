'use client'

import { $isVerified } from '@/entities'
import { PageWrapper } from '@/shared'
import { DailyBonusGate, PAGES } from '@/widgets'
import { useGate, useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'motion/react'
import { redirect } from 'next/navigation'
import { useLayoutEffect, useState, type FC } from 'react'
import type { ProfileTab } from '../lib/types'
import { InventoryTabContent } from './InventoryTabContent'
import { ProfileTabContent } from './ProfileTabContent'
import { ProfileTabs } from './ProfileTabs'

/** Компоненты от `активного таба` */
const TAB_COMPONENTS: Record<ProfileTab, FC> = {
  profile: ProfileTabContent,
  inventory: InventoryTabContent,
}

export const ProfileFlow: FC = () => {
  const isVerified = useUnit($isVerified)

  useGate(DailyBonusGate)

  const [tab, setTab] = useState<ProfileTab>('profile')
  /** Текущий компонент */
  const Current = TAB_COMPONENTS[tab]

  /* Защита от неавторизованного юзера */
  useLayoutEffect(() => {
    if (!isVerified) redirect(PAGES.GAMES)
  }, [isVerified])

  return (
    <PageWrapper className='flex flex-col gap-5 pb-26'>
      <ProfileTabs tab={tab} onChange={setTab} />

      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className='flex flex-col gap-7 h-fit'
        >
          <Current />
        </motion.div>
      </AnimatePresence>
    </PageWrapper>
  )
}
