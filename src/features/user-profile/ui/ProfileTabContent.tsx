'use client'

import { useGate } from 'effector-react'
import type { FC } from 'react'

import { DailyBonus } from '@/widgets'

import { MyStatsGate } from '../model/myStatsList'
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

      {/* Блок со статистикой юзера */}
      <StatisticsCard />

      {/* Реферальный блок */}
      <ReferralBlock />

      {/* Подключенные аккаунты */}
      <PlatformSync />

      {/* Блок документацией */}
      {/* <DocumentationApp /> */}
    </>
  )
}
