'use client'

import { useLaunchParams } from '@tma.js/sdk-react'
import { useMemo } from 'react'

const DESKTOP_PLATFORMS = new Set<string>(['macos', 'linux', 'windows', 'weba', 'tdesktop', 'web'])

interface PlatformInfo {
  platform: string
  isMobile: boolean
}

/** Только в клиентских компонентах
 * @returns `platform: string`, `isMobile - true / false`
 */
export function usePlatform(): PlatformInfo {
  if (typeof window === 'undefined') {
    return {
      platform: '',
      isMobile: false,
    }
  }

  const launchParams = useLaunchParams()
  const platform = launchParams?.tgWebAppPlatform ?? ''

  const isMobile = useMemo(() => {
    if (!platform) return false

    return !DESKTOP_PLATFORMS.has(platform)
  }, [platform])

  return { platform, isMobile }
}
