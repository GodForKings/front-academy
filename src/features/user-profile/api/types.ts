/** Ответ на POST - продажи */
export interface SellSkinResponse {
  success: boolean
}

/** Ответ на POST - Вывода */
export interface WithdrawSkinResponse {
  success: boolean
  message: string
  isAutomatic: boolean
}
