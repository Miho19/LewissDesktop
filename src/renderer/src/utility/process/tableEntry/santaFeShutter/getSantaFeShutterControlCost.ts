import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { isSantaFeShutterPricingSchedule } from '@shared/types/pricing/santaFeShutter.types'

export function getSantaFeShutterControlCost(control: string, pricingSchedule: PricingSchedule) {
  if (!isSantaFeShutterPricingSchedule(pricingSchedule)) return undefined
  return 999
}

function isMotorised(control: string) {}
