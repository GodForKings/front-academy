import { cn, LoadingDots } from '@/shared'

export default function Loading() {
  return (
    <div
      className={cn(
        'absolute inset-0',
        'min-h-screen min-w-full',
        'flex justify-center items-center',
      )}
    >
      <LoadingDots />
    </div>
  )
}
