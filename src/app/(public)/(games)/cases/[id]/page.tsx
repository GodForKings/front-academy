'use client'

import { Page } from '@/app/_providers'
import { SoloCaseGate, SoloCaseView } from '@/features'
import { useGate } from 'effector-react'
import { useParams } from 'next/navigation'

export default function SoloCase() {
  const params = useParams<{ id: string }>()

  useGate(SoloCaseGate, { id: params.id })

  return (
    <Page>
      <SoloCaseView />
    </Page>
  )
}
