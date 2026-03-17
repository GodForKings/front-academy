import { cn } from '@/shared'
import type { FC, ReactNode } from 'react'

interface StatBlockProps {
  title: string // Заголовок
  children?: ReactNode // Контент справа
  className?: string // Стили для всего блока
  paragraphClass?: string // Стили для контента
}

export const StatBlock: FC<StatBlockProps> = (props) => {
  const { children, className, title, paragraphClass } = props
  return (
    <div
      className={cn(
        'flex flex-col gap-3 justify-between',
        'p-3 h-19 rounded-2xl w-full',
        'bg-white/5 backdrop-blur-lg',
        className,
      )}
    >
      <h3 className='text-sm/5 text-white/70 text-left'>{title}</h3>

      <p className={cn('text-right text-lg/5 font-bold', paragraphClass)}>{children}</p>
    </div>
  )
}
