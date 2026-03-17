/** Тип с общими данными из cfg */
export interface PublicAppConfig {
  rates: {
    usdtToBalance: number
    rubToUsdt: number
  }
  dailyBonus: {
    balance: number
  }
}
