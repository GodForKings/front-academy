'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

import {
  cn,
  GamesIcon,
  ProfileIcon,
  TasksIcon,
  usePlatform,
} from '@/shared'

import { PAGES } from '../model/pages.config'
import type { NavigationPage } from '../model/types'

const ACTIVE = '#F7911C'
const INACTIVE = '#656565'

export const Navigation: FC = () => {
  const pathname = usePathname()
  const { isMobile } = usePlatform()
  const t = useTranslations()

  const pagesData: NavigationPage[] = [
    { title: t('navigation.games'), link: PAGES.GAMES, icon: GamesIcon },
    // { title: t('navigation.workshop'), link: PAGES.WORK_SHOP, icon: WorkShopIcon },
    { title: t('navigation.tasks'), link: PAGES.TASKS, icon: TasksIcon },
    { title: t('navigation.profile'), link: PAGES.PROFILE, icon: ProfileIcon },
    // { title: t('navigation.rating'), link: PAGES.RATING, icon: RatingIcon },
    // { title: t('navigation.tournaments'), link: PAGES.TOURNAMENTS, icon: TournamentsIcon },
    // { title: t('navigation.services'), link: PAGES.SERVICES, icon: ServicesIcon },
  ]

  const handleSwitchingPages = (isActive: boolean) => {
    if (isActive) return
  }

  if (pathname.startsWith(PAGES.REGISTRATION)) return null

  return (
    <motion.nav
      whileInView={{ filter: 'blur(0px)' }}
      initial={{ filter: 'blur(4px)' }}
      transition={{ duration: 0.4, ease: 'linear' }}
      className={cn(
        'fixed bottom-0 left-1/2 z-5 -translate-x-1/2',
        'pb-7 w-full overflow-hidden',
        'bg-black/25 backdrop-blur-3xl',
        'border-t border-white/10 rounded-t-4xl',
        'flex justify-around',
        !isMobile && 'max-w-112.5',
      )}
    >
      {pagesData.map((page: NavigationPage, index) => {
        const IconComponent = page.icon
        const isActive = pathname === page.link

        return (
          <Link
            prefetch
            key={page.link}
            href={page.link}
            onClick={() => handleSwitchingPages(isActive)}
            className={cn(
              'relative pt-3',
              'flex flex-1 flex-col items-center justify-center gap-1',
              'cursor-pointer touch-manipulation transition',
              !isActive && 'active:opacity-50 hover:opacity-70',

              /* Псевдыч под верхний span */
              "before:content-[''] before:pointer-events-none before:absolute before:left-1/2 before:-translate-x-1/2",
              'before:-top-0.5 before:h-1 before:w-10 before:rounded-b-4xl',
              isActive
                ? 'before:bg-main-orange before:shadow-[0_0_22px_rgba(247,145,28,0.75)]'
                : 'before:bg-transparent',

              /* Свечение */
              "after:content-[''] after:pointer-events-none after:absolute after:left-1/2 after:-translate-x-1/2",
              'after:-top-10 after:h-35 after:w-45 after:rounded-full after:blur-2xl after:transition-opacity',
              'after:bg-[radial-gradient(ellipse_at_center,rgba(247,145,28,0.65)_0%,rgba(247,145,28,0.22)_40%,rgba(0,0,0,0)_72%)]',
              isActive ? 'after:opacity-100' : 'after:opacity-0',
            )}
          >
            <IconComponent color={isActive ? ACTIVE : INACTIVE} size={20} />

            <p
              className={cn(
                'text-[10px]/5 tracking-wider transition',
                isActive ? 'text-[#F7911C]' : 'text-[#656565]',
              )}
            >
              {page.title}
            </p>
          </Link>
        )
      })}
    </motion.nav>
  )
}
