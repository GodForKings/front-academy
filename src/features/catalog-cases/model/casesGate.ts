'use client'

import { sample } from 'effector'
import { createGate } from 'effector-react'

import { fetchCases } from './casesList'

export const CasesGate = createGate()

/* Ворота trigger */
sample({
  clock: CasesGate.open,
  target: fetchCases,
})
