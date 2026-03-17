import { createEvent, createStore } from 'effector'

export const skipRegistration = createEvent()
export const dropSkip = createEvent()
export const $registrationSkipped = createStore(false)
  .on(skipRegistration, () => true)
  .reset(dropSkip)
