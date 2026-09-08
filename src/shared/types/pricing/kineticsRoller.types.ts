import { KineticsRollerBlindOptions } from '@shared/types/blind/kinetics.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export type KineticsRollerPricingSchedule = {
  blindType: string[]
  dimension: Dimension
  control: Control
}

type Control = {
  chain: Chain
  'Lithium-ion': Base
  'Hardwired Smart Home': Base
  'Hardwired WiFi Remote Control': Base
}

type Chain = Base & {
  colours: Base[]
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

export function isKineticsRollerPricingSchedule(
  pricingSchedule: PricingSchedule
): pricingSchedule is KineticsRollerPricingSchedule {
  if (typeof pricingSchedule === 'undefined') return false

  if (typeof pricingSchedule.blindType === 'undefined') return false
  const { blindType } = pricingSchedule
  if (!Array.isArray(blindType)) return false
  if (blindType.length === 0) return false
  if (typeof blindType[0] !== 'string') return false

  const blindTypeIncluded = pricingSchedule.blindType.every((b) =>
    (KineticsRollerBlindOptions as readonly string[]).includes(b)
  )

  return blindTypeIncluded
}
