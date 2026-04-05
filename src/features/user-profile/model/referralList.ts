import { createEffect, createEvent, sample } from 'effector'

import { toastModels } from '@/entities'
import { copyToClipboard } from '@/shared'

/* Эффекты */
const copyReferralFx = createEffect(copyToClipboard)

/* События */
export const copyReferral = createEvent<string>()

/* Event => Effect */
sample({
  clock: copyReferral,
  target: copyReferralFx,
})

/* UI юзеру */
sample({
  clock: copyReferralFx.doneData,
  fn: () => 'Реферальная ссылка скопирована',
  target: toastModels.events.showSuccess,
})
sample({
  clock: copyReferralFx.failData,
  fn: () => 'Не удалось скопировать ссылку',
  target: toastModels.events.showError,
})
