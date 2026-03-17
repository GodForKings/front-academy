import type { SkinRarityName } from '@/shared/types'

/** Редкости скинов массив для CHIP-ов */
export const RARITIES: SkinRarityName[] = [
  'Exceedingly Rare',
  'Covert',
  'Classified',
  'Restricted',
  'Mil-Spec',
  'Industrial Grade',
  'Consumer Grade',
]

/** Объект для фильтрации */
export const RARITY_LABELS: Record<SkinRarityName, string> = {
  'Exceedingly Rare': 'Rare',
  Covert: 'Covert',
  Classified: 'Classified',
  Restricted: 'Restricted',
  'Mil-Spec': 'Mil-Spec',
  'Industrial Grade': 'Industrial',
  'Consumer Grade': 'Consumer',
}
