'use client'

import {
  Button,
  InfoBlock,
  PageWrapper,
  cn,
  formatPhoneDisplay,
  normalizePhone,
  safeReturnTo,
  usePlatform,
} from '@/shared'
import { PAGES } from '@/widgets'
import { requestContact } from '@tma.js/sdk-react'
import { useUnit } from 'effector-react'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { phoneFlowModels } from '../model/phoneFlowList'

export const PhoneFlow: FC = () => {
  const router = useRouter()
  const sp = useSearchParams()
  const returnTo = safeReturnTo(sp.get('returnTo')) ?? PAGES.REGISTRATION_CHOICE_ROLE

  const t = useTranslations('registrationEmail')
  const { isMobile } = usePlatform()

  const [importing, setImporting] = useState<boolean>(false)

  const [phone, shouldProceed, saving, phoneChanged, clearPhone, submitClicked, proceedConsumed] =
    useUnit([
      phoneFlowModels.stores.$phone,
      phoneFlowModels.stores.$shouldProceed,
      phoneFlowModels.stores.$saving,
      phoneFlowModels.events.phoneChanged,
      phoneFlowModels.events.clearPhone,
      phoneFlowModels.events.submitClicked,
      phoneFlowModels.events.proceedConsumed,
    ])

  const handleImportFromTelegram = useCallback(async () => {
    setImporting(true)

    try {
      const data = await requestContact()
      const raw = data?.contact?.phone_number
      if (raw) phoneChanged(normalizePhone(raw))
    } catch {
    } finally {
      setImporting(false)
    }
  }, [phoneChanged])

  useEffect(() => {
    if (!shouldProceed) return
    router.replace(returnTo)
    proceedConsumed()
  }, [shouldProceed, router, proceedConsumed, returnTo])

  return (
    <PageWrapper className={cn('flex flex-col gap-6', 'pb-9 pt-10', isMobile && '-mt-24 pt-24')}>
      <InfoBlock
        className='gap-4'
        headerClass='text-2xl/5 font-extrabold tracking-wide'
        title={t('phone.title')}
        paragraph={t('phone.subtitle')}
        paragraphClass='text-sm/5'
      />

      <div
        className={cn(
          'flex items-center justify-between gap-3',
          'px-4 h-11 bg-white/10 backdrop-blur-xl rounded-full',
        )}
      >
        <input
          disabled
          value={formatPhoneDisplay(phone)}
          onChange={(e) => phoneChanged(e.target.value)}
          placeholder='+7 (000) 000-00-00'
          className={cn(
            'w-full bg-transparent outline-none',
            'text-white text-sm/5 placeholder:text-white/50',
          )}
          inputMode='tel'
          autoComplete='tel'
        />

        {phone.length > 0 && (
          <button type='button' onClick={clearPhone} aria-label='clear'>
            <X size={16} className='text-white/50 active:scale-90 hover:text-white/80 transition' />
          </button>
        )}
      </div>

      <div className={cn('flex flex-col items-center justify-between gap-3', 'mt-auto w-full')}>
        <Button
          className='border-[#1878A7]'
          size='lg'
          variant='outline'
          disabled={saving || importing}
          onClick={handleImportFromTelegram}
        >
          {t('phone.importFromTelegram')}
        </Button>

        <Button
          size='lg'
          variant={saving || !phone ? 'secondary' : 'primary'}
          disabled={saving || !phone}
          onClick={submitClicked}
        >
          {t('phone.continue')}
        </Button>
      </div>
    </PageWrapper>
  )
}
