import type { ReactNode } from 'react'

export interface DialogState {
  isOpen: boolean
  content: ReactNode | null
  className?: string | null
}
