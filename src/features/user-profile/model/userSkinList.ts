'use client'

import { createEffect, createEvent, createStore, sample } from 'effector'

import { toastModels } from '@/entities'
import type { Skin } from '@/shared/types'

import { getMySkins, sellSkinById, withdrawSkinById } from '../api/methods'

/* Эффекты */
const fetchMySkinsFx = createEffect(getMySkins)
const sellSkinFx = createEffect(sellSkinById)
const withdrawSkinFx = createEffect(withdrawSkinById)

/* События */
export const fetchMySkins = createEvent()
export const resetInventory = createEvent()
const sellSkin = createEvent<string>() // skinId
const withdrawSkin = createEvent<string>() // skinId

const setSkins = createEvent<Skin[]>()
const removeSkin = createEvent<string>()
const setSellingSkinId = createEvent<string | null>()
const setWithdrawingSkinId = createEvent<string | null>()

/* Хранилища */
const $skins = createStore<Skin[]>([])
  .on(setSkins, (_, skins) => skins)
  .on(removeSkin, (skins, skinId) => {
    const index = skins.findIndex((skin) => skin.id === skinId)

    if (index === -1) return skins

    return [...skins.slice(0, index), ...skins.slice(index + 1)]
  })
  .reset(resetInventory)

const $sellingSkinId = createStore<string | null>(null)
  .on(setSellingSkinId, (_, skinId) => skinId)
  .reset(resetInventory)

const $withdrawingSkinId = createStore<string | null>(null)
  .on(setWithdrawingSkinId, (_, skinId) => skinId)
  .reset(resetInventory)

/* Загрузчики */
const $skinsLoading = fetchMySkinsFx.pending
const $sellLoading = sellSkinFx.pending
const $withdrawLoading = withdrawSkinFx.pending

/* События => Эффекты */
sample({ clock: fetchMySkins, target: fetchMySkinsFx })
sample({ clock: sellSkin, target: sellSkinFx })
sample({ clock: withdrawSkin, target: withdrawSkinFx })

/* События => Хранилища */
sample({ clock: sellSkin, target: setSellingSkinId })
sample({ clock: withdrawSkin, target: setWithdrawingSkinId })

/* Эффекты => Хранилища */
sample({ clock: fetchMySkinsFx.doneData, target: setSkins })

sample({
  clock: sellSkinFx.doneData,
  source: $sellingSkinId,
  filter: (skinId) => Boolean(skinId),
  fn: (skinId) => String(skinId),
  target: removeSkin,
})

sample({
  clock: withdrawSkinFx.doneData,
  source: $withdrawingSkinId,
  filter: (skinId) => Boolean(skinId),
  fn: (skinId) => String(skinId),
  target: removeSkin,
})

/* Сброс id активного действия */
sample({
  clock: sellSkinFx.done,
  fn: () => null,
  target: setSellingSkinId,
})

sample({
  clock: sellSkinFx.fail,
  fn: () => null,
  target: setSellingSkinId,
})

sample({
  clock: withdrawSkinFx.done,
  fn: () => null,
  target: setWithdrawingSkinId,
})

sample({
  clock: withdrawSkinFx.fail,
  fn: () => null,
  target: setWithdrawingSkinId,
})

/* UI для юзера */
sample({
  clock: fetchMySkinsFx.failData,
  fn: () => 'Не удалось загрузить инвентарь',
  target: toastModels.events.showError,
})
sample({
  clock: sellSkinFx.failData,
  fn: () => 'Не удалось продать скин',
  target: toastModels.events.showError,
})
sample({
  clock: withdrawSkinFx.failData,
  fn: () => 'Не удалось вывести скин',
  target: toastModels.events.showError,
})
sample({
  clock: sellSkinFx.doneData,
  filter: (success) => Boolean(success),
  fn: () => 'Скин успешно продан',
  target: toastModels.events.showSuccess,
})
sample({
  clock: withdrawSkinFx.doneData,
  filter: ({ success }) => Boolean(success),
  fn: ({ message }) => String(message || 'Скин успешно выведен'),
  target: toastModels.events.showSuccess,
})

export const inventoryModels = {
  events: {
    fetchMySkins,
    sellSkin,
    withdrawSkin,
    resetInventory,
  },
  stores: {
    $skins,
    $sellingSkinId,
    $withdrawingSkinId,
    $skinsLoading,
    $sellLoading,
    $withdrawLoading,
  },
  effects: {
    fetchMySkinsFx,
    sellSkinFx,
    withdrawSkinFx,
  },
}
