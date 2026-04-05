import { api } from '@/shared'

import type { DailyBonusCheck, DailyBonusClaimResponse } from './types'

/** Проверить доступность ежедневного бонуса */
export async function checkDailyBonus(): Promise<DailyBonusCheck> {
  const { data } = await api.get<DailyBonusCheck>('/users/daily-bonus/check')
  return data
}

/** Забрать ежедневный бонус */
export async function claimDailyBonus(): Promise<DailyBonusClaimResponse> {
  const { data } = await api.post<DailyBonusClaimResponse>('/users/daily-bonus/claim')
  return data
}
