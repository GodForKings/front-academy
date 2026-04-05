import type { Role } from '@/shared/types'

export interface UserSteam {
  steamId: string
  nickname: string | null
  avatar: string | null
  tradeToken: string | null
}

export interface UserFaceit {
  faceitId: string
  nickname: string | null
  avatar: string | null
  email: string | null
}

export interface UserTwitch {
  twitchId: string
  login: string | null
  displayName: string | null
  avatar: string | null
  email: string | null
}

export interface User {
  tgId: string
  username: string
  firstName: string
  lastName: string
  langCode: string
  photoUrl: string | null
  phone: string | null
  email: string | null
  role: Role
  experience: number
  level: number
  levelProgress: number
  balance: number
  steam: UserSteam | null
  faceit: UserFaceit | null
  twitch: UserTwitch | null
  isVerified: boolean
  isActive: boolean
  isBanned: boolean
}

export type UserDto = {
  firstName?: string
  lastName?: string
  photoUrl?: string
  phone?: string
  email?: string
  roleId?: string
  gameRoleId?: string
  faceit?: string
  steamId?: string
  twitch?: string
}
