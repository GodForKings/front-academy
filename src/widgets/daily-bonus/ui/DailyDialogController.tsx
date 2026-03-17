'use client'

import { SuccessDialog } from '@/shared'
import { closeDialog, openDialog } from '@/widgets/dialog'
import { useUnit } from 'effector-react'
import { useTranslations } from 'next-intl'
import { useEffect, type FC } from 'react'
import { dailyBonusModels } from '../model/dailyBonusList'

export const DailyDialogController: FC = () => {
  const t = useTranslations('profilePage')

  const [reward, hideSuccess, open, close] = useUnit([
    dailyBonusModels.stores.$successReward,
    dailyBonusModels.events.hideSuccess,
    openDialog,
    closeDialog,
  ])

  useEffect(() => {
    if (reward == null) return

    open({
      content: <SuccessDialog reward={reward} title={t('profile.dailyBonus')} />,
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
