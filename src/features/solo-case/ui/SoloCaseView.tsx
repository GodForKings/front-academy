'use client'

import { $isVerified, $user, UnregisteredButton } from '@/entities'
import {
  Button,
  PageWrapper,
  PricePoints,
  SkinCard,
  SoloCaseSkeleton,
  cn,
  getPhotoUrl,
} from '@/shared'
import type { Skin } from '@/shared/types'
import { PAGES } from '@/widgets'
import { useUnit } from 'effector-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState, type FC } from 'react'
import { soloCaseModels } from '../model/soloCaseList'
import { RouletteSkins } from './RouletteSkins'

export const SoloCaseView: FC = () => {
  const [
    caseData,
    openedData,
    caseIsLoading,
    caseIsOpening,
    openCaseEvent,
    resetOpenedEvent,
    userData,
    isVerified,
  ] = useUnit([
    soloCaseModels.stores.$case,
    soloCaseModels.stores.$openedData,
    soloCaseModels.stores.$caseLoading,
    soloCaseModels.stores.$openLoading,
    soloCaseModels.events.openCase,
    soloCaseModels.events.resetOpened,
    $user,
    $isVerified,
  ])

  const t = useTranslations()
  const router = useRouter()
  const goHome = () => router.push(PAGES.GAMES)

  const [spin, setSpin] = useState<boolean>(false)
  const [winner, setWinner] = useState<Skin | null>(null)
  const [prize, setPrize] = useState<Skin | null>(null)

  const winnerRef = useRef<Skin | null>(null)
  useEffect(() => {
    winnerRef.current = winner
  }, [winner])

  useEffect(() => {
    if (!openedData?.skin) return
    setWinner(openedData.skin)
    setSpin(true)
  }, [openedData])

  if (!caseData) {
    return (
      <div className={cn('pt-5 px-4 text-white/70', 'flex flex-col gap-4')}>
        {t('shared.notFound')}

        <Button onClick={goHome} variant='secondary'>
          {t('shared.goHome')}
        </Button>
      </div>
    )
  }

  if (caseIsLoading) return <SoloCaseSkeleton />

  const userBalance = Number(userData?.balance ?? 0)
  const notEnoughPoints = userBalance < caseData.price
  /** Может ли юзер открыть */
  const canOpen = isVerified && !notEnoughPoints && !caseIsOpening && !spin
  /** Показывать кнопку открыть ? */
  const showButtonOpen = isVerified && !caseIsOpening && !spin

  const startOpen = () => {
    if (!canOpen) return

    setPrize(null)
    setWinner(null)
    setSpin(false)
    resetOpenedEvent()
    openCaseEvent(caseData.id)
  }

  const onSpinComplete = () => {
    setSpin(false)
    setPrize(winnerRef.current)
  }

  const closePrize = () => {
    setPrize(null)
    setWinner(null)
    setSpin(false)
    resetOpenedEvent()
  }

  let openVariant: 'primary' | 'secondary' = 'primary'
  if (notEnoughPoints) openVariant = 'secondary'

  let openText = t('cases.openCase')
  if (notEnoughPoints) openText = t('cases.notPoints')

  const header = (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ ease: 'linear', duration: 0.4 }}
      className='flex flex-col gap-3'
    >
      <h1 className='text-center text-lg font-bold tracking-wider'>{caseData.name ?? ' - '}</h1>

      <div className='flex items-center justify-center gap-2'>
        <div
          className={cn(
            'rounded-full bg-white/5 px-3 py-2 h-9 backdrop-blur-md',
            'text-white/70 font-medium text-sm tracking-wide',
          )}
        >
          {t('cases.availableItems', { count: caseData.skins?.length ?? 0 })}
        </div>

        <div
          className={cn(
            'bg-white/5 px-3 py-2 h-9',
            'border border-main-orange rounded-full',
            'flex items-center justify-center gap-1',
            'animate-pulse backdrop-blur-md',
          )}
        >
          <PricePoints point={caseData.price} />
        </div>
      </div>

      {!prize && (
        <Image
          src={getPhotoUrl(caseData.photo)}
          alt={caseData.name}
          width={240}
          height={180}
          className={cn(
            'h-45 w-auto object-contain max-w-full',
            'mt-3 shrink-0 overflow-hidden rounded-2xl',
          )}
          priority
          unoptimized
        />
      )}
    </motion.div>
  )

  const spinSection = (
    <motion.div layout className={cn('flex flex-col gap-3', 'min-h-0')}>
      {spin && (
        <RouletteSkins
          pool={caseData.skins}
          winner={winner}
          spin={spin}
          duration={8}
          minItems={40}
          onComplete={onSpinComplete}
        />
      )}

      {showButtonOpen && (
        <Button
          size='lg'
          variant={openVariant}
          disabled={!canOpen}
          onClick={startOpen}
          className='mt-1'
        >
          {openText}
        </Button>
      )}
    </motion.div>
  )

  const prizeSection = (
    <div className='flex flex-col gap-3'>
      <h2 className='text-center text-lg font-bold tracking-wide mt-4'>{t('cases.urPrize')}</h2>

      {prize && (
        <SkinCard
          disableMotion
          motionProps={{
            initial: { scale: 0.74, filter: 'blur(8px)' },
            animate: { scale: 1, filter: 'blur(0px)' },
            transition: { ease: 'easeInOut', duration: 1 },
          }}
          skin={prize}
          className='max-w-75 w-full shrink-0 mx-auto'
        />
      )}

      <div className={cn('grid grid-cols-2 gap-3', 'mt-3 min-w-full')}>
        <Button
          variant={!isVerified || notEnoughPoints || caseIsOpening ? 'secondary' : 'primary'}
          disabled={!isVerified || notEnoughPoints || caseIsOpening}
          onClick={startOpen}
        >
          {t('cases.openNext')}
        </Button>

        <Button variant='secondary' onClick={closePrize}>
          {t('shared.closed')}
        </Button>
      </div>
    </div>
  )

  const listSection = (
    <div className='flex flex-col gap-3'>
      <h2 className='text-left text-lg font-bold tracking-wide mt-1'>{t('cases.prizes')}</h2>

      <div className={cn('grid grid-cols-2 gap-3', 'min-w-full')}>
        {caseData.skins.map((skin) => (
          <SkinCard key={skin.id} skin={skin} />
        ))}
      </div>
    </div>
  )

  let actionBlock: ReactNode | null = null
  if (isVerified) {
    if (prize) actionBlock = prizeSection
    else actionBlock = spinSection
  }

  let showList = true
  if (prize) showList = false

  return (
    <PageWrapper className='flex flex-col gap-4 pb-44'>
      {header}

      {actionBlock}

      {showList && listSection}

      <UnregisteredButton />
    </PageWrapper>
  )
}
