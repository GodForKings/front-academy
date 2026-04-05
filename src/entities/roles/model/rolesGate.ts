'use client'

import { sample } from 'effector'
import { createGate } from 'effector-react'

import { fetchRoles } from '@/entities/roles'

export const RolesGate = createGate()

/* Ворота trigger */
sample({
  clock: RolesGate.open,
  target: fetchRoles,
})
