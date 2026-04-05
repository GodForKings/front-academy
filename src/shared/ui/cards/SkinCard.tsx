'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import type { ComponentProps, FC, ReactNode } from 'react'

import { cn, getPhotoUrl, hexToRgba,InfoBlock } from '@/shared'
import type { Skin } from '@/shared/types'

type MotionDivProps = ComponentProps<typeof motion.div>

interface SkinCardProps {
  skin: Skin
  className?: string
  children?: ReactNode
  /** выключить дефолтную анимацию */
  disableMotion?: boolean
  /** кастомные motion-пропсы (перебивают дефолтные) */
  motionProps?: Omit<MotionDivProps, 'children' | 'className' | 'style'>
}

const defaultMotion: Pick<MotionDivProps, 'initial' | 'whileInView' | 'transition' | 'viewport'> = {
  initial: { filter: 'blur(2px)', scale: 0.98 },
  whileInView: { filter: 'blur(0px)', scale: 1 },
  transition: { ease: 'easeInOut', duration: 0.4 },
  viewport: { amount: 0.2, once: true },
}

export const SkinCard: FC<SkinCardProps> = (props) => {
  const { skin, className, children, disableMotion, motionProps } = props
  const color = skin.rarity?.color || '#FE4848'

  const appliedMotionProps = disableMotion ? motionProps : { ...defaultMotion, ...motionProps }

  return (
    <motion.div
      {...appliedMotionProps}
      className={cn(
        'relative overflow-hidden backdrop-blur-xl p-3',
        'border rounded-2xl',
        'flex flex-col gap-2',
        className,
      )}
      style={{
        backgroundColor: hexToRgba(color, 0.15),
        borderColor: hexToRgba(color, 0.45),
      }}
    >
      <div className={cn('relative overflow-hidden shrink-0', 'aspect-square w-full rounded-2xl')}>
        <Image
          src={getPhotoUrl(skin.photo)}
          alt={skin.itemName ?? 'skin'}
          fill
          className='object-contain max-w-full'
          sizes='(max-width: 480px) 50vw, 200px'
          unoptimized
        />
      </div>

      <InfoBlock
        headerClass='text-sm font-bold text-center'
        paragraphClass='font-medium tracking-wide'
        className='items-center'
        paragraph={skin.rarity?.name}
        title={`${skin.itemName} | ${skin.skinName}`}
      />

      {children}
    </motion.div>
  )
}
