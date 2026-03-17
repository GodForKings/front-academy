import { toastModels } from '@/entities'
import { $user, fetchUser, sendEmailCode, verifyEmailCode } from '@/entities/user'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { isEmailValid, normalizeCode, normalizeEmail } from '../lib'

const RESEND_SECONDS = 30

type Step = 'email' | 'code'

/* Эффекты */
export const sendEmailCodeFx = createEffect(sendEmailCode)
export const verifyEmailCodeFx = createEffect(verifyEmailCode)

/* События */
export const emailChanged = createEvent<string>()
export const clearEmail = createEvent()
export const sendClicked = createEvent()
/* внутреннее событие для инициализации из user */
const emailFromUser = createEvent<string>()

export const backToEmail = createEvent()

export const codeChanged = createEvent<string>()
export const codeCompleted = createEvent<string>()
export const clearCode = createEvent()

export const resendClicked = createEvent()
export const tick = createEvent()

/* Хранилища */
export const $userEmail = $user.map((user) => user?.email ?? '')
export const $step = createStore<Step>('email')
export const $email = createStore('')
  .on(emailFromUser, (_, mail) => normalizeEmail(mail))
  .on(emailChanged, (_, mail) => mail)
  .reset(clearEmail)

export const $code = createStore('')
  .on(codeChanged, (_, v) => v)
  .reset(clearCode)

export const $sendLoading = sendEmailCodeFx.pending
export const $verifyLoading = verifyEmailCodeFx.pending

export const $codeError = createStore(false)
export const $resendLeft = createStore<number>(0)

/* Флаг для автоматического перехода на другую страницу */
export const $needRedirect = createStore(false)

/* Если у user-а есть email => кладем его в default */
sample({
  clock: $userEmail,
  source: $email,
  filter: (email, userEmail) => email.trim() === '' && Boolean(userEmail),
  fn: (_, userEmail) => userEmail,
  target: emailFromUser,
})
/* email => send */
sample({
  clock: sendClicked,
  source: $email,
  fn: (email) => normalizeEmail(email),
  filter: (email) => isEmailValid(email),
  target: sendEmailCodeFx,
})

/* если email невалидный */
sample({
  clock: sendClicked,
  source: $email,
  filter: (email) => !isEmailValid(normalizeEmail(email)),
  fn: () => 'Введите корректный email',
  target: toastModels.events.showError,
})

/* Если всё ок => на шаг с кодом */
sample({
  clock: sendEmailCodeFx.doneData,
  filter: (ok) => Boolean(ok.success),
  target: clearCode,
})

sample({
  clock: sendEmailCodeFx.doneData,
  filter: (ok) => Boolean(ok),
  fn: () => 'code' as Step,
  target: $step,
})

/* send success => сбрасываем ошибку + запускаем таймер ресенда */
sample({
  clock: sendEmailCodeFx.doneData,
  filter: (ok) => Boolean(ok),
  fn: () => false,
  target: $codeError,
})
sample({
  clock: sendEmailCodeFx.doneData,
  filter: (ok) => Boolean(ok),
  fn: () => RESEND_SECONDS,
  target: $resendLeft,
})

/* На шаг с вводом почты */
sample({
  clock: backToEmail,
  fn: () => 'email' as Step,
  target: $step,
})
sample({
  clock: backToEmail,
  fn: () => 0,
  target: $resendLeft,
})
sample({
  clock: backToEmail,
  fn: () => false,
  target: $codeError,
})
sample({
  clock: backToEmail,
  target: clearCode,
})

/* при возврате назад редирект больше не нужен */
sample({
  clock: backToEmail,
  fn: () => false,
  target: $needRedirect,
})

/* на изменения кода => normalize + сброс ошибки */
sample({
  clock: codeChanged,
  fn: (code) => normalizeCode(code),
  target: $code,
})
sample({
  clock: codeChanged,
  fn: () => false,
  target: $codeError,
})

/* когда код заполнен => verify */
sample({
  clock: codeCompleted,
  fn: (code) => normalizeCode(code),
  target: verifyEmailCodeFx,
})

/* verify ok => фетчим юзера + ставим флаг на редирект */
sample({
  clock: verifyEmailCodeFx.doneData,
  filter: (ok) => Boolean(ok),
  target: fetchUser,
})
sample({
  clock: verifyEmailCodeFx.doneData,
  filter: (ok) => Boolean(ok),
  fn: () => true,
  target: $needRedirect,
})

/* verify false => ошибка */
sample({
  clock: verifyEmailCodeFx.doneData,
  filter: (ok) => !ok,
  fn: () => true,
  target: $codeError,
})
sample({
  clock: verifyEmailCodeFx.doneData,
  filter: (ok) => !ok,
  fn: () => 'Код неверный',
  target: toastModels.events.showError,
})

/* resend (только когда таймер закончился) */
sample({
  clock: resendClicked,
  source: { email: $email, left: $resendLeft },
  filter: ({ left }) => left <= 0,
  fn: ({ email }) => normalizeEmail(email),
  target: sendEmailCodeFx,
})

/* тик таймера */
sample({
  clock: tick,
  source: $resendLeft,
  filter: (left) => left > 0,
  fn: (left) => left - 1,
  target: $resendLeft,
})

/* Errors */
sample({
  clock: sendEmailCodeFx.failData,
  fn: () => 'Не удалось отправить код',
  target: toastModels.events.showError,
})
sample({
  clock: verifyEmailCodeFx.failData,
  fn: () => 'Не удалось проверить код',
  target: toastModels.events.showError,
})

/* Все units */
export const emailFlowModels = {
  events: {
    emailChanged,
    clearEmail,
    sendClicked,
    backToEmail,
    codeChanged,
    codeCompleted,
    clearCode,
    resendClicked,
    tick,
  },
  stores: {
    $step,
    $email,
    $code,
    $codeError,
    $resendLeft,
    $sendLoading,
    $verifyLoading,
    $needRedirect,
  },
  effects: {
    sendEmailCodeFx,
    verifyEmailCodeFx,
  },
}
