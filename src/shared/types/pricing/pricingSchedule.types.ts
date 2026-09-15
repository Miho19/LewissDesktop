import { KineticsRollerPricingSchedule } from '@shared/types/pricing/kineticsRoller.types'
import { KineticsCellularPricingSchedule } from './kineticsCellular.types'
import { KineticsAccessorySchedule } from '@shared/types/pricing/kineticsAccessories.types'
import { SantaFeShutterPricingSchedule } from '@shared/types/pricing/santaFeShutter.types'
import { KineticsMikronwoodPricingSchedule } from '@shared/types/pricing/kineticsMikronwood.types'
import { LewissAluminiumPricingSchedule } from '@shared/types/pricing/lewissAluminium.types'
import { LewissAccessorySchedule } from '@shared/types/pricing/venetianAccessories.types'

export type PricingSchedule =
  | KineticsCellularPricingSchedule
  | KineticsRollerPricingSchedule
  | SantaFeShutterPricingSchedule
  | KineticsMikronwoodPricingSchedule
  | LewissAluminiumPricingSchedule

export type AccessorySchedule = KineticsAccessorySchedule | LewissAccessorySchedule
