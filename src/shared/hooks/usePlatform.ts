'use client'

import { retrieveLaunchParams } from '@tma.js/sdk'
import { useSyncExternalStore } from 'react'

const DESKTOP_PLATFORMS = new Set<string>(['macos', 'linux', 'windows', 'weba', 'tdesktop', 'web'])

interface PlatformInfo {
  platform: string
  isMobile: boolean
}

const subscribe = () => {
  return () => {}
}

const getServerSnapshot = (): string => ''

const getClientSnapshot = (): string => {
  if (typeof window === 'undefined') return ''

  try {
    return retrieveLaunchParams().tgWebAppPlatform ?? ''
  } catch {
    return ''
  }
}

/** Только в клиентских компонентах
 * @returns `platform: string`, `isMobile - true / false`
 */
export function usePlatform(): PlatformInfo {
  const platform = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

  return {
    platform,
    isMobile: Boolean(platform) && !DESKTOP_PLATFORMS.has(platform),
  }
}
