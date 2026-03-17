import { toastModels } from '@/entities'
import { getRoles } from '@/entities/roles'
import type { Role } from '@/shared/types'
import { createEffect, createEvent, createStore, sample } from 'effector'

/* Эффекты */
export const fetchRolesFx = createEffect(getRoles)

/* События */
export const fetchRoles = createEvent()
const setRoles = createEvent<Role[]>()

/* Хранилища */
export const $roles = createStore<Role[]>([]).on(setRoles, (_, rolesData) => rolesData)

/* event => effect */
sample({
  clock: fetchRoles,
  target: fetchRolesFx,
})

/* effects => store */
sample({
  clock: fetchRolesFx.doneData,
  target: setRoles,
})

/* Для UI результатов */
sample({
  clock: fetchRolesFx.failData,
  fn: () => 'Не удалось получить роли игроков',
  target: toastModels.events.showError,
})
