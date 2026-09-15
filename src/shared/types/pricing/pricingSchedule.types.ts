import { KineticsRollerPricingSchedule } from '@shared/types/pricing/kineticsRoller.types'
import { KineticsCellularPricingSchedule } from './kineticsCellular.types'
import { KineticsAccessorySchedule } from '@shared/types/pricing/kineticsAccessories.types'
import { SantaFeShutterPricingSchedule } from '@shared/types/pricing/santaFeShutter.types'
import { KineticsMikronwoodPricingSchedule } from '@shared/types/pricing/kineticsMikronwood.types'
import { LewissAluminiumPricingSchedule } from '@shared/types/pricing/lewissAluminium.types'
import { LewissAccessorySchedule } from '@shared/types/pricing/venetianAccessories.types'
import { VenetianBlindOptions } from '@shared/types/blind/venetian.types'

export type LewissVenetianPricingSchedule = LewissAluminiumPricingSchedule

export type PricingSchedule =
  | KineticsCellularPricingSchedule
  | KineticsRollerPricingSchedule
  | SantaFeShutterPricingSchedule
  | KineticsMikronwoodPricingSchedule
  | LewissVenetianPricingSchedule

export type AccessorySchedule = KineticsAccessorySchedule | LewissAccessorySchedule

// this likely belongs in its own file
export function isLewissVenetianPricingSchedule(
  pricingSchedule: PricingSchedule
): pricingSchedule is LewissVenetianPricingSchedule {
  if (typeof pricingSchedule === 'undefined') return false
  if (!('blindType' in pricingSchedule)) return false

  const { blindType } = pricingSchedule

  const optionSet = new Set<string>(VenetianBlindOptions)

  const isEvery = blindType.every((b) => optionSet.has(b))
  if (!isEvery) return false

  return true
}
