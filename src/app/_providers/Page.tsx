'use client'

import { backButton } from '@tma.js/sdk-react'
import { useRouter } from 'next/navigation'
import { type FC, type ReactNode,useEffect, useState } from 'react'

interface PageProps {
  children: ReactNode
  back?: boolean
  onBackClick?: () => void
}

export const Page: FC<PageProps> = (props) => {
  const { children, back = false, onBackClick } = props
  const router = useRouter()

  const [canGoBack, setCanGoBack] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCanGoBack(window.history.length > 1)
    }
  }, [])

  useEffect(() => {
    if ((back || onBackClick) && canGoBack) {
      backButton.show()
    } else {
      backButton.hide()
    }
  }, [back, onBackClick, canGoBack])

  useEffect(() => {
    return backButton.onClick(() => {
      if (onBackClick) {
        onBackClick()
      } else if (canGoBack) {
        router.back()
      }
    })
  }, [router, onBackClick, canGoBack])

  return <>{children}</>
}
