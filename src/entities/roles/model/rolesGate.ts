'use client'

import { fetchRoles } from '@/entities/roles'
import { sample } from 'effector'
import { createGate } from 'effector-react'

export const RolesGate = createGate()

/* Ворота trigger */
sample({
  clock: RolesGate.open,
  target: fetchRoles,
})
