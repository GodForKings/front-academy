import { api } from '@/shared'

import type { User, UserDto } from './types'

/** Получить `data` по User */
export async function getUser() {
  const { data } = await api.get<User>(`users/me`)
  return data
}

/** Отправить почту на подтверждение
 * @param email string */
export async function sendEmailCode(email: string): Promise<{ success: boolean }> {
  const { data } = await api.post<{ success: boolean }>(`/email/send`, { email })
  return data
}

/** Отправить код из почты для проверки
 * @param code string
 * @returns `true/false` */
export async function verifyEmailCode(code: string): Promise<boolean> {
  const { data } = await api.post<boolean>(`/email/verified`, { code })
  return data
}

/** Обновить данные user-а
 * @param dto опциональные данные
 * @returns `User` */
export async function updateUser(dto: UserDto): Promise<User> {
  const { data } = await api.put<User>(`/users`, dto)
  return data
}

/** Подключить Steam*/
export async function connectSteam(): Promise<{ url: string }> {
  const { data } = await api.post<{ url: string }>(`steam/link-token`)
  return data
}
/** Отвязать Steam */
export async function disconnectSteam(): Promise<void> {
  await api.post(`steam/disconnect`)
}

/** Подключить Faceit */
export async function connectFaceit(): Promise<{ url: string }> {
  const { data } = await api.post<{ url: string }>(`faceit/link-token`)
  return data
}
/** Отвязать Faceit */
export async function disconnectFaceit(): Promise<void> {
  await api.post(`faceit/disconnect`)
}

/** Подключить Twitch */
export async function connectTwitch(): Promise<{ url: string }> {
  const { data } = await api.post<{ url: string }>(`twitch/link-token`)
  return data
}
/** Отвязать Twitch */
export async function disconnectTwitch(): Promise<void> {
  await api.post(`twitch/disconnect`)
}

/** Обновить Steam trade link
 * @param steamTradeLink - **string**
 * @returns целый `User` */
export async function updateSteamTradeLink(steamTradeLink: string): Promise<User> {
  const { data } = await api.put<User>(`users/steam-trade-link`, {
    steamTradeLink,
  })
  return data
}
