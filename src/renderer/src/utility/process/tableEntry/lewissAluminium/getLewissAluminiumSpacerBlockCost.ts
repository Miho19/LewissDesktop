import {
  isLewissAluminiumPricingSchedule,
  LewissAluminiumPricingSchedule
} from '@shared/types/pricing/lewissAluminium.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

const spacerBlockOptions = ['yes', 'no']

export function getLewissAluminiumSpacerBlockCost(
  spacerBlock: 'Yes' | 'No',
  pricingSchedule: PricingSchedule
) {
  if (!isLewissAluminiumPricingSchedule(pricingSchedule)) return undefined
  if (!isInputValid(spacerBlock)) return undefined

  const cost = getSpacerBlockCost(pricingSchedule)
  if (typeof cost === 'undefined') return undefined

  const spacerBlockAdjusted = getSpacerBlockAdjusted(spacerBlock)

  return spacerBlockAdjusted === 'yes' ? cost : 0
}

function isInputValid(spacerBlock: string) {
  if (typeof spacerBlock !== 'string') return false

  const spacerBlockAdjusted = getSpacerBlockAdjusted(spacerBlock)
  if (spacerBlockAdjusted.length === 0) return false

  if (!spacerBlockOptions.includes(spacerBlockAdjusted)) return false

  return true
}

function getSpacerBlockCost(pricingSchedule: LewissAluminiumPricingSchedule) {
  const { spacerBlock } = pricingSchedule

  if (typeof spacerBlock === 'undefined') return undefined

  return spacerBlock.cost
}

function getSpacerBlockAdjusted(spacerBlock: string) {
  return spacerBlock.trim().toLocaleLowerCase()
}
