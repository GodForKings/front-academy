'use client'

import { useGate } from 'effector-react'
import type { FC } from 'react'

import { PublicConfigGate, RolesGate, UserGate } from '@/entities'
import { CasesGate } from '@/features'

/** Для получения `SHARED DATA` для всего приложения */
export const SharedGates: FC = () => {
  useGate(UserGate)
  useGate(CasesGate)
  useGate(RolesGate)
  useGate(PublicConfigGate)

  return null
}
