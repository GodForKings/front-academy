'use client'

import { useUnit } from 'effector-react'
import { useEffect, useRef, useState, type FC } from 'react'

import { cn, usePlatform } from '@/shared'

import { $isModalOpen, $modalClassName, $modalContent, closeModal } from '../model'

export const Modal: FC = () => {
  const [isOpen, onClose] = useUnit([$isModalOpen, closeModal])
  const [content, className] = useUnit([$modalContent, $modalClassName])
  const { isMobile } = usePlatform()

  const modalRef = useRef<HTMLDivElement | null>(null)
  const [shouldRender, setShouldRender] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startY, setStartY] = useState<number>(0)
  const [currentY, setCurrentY] = useState<number>(0)

  // для монтирования и размонтирования
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      document.body.style.overflow = 'hidden'
      const t = setTimeout(() => setIsAnimating(true), 20)

      return () => clearTimeout(t)
    }

    setIsAnimating(false)
    document.body.style.overflow = ''
    const t = setTimeout(() => setShouldRender(false), 300)
    return () => clearTimeout(t)
  }, [isOpen])

  // ESC закрытие
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    if (isOpen) document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [isOpen, onClose])

  // Нажатия
  const start = (y: number) => {
    const modal = modalRef.current
    if (!modal || modal.scrollTop > 0) return
    setIsDragging(true)
    setStartY(y)
    setCurrentY(y)
  }

  const move = (y: number) => {
    if (!isDragging) return
    const modal = modalRef.current
    if (!modal) return

    const deltaY = y - startY

    if (deltaY > 0 && modal.scrollTop === 0) {
      setCurrentY(y)
    } else {
      setIsDragging(false)
    }
  }

  const end = () => {
    if (!isDragging) return
    const deltaY = currentY - startY
    const CLOSE_THRESHOLD = 100

    if (deltaY > CLOSE_THRESHOLD) onClose()

    setIsDragging(false)
    setStartY(0)
    setCurrentY(0)
  }

  if (!shouldRender) return null

  const delta = currentY - startY
  const translateY = isDragging ? Math.max(delta, 0) : isAnimating ? 0 : 100

  return (
    <div
      className={cn(
        'fixed inset-0 z-100',
        'flex justify-center items-end',
        'transition-colors ease-in-out duration-300',
        isAnimating ? 'bg-black/60 backdrop-blur-xs' : 'bg-black/0',
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={modalRef}
        className={cn(
          'relative bg-white/10 backdrop-blur-2xl',
          'w-full max-h-screen overflow-y-auto touch-auto',
          'rounded-t-4xl border-t border-white/20',
          !isMobile && 'max-w-112.5',
          className,
        )}
        style={{
          transform:
            isDragging && delta > 0 ? `translateY(${delta}px)` : `translateY(${translateY}%)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseDown={(e) => start(e.clientY)}
        onMouseMove={(e) => move(e.clientY)}
        onMouseUp={end}
        onTouchStart={(e) => start(e.touches[0].clientY)}
        onTouchMove={(e) => move(e.touches[0].clientY)}
        onTouchEnd={end}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Декор полоска */}
        <div className='flex justify-center pt-3.5 pointer-events-none'>
          <div className='w-11 h-1 bg-main-violet rounded-full' />
        </div>

        {content}
      </div>
    </div>
  )
}
