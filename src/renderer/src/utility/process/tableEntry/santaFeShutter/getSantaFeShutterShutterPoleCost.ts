import { getSantaFeAccessoryCost } from '@/utility/process/tableEntry/santaFeShutter'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { isSantaFeShutterPricingSchedule } from '@shared/types/pricing/santaFeShutter.types'

export function getSantaFeShutterShuttlePoleCost(
  shuttlePole: boolean,
  pricingSchedule: PricingSchedule
) {
  if (!isSantaFeShutterPricingSchedule(pricingSchedule)) return undefined
  if (typeof shuttlePole !== 'boolean') return undefined

  if (!shuttlePole) return 0

  const shuttlePoleCost = getSantaFeAccessoryCost('shuttlePole', pricingSchedule)
  if (typeof shuttlePoleCost === 'undefined') return undefined

  return shuttlePoleCost.cost
}
