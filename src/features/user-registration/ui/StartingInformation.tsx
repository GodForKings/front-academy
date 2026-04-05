'use client'

import { useUnit } from 'effector-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

import { Button, cn, PageWrapper, usePlatform } from '@/shared'
import { LegalDocModal, openModal, PAGES } from '@/widgets'

import { skipRegistration } from '../model/skip'
import { StepRow } from './StepRow'

export const StartingInformation: FC = () => {
  const [skip, openModalPDF] = useUnit([skipRegistration, openModal])
  const t = useTranslations('registration')
  const router = useRouter()
  const { isMobile } = usePlatform()

  /** Перейти к подтверждению email */
  const goConfirmEmail = () => router.push(PAGES.REGISTRATION_EMAIL)

  /** Пропустить регистрацию */
  const onSkip = () => {
    skip()
    router.replace(PAGES.GAMES)
  }

  /** Открыть modal с информацией */
  const handleOpenInfo = (title: string, url: string) => {
    openModalPDF({ content: <LegalDocModal title={title} currentSrc={url} /> })
  }

  return (
    <PageWrapper className={cn('flex flex-col gap-11', 'pb-9 pt-15', isMobile && '-mt-24 pt-24')}>
      <motion.div
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ ease: 'easeIn', duration: 0.4 }}
        className={cn('flex flex-col gap-6', 'text-center')}
      >
        <h1 className='text-[32px]/5 font-extrabold tracking-wide'>{t('title')}</h1>

        <p className='text-base/5 font-medium text-white/70 px-6 tracking-wide'>{t('subtitle')}</p>
      </motion.div>

      <div
        className={cn(
          'p-4 bg-white/5 backdrop-blur-xl shadow',
          'border-b border-white/5 rounded-2xl',
          'flex flex-col gap-6',
        )}
      >
        <StepRow number={1} title={t('steps.1.title')} text={t('steps.1.text')} />

        <StepRow number={2} title={t('steps.2.title')} text={t('steps.2.text')} />

        <StepRow number={3} title={t('steps.3.title')} text={t('steps.3.text')} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: 'easeIn', duration: 0.4 }}
        className={cn('flex flex-col gap-4', 'mt-auto')}
      >
        <Button size='lg' variant='primary' onClick={goConfirmEmail}>
          {t('actions.start')}
        </Button>

        <Button size='lg' variant='secondary' onClick={onSkip}>
          {t('actions.guest')}
        </Button>

        {/* <p className='text-center text-xs/4 text-white/70 tracking-wide text-balance'>
          {t('legal.prefix')}{' '}
          <button
            onClick={() => handleOpenInfo(t('legal.terms'), TERMS)}
            className='text-white hover:underline active:underline underline-offset-1'
          >
            {t('legal.terms')}
          </button>{' '}
          {t('legal.and')}{' '}
          <button
            onClick={() => handleOpenInfo(t('legal.privacy'), PRIVACY)}
            className='text-white hover:underline active:underline underline-offset-1'
          >
            {t('legal.privacy')}
          </button>
        </p> */}
      </motion.div>
    </PageWrapper>
  )
}
