import { cn } from '@/shared'
import type { FC, ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export const PageWrapper: FC<PageWrapperProps> = (props) => {
  const { children, className } = props
  return (
    <div className={cn('relative p-4 pb-22 overflow-y-auto', 'min-w-full min-h-screen', className)}>
      {children}
    </div>
  )
}
