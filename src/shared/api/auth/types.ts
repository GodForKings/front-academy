export type CreateTokenDto = {
  initDataRaw: string
  ip: string
}

export type CreateTokenResponse = {
  accessToken: string
  refreshToken: string
}

export type RefreshTokenDto = {
  refreshToken: string
}

export type RefreshTokenResponse = {
  accessToken: string
  refreshToken: string
}
