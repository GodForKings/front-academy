import { api } from '@/shared'
import type { MyStats, Skin } from '@/shared/types'
import type { SellSkinResponse, WithdrawSkinResponse } from './types'

/** Получить статистику пользователя */
export async function getMyStats(): Promise<MyStats> {
  const { data } = await api.get<MyStats>(`users/my-stats`)
  return data
}

/** Получить инвентарь юзера */
export const getMySkins = async (): Promise<Skin[]> => {
  const { data } = await api.get<Skin[]>('skins/my')
  return data
}

/** Продать скин
 * @param skinId **string**
 * @returns `{ success: boolean }` */
export const sellSkinById = async (skinId: string): Promise<SellSkinResponse> => {
  const { data } = await api.post<SellSkinResponse>('skins/sell', { skinId })

  if (!data.success) {
    throw new Error('Не удалось продать скин')
  }

  return data
}

/** Вывести скин в STEAM
 * @param skinId **string**
 * @returns `{ success: boolean message: string isAutomatic: boolean }`*/
export const withdrawSkinById = async (skinId: string): Promise<WithdrawSkinResponse> => {
  const { data } = await api.post<WithdrawSkinResponse>('skins/withdraw', { skinId })

  if (!data.success) {
    throw new Error(data.message || 'Не удалось вывести скин')
  }

  return data
}
