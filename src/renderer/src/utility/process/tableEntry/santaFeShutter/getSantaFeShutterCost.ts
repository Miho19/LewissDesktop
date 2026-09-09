import { retrievePricingScheduleAsync } from '@renderer/utility/process/pricingSchedule/retrievePricingSchedule'
import { Blind } from '@shared/types/blind/blind.types'
import { isSantaFeShutterPricingSchedule } from '@shared/types/pricing/santaFeShutter.types'
import { getSantaFeShutterDimensionCost } from '@renderer/utility/process/tableEntry/santaFeShutter/getSantaFeShutterDimensionCost'

export async function getSantaFeShutterCostAsync(blindType: Blind, width: number, height: number) {
  const pricingSchedule = await retrievePricingScheduleAsync(blindType)
  if (!isSantaFeShutterPricingSchedule(pricingSchedule)) return undefined

  const dimensionCost = getSantaFeShutterDimensionCost(blindType, width, height, pricingSchedule)
  if (typeof dimensionCost === 'undefined') return undefined

  return 0
}
