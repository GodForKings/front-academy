/** Для ответа на `может или нет получить бонус` */
export interface DailyBonusCheck {
  available: boolean
  nextAvailableAt?: number
}
/** Для ответа на `POST - получить` */
export interface DailyBonusClaimResponse {
  added: number // количество очков награды
}
