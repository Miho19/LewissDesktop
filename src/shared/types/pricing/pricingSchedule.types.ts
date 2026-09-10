import { KineticsRollerPricingSchedule } from '@shared/types/pricing/kineticsRoller.types'
import { KineticsCellularPricingSchedule } from './kineticsCellular.types'
import { KineticsAccessorySchedule } from '@shared/types/pricing/kineticsAccessories.types'
import { SantaFeShutterPricingSchedule } from '@shared/types/pricing/santaFeShutter.types'
import { SantaFeAccessories } from '@shared/types/pricing/santaFeAccessories.types'
import { KineticsMikronwoodPricingSchedule } from '@shared/types/pricing/kineticsMikronwood.types'

export type PricingSchedule =
  | KineticsCellularPricingSchedule
  | KineticsRollerPricingSchedule
  | SantaFeShutterPricingSchedule
  | KineticsMikronwoodPricingSchedule

export type AccessorySchedule = KineticsAccessorySchedule | SantaFeAccessories
