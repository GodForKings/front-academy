import type { RegistrationStep } from './types'

const REGISTRATION_ROOT = '/registration' as const

/** Генерация пути для регистрации */
const registrationFlow = (step: RegistrationStep) => `${REGISTRATION_ROOT}/${step}`

/** Конфиг страниц для `App`*/
export const PAGES = {
  GAMES: '/',
  WORK_SHOP: '/workshop',
  TASKS: '/tasks',
  RATING: '/rating',
  TOURNAMENTS: '/tournaments',
  SERVICES: '/services',
  PROFILE: '/profile',

  REGISTRATION: REGISTRATION_ROOT,
  REGISTRATION_EMAIL: registrationFlow('email'),
  REGISTRATION_PHONE: registrationFlow('phone'),
  REGISTRATION_CHOICE_ROLE: registrationFlow('choice-role'),
  REGISTRATION_LINK_PLATFORM: registrationFlow('link-platforms'),
  SOLO_CASE: (id: string | number) => `/cases/${id}`,
} as const
