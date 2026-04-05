'use client'

import { useGate, useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { type FC, ReactNode, useMemo, useState } from 'react'

import { $user, SteamTradeLinkModal } from '@/entities'
import { Button, cn, InventoryTabSkeleton, SkinCard, SpinIcon } from '@/shared'
import type { RarityFilter, SkinRarityName } from '@/shared/types'
import { openModal, PAGES } from '@/widgets'

import { RARITIES, RARITY_LABELS } from '../lib/data'
import { UserSkinsGate } from '../model/userSkinGate'
import { inventoryModels } from '../model/userSkinList'
import { EmptyInventory } from './EmptyInventory'

export const InventoryTabContent: FC = () => {
  useGate(UserSkinsGate)

  const [currentRarity, updateCurrentRarity] = useState<RarityFilter>('all')

  const router = useRouter()
  const t = useTranslations('profilePage')

  const [
    user,
    openModalContent,
    skins,
    skinsLoading,
    sellLoading,
    withdrawLoading,
    sellingSkinId,
    withdrawingSkinId,
    sellSkin,
    withdrawSkin,
  ] = useUnit([
    $user,
    openModal,
    inventoryModels.stores.$skins,
    inventoryModels.stores.$skinsLoading,
    inventoryModels.stores.$sellLoading,
    inventoryModels.stores.$withdrawLoading,
    inventoryModels.stores.$sellingSkinId,
    inventoryModels.stores.$withdrawingSkinId,
    inventoryModels.events.sellSkin,
    inventoryModels.events.withdrawSkin,
  ])

  const counts = useMemo(() => {
    const map = new Map<SkinRarityName, number>()

    for (const skin of skins) {
      const rarityName = skin.rarity?.name as SkinRarityName | undefined

      if (!rarityName) continue
      map.set(rarityName, (map.get(rarityName) ?? 0) + 1)
    }

    return map
  }, [skins])

  const filteredSkins = useMemo(() => {
    if (currentRarity === 'all') return skins

    return skins.filter(
      (skin) => (skin.rarity?.name as SkinRarityName | undefined) === currentRarity,
    )
  }, [skins, currentRarity])

  /** На главную крутить кейсы */
  const goHome = () => router.push(PAGES.GAMES)

  const hasTradeLink = Boolean(user?.steam?.tradeToken)

  const handleWithdrawClick = (skinId: string) => {
    if (!hasTradeLink) {
      openModalContent({
        content: <SteamTradeLinkModal />,
      })

      return
    }

    withdrawSkin(skinId)
  }

  if (skinsLoading) return <InventoryTabSkeleton />

  return (
    <div className={cn('flex flex-col gap-4', 'mt-1')}>
      <div className={cn('flex flex-col gap-1', 'relative w-full')}>
        <div className='flex justify-between items-center'>
          <h2 className='text-[22px] font-extrabold'>{t('inventory.title')}</h2>

          {filteredSkins.length > 0 && (
            <Button onClick={goHome} size='md' variant='primary' className='w-fit px-3 py-1.5'>
              {t('inventory.cases')}
            </Button>
          )}
        </div>

        <p className='text-white/70 font-medium text-sm'>
          {t('inventory.availableItems', { count: filteredSkins.length })}
        </p>
      </div>

      <div className='flex items-center gap-2 overflow-x-auto'>
        <Chip active={currentRarity === 'all'} onClick={() => updateCurrentRarity('all')}>
          {t('inventory.allItems', { count: skins.length })}
        </Chip>

        {RARITIES.map((rarity) => {
          const count = counts.get(rarity) ?? 0

          if (count <= 0) return null
          const color =
            skins.find((skin) => (skin.rarity?.name as SkinRarityName | undefined) === rarity)
              ?.rarity?.color ?? '#FFFFFF'

          return (
            <Chip
              key={rarity}
              active={currentRarity === rarity}
              onClick={() => updateCurrentRarity(rarity)}
              dotColor={color}
            >
              {RARITY_LABELS[rarity]} ({count})
            </Chip>
          )
        })}
      </div>

      {filteredSkins.length === 0 && !skinsLoading ? (
        <EmptyInventory onClick={goHome} />
      ) : (
        <div className={cn('grid grid-cols-2 gap-3', 'min-w-full')}>
          <AnimatePresence initial={false}>
            {filteredSkins.map((skin, index) => {
              const isSelling = sellLoading && sellingSkinId === skin.id
              const isWithdrawing = withdrawLoading && withdrawingSkinId === skin.id
              const isDisabled = isSelling || isWithdrawing

              return (
                <motion.div
                  key={skin.id + index}
                  layout
                  initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.88, filter: 'blur(6px)' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <SkinCard skin={skin} disableMotion className='h-full'>
                    <div className='grid grid-cols-2 gap-2 mt-auto'>
                      <Button
                        onClick={() => sellSkin(skin.id)}
                        size='md'
                        variant='secondary'
                        disabled={isDisabled}
                        className='px-3 py-1.5'
                        style={{ borderColor: skin.rarity.color }}
                      >
                        {isSelling ? (
                          <SpinIcon size={18} />
                        ) : (
                          <img src='/svg/dollar.svg' alt='dollar' className='size-4 shrink-0' />
                        )}
                      </Button>

                      <Button
                        onClick={() => handleWithdrawClick(skin.id)}
                        size='md'
                        variant='secondary'
                        disabled={isDisabled}
                        className='px-3 py-1.5'
                        style={{ borderColor: skin.rarity.color }}
                      >
                        {isWithdrawing ? (
                          <SpinIcon size={18} />
                        ) : (
                          <img src='/svg/steam.svg' alt='steam' className='size-4 shrink-0' />
                        )}
                      </Button>
                    </div>
                  </SkinCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

interface ChipProps {
  children: ReactNode
  active?: boolean
  dotColor?: string
  onClick?: () => void
}

const Chip: FC<ChipProps> = (props) => {
  const { children, active, dotColor, onClick } = props

  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'inline-flex items-center shrink-0',
        'h-9 px-4 rounded-full',
        'text-sm font-medium',
        'transition hover:opacity-70 active:scale-96',
        active ? 'bg-linear-to-r from-fuchsia-500 to-purple-600' : 'bg-white/10',
      )}
    >
      {dotColor && (
        <span
          className='inline-block size-4.5 rounded-full mr-1.5'
          style={{ backgroundColor: dotColor }}
        />
      )}

      {children}
    </button>
  )
}
