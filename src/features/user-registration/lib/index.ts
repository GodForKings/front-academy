/* Формат времени 00:30 */
export const formatMMSS = (s: number) => {
  const mm = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

const OTP_LENGTH = 4
/* Helpers */
export const normalizeEmail = (email: string) => email.trim()
export const normalizeCode = (code: string) => code.replace(/\D/g, '').slice(0, OTP_LENGTH)
export const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email)
