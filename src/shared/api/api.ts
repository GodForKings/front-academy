import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

import { ENVIRONMENT_CONFIG } from '@/shared'

import {
  clearTokens,
  type FailedQueueItem,
  getTokens,
  refreshToken,
  type RetryRequestConfig,
  saveTokens,
} from './auth'

export const apiUrl = ENVIRONMENT_CONFIG.API_URL

/** Axios instance */
export const api = axios.create({
  baseURL: apiUrl,
  paramsSerializer: { indexes: null },
})

/** флаг refreshing */
let isRefreshing = false
/** Очередь запросов */
let failedQueue: FailedQueueItem[] = []

/** Обработка очереди после успешного / неуспешного refreshing */
const processQueue = async (error: AxiosError | null, token: string | null = null) => {
  await Promise.all(
    failedQueue.map(async (item) => {
      if (error) {
        item.reject(error)
        return
      }

      if (!token) {
        item.reject(new AxiosError('No token provided'))
        return
      }

      if (item.originalRequest.headers) {
        item.originalRequest.headers.Authorization = `Bearer ${token}`
      }

      try {
        /* чистый axios, чтобы не попасть в интерцептор */
        const response = await axios(item.originalRequest)
        item.resolve(response)
      } catch (err) {
        item.reject(err as AxiosError)
      }
    }),
  )

  failedQueue = []
}

/** Интерцептор запросов + accessToken */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = getTokens()
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

/** Refresh токена при 401 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/token/refresh')
    ) {
      const tokens = getTokens()
      if (!tokens?.refreshToken) {
        clearTokens()
        return Promise.reject(error)
      }

      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({ resolve, reject, originalRequest })
        })
      }

      isRefreshing = true

      try {
        const response = await refreshToken({
          refreshToken: tokens.refreshToken,
        })
        saveTokens(response)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${response.accessToken}`
        }

        processQueue(null, response.accessToken)
        /* вызываем чистый axios */
        return axios(originalRequest)
      } catch (refreshError) {
        clearTokens()
        processQueue(refreshError as AxiosError)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)
