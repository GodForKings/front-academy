import { Skin } from '@/shared/types'

export type CaseDetails = {
  id: string
  name: string
  price: number
  photo: string
  skins: Skin[]
}
export type OpenCaseResponse = {
  skin: Skin
}
