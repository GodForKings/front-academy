import { isAxiosError } from 'axios'

import type {
  CreateTokenDto,
  CreateTokenResponse,
  RefreshTokenDto,
  RefreshTokenResponse,
} from '@/shared/api'
import { api } from '@/shared/api'
import type { ApiErrorBody } from '@/shared/types'

function getErrorMessage(error: unknown, fallback: string) {
  if (isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? fallback
  }

  if (error instanceof Error) {
    return error.message || fallback
  }

  return fallback
}

export async function createToken(dto: CreateTokenDto): Promise<CreateTokenResponse> {
  try {
    const { data } = await api.post<CreateTokenResponse>('/auth/token/create', dto)
    return data
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, 'Не удалось создать токен'))
  }
}

export async function refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponse> {
  try {
    const { data } = await api.post<RefreshTokenResponse>('/auth/token/refresh', dto)
    return data
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, 'Не удалось обновить токен'))
  }
}
