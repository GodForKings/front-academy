'use client'

import { Button, InfoBlock, OtpInput, PageWrapper, cn, safeReturnTo, usePlatform } from '@/shared'
import { PAGES } from '@/widgets'
import { useUnit } from 'effector-react'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import type { FC } from 'react'
import { useEffect } from 'react'
import { formatMMSS } from '../lib'
import { emailFlowModels } from '../model/emailFlowList'

export const EmailFlow: FC = () => {
  const sp = useSearchParams()
  const returnTo = safeReturnTo(sp.get('returnTo')) ?? PAGES.REGISTRATION_LINK_PLATFORM
  const router = useRouter()

  const { isMobile } = usePlatform()
  const t = useTranslations('registrationEmail')

  const [
    step,
    email,
    codeError,
    resendLeft,
    sendLoading,
    verifyLoading,
    needRedirect,
    emailChanged,
    clearEmail,
    sendClicked,
    codeChanged,
    codeCompleted,
    resendClicked,
    tick,
    backToEmail,
  ] = useUnit([
    emailFlowModels.stores.$step,
    emailFlowModels.stores.$email,
    emailFlowModels.stores.$codeError,
    emailFlowModels.stores.$resendLeft,
    emailFlowModels.stores.$sendLoading,
    emailFlowModels.stores.$verifyLoading,
    emailFlowModels.stores.$needRedirect,
    emailFlowModels.events.emailChanged,
    emailFlowModels.events.clearEmail,
    emailFlowModels.events.sendClicked,
    emailFlowModels.events.codeChanged,
    emailFlowModels.events.codeCompleted,
    emailFlowModels.events.resendClicked,
    emailFlowModels.events.tick,
    emailFlowModels.events.backToEmail,
  ])

  /* Таймер повторного кода */
  useEffect(() => {
    if (step !== 'code') return
    if (resendLeft <= 0) return
    const id = window.setInterval(() => tick(), 1000)
    return () => window.clearInterval(id)
  }, [step, resendLeft, tick])

  /* Успешная верификация => переход дальше */
  useEffect(() => {
    if (!needRedirect) return
    router.replace(returnTo)
  }, [needRedirect, router])
  /* При уходе со страницы скидываем шаг*/
  useEffect(() => {
    return () => {
      backToEmail()
    }
  }, [backToEmail])

  /* Шаг с вводом email-ла */
  if (step === 'email') {
    const canSend = /\S+@\S+\.\S+/.test(email.trim())

    return (
      <PageWrapper className={cn('flex flex-col gap-6', 'pb-9 pt-10', isMobile && '-mt-24 pt-24')}>
        <InfoBlock
          className='gap-4'
          headerClass='text-2xl/5 font-extrabold tracking-wide'
          title={t('email.title')}
          paragraph={t('email.subtitle')}
          paragraphClass='text-sm/5'
        />

        <div
          className={cn(
            'flex items-center justify-between gap-3',
            'px-4 h-11 bg-white/10 backdrop-blur-xl',
            'rounded-full border border-white/4',
          )}
        >
          <input
            value={email}
            onChange={(e) => emailChanged(e.target.value)}
            placeholder='example@gmail.com'
            className={cn(
              'w-full bg-transparent outline-none',
              'text-white text-sm/5 placeholder:text-white/40',
            )}
            inputMode='email'
            autoComplete='email'
          />

          {email.length > 0 && (
            <button type='button' onClick={clearEmail} aria-label='clear'>
              <X
                size={16}
                className='text-white/30 active:scale-90 hover:text-white/80 transition'
              />
            </button>
          )}
        </div>

        <Button
          className='mt-auto'
          size='lg'
          variant={!canSend || sendLoading ? 'secondary' : 'primary'}
          disabled={!canSend || sendLoading}
          onClick={sendClicked}
        >
          {t('email.continue')}
        </Button>
      </PageWrapper>
    )
  }

  /* Шаг с подтверждением кода из почты */
  const canResend = resendLeft <= 0

  return (
    <PageWrapper className={cn('flex flex-col gap-6', 'pb-9 pt-10', isMobile && '-mt-24 pt-24')}>
      <InfoBlock
        className='gap-4'
        headerClass='text-2xl/5 font-extrabold tracking-wide'
        title={t('code.title')}
        paragraph={t('code.subtitle', { email })}
        paragraphClass='text-sm/5'
      />

      <OtpInput
        length={4}
        disabled={verifyLoading}
        error={codeError}
        onChange={(code) => codeChanged(code)}
        onComplete={(code) => codeCompleted(code)}
      />

      {codeError && <p className='-mt-3 text-main-red text-sm/5 font-medium'>{t('code.error')}</p>}

      <div className='flex items-center gap-2'>
        <button
          type='button'
          onClick={() => (canResend ? resendClicked() : null)}
          className={cn('text-sm/5 font-medium', canResend ? 'text-main-violet' : 'text-white/70')}
          disabled={!canResend}
        >
          {t('code.resend')}
        </button>

        {!canResend && (
          <span className='text-sm/5 font-medium text-white/70 animate-pulse'>
            {formatMMSS(resendLeft)}
          </span>
        )}
      </div>
    </PageWrapper>
  )
}
