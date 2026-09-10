import { SantaFeShutterBlindOptions } from '@shared/types/blind/santaFe.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export type SantaFeShutterPricingSchedule = {
  blindType: string[]
  dimension: Dimension
  premiumColour: Base[]
  control: Base[]
  woodType: Base[]
  track: Base[]
  accessories: Base[]
}

type Dimension = {
  heightHeader: number[]
  widthHeader: number[]
  data: number[][]
}

type Base = {
  id: string
  name: string
  cost: number
}

export function isSantaFeShutterPricingSchedule(
  pricingSchedule: PricingSchedule
): pricingSchedule is SantaFeShutterPricingSchedule {
  if (typeof pricingSchedule === 'undefined') return false
  if (!('blindType' in pricingSchedule)) return false
  const { blindType } = pricingSchedule
  const optionSet = new Set<string>(SantaFeShutterBlindOptions)

  const hasBlindType = blindType.every((b) => optionSet.has(b))
  if (!hasBlindType) return false

  if (!('dimension' in pricingSchedule)) return false
  if (!('premiumColour' in pricingSchedule)) return false
  if (!('woodType' in pricingSchedule)) return false
  if (!('track' in pricingSchedule)) return false
  if (!('control' in pricingSchedule)) return false
  if (!('accessories' in pricingSchedule)) return false

  return true
}
