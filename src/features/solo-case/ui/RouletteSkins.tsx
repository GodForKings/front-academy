'use client'

import { GRADIENT_ORANGE, SkinCard, cn } from '@/shared'
import type { Skin } from '@/shared/types'
import gsap from 'gsap'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FC } from 'react'
import { buildReel } from '../lib/helpers'

const CARD_W = 170 // размер карточки
const GAP = 12 // отступы между карточками

interface RouletteSkinsProps {
  pool: Skin[] // набор скинов
  winner: Skin | null // скин победитель
  spin: boolean // крутим - да/нет
  duration?: number // продолжительность
  minItems?: number // мин количество для вида
  onComplete?: () => void // функция на завершение крутилки
}

export const RouletteSkins: FC<RouletteSkinsProps> = (props) => {
  const { pool, winner, spin, duration = 4, minItems = 40, onComplete } = props

  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const [wrapW, setWrapW] = useState(0)
  const [reel, setReel] = useState<Skin[]>([])

  /* Цель прокрутки => стартануть после рендера reel */
  const pendingStopIndexRef = useRef<number | null>(null)
  const pendingDurationRef = useRef<number>(duration)
  const pendingOnCompleteRef = useRef<(() => void) | undefined>(onComplete)

  useEffect(() => {
    pendingDurationRef.current = duration
    pendingOnCompleteRef.current = onComplete
  }, [duration, onComplete])

  useLayoutEffect(() => {
    if (!wrapRef.current) return
    const el = wrapRef.current

    const ro = new ResizeObserver(() => setWrapW(el.clientWidth))
    setWrapW(el.clientWidth)
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  const sidePad = useMemo(() => {
    if (!wrapW) return 0
    return Math.max(0, wrapW / 2 - CARD_W / 2)
  }, [wrapW])

  /* Когда пришёл winner и spin=true => пересобираем reel */
  useEffect(() => {
    if (!spin || !winner || !pool.length || !wrapW) return

    const { reel: nextReel, stopIndex } = buildReel(pool, winner, minItems)
    pendingStopIndexRef.current = stopIndex
    setReel(nextReel)
  }, [spin, winner, pool, wrapW, minItems])

  useLayoutEffect(() => {
    const stopIndex = pendingStopIndexRef.current
    if (stopIndex === null) return
    if (!trackRef.current || !wrapW) return

    pendingStopIndexRef.current = null

    tlRef.current?.kill()

    const targetX = -(stopIndex * (CARD_W + GAP))

    const tl = gsap.timeline({
      onComplete: () => pendingOnCompleteRef.current?.(),
    })

    const currentDuration = pendingDurationRef.current

    tl.to(trackRef.current, {
      x: targetX + (Math.random() - 0.5) * (CARD_W * 0.8), // координаты приза +- супер неожиданное смещение
      duration: currentDuration,
      ease: 'power3.out', // timing function - определяем поведение крутилки
    })

    tlRef.current = tl
  }, [reel.length, wrapW])

  useEffect(() => {
    return () => {
      tlRef.current?.kill()
    }
  }, [])

  return (
    <div ref={wrapRef} className='relative -mx-4 overflow-hidden my-2'>
      <div
        className={cn(
          'mx-auto h-full w-0.5 pointer-events-none',
          'absolute left-1/2 -translate-x-1/2 z-3',
          GRADIENT_ORANGE,
        )}
      />

      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 z-4 size-0',
          'border-l-[6px] border-r-[6px] border-t-10',
          'border-l-transparent border-r-transparent border-t-main-orange',
        )}
      />

      <div
        ref={trackRef}
        className='flex items-stretch will-change-transform'
        style={{ gap: GAP, paddingLeft: sidePad, paddingRight: sidePad }}
      >
        {reel.map((skin, i) => (
          <div key={`${skin.id}-${i}`} className='shrink-0' style={{ width: CARD_W }}>
            <SkinCard disableMotion skin={skin} className={cn('w-full select-none h-full')} />
          </div>
        ))}
      </div>
    </div>
  )
}
