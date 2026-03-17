import type { ReactNode } from 'react'

export interface Modal {
  isOpen: boolean
  content: ReactNode | null
  className?: string | null
}
