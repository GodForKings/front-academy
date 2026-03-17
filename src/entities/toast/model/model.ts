import { createEffect, createEvent, sample } from 'effector'
import toast from 'react-hot-toast'

const showError = createEvent<string>() // Под ошибки
const showSuccess = createEvent<string>() // Под Успех
const showInfo = createEvent<string>() // Под Справочную информацию

const showErrorFx = createEffect<string, void>((message) => {
  toast.error(message)
})

const showSuccessFx = createEffect<string, void>((message) => {
  toast.success(message)
})

const showInfoFx = createEffect<string, void>((message) => {
  toast(message)
})

sample({
  clock: showError,
  target: showErrorFx,
})

sample({
  clock: showSuccess,
  target: showSuccessFx,
})

sample({ clock: showInfo, target: showInfoFx })

export const toastModels = {
  events: { showError, showSuccess, showInfo },
}
