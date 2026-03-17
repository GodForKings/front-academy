'use client'

import { $user, $userBootstrapped, ProfileHeader, balanceUpdated, steamUpdated, faceitUpdated } from '@/entities'
import { $registrationSkipped } from '@/features'
import { useWebSocket } from '@/shared/hooks/useWebSocket'
import { Navigation, PAGES } from '@/widgets'
import { useUnit } from 'effector-react'
import { redirect, usePathname } from 'next/navigation'
import { useLayoutEffect, type PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  const [user, bootstrapped, registrationSkipped, onBalanceUpdate, onSteamUpdate, onFaceitUpdate] = useUnit([
    $user,
    $userBootstrapped,
    $registrationSkipped,
    balanceUpdated,
    steamUpdated,
    faceitUpdated,
  ])

  useWebSocket({
    userId: user?.tgId || null,
    onBalanceUpdate,
    onSteamUpdate,
    onFaceitUpdate,
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
