import { LewissVenetianBlindOptions } from '@shared/types/blind/venetian.types'
import { AccessorySchedule } from '@shared/types/pricing/pricingSchedule.types'

export type LewissAccessorySchedule = {
  blindType: string[]
  spacerBlock: Base
  valance: Base
  cutOut: Base
  keyStone: Base
  twoOnOne: Base
  palladianShelf: PalladianShelf
  phoenixwoodColourCost: PhoenixwoodColourCost
}

type Base = {
  id: string
  name: string
  cost: number
}

type PalladianShelf = Base & {
  colour: Base[]
}

type PhoenixwoodColourCost = {
  count: Base[]
  colour: Base[]
}

export function isLewissAccessorySchedule(
  pricingSchedule: AccessorySchedule
): pricingSchedule is LewissAccessorySchedule {
  if (typeof pricingSchedule === 'undefined') return false
  if (!('blindType' in pricingSchedule)) return false

  const { blindType } = pricingSchedule

  if (blindType.length === 0) return false

  const optionSet = new Set<string>(LewissVenetianBlindOptions)

  const hasEvery = blindType.every((b) => optionSet.has(b))
  if (!hasEvery) return false

  if (!('spacerBlock' in pricingSchedule)) return false

  return true
}
