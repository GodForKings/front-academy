import { api } from '@/shared'
import type { Role } from '@/shared/types'

/** Получить `data` по ролям */
export async function getRoles(): Promise<Role[]> {
  const { data } = await api.get<Role[]>(`/game-roles/available`)
  return data
}
