'use client'

import { sample } from 'effector'
import { createGate } from 'effector-react'
import { fetchPublicConfig } from './upperConfigList'

export const PublicConfigGate = createGate()

/* Ворота trigger */
sample({
  clock: PublicConfigGate.open,
  target: fetchPublicConfig,
})
