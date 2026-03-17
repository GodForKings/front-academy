import { toastModels } from '@/entities'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { getCaseById, openCaseById } from '../api/methods'
import type { CaseDetails, OpenCaseResponse } from '../api/types'

/* Эффекты */
export const fetchCaseFx = createEffect(getCaseById)
export const openCaseFx = createEffect(openCaseById)

/* События */
export const fetchCase = createEvent<string>() // caseId
export const openCase = createEvent<string>() // caseId
export const resetOpened = createEvent() // Для сброса открытия кейса

const setCase = createEvent<CaseDetails>()
const setOpened = createEvent<OpenCaseResponse | null>()

/* Хранилища */
export const $case = createStore<CaseDetails | null>(null).on(setCase, (_, caseData) => caseData)
export const $openedData = createStore<OpenCaseResponse | null>(null).on(
  setOpened,
  (_, skin) => skin,
)
/* Загрузчики */
export const $caseLoading = fetchCaseFx.pending
export const $openLoading = openCaseFx.pending

/* event => effect */
sample({ clock: fetchCase, target: fetchCaseFx })
sample({ clock: openCase, target: openCaseFx })

/* effect => store */
sample({ clock: fetchCaseFx.doneData, target: setCase })
sample({ clock: openCaseFx.doneData, target: setOpened })

/* Сброс результата открытия */
sample({
  clock: resetOpened,
  fn: () => null,
  target: setOpened,
})

/* UI для юзера */
sample({
  clock: fetchCaseFx.failData,
  fn: () => 'Не удалось загрузить кейс',
  target: toastModels.events.showError,
})
sample({
  clock: openCaseFx.failData,
  fn: () => 'Ошибка при открытие кейса',
  target: toastModels.events.showError,
})

export const soloCaseModels = {
  events: {
    fetchCase,
    openCase,
    resetOpened,
  },
  stores: {
    $case,
    $openedData,
    $caseLoading,
    $openLoading,
  },
  effects: {
    fetchCaseFx,
    openCaseFx,
  },
}
