import { BlindCount } from '@shared/types/WindowDisplay.types'

export function getBlindCountDisplay(blindCount: string | number): BlindCount | undefined {
  if (typeof blindCount === 'string') {
    if (!(blindCount as string).includes('dual')) {
      return undefined
    } else {
      return 'dual'
    }
  }

  if (blindCount === 1) return 'single'
  if (blindCount === 2) return 'butting'
  return undefined
}
