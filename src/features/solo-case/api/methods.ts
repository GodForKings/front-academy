import { api } from '@/shared'

import type { CaseDetails, OpenCaseResponse } from './types'

/** Получить всю **data** по кейсу
 * @param caseId
 * @returns `CaseDetails`
 */
export async function getCaseById(caseId: string): Promise<CaseDetails> {
  const { data } = await api.get<CaseDetails>(`cases/available/${caseId}`)
  return data
}

/** Открыть кейс по id
 * @param caseId
 * @returns `{skin: Skin}`
 */
export async function openCaseById(caseId: string): Promise<OpenCaseResponse> {
  const { data } = await api.post<OpenCaseResponse>(`/cases/open`, { caseId })
  return data
}
