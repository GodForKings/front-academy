import { RouteOff } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { cn } from '@/shared'

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div
      className={cn('flex flex-col gap-6 justify-center items-center', 'py-6 min-h-dvh relative')}
    >
      <div
        className={cn(
          'w-8/10 rounded-2xl backdrop-blur-md',
          'shadow shadow-black/50',
          'flex justify-center',
        )}
      >
        <RouteOff className='w-full h-auto animate-pulse' />
      </div>

      <Link
        href={'/'}
        className={cn(
          'relative z-2 px-4 py-2 h-12.5 w-4/5 bg-black/4',
          'flex justify-center items-center',
          'uppercase text-lg font-semibold',
          'border border-black/40 rounded-full',
          'shadow shadow-black/50 transition',
          'active:opacity-70 active:scale-97',
          'hover:scale-103 hover:shadow-md hover:shadow-black',
        )}
      >
        Return Home
      </Link>
    </div>
  )
}
