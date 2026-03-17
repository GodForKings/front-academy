'use client'

import { DailyBonus } from '@/widgets'
import { useGate } from 'effector-react'
import type { FC } from 'react'
import { MyStatsGate } from '../model/myStatsList'
import { DocumentationApp } from './DocumentationApp'
import { PlatformSync } from './PlatformSync'
import { ProfileCard } from './ProfileCard'
import { ReferralBlock } from './ReferralBlock'
import { StatisticsCard } from './StatisticsCard'

/** Все модули при активном `profile` */
export const ProfileTabContent: FC = () => {
  useGate(MyStatsGate)

  return (
    <>
      {/* Карточка с инф-ий юзера */}
      <ProfileCard />

      {/* widgets - Дневной бонус */}
      <DailyBonus />

      {/* Реферальный блок */}
      <ReferralBlock />

      {/* Подключенные аккаунты */}
      <PlatformSync />

      {/* Блок со статистикой юзера */}
      <StatisticsCard />

      {/* Блок документацией */}
      <DocumentationApp />
    </>
  )
}
