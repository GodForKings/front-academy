'use client'

import { useUnit } from 'effector-react'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

import { UnregisteredButton } from '@/entities'
import { CaseCardSkeleton, cn,Empty, PageWrapper } from '@/shared'

import { casesModels } from '../model/casesList'
import { CaseCard } from './CaseCard'

export const ViewCases: FC = () => {
  const t = useTranslations()
  const [cases, caseIsLoading] = useUnit([
    casesModels.stores.$cases,
    casesModels.stores.$casesLoading,
  ])

  const showEmpty = !caseIsLoading && cases.length === 0

  return (
    <PageWrapper className='flex flex-col gap-5 pb-44 min-h-fit'>
      <h1 className='text-left font-extrabold text-[22px] tracking-wide'>{t('cases.title')}</h1>

      {showEmpty ? (
        <Empty className='py-10' />
      ) : (
        <div className={cn('grid grid-cols-2 gap-3', 'min-w-full')}>
          {caseIsLoading
            ? Array.from({ length: 4 }).map((_, i) => <CaseCardSkeleton key={i} />)
            : cases.map((caseData) => <CaseCard key={caseData.id} caseData={caseData} />)}
        </div>
      )}

      <UnregisteredButton />
    </PageWrapper>
  )
}
