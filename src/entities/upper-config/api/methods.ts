import { api } from '@/shared'
import type { PublicAppConfig } from './types'

/** Получить публичный конфиг приложения */
export async function getPublicConfig(): Promise<PublicAppConfig> {
  const { data } = await api.get<PublicAppConfig>(`/config/public`)
  return data
}
