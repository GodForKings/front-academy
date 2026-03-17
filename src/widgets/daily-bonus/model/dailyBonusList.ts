'use client'

import { toastModels } from '@/entities'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { checkDailyBonus, claimDailyBonus } from '../api/methods'
import { DailyBonusCheck } from '../api/types'

const DEFAULT: DailyBonusCheck = { available: false }

export const DailyBonusGate = createGate()

/* Эффекты */
export const checkDailyBonusFx = createEffect(checkDailyBonus)
export const claimDailyBonusFx = createEffect(claimDailyBonus)

/* События */
export const fetchDailyBonus = createEvent()
export const claimBonus = createEvent()

/* Диалог flow */
const showSuccess = createEvent<number>() // added
export const hideSuccess = createEvent()

/* Хранилища */
export const $dailyBonus = createStore<DailyBonusCheck>(DEFAULT)
export const $dailyBonusLoading = checkDailyBonusFx.pending
export const $claimLoading = claimDailyBonusFx.pending

export const $successReward = createStore<number | null>(null)
  .on(showSuccess, (_, reward) => reward)
  .reset(hideSuccess)

/* Ворота trigger */
sample({
  clock: DailyBonusGate.open,
  target: fetchDailyBonus,
})

/* Эффект => check */
sample({
  clock: fetchDailyBonus,
  target: checkDailyBonusFx,
})

/* check => store */
sample({
  clock: checkDailyBonusFx.doneData,
  target: $dailyBonus,
})

/* Получить награду => guard */
sample({
  clock: claimBonus,
  source: { daily: $dailyBonus, pending: $claimLoading },
  filter: ({ daily, pending }) => daily.available && !pending,
  target: claimDailyBonusFx,
})

/* после получения показываем dialog и выкл ui */
sample({
  clock: claimDailyBonusFx.doneData,
  fn: ({ added }) => ({ available: false, nextAvailableAt: undefined }) satisfies DailyBonusCheck,
  target: $dailyBonus,
})

sample({
  clock: claimDailyBonusFx.doneData,
  fn: ({ added }) => added,
  target: showSuccess,
})

/* UI уведомления */
sample({
  clock: checkDailyBonusFx.failData,
  fn: () => 'Не удалось проверить ежедневный бонус',
  target: toastModels.events.showError,
})
sample({
  clock: claimDailyBonusFx.failData,
  fn: () => 'Не удалось забрать ежедневный бонус',
  target: toastModels.events.showError,
})

/* Units */
export const dailyBonusModels = {
  events: {
    fetchDailyBonus,
    claimBonus,
    hideSuccess,
  },
  stores: {
    $dailyBonus,
    $dailyBonusLoading,
    $claimLoading,
    $successReward,
  },
  effects: {
    checkDailyBonusFx,
    claimDailyBonusFx,
  },
}
