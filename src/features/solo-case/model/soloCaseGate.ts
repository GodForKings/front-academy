'use client'

import { sample } from 'effector'
import { createGate } from 'effector-react'
import { fetchCase } from './soloCaseList'

export const SoloCaseGate = createGate<{ id: string }>()

/* Ворота trigger */
sample({
  clock: SoloCaseGate.open,
  fn: ({ id }) => id,
  target: fetchCase,
})
