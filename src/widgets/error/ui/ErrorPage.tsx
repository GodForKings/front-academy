'use client'

import { Button, cn } from '@/shared'
import { Bug } from 'lucide-react'
import { useEffect } from 'react'

export function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div
      className={cn(
        'py-6 min-h-dvh relative overflow-scroll z-2',
        'flex justify-center items-center',
      )}
    >
      <div className={cn('flex justify-center', 'absolute size-full inset-0 -z-1')}>
        <Bug className='w-4/5 h-auto text-gray-800' />
      </div>

      <div
        className={cn(
          'backdrop-blur-3xl p-5 max-w-9/10',
          'rounded-4xl border border-black/50',
          'flex flex-col justify-center items-center gap-5',
        )}
      >
        <h2 className='uppercase text-xl text-center max-w-9/10'>
          Произошла непредвиденная ошибка
        </h2>

        <blockquote className={cn('text-red-700 text-lg/4', 'w-full')}>
          <code>{error.message}</code>
        </blockquote>

        {reset && (
          <Button onClick={reset} variant='secondary' size='lg'>
            Try again
          </Button>
        )}
      </div>
    </div>
  )
}
