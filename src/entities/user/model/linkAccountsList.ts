'use client'

import { openLink } from '@tma.js/sdk-react'
import { combine, createEffect, createEvent, sample } from 'effector'

import { toastModels } from '@/entities/toast'

import {
  connectFaceit,
  connectSteam,
  connectTwitch,
  disconnectFaceit,
  disconnectSteam,
  disconnectTwitch,
} from '../api/methods'
import { $user } from './userList'
/* Эффекты */
export const connectSteamFx = createEffect(connectSteam)
export const disconnectSteamFx = createEffect(disconnectSteam)
export const connectFaceitFx = createEffect(connectFaceit)
export const disconnectFaceitFx = createEffect(disconnectFaceit)
export const connectTwitchFx = createEffect(connectTwitch)
export const disconnectTwitchFx = createEffect(disconnectTwitch)

/** Открыть URL привязки в браузере */
const openLinkFx = createEffect((url: string) => {
  try {
    openLink(url)
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
})

/* События */
export const steamClicked = createEvent()
export const faceitClicked = createEvent()
export const twitchClicked = createEvent()

/* Хранилища */
/* Для информации по юзер аккаунтам */
export const $steamLinked = $user.map((u) => Boolean(u?.steam))
export const $faceitLinked = $user.map((u) => Boolean(u?.faceit))
export const $twitchLinked = $user.map((u) => Boolean(u?.twitch))

/** Для кнопки */
export const $canContinue = combine($steamLinked, $faceitLinked, (steam, faceit) => steam && faceit)

/* isLoading */
export const $steamPending = connectSteamFx.pending
export const $steamDisconnectPending = disconnectSteamFx.pending
export const $faceitPending = connectFaceitFx.pending
export const $faceitDisconnectPending = disconnectFaceitFx.pending
export const $twitchPending = connectTwitchFx.pending
export const $twitchDisconnectPending = disconnectTwitchFx.pending

/* UI => effects */
sample({
  clock: steamClicked,
  source: {
    linked: $steamLinked,
    connectPending: $steamPending,
    disconnectPending: $steamDisconnectPending,
  },
  filter: ({ linked, disconnectPending }) => linked && !disconnectPending,
  target: disconnectSteamFx,
})
sample({
  clock: steamClicked,
  source: { linked: $steamLinked, connectPending: $steamPending },
  filter: ({ linked, connectPending }) => !linked && !connectPending,
  target: connectSteamFx,
})
sample({
  clock: connectSteamFx.doneData,
  fn: (data) => data.url,
  target: openLinkFx,
})
sample({
  clock: faceitClicked,
  source: {
    linked: $faceitLinked,
    connectPending: $faceitPending,
    disconnectPending: $faceitDisconnectPending,
  },
  filter: ({ linked, disconnectPending }) => linked && !disconnectPending,
  target: disconnectFaceitFx,
})
sample({
  clock: faceitClicked,
  source: { linked: $faceitLinked, pending: $faceitPending },
  filter: ({ linked, pending }) => !linked && !pending,
  target: connectFaceitFx,
})
sample({
  clock: connectFaceitFx.doneData,
  fn: (data) => data.url,
  target: openLinkFx,
})
sample({
  clock: twitchClicked,
  source: {
    linked: $twitchLinked,
    connectPending: $twitchPending,
    disconnectPending: $twitchDisconnectPending,
  },
  filter: ({ linked, disconnectPending }) => linked && !disconnectPending,
  target: disconnectTwitchFx,
})
sample({
  clock: twitchClicked,
  source: { linked: $twitchLinked, connectPending: $twitchPending },
  filter: ({ linked, connectPending }) => !linked && !connectPending,
  target: connectTwitchFx,
})
sample({
  clock: connectTwitchFx.doneData,
  fn: (data) => data.url,
  target: openLinkFx,
})

/* Как вариант ?? */
// sample({
//   clock: [connectSteamFx.done, connectFaceitFx.done, connectTwitchFx.done],
//   target: fetchUser,
// })

/* UI для пользователя */
sample({
  clock: connectSteamFx.failData,
  fn: () => 'Не удалось подключить Steam',
  target: toastModels.events.showError,
})
sample({
  clock: disconnectSteamFx.failData,
  fn: () => 'Не удалось отвязать Steam',
  target: toastModels.events.showError,
})
sample({
  clock: connectFaceitFx.failData,
  fn: () => 'Не удалось подключить Faceit',
  target: toastModels.events.showError,
})
sample({
  clock: disconnectFaceitFx.failData,
  fn: () => 'Не удалось отвязать Faceit',
  target: toastModels.events.showError,
})
sample({
  clock: connectTwitchFx.failData,
  fn: () => 'Не удалось подключить Twitch',
  target: toastModels.events.showError,
})
sample({
  clock: disconnectTwitchFx.failData,
  fn: () => 'Не удалось отвязать Twitch',
  target: toastModels.events.showError,
})

/** Все units */
export const linkAccountsModels = {
  events: { steamClicked, faceitClicked, twitchClicked },
  stores: {
    $steamLinked,
    $faceitLinked,
    $twitchLinked,
    $canContinue,
    $steamPending,
    $steamDisconnectPending,
    $faceitPending,
    $faceitDisconnectPending,
    $twitchPending,
    $twitchDisconnectPending,
  },
}
