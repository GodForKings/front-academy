import { combine, createEvent, createStore, sample } from 'effector'

import { $user, updateUserData, updateUserFx } from '@/entities'
import { $roles } from '@/entities/roles'

/* События */
export const roleSelected = createEvent<string>()
export const submitClicked = createEvent()
export const proceedConsumed = createEvent()
const proceedRequested = createEvent()
const awaitSaveOn = createEvent()
const awaitSaveOff = createEvent()

/* Хранилища */
export const $userRoleId = $user.map((user) => user?.role?.id ?? null)

export const $selectedRoleId = createStore<string | null>(null).on(roleSelected, (_, id) => id)

/** Если пользователь не кликал - подсвечиваем роль из $user при наличие. Если кликнул - берём выбранную. */
export const $activeRoleId = combine(
  $selectedRoleId,
  $userRoleId,
  (selected, userRoleId) => selected ?? userRoleId,
)

export const $saving = updateUserFx.pending

/** proceed флаг, чтобы UI сделал router.push */
export const $shouldProceed = createStore(false).on(proceedConsumed, () => false)

/** чтобы proceed сработал только после => PUT */
const $awaitSave = createStore(false)

$shouldProceed.on(proceedRequested, () => true)
$awaitSave.on(awaitSaveOn, () => true).on(awaitSaveOff, () => false)

/* Если юзер не менял роль просто дальше идем */
sample({
  clock: submitClicked,
  source: { active: $activeRoleId, initial: $userRoleId },
  filter: ({ active, initial }) => !active || active === initial,
  target: proceedRequested,
})

/* Для обновления информации у User */
sample({
  clock: submitClicked,
  source: { active: $activeRoleId, initial: $userRoleId },
  filter: ({ active, initial }) => Boolean(active) && active !== initial,
  fn: ({ active }) => ({ gameRoleId: active! }),
  target: updateUserData,
})

sample({
  clock: submitClicked,
  source: { active: $activeRoleId, initial: $userRoleId },
  filter: ({ active, initial }) => Boolean(active) && active !== initial,
  target: awaitSaveOn,
})

/* после успешного PUT => переход */
sample({
  clock: updateUserFx.doneData,
  source: $awaitSave,
  filter: (awaiting) => awaiting,
  target: [proceedRequested, awaitSaveOff],
})

/* если PUT упал => убираем ожидание */
sample({
  clock: updateUserFx.failData,
  source: $awaitSave,
  filter: (awaiting) => awaiting,
  target: awaitSaveOff,
})

export const catalogRolesModels = {
  events: { roleSelected, submitClicked, proceedConsumed },
  stores: { $roles, $activeRoleId, $userRoleId, $selectedRoleId, $shouldProceed, $saving },
}
