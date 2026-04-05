'use client'

import { Swords } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

import { cn,InfoBlock, SpinIcon } from '@/shared'
import type { Task } from '@/shared/types'

function TaskTypeIcon({ type }: { type: string | null }) {
  const iconSize = 20

  switch (type) {
    case 'check_email':
      return (
        <Image src='/svg/mail.svg' alt='' width={iconSize} height={iconSize} className='shrink-0' />
      )
    case 'check_phone':
      return (
        <Image
          src='/svg/phone.svg'
          alt=''
          width={iconSize}
          height={iconSize}
          className='shrink-0'
        />
      )
    case 'check_steam':
      return (
        <Image
          src='/svg/steam.svg'
          alt=''
          width={iconSize}
          height={iconSize}
          className='shrink-0'
        />
      )
    default:
      return <Swords size={iconSize} className='shrink-0' />
  }
}

interface TaskCardProps {
  disabled: boolean
  task: Task
  checking?: boolean
  onCheck?: (taskId: string) => void
}

export const TaskCard: FC<TaskCardProps> = (props) => {
  const { task, checking = false, onCheck, disabled } = props
  const t = useTranslations('userTasks')

  const isGaming = task.category === 'game'
  const isCompleted = task.taskStatus === 'completed'
  const isPending = task.taskStatus === 'pending'

  const reward = task.balance ?? 0

  const progress =
    isGaming && task.maxCompletions != null
      ? `${task.userCompletions ?? 0}/${task.maxCompletions}`
      : null

  /** Отключаем кнопку */
  const isButtonDisabled = disabled || isCompleted || checking || isPending
  /** Для показа крутилки */
  const isSpinning = checking || isPending

  const handleCheck = () => {
    if (isButtonDisabled) return
    onCheck?.(task.id)
  }

  return (
    <div
      className={cn(
        'bg-white/10 backdrop-blur-xl w-full p-3',
        'border border-white/10 rounded-2xl',
        'flex gap-2',
      )}
    >
      <div
        className={cn(
          'size-9 rounded-full bg-black/25 border border-white/10',
          'flex justify-center items-center shrink-0',
        )}
      >
        <TaskTypeIcon type={task.type} />
      </div>

      <div className='min-w-0 flex-1'>
        <div className='flex items-start justify-between gap-3'>
          <InfoBlock
            title={task.name ?? ''}
            paragraph={task.description ?? ''}
            headerClass='text-sm/5'
            paragraphClass='tracking-wide'
          />

          {progress && (
            <div
              className={cn(
                'shrink-0 rounded-full bg-black/25 px-3 py-2',
                'text-xs font-bold tracking-wide',
                isCompleted && 'text-white/40',
              )}
            >
              {progress}
            </div>
          )}

          <button
            disabled={isButtonDisabled}
            onClick={handleCheck}
            className={cn(
              'px-3 py-1.5 bg-black/25',
              'rounded-2xl border border-main-violet',
              'text-xs text-center select-none',
              'hover:bg-black/45 active:scale-96 transition',
              isButtonDisabled && 'border-transparent opacity-80 pointer-events-none',
            )}
          >
            {isSpinning && <SpinIcon />}

            {isCompleted && !isSpinning && t('completed')}

            {!isCompleted && !isSpinning && t('perform')}
          </button>
        </div>

        <div className='mt-2.5'>
          <div
            className={cn(
              'inline-flex items-center gap-1',
              'rounded-full px-2 py-1 bg-white/5',
              'border border-main-orange',
              'text-xs font-bold text-white tracking-wide',
            )}
          >
            +{reward}
            <Image
              loading='eager'
              src='/svg/lightning.svg'
              alt='light'
              height={14}
              width={14}
              className='shrink-0'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
