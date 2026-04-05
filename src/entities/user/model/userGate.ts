'use client'

import { sample } from 'effector'
import { createGate } from 'effector-react'

import { fetchUser } from './userList'

export const UserGate = createGate()

/* Ворота trigger */
sample({
  clock: UserGate.open,
  target: fetchUser,
})
