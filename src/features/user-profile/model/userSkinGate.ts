'use client'

import { sample } from 'effector'
import { createGate } from 'effector-react'
import { fetchMySkins, resetInventory } from './userSkinList'

export const UserSkinsGate = createGate()

/* Фетчим данные */
sample({
  clock: UserSkinsGate.open,
  target: fetchMySkins,
})
/* Reset для всех хранилищ */
sample({
  clock: UserSkinsGate.close,
  target: resetInventory,
})
