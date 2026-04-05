'use client'

import { useUnit } from 'effector-react'
import { redirect, usePathname } from 'next/navigation'
import { type PropsWithChildren, useLayoutEffect } from 'react'

import {
  $user,
  $userBootstrapped,
  balanceUpdated,
  experienceUpdated,
  faceitUpdated,
  ProfileHeader,
  steamTradeTokenUpdated,
  steamUpdated,
  twitchUpdated,
} from '@/entities'
import { $registrationSkipped } from '@/features'
import { useWebSocket } from '@/shared/hooks'
import { Navigation, PAGES } from '@/widgets'

export default function Layout({ children }: PropsWithChildren) {
  const [
    user,
    bootstrapped,
    registrationSkipped,
    onBalanceUpdate,
    onExperienceUpdate,
    onSteamUpdate,
    onSteamTradeTokenUpdate,
    onFaceitUpdate,
    onTwitchUpdate,
  ] = useUnit([
    $user,
    $userBootstrapped,
    $registrationSkipped,
    balanceUpdated,
    experienceUpdated,
    steamUpdated,
    steamTradeTokenUpdated,
    faceitUpdated,
    twitchUpdated,
  ])

  useWebSocket({
    userId: user?.tgId || null,
    onBalanceUpdate,
    onExperienceUpdate,
    onSteamUpdate,
    onSteamTradeTokenUpdate,
    onFaceitUpdate,
    onTwitchUpdate,
  })

  const pathname = usePathname()

  useLayoutEffect(() => {
    if (!bootstrapped || !user) return

    const inRegistration = pathname.startsWith(PAGES.REGISTRATION)

    if (!user.isVerified && !registrationSkipped && !inRegistration) {
      redirect(PAGES.REGISTRATION)
    }
  }, [bootstrapped, user, registrationSkipped, pathname])

  /* Чтобы не показывать на 0.1сек games */
  if (!bootstrapped) return null

  return (
    <>
      <ProfileHeader />

      {children}

      <Navigation />
    </>
  )
}
