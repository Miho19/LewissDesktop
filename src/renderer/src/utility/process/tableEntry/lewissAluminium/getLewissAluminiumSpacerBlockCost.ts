import {
  isLewissAluminiumPricingSchedule,
  LewissAluminiumPricingSchedule
} from '@shared/types/pricing/lewissAluminium.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export function getLewissAluminiumSpacerBlockCost(
  spacerBlock: 'Yes' | 'No',
  pricingSchedule: PricingSchedule
) {
  if (!isLewissAluminiumPricingSchedule(pricingSchedule)) return undefined
  if (!isInputValid(spacerBlock)) return undefined

  const cost = getSpacerBlockCost(pricingSchedule)
  if (typeof cost === 'undefined') return undefined

  return spacerBlock === 'Yes' ? cost : 0
}

function isInputValid(spacerBlock: string) {
  if (typeof spacerBlock !== 'string') return false
  if (spacerBlock.trim().length === 0) return false

  return true
}

function getSpacerBlockCost(pricingSchedule: LewissAluminiumPricingSchedule) {
  const { spacerBlock } = pricingSchedule

  if (typeof spacerBlock === 'undefined') return undefined

  return spacerBlock.cost
}
