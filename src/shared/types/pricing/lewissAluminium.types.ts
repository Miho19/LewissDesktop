import { VenetianBlindOptions } from '@shared/types/blind/venetian.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export type LewissAluminiumPricingSchedule = {
  blindType: string[]
  dimension: Dimension
  control: Control
}

type Control = {
  aluminium25: Base[]
  aluminium50: Base[]
}

type Base = {
  id: string
  name: string
  cost: number
}

type Dimension = {
  heightHeader: number[]
  widthHeader: number[]
  data: number[][]
}

export function isLewissAluminiumPricingSchedule(
  pricingSchedule: PricingSchedule
): pricingSchedule is LewissAluminiumPricingSchedule {
  if (typeof pricingSchedule === 'undefined') return false
  if (!('blindType' in pricingSchedule)) return false
  if (!('control' in pricingSchedule)) return false

  const { blindType, control } = pricingSchedule

  const venetianOptionSet = new Set<string>(VenetianBlindOptions)

  const everyOptionInSet = blindType.every((b) => venetianOptionSet.has(b))
  if (!everyOptionInSet) return false

  if (!('aluminium25' in control)) return false
  if (!('aluminium50' in control)) return false

  // can do deeper here but not needed currently

  return true
}
