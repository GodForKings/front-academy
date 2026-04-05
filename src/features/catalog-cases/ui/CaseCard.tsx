'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

import { Button, cn, getPhotoUrl,PricePoints } from '@/shared'
import { PAGES } from '@/widgets'

import type { Case } from '../api/types'

interface CaseCardProps {
  caseData: Case
  className?: string
}

export const CaseCard: FC<CaseCardProps> = (props) => {
  const { caseData, className } = props

  const t = useTranslations()
  const router = useRouter()
  const goToSoloCase = () => router.push(PAGES.SOLO_CASE(caseData.id))

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(2px)', scale: 0.98 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      transition={{ ease: 'linear', duration: 0.3 }}
      className={cn(
        'relative min-h-63 max-h-63 w-full overflow-hidden',
        'flex flex-col gap-2',
        'border border-white/5 rounded-2xl',
        'bg-white/5 backdrop-blur-xl p-3',
        className,
      )}
    >
      <Image
        src={getPhotoUrl(caseData.photo)}
        alt={caseData.name}
        width={220}
        height={110}
        className={cn('h-27.5 w-auto object-cover', 'overflow-hidden rounded-xl shrink-0')}
        unoptimized
      />

      <div className='flex items-center gap-1'>
        <PricePoints point={caseData.price} className='text-lg/5' />
      </div>

      <h3 className='text-sm/5 font-bold tracking-wider'>{caseData.name}</h3>

      <Button onClick={goToSoloCase} size='md' variant='outline' className='mt-auto'>
        {t('shared.open')}
      </Button>
    </motion.div>
  )
}
