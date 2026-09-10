import { KineticsVenetianBlindOptions } from '@shared/types/blind/venetian.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export type KineticsMikronwoodPricingSchedule = {
  blindType: string[]
  buttingMultiplier: Base
  control: Base[]
  fascia: Base[]
  holdDownBracket: Base
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

export function isKineticsMikronwoodPricingSchedule(
  pricingSchedule: PricingSchedule
): pricingSchedule is KineticsMikronwoodPricingSchedule {
  if (typeof pricingSchedule === 'undefined') return false

  if (typeof pricingSchedule.blindType === 'undefined') return false
  const { blindType } = pricingSchedule
  if (!Array.isArray(blindType)) return false
  if (blindType.length === 0) return false
  if (typeof blindType[0] !== 'string') return false

  const blindTypeIncluded = pricingSchedule.blindType.every((b) =>
    (KineticsVenetianBlindOptions as readonly string[]).includes(b)
  )

  return blindTypeIncluded
}
