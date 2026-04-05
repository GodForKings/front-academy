import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export type CreateTokenDto = {
  initDataRaw: string
  ip: string
}

export type CreateTokenResponse = {
  accessToken: string
  refreshToken: string
}

export type RefreshTokenDto = {
  refreshToken: string
}

export type RefreshTokenResponse = {
  accessToken: string
  refreshToken: string
}

/** Расширяем AxiosRequestConfig для _retry */
export interface RetryRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}
/** Тип для очереди повторных запросов */
export type FailedQueueItem = {
  resolve: (value: AxiosResponse<any>) => void
  reject: (error: AxiosError) => void
  originalRequest: RetryRequestConfig
}
