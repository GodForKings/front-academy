'use client'

import { ToastCard } from '@/entities'
import type { FC } from 'react'
import { Toaster } from 'react-hot-toast'

export const ToasterProvider: FC = () => {
  return (
    <Toaster
      position='top-center'
      gutter={10}
      toastOptions={{ duration: 2000 }}
      containerStyle={{ top: 56 }}
    >
      {(toastData) => <ToastCard toastData={toastData} />}
    </Toaster>
  )
}
