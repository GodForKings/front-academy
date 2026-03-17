'use client'

import { initData, useRawInitData, useSignal } from '@tma.js/sdk-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { fetchUserIp, isTokenExpired, isTokenForCurrentUser, usePopup } from '@/shared'
import { clearTokens, createToken, getTokens, saveTokens } from '@/shared/api'

export function useCheckUser() {
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  const initDataUser = useSignal(initData.user)
  const rawInitData = useRawInitData()

  const { showPopup } = usePopup()

  const showPopupRef = useRef(showPopup)
  useEffect(() => {
    showPopupRef.current = showPopup
  }, [showPopup])

  const showPopupStable = useCallback((payload: Parameters<typeof showPopup>[0]) => {
    return showPopupRef.current(payload)
  }, [])

  useEffect(() => {
    let cancelled = false

    const complete = () => {
      if (!cancelled) setIsCompleted(true)
    }

    const popup = (payload: Parameters<typeof showPopup>[0]) => {
      if (!cancelled) showPopupStable(payload)
    }

    const checkUser = async () => {
      try {
        /* Only TG guard */
        if (!initDataUser || !rawInitData) {
          popup({
            title: 'Ошибка авторизации',
            message: 'Вы можете использовать только Telegram!',
            buttons: [{ type: 'destructive', text: 'Закрыть' }],
          })
          complete()
          return
        }

        const currentTgId = initDataUser.id.toString()

        /* Tokens + ip */
        const tokens = getTokens()
        const userIp = await fetchUserIp()

        /* Validate tokens */
        const needNewTokens =
          !tokens?.accessToken ||
          isTokenExpired(tokens.accessToken) ||
          !isTokenForCurrentUser(tokens.accessToken, currentTgId)

        if (needNewTokens) {
          if (tokens) clearTokens()

          try {
            const newTokens = await createToken({
              initDataRaw: rawInitData,
              ip: userIp,
            })

            if (newTokens) {
              saveTokens(newTokens)
            } else {
              popup({
                title: 'Ошибка',
                message: 'Произошла ошибка при проверке вашего аккаунта',
                buttons: [{ type: 'destructive', text: 'Закрыть' }],
              })
            }
          } catch {
            popup({
              title: 'Ошибка',
              message: 'Не удалось создать токены авторизации',
              buttons: [{ type: 'destructive', text: 'Закрыть' }],
            })
          }
        }

        complete()
      } catch (error) {
        console.error('Ошибка при проверке пользователя:', error)
        popup({
          title: 'Ошибка',
          message: 'Произошла ошибка при проверке вашего аккаунта',
          buttons: [{ type: 'destructive', text: 'Закрыть' }],
        })
        complete()
      }
    }

    checkUser()

    return () => {
      cancelled = true
    }
  }, [initDataUser, rawInitData, showPopupStable])

  return isCompleted
}
