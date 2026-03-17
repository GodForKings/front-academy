import { Skin } from '@/shared/types'

export function normalizeToMin(pool: Skin[], minItems: number): Skin[] {
  if (!pool.length) return []
  if (pool.length >= minItems) return pool

  const out: Skin[] = []
  while (out.length < minItems) out.push(...pool)
  return out.slice(0, minItems)
}

export function buildReel(pool: Skin[], winner: Skin, minItems: number) {
  const base = normalizeToMin(pool, minItems)
  const total = Math.max(minItems, 40) + 20

  const reel: Skin[] = Array.from({ length: total }, (_, i) => base[i % base.length])

  const stopIndex = Math.min(total - 8, Math.floor(total * 0.7))
  reel[stopIndex] = winner

  return { reel, stopIndex }
}
