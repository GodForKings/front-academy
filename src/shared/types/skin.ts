/** Редкости скинов */
export type SkinRarityName =
  | 'Consumer Grade'
  | 'Industrial Grade'
  | 'Mil-Spec'
  | 'Restricted'
  | 'Classified'
  | 'Covert'
  | 'Exceedingly Rare'

export type RarityFilter = 'all' | SkinRarityName

export type SkinRarity = {
  name: string
  color: string
}

export type Skin = {
  id: string
  itemName: string
  skinName: string
  price: string
  photo: string
  rarity: SkinRarity
}
