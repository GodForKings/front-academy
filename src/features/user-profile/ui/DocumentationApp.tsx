'use client'

import { useUnit } from 'effector-react'
import { CircleQuestionMark, File, ShieldUser } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { FC, ReactNode } from 'react'

import { Button, cn, GUIDE, PRIVACY, TERMS } from '@/shared'
import { LegalDocModal, openModal } from '@/widgets'

interface DocumentationAppProps {
  className?: string
}

export const DocumentationApp: FC<DocumentationAppProps> = (props) => {
  const { className } = props

  const t = useTranslations('profilePage')
  const openModalPDF = useUnit(openModal)

  /** Открыть modal с информацией */
  const handleOpenInfo = (title: string, url: string) => {
    openModalPDF({ content: <LegalDocModal title={title} currentSrc={url} /> })
  }

  return (
    <div
      className={cn(
        'w-full h-46 rounded-3xl p-4',
        'bg-white/5 backdrop-blur-lg',
        'flex flex-col gap-2.5',
        className,
      )}
    >
      <LinkRow
        icon={<File size={20} />}
        title={t('links.serviceRules')}
        onClick={() => handleOpenInfo(t('links.serviceRules'), TERMS)}
      />

      <LinkRow
        icon={<ShieldUser size={20} />}
        title={t('links.privacyPolicy')}
        onClick={() => handleOpenInfo(t('links.privacyPolicy'), PRIVACY)}
      />

      <LinkRow
        icon={<CircleQuestionMark size={20} />}
        title={t('links.appGuide')}
        onClick={() => handleOpenInfo(t('links.appGuide'), GUIDE)}
      />
    </div>
  )
}

interface LinkRowProps {
  icon: ReactNode
  title: string
  onClick?: () => void
}
const LinkRow: FC<LinkRowProps> = (props) => {
  const { icon, title, onClick } = props

  return (
    <Button
      variant='secondary'
      onClick={onClick}
      className={cn(
        'h-14 rounded-xl p-3 text-left bg-white/5 backdrop-blur-none',
        'gap-3 justify-start',
      )}
    >
      {icon}

      <span className='text-xs tracking-wide font-medium'>{title}</span>
    </Button>
  )
}
