'use client'

import { fetchUser } from '@/entities/user'
import { sample } from 'effector'
import { createGate } from 'effector-react'

export const UserGate = createGate()

/* Ворота trigger */
sample({
  clock: UserGate.open,
  target: fetchUser,
})
