'use client'

/** Функция копирования строки => буфер
 * @param text строка
 * @returns кладет в буфер обмена строку */
export const copyToClipboard = async (text: string): Promise<string> => {
  if (typeof window === 'undefined') throw new Error('Clipboard is not available')

  if (!text) throw new Error('Nothing to copy')

  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return text
  }

  legacyCopy(text)
  return text
}

const legacyCopy = (text: string) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.top = '-9999px'
  textarea.style.left = '-9999px'

  document.body.appendChild(textarea)
  textarea.select()
  textarea.setSelectionRange(0, textarea.value.length)

  // @ts-ignore - старый метод
  const ok = document.execCommand('copy')

  document.body.removeChild(textarea)
  if (!ok) throw new Error('Copy failed')
}
