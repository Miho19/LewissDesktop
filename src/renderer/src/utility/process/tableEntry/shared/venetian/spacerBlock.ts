import { AccessorySchedule } from '@shared/types/pricing/pricingSchedule.types'
import {
  isLewissAccessorySchedule,
  LewissAccessorySchedule
} from '@shared/types/pricing/venetianAccessories.types'
import { VenetianSpec } from '@shared/types/spec/venetian.types'

// could very well make this a union type etc within venetian accessory schedule
const options = ['yes', 'no'] as const

export function getLewissSpacerBlock(spec: VenetianSpec) {
  return spec.spacerBlock ? 'Yes' : 'No'
}

export function getLewissVenetianSpacerBlockCost(
  spacerBlock: 'Yes' | 'No',
  pricingSchedule: AccessorySchedule
) {
  if (!isLewissAccessorySchedule(pricingSchedule)) return undefined

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

  if (!(options as readonly string[]).includes(spacerBlockAdjusted)) return false

  return true
}

function getSpacerBlockAdjusted(spacerBlock: string) {
  return spacerBlock.trim().toLocaleLowerCase()
}

function getSpacerBlockCost(pricingSchedule: LewissAccessorySchedule) {
  const { spacerBlock } = pricingSchedule

  if (typeof spacerBlock === 'undefined') return undefined

  return spacerBlock.cost
}
