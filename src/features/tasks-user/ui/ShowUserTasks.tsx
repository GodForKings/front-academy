'use client'

import { useGate, useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC,useMemo, useState } from 'react'

import { $isVerified, UnregisteredButton } from '@/entities'
import { cn,Empty, InfoBlock, PageWrapper, TaskCard } from '@/shared'
import { Task, TaskTab } from '@/shared/types'

import { TasksGate } from '../model/userTasksGate'
import { tasksModels } from '../model/userTasksList'
import { StatBlock } from './StatBlock'
import { TasksTabs } from './TasksTabs'
import { TaskSuccessDialogController } from './TaskSuccessDialogController'

export const ShowUserTasks: FC = () => {
  useGate(TasksGate)
  const t = useTranslations('userTasks')

  const [tasks, loading, checkingId, checkTask, isVerified] = useUnit([
    tasksModels.stores.$tasks,
    tasksModels.stores.$tasksLoading,
    tasksModels.stores.$checkingTaskId,
    tasksModels.events.checkTask,
    $isVerified,
  ])

  const [tab, setTab] = useState<TaskTab>('social')

  const completedCount = useMemo(
    () => tasks.filter((t) => t.taskStatus === 'completed').length,
    [tasks],
  )
  const totalCount = tasks.length

  const filtered = useMemo(() => {
    const list = tasks.filter((task) =>
      tab === 'gaming' ? task.category === 'game' : task.category === 'social',
    )
    return list.sort((a, b) => {
      const ao = a.taskStatus === 'completed' ? 1 : 0
      const bo = b.taskStatus === 'completed' ? 1 : 0
      return ao - bo
    })
  }, [tasks, tab])

  const availablePoints = useMemo(() => {
    return filtered
      .filter((t) => t.taskStatus !== 'completed')
      .reduce((sum, t) => sum + (t.balance ?? 0), 0)
  }, [filtered])

  return (
    <PageWrapper className='flex flex-col gap-5 pb-43 min-h-fit'>
      <InfoBlock
        className='gap-2'
        headerClass='text-[22px] font-extrabold tracking-wide'
        title={t('title')}
        paragraph={t('subtitle')}
        paragraphClass='text-sm/5 font-medium tracking-wide'
      />

      {/* Статистика */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
        className={cn('grid grid-cols-2 gap-3', 'min-w-full')}
      >
        <StatBlock title={t('completed')}>
          {completedCount}/{totalCount || 0}
        </StatBlock>

        <StatBlock title={t('available')} paragraphClass='flex justify-end items-center gap-0.5'>
          +{availablePoints}
          <Image
            loading='eager'
            src='/svg/lightning.svg'
            alt='light'
            height={18}
            width={18}
            className='shrink-0'
          />
        </StatBlock>
      </motion.div>

      {/* Табы */}
      <TasksTabs tab={tab} onChange={setTab} />

      {/* Контент таба */}
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -18, filter: 'blur(6px)' }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className='space-y-4'
        >
          {!loading && filtered.length === 0 && (
            <Empty className='mt-3' description={t('descNotFound')} />
          )}

          {filtered.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              disabled={!isVerified}
              checking={checkingId === task.id}
              onCheck={(id) => checkTask(id)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <TaskSuccessDialogController />
      <UnregisteredButton />
    </PageWrapper>
  )
}
