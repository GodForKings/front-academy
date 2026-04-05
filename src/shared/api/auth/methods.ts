import type { CreateTokenDto, CreateTokenResponse, RefreshTokenDto, RefreshTokenResponse } from '..'
import { api } from '../api'

export async function createToken(dto: CreateTokenDto): Promise<CreateTokenResponse> {
  try {
    const response = await api.post<CreateTokenResponse>(`/auth/token/create`, dto)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Не удалось создать токен')
  }
}

export async function refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponse> {
  try {
    const response = await api.post<RefreshTokenResponse>(`/auth/token/refresh`, dto)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Не удалось обновить токен')
  }
}
