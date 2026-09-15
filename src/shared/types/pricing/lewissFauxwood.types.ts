import { VenetianBlindOptions } from '@shared/types/blind/venetian.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export type LewissFauxwoodPricingSchedule = {
  blindType: string[]
  dimension: Dimension
  control: Control
  fascia: Base
}

type Control = {
  fauxwood50: Base[]
  fauxwood63: Base[]
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

export function isLewissFauxwoodPricingSchedule(
  pricingSchedule: PricingSchedule
): pricingSchedule is LewissFauxwoodPricingSchedule {
  if (typeof pricingSchedule === 'undefined') return false
  if (!('blindType' in pricingSchedule)) return false
  if (!('control' in pricingSchedule)) return false

  const { blindType, control } = pricingSchedule

  const venetianOptionSet = new Set<string>(VenetianBlindOptions)

  const everyOptionInSet = blindType.every((b) => venetianOptionSet.has(b))
  if (!everyOptionInSet) return false

  if (!('fauxwood50' in control)) return false
  if (!('fauxwood63' in control)) return false

  // can do deeper here but not needed currently

  if (!('fascia' in pricingSchedule)) return false

  return true
}
