import { KineticsRollerPricingSchedule } from '@shared/types/pricing/kineticsRoller.types'
import { KineticsCellularPricingSchedule } from './kineticsCellular.types'
import { KineticsAccessorySchedule } from '@shared/types/pricing/kineticsAccessories.types'

export type PricingSchedule = KineticsCellularPricingSchedule | KineticsRollerPricingSchedule

export type AccessorySchedule = KineticsAccessorySchedule
