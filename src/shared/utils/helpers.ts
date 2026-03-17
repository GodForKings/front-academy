'use client'

import { apiUrl } from '@/shared/api'
import { openLink } from '@tma.js/sdk-react'

/** Для обработки пути к файлам
 * @param url файла
 * @returns строку пути */
export const getPhotoUrl = (url: string): string => {
  return url.startsWith('http') ? url : `${apiUrl}/files/${url}`
}
/** трансформирует hex с прозрачностью
 * @param hex
 * @param alpha
 * @returns `string` */
export const hexToRgba = (hex: string, alpha: number): string => {
  const h = hex.replace('#', '').trim()
  if (h.length !== 6) return hex
  const r = Number.parseInt(h.slice(0, 2), 16)
  const g = Number.parseInt(h.slice(2, 4), 16)
  const b = Number.parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const normalizePhone = (v: string) => v.replace(/\D/g, '').slice(0, 15)

export const formatPhoneDisplay = (input: string): string => {
  if (!input) return ''
  // оставляем только цифры
  let digits = input.replace(/\D/g, '')

  // 8XXXXXXXXXX => 7XXXXXXXXXX
  if (digits.startsWith('8')) digits = '7' + digits.slice(1)

  // если получилось 7XXXXXXXXXX (до 11 цифр) => форматируем как RU
  if (digits.startsWith('7') && digits.length <= 11) {
    const d = digits.slice(1, 11) // 10 цифр после 7
    let s = '+7'

    if (d.length > 0) s += ' (' + d.slice(0, 3)
    if (d.length >= 3) s += ')'
    if (d.length > 3) s += ' ' + d.slice(3, 6)
    if (d.length > 6) s += '-' + d.slice(6, 8)
    if (d.length > 8) s += '-' + d.slice(8, 10)

    return s
  }

  // fallback: просто плюсуем
  return '+' + digits
}

export const toServerPhone = (digits: string): string => (digits ? '+' + digits : '')

/** Опыт юзера в лвлах
 * @param experience число
 * @returns `(округляем в большую сторону поделенное на 100)` + 1 */
export const getUserLevel = (experience: number): number => {
  const bonus = Math.round(experience / 100)
  return 1 + bonus
}

/** Проверка и нормализация пути
 * @param currentPath строку
 * @returns */
export const safeReturnTo = (currentPath: string | null): string | null => {
  if (!currentPath) return null
  // защита от внешних ссылок/мусора
  if (!currentPath.startsWith('/')) return null
  if (currentPath.startsWith('//')) return null
  return currentPath
}

/** Для открытия сторонних ссылок
 * @param currentURL ссылка на ресурс */
export const openExternalLink = (currentURL: string) => {
  try {
    openLink(currentURL)
  } catch {
    window.open(currentURL)
  }
}

const pad2 = (n: number) => String(n).padStart(2, '0')
/** Date.now() => 23:50:50 */
export const formatHMS = (ms: number) => {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}`
}
