/**
 * @param n 6450 - число
 * @returns `6450 => 6 450` */
export const formatNumber = (n: number) => {
  const s = String(Math.trunc(n))
  let out = ''
  for (let i = 0; i < s.length; i += 1) {
    const fromEnd = s.length - i
    out += s[i]
    if (fromEnd > 1 && fromEnd % 3 === 1) out += ' '
  }
  return out
}
