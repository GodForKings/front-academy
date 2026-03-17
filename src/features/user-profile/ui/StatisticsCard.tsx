'use client'

import { $user } from '@/entities'
import { CaseIcon, FaceIcon, StormIcon, SwitchIcon, TasksIcon, cn } from '@/shared'
import { PAGES } from '@/widgets'
import { useUnit } from 'effector-react'
import { Axe } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { FC, ReactNode } from 'react'
import { formatNumber } from '../lib/helpers'
import { $myStats } from '../model/myStatsList'

const ICON_PROP = {
  size: 16,
  color: '#FFF',
  className: 'opacity-70 shrink-0',
}

interface StatisticsCardProps {
  className?: string
}

export const StatisticsCard: FC<StatisticsCardProps> = (props) => {
  const { className } = props

  const t = useTranslations('profilePage')
  const [user, myStat] = useUnit([$user, $myStats])
  const role = user?.role?.name ?? '-'

  const router = useRouter()
  const goToSwitchRole = () =>
    router.push(`${PAGES.REGISTRATION_CHOICE_ROLE}?returnTo=${PAGES.PROFILE}`)

  return (
    <div
      className={cn(
        'relative w-full h-43 p-4 select-none',
        'bg-white/5 backdrop-blur-lg rounded-3xl',
        'flex flex-col gap-4',
        className,
      )}
    >
      <h3 className='text-lg/5 font-bold tracking-wide'>{t('stats.title')}</h3>

      <div className={cn('grid grid-cols-2 gap-3', 'min-w-full')}>
        <StatCard
          icon={<TasksIcon {...ICON_PROP} />}
          label={t('stats.tasks')}
          value={myStat?.completedTasks}
        />

        <StatCard
          icon={<StormIcon {...ICON_PROP} />}
          label={t('stats.pointsAllTime')}
          value={formatNumber(myStat?.totalReceivedBalance ?? 0)}
        />

        <StatCard
          icon={<CaseIcon {...ICON_PROP} />}
          label={t('stats.cases')}
          value={myStat?.openedCases}
        />

        <StatCard
          icon={<FaceIcon {...ICON_PROP} />}
          label={t('stats.role')}
          value={role}
          valueClassName='text-main-orange'
          rightIcon={<SwitchIcon size={12} />}
          onClick={goToSwitchRole}
        />
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: ReactNode
  label: string
  value?: string | number | null
  valueClassName?: string
  rightIcon?: ReactNode
  onClick?: () => void
}
const StatCard: FC<StatCardProps> = (props) => {
  const { icon, label, value, valueClassName, rightIcon, onClick } = props

  return (
    <div
      className={cn(
        'relative h-12 w-full',
        'flex items-start gap-1.5',
        'bg-white/5 p-2 rounded-xl',
      )}
    >
      {icon}

      <div className='flex flex-col justify-center gap-0.5 w-full'>
        <p className='text-white/70 text-[10px] font-medium truncate tracking-wider'>{label}</p>

        <div className={cn('flex items-center gap-1', 'max-w-30')}>
          <p className={cn('text-xs font-medium truncate', valueClassName)}>
            {value ?? <Axe className='size-3 animate-pulse' />}
          </p>

          {rightIcon && (
            <button
              onClick={onClick}
              className={cn(
                'text-main-orange shrink-0',
                'transition hover:opacity-70 active:scale-90',
              )}
            >
              {rightIcon}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
