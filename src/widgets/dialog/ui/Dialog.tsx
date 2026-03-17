'use client'

import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, type FC } from 'react'

import { cn, usePlatform } from '@/shared'
import { $dialogClassName, $dialogContent, $isDialogOpen, closeDialog } from '@/widgets/dialog'

export const Dialog: FC = () => {
  const [isOpen, onClose] = useUnit([$isDialogOpen, closeDialog])
  const [content, className] = useUnit([$dialogContent, $dialogClassName])

  const { isMobile } = usePlatform()

  // ESC закрытие
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDialog()
    }

    if (isOpen) {
      window.addEventListener('keydown', handler)
    }

    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Фон диалога */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'linear' }}
            className={cn('fixed inset-0 z-101', 'backdrop-blur-xs bg-black/30')}
            onClick={onClose}
          />

          {/* Само окно */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.3,
              ease: 'anticipate',
            }}
            className={cn(
              'fixed left-1/2 top-1/2 z-101',
              '-translate-x-1/2 -translate-y-1/2',
              'w-full rounded-2xl overflow-hidden',
              !isMobile && 'max-w-112.5',
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
