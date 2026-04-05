'use client'

import type { FC } from 'react'

import { cn,TabButton } from '@/shared'
import type { TaskTab } from '@/shared/types'

interface TasksTabsProps {
  tab: TaskTab
  onChange: (tab: TaskTab) => void
}

export const TasksTabs: FC<TasksTabsProps> = (props) => {
  const { tab, onChange } = props

  return (
    <div className={cn('mt-3 rounded-full p-0.5 bg-white/5', 'flex relative')}>
      <TabButton active={tab === 'social'} onClick={() => onChange('social')} title='Социальные' />

      <TabButton active={tab === 'gaming'} onClick={() => onChange('gaming')} title='Игровые' />
    </div>
  )
}
