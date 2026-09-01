export function capitalise(str: string) {
  if (typeof str !== 'string') return ''
  if (!str) return ''
  const strTrimmed = str.trim()
  if (strTrimmed.length === 0) return ''

  const strArray = strTrimmed.split('')
  if (strArray.length === 0) return ''

  const wordsCapitalised = strArray.map((s) => s.charAt(0).toUpperCase() + s.slice(1))

  return wordsCapitalised.join(' ')
}
