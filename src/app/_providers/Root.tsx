'use client'

import { initData, useLaunchParams, useSignal } from '@tma.js/sdk-react'
import { useEffect, type PropsWithChildren } from 'react'

import { setLocale } from '@/core/i18n/locale'
import { init } from '@/core/init'
import { cn, LoadingDots, useCheckUser, useClientOnce, useDidMount, usePlatform } from '@/shared'
import { ErrorBoundary, ErrorPage } from '@/widgets'

function RootInner({ children }: PropsWithChildren) {
  useLaunchParams()

  const { isMobile } = usePlatform()

  /* Инициализация библиотеки */
  useClientOnce(() => {
    init(isMobile)
  })

  const initDataUser = useSignal(initData.user)

  /* Установка языка пользователя */
  useEffect(() => {
    if (!initDataUser) return

    setLocale(initDataUser.language_code)
  }, [initDataUser])

  const userCheckCompleted = useCheckUser()
  const checking = !userCheckCompleted

  if (checking) {
    return (
      <div
        className={cn('absolute inset-0', 'h-screen w-full', 'flex justify-center items-center')}
      >
        <LoadingDots />
      </div>
    )
  }

  return (
    <>
      <div className={cn(isMobile && 'mt-24')}>{children}</div>
    </>
  )
}

export function Root(props: PropsWithChildren) {
  /* Для client-only */
  const didMount = useDidMount()

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className={cn('absolute inset-0', 'h-screen w-full', 'flex justify-center items-center')}>
      <LoadingDots />
    </div>
  )
}
