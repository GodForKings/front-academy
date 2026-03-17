import { openExternalLink } from '@/shared'

const STEAM_TRADE_LINK_URL =
  'https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url'

export const handleOpenSteamTradeLink = () => openExternalLink(STEAM_TRADE_LINK_URL)

/** Валидация для **SteamTradeLink**
 * @param value строка
 * @returns `true / false` */
export const isValidSteamTradeLink = (value: string): boolean => {
  const link = value.trim()

  return (
    link.startsWith('https://steamcommunity.com/tradeoffer/new/') &&
    link.includes('partner=') &&
    link.includes('token=')
  )
}
