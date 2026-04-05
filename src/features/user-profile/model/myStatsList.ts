'use client'

import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { toastModels } from '@/entities'
import type { MyStats } from '@/shared/types'

import { getMyStats } from '../api/methods'

export const MyStatsGate = createGate()

/* Эффекты */
export const fetchMyStatsFx = createEffect(getMyStats)

/* События */
export const fetchMyStats = createEvent()
const setMyStats = createEvent<MyStats>()

/* Хранилища */
export const $myStats = createStore<MyStats | null>(null).on(setMyStats, (_, stats) => stats)

/* Loading UI */
export const $myStatsIsLoading = fetchMyStatsFx.pending

/* На open => event */
sample({
  clock: MyStatsGate.open,
  target: fetchMyStats,
})

/* События => Эффекты */
sample({
  clock: fetchMyStats,
  target: fetchMyStatsFx,
})

/* Эффекты => Хранилища */
sample({
  clock: fetchMyStatsFx.doneData,
  target: setMyStats,
})

/* UI уведомление */
sample({
  clock: fetchMyStatsFx.failData,
  fn: () => 'Ошибка при загрузке статистики',
  target: toastModels.events.showError,
})
