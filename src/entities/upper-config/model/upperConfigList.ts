import { getPublicConfig, toastModels, type PublicAppConfig } from '@/entities'
import { createEffect, createEvent, createStore, sample } from 'effector'

/* Эффекты */
const fetchPublicConfigFx = createEffect(getPublicConfig)

/* События */
export const fetchPublicConfig = createEvent()
const setPublicConfig = createEvent<PublicAppConfig>()

/* Хранилища */
const $publicConfig = createStore<PublicAppConfig | null>(null).on(
  setPublicConfig,
  (_, config) => config,
)

/* Loading UI */
const $publicConfigIsLoading = fetchPublicConfigFx.pending

/* События => Эффекты */
sample({
  clock: fetchPublicConfig,
  target: fetchPublicConfigFx,
})

/* Эффекты => Хранилища */
sample({
  clock: fetchPublicConfigFx.doneData,
  target: setPublicConfig,
})

/* UI уведомление */
sample({
  clock: fetchPublicConfigFx.failData,
  fn: () => 'Не удалось загрузить конфиг',
  target: toastModels.events.showError,
})

/** Все units */
export const publicConfigModels = {
  stores: {
    $publicConfig,
    $publicConfigIsLoading,
  },
}
