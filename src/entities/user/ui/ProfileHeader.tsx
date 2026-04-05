'use client'

import { initData, useSignal } from '@tma.js/sdk-react'
import { useUnit } from 'effector-react'
import { usePathname, useRouter } from 'next/navigation'
import type { FC } from 'react'

import { cn, ImageIcon, InfoBlock, usePlatform } from '@/shared'
import { PAGES } from '@/widgets'

import { HIDE_HEADER_PREFIXES } from '../lib'
import { $isVerified, $user } from '../model/userList'
import { PointsPlayer } from './PointsPlayer'

interface ProfileHeaderProps {
  className?: string
}

export const ProfileHeader: FC<ProfileHeaderProps> = (props) => {
  const { className } = props
  const [userData, isVerified] = useUnit([$user, $isVerified])
  const initDataUser = useSignal(initData.user)
  const pathname = usePathname()
  const router = useRouter()
  const { isMobile } = usePlatform()
  /** Перейти на страницу профиля */
  const goToProfile = () => router.push(PAGES.PROFILE)
  /** Пути при которых не показываем компонент */
  const stopShow = HIDE_HEADER_PREFIXES.some((currentPath) => pathname.startsWith(currentPath))

  if (!isVerified || stopShow) return null

  return (
    <div
      className={cn(
        'relative p-4 bg-white/5 backdrop-blur-2xl',
        'flex items-center justify-between gap-1',
        'rounded-b-4xl border-b border-white/5',
        isMobile && '-mt-24 pt-24',
        className,
      )}
    >
      <button onClick={goToProfile} className='flex justify-center items-center gap-2'>
        <ImageIcon
          srcFile={userData?.photoUrl ?? initDataUser?.photo_url}
          className='rounded-full border border-white/40'
        />

        <InfoBlock
          className='text-left'
          headerClass='max-w-45 truncate'
          title={`${initDataUser?.first_name}`}
          paragraph={`${userData?.level ?? 1} lvl`}
        />
      </button>

      <PointsPlayer />
    </div>
  )
}
