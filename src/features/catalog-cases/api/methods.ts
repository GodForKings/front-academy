import { api } from '@/shared'
import { Case } from './types'

/** Получить ВСЕ кейсы
 * @returns `Case[]`
 */
export async function getCases(): Promise<Case[]> {
  const { data } = await api.get<Case[]>(`/cases/available`)
  return data
}
