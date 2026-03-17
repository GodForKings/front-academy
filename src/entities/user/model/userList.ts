import { toastModels } from '@/entities'
import type { User, UserDto } from '@/entities/user'
import { getUser, updateSteamTradeLink, updateUser } from '@/entities/user'
import { createEffect, createEvent, createStore, sample } from 'effector'

/* Эффекты */
export const fetchUserDataFx = createEffect(getUser)
export const updateUserFx = createEffect(updateUser)
/** Обновить trade ссылку пользователя */
export const updateSteamTradeLinkFx = createEffect(updateSteamTradeLink)

/* События */
export const fetchUser = createEvent()
export const updateUserData = createEvent<UserDto>()
export const balanceUpdated = createEvent<number>()
export const steamUpdated = createEvent<{
  steamId: string | null
  steamNickname: string | null
  steamAvatar: string | null
  tradeToken: string | null
}>()
export const faceitUpdated = createEvent<{
  faceitId: string | null
  faceitNickname: string | null
  faceitAvatar: string | null
}>()
const setUser = createEvent<User>()
export const updateSteamTradeLinkData = createEvent<string>() // sting user url

/* Хранилища */
export const $user = createStore<User | null>(null)
  .on(setUser, (_, userData) => userData)
  .on(balanceUpdated, (user, balance) => (user ? { ...user, balance } : null))
  .on(steamUpdated, (user, payload) => {
    if (!user) return null

    return {
      ...user,
      steam: payload.steamId
        ? {
            steamId: payload.steamId,
            nickname: payload.steamNickname ?? '',
            avatar: payload.steamAvatar ?? '',
            tradeToken: user.steam?.tradeToken ?? '',
          }
        : null,
    }
  })
  .on(faceitUpdated, (user, payload) => {
    if (!user) return null

    return {
      ...user,
      faceit: payload.faceitId
        ? {
            faceitId: payload.faceitId,
            nickname: payload.faceitNickname,
            avatar: payload.faceitAvatar,
            email: null,
          }
        : null,
    }
  })
/** `Зареган` юзер ли юзер */
export const $isVerified = $user.map((u) => Boolean(u?.isVerified))
/** `Забанен` юзер ли юзер */
export const $isBanned = $user.map((u) => Boolean(u?.isBanned))
/* Для первой инициализации юзера */
export const $userBootstrapped = createStore(false).on(fetchUserDataFx.finally, () => true)
/* loading юзер data */
export const $userIsLoading = fetchUserDataFx.pending
export const $userUpdateLoading = updateUserFx.pending
export const $steamTradeLinkLoading = updateSteamTradeLinkFx.pending
/* event => effect */
sample({
  clock: fetchUser,
  target: fetchUserDataFx,
})
sample({
  clock: updateUserData,
  target: updateUserFx,
})
sample({
  clock: updateSteamTradeLinkData,
  target: updateSteamTradeLinkFx,
})

/* effects => store */
sample({
  clock: fetchUserDataFx.doneData,
  target: setUser,
})
sample({
  clock: updateUserFx.doneData,
  target: setUser,
})
sample({
  clock: updateSteamTradeLinkFx.doneData,
  target: setUser,
})

/* Для UI результатов */
sample({
  clock: fetchUserDataFx.failData,
  fn: () => 'Не удалось получить данные пользователя',
  target: toastModels.events.showError,
})
sample({
  clock: fetchUserDataFx.doneData,
  filter: (user) => Boolean(user?.isBanned),
  fn: () => 'Ваш аккаунт заблокирован',
  target: toastModels.events.showError,
})
/* Обновить данные пользователя */
sample({
  clock: updateUserFx.failData,
  fn: () => 'Не удалось обновить данные пользователя',
  target: toastModels.events.showError,
})
sample({
  clock: updateUserFx.doneData,
  fn: () => 'Данные пользователя обновлены',
  target: toastModels.events.showSuccess,
})
/* TradeLink для стима */
sample({
  source: $user,
  clock: updateSteamTradeLinkFx.failData,
  fn: (user) => {
    if (user && !user.steam) return 'Сначала привяжите Steam'
    return 'Не удалось обновить trade link'
  },
  target: toastModels.events.showError,
})
sample({
  clock: updateSteamTradeLinkFx.doneData,
  fn: () => 'Trade link обновлён',
  target: toastModels.events.showSuccess,
})
