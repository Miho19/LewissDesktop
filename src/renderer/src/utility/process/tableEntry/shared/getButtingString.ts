import { BlindCount } from '@shared/types/WindowDisplay.types'

export function getButtingString(blindCountString: BlindCount, index: number, side: 'LHS' | 'RHS') {
  if (blindCountString !== 'butting') return 'No'

  return `${side} of #${index}`
}
