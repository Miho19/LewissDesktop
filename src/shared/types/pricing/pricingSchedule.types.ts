import { KineticsRollerPricingSchedule } from '@shared/types/pricing/kineticsRoller.types'
import { KineticsCellularPricingSchedule } from './kineticsCellular.types'
import { KineticsAccessorySchedule } from '@shared/types/pricing/kineticsAccessories.types'
import { SantaFeShutterPricingSchedule } from '@shared/types/pricing/santaFeShutter.types'
import { KineticsMikronwoodPricingSchedule } from '@shared/types/pricing/kineticsMikronwood.types'
import {
  isLewissAluminiumPricingSchedule,
  LewissAluminiumPricingSchedule
} from '@shared/types/pricing/lewissAluminium.types'
import { LewissAccessorySchedule } from '@shared/types/pricing/venetianAccessories.types'
import {
  isLewissPhoenixwoodPricingSchedule,
  LewissPhoenixwoodPricingSchedule
} from '@shared/types/pricing/lewissPhoenixwood.types'
import {
  isLewissFauxwoodPricingSchedule,
  LewissFauxwoodPricingSchedule
} from '@shared/types/pricing/lewissFauxwood.types'

export type LewissVenetianPricingSchedule =
  LewissAluminiumPricingSchedule | LewissFauxwoodPricingSchedule | LewissPhoenixwoodPricingSchedule

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
  if (isLewissAluminiumPricingSchedule(pricingSchedule)) return true
  if (isLewissFauxwoodPricingSchedule(pricingSchedule)) return true
  if (isLewissPhoenixwoodPricingSchedule(pricingSchedule)) return true
  return false
}
