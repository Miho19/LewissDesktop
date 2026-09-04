import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

import { KineticsCellularBlindOptions } from '@shared/types/blind/kinetics.types'

export type KineticsCellularPricingSchedule = {
  blindType: string[]
  blockoutMultiplier: number
  sideChannelCustomColourSurcharge: number
  sideChannelCostPerMetreHeight: number
  headRailCustomColourSurcharge: number
  control: Control
  dimension: Dimension
}

type Dimension = {
  heightHeader: number[]
  widthHeader: number[]
  data: number[][]
}

type Base = {
  id: string
  cost: number
  name: string
}

type Control = {
  cord: Base
  'Lithium-ion': Base
}

export function isKineticsCellularPricingSchedule(
  pricingSchedule: PricingSchedule
): pricingSchedule is KineticsCellularPricingSchedule {
  if (typeof pricingSchedule === 'undefined') return false

  if (typeof pricingSchedule.blindType === 'undefined') return false
  const { blindType } = pricingSchedule
  if (!Array.isArray(blindType)) return false
  if (blindType.length === 0) return false
  if (typeof blindType[0] !== 'string') return false

  const blindTypeIncluded = pricingSchedule.blindType.every((b) =>
    (KineticsCellularBlindOptions as readonly string[]).includes(b)
  )

  return blindTypeIncluded
}
