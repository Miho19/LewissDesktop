import { getSantaFeAccessoryCost } from '@/utility/process/tableEntry/santaFeShutter'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { isSantaFeShutterPricingSchedule } from '@shared/types/pricing/santaFeShutter.types'

export function getSantaFeShutterFlushBoltCost(
  flushBolt: boolean,
  pricingSchedule: PricingSchedule
) {
  if (!isSantaFeShutterPricingSchedule(pricingSchedule)) return undefined
  if (typeof flushBolt !== 'boolean') return undefined

  if (!flushBolt) return 0

  const flushBoltCost = getSantaFeAccessoryCost('flushBolt', pricingSchedule)
  if (typeof flushBoltCost === 'undefined') return undefined

  return flushBoltCost.cost
}
