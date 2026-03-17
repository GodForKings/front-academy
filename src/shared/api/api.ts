import { useRawInitData } from '@tma.js/sdk-react'
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

import { ENVIRONMENT_CONFIG, fetchUserIp } from '@/shared'

import { ApiErrorBody } from '../types'
import { clearTokens, createToken, getTokens, refreshToken, saveTokens } from './auth'

export const apiUrl = ENVIRONMENT_CONFIG.API_URL

export const api = axios.create({
  baseURL: apiUrl,
})

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

type FailedQueueItem = {
  resolve: (value: AxiosResponse) => void
  reject: (reason?: unknown) => void
  originalRequest: RetryRequestConfig
}
let isRefreshing = false
let failedQueue: FailedQueueItem[] = []

const processQueue = async (error: unknown, token: string | null = null) => {
  for (const item of failedQueue) {
    try {
      if (error) {
        item.reject(error)
        continue
      }

      if (!token) {
        item.reject(new Error('No token provided'))
        continue
      }

      item.originalRequest.headers.Authorization = `Bearer ${token}`

      const res = await axios(item.originalRequest)
      item.resolve(res)
    } catch (e) {
      item.reject(e)
    }
  }

  failedQueue = []
}

/* Интерцептор запросов для добавления токена */
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const tokens = getTokens()

    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

/* Интерцептор ответов для обновления токена при ошибке 401 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const originalRequest = error.config as RetryRequestConfig | undefined

    if (!originalRequest) {
      return Promise.reject(error)
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/token/refresh')
    ) {
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({ resolve, reject, originalRequest })
        })
      }

      const rawInitData = useRawInitData()
      const userIp = await fetchUserIp()

      originalRequest._retry = true
      isRefreshing = true

      const tokens = getTokens()

      if (tokens?.refreshToken) {
        try {
          const response = await refreshToken({
            refreshToken: tokens.refreshToken,
          })

          if ('accessToken' in response && 'refreshToken' in response) {
            saveTokens(response)
            originalRequest.headers.Authorization = `Bearer ${response.accessToken}`

            processQueue(null, response.accessToken)
            isRefreshing = false

            return axios(originalRequest)
          }

          clearTokens()
          processQueue(new Error('Не удалось обновить токен'))
          isRefreshing = false
          return Promise.reject(error)
        } catch (refreshError: unknown) {
          console.error('Не удалось обновить токен:', refreshError)

          try {
            if (!rawInitData || !userIp) {
              throw new Error('Отсутствуют данные для создания токена')
            }

            const newTokens = await createToken({
              initDataRaw: rawInitData,
              ip: userIp,
            })

            saveTokens(newTokens)
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`

            processQueue(null, newTokens.accessToken)
            isRefreshing = false

            return axios(originalRequest)
          } catch (createError: unknown) {
            console.error('Не удалось создать новые токены:', createError)
            clearTokens()
            processQueue(createError)
            isRefreshing = false
            return Promise.reject(createError)
          }
        }
      }

      clearTokens()
      isRefreshing = false
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)
