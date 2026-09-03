import { KineticsRollerPricingSchedule } from 'shared/types/pricing/kineticsRoller.types'
import { KineticsCellularPricingSchedule } from './kineticsCellular.types'

export type PricingSchedule = KineticsCellularPricingSchedule | KineticsRollerPricingSchedule
