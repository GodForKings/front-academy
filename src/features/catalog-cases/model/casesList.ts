import { toastModels } from '@/entities'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { getCases } from '../api/methods'
import { Case } from '../api/types'

/* Эффекты */
export const fetchCasesFx = createEffect(getCases)

/* События */
export const fetchCases = createEvent()
const setCases = createEvent<Case[]>()

/* Хранилища */
export const $cases = createStore<Case[]>([]).on(setCases, (_, casesData) => casesData)
export const $casesLoading = fetchCasesFx.pending

/* event => effect */
sample({
  clock: fetchCases,
  target: fetchCasesFx,
})

/* effects => store */
sample({
  clock: fetchCasesFx.doneData,
  target: setCases,
})

/* Для UI результатов */
sample({
  clock: fetchCasesFx.failData,
  fn: () => 'Не удалось получить кейсы',
  target: toastModels.events.showError,
})

/* Units Кейсов */
export const casesModels = {
  events: {
    fetchCases,
  },
  stores: {
    $cases,
    $casesLoading,
  },
  effects: {
    fetchCasesFx,
  },
}
