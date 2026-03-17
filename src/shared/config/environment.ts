export const ENVIRONMENT_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  SOCKET_USER_SYNC: process.env.NEXT_PUBLIC_SOCKET_USER_SYNC,
} as const

export type EnvironmentConfig = typeof ENVIRONMENT_CONFIG
/** Дефолтная задержка */
export const DEBOUNCE = 800
/** реальное имя бота */
export const BOT_NAME = 'Zeus_Academy'

/* реальный урл в таком же формате из папки public/pdf */
export const TERMS = '/pdf/example.pdf'
export const PRIVACY = '/pdf/example.pdf'
export const GUIDE = '/pdf/example.pdf'
