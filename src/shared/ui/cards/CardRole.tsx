'use client'

import { InfoBlock, cn, getPhotoUrl } from '@/shared'
import type { Role } from '@/shared/types'
import { motion } from 'motion/react'
import Image from 'next/image'
import type { FC } from 'react'

interface CardRoleProps {
  role: Role
  selected: boolean
  onSelect: (roleId: string) => void
  className?: string
}

export const CardRole: FC<CardRoleProps> = (props) => {
  const { role, selected, onSelect, className } = props

  return (
    <motion.button
      type='button'
      initial={{ opacity: 0, filter: 'blur(2px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
      onClick={() => onSelect(role.id)}
      className={cn(
        'relative overflow-hidden text-left',
        'border border-white/5 rounded-2xl',
        'bg-white/5 p-3 backdrop-blur-xl',
        'flex flex-col gap-2',
        'transition will-change-transform',
        selected ? 'border-main-violet' : 'active:scale-98 hover:border-white/30',
        className,
      )}
    >
      <div className={cn('relative overflow-hidden shrink-0', 'aspect-5/6 rounded-xl')}>
        <Image
          src={getPhotoUrl(role.photo)}
          alt={role.name}
          fill
          className='object-cover'
          unoptimized
        />
      </div>

      <InfoBlock
        className='gap-1'
        headerClass='text-sm font-bold'
        paragraphClass='font-medium tracking-wide'
        title={role.name}
        paragraph={role.description}
      />
    </motion.button>
  )
}
