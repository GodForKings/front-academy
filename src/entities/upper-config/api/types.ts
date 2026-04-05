/** Тип с общими данными из cfg */
export interface PublicAppConfig {
  rates: {
    usdToBalance: number
    rubToUsdt: number
  }
  dailyBonus: {
    balance: number
  }
}
