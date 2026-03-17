'use client'

import { useUnit } from 'effector-react'
import { useEffect, type FC } from 'react'

import { SuccessDialog } from '@/shared'
import { closeDialog, openDialog } from '@/widgets/dialog'
import { useTranslations } from 'next-intl'
import { tasksModels } from '../model/userTasksList'

export const TaskSuccessDialogController: FC = () => {
  const t = useTranslations('userTasks')

  const [reward, hideSuccess, open, close] = useUnit([
    tasksModels.stores.$successReward,
    tasksModels.events.hideSuccess,
    openDialog,
    closeDialog,
  ])

  useEffect(() => {
    if (reward == null) return

    open({
      content: <SuccessDialog reward={reward} title={t('congratulate')} />,
      className: 'shadow-none rounded-none overflow-visible h-screen',
    })

    const id = window.setTimeout(() => {
      close()
      hideSuccess()
    }, 2000)

    return () => window.clearTimeout(id)
  }, [reward])

  return null
}
