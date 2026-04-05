import { createEvent, createStore, sample } from 'effector'

import { $user, toastModels, updateUserData, updateUserFx } from '@/entities'
import { normalizePhone, toServerPhone } from '@/shared'

/* События */
export const phoneChanged = createEvent<string>()
export const clearPhone = createEvent()
export const submitClicked = createEvent()
export const proceedConsumed = createEvent()
const proceedRequested = createEvent()
const awaitSaveOn = createEvent()
const awaitSaveOff = createEvent()
/* внутреннее событие для инициализации из user */
const phoneFromUser = createEvent<string>()

/* Хранилища */
export const $userPhone = $user.map((user) => user?.phone ?? '')

export const $phone = createStore('')
  .on(phoneFromUser, (_, value) => normalizePhone(value))
  .on(phoneChanged, (_, value) => normalizePhone(value))
  .on(clearPhone, () => '')

export const $saving = updateUserFx.pending
export const $shouldProceed = createStore(false).on(proceedConsumed, () => false)

const $awaitSave = createStore(false)
$shouldProceed.on(proceedRequested, () => true)
$awaitSave.on(awaitSaveOn, () => true).on(awaitSaveOff, () => false)

/* Если у user-а есть phone => кладем его в default */
sample({
  clock: $userPhone,
  source: $phone,
  filter: (phone, userPhone) => phone.trim() === '' && Boolean(userPhone),
  fn: (_, userPhone) => userPhone,
  target: phoneFromUser,
})

sample({
  clock: submitClicked,
  source: { phone: $phone, userPhone: $userPhone },
  filter: ({ phone, userPhone }) => !phone.trim() || toServerPhone(phone) === (userPhone ?? ''),
  target: proceedRequested,
})

sample({
  clock: submitClicked,
  source: { phone: $phone, userPhone: $userPhone },
  filter: ({ phone, userPhone }) =>
    Boolean(phone.trim()) && toServerPhone(phone) !== (userPhone ?? ''),
  fn: ({ phone }) => ({ phone: toServerPhone(phone) }),
  target: updateUserData,
})

sample({
  clock: submitClicked,
  source: { phone: $phone, userPhone: $userPhone },
  filter: ({ phone, userPhone }) =>
    Boolean(phone.trim()) && toServerPhone(phone) !== (userPhone ?? ''),
  target: awaitSaveOn,
})

sample({
  clock: updateUserFx.doneData,
  source: $awaitSave,
  filter: (awaiting) => awaiting,
  target: [proceedRequested, awaitSaveOff],
})

sample({
  clock: updateUserFx.failData,
  source: $awaitSave,
  filter: (awaiting) => awaiting,
  target: awaitSaveOff,
})

sample({
  clock: updateUserFx.failData,
  source: $awaitSave,
  filter: (awaiting) => awaiting,
  fn: () => 'Не удалось сохранить номер',
  target: toastModels.events.showError,
})

export const phoneFlowModels = {
  events: { phoneChanged, clearPhone, submitClicked, proceedConsumed },
  stores: { $phone, $userPhone, $shouldProceed, $saving },
}
