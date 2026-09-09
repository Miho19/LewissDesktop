import { Blind } from '@shared/types/blind/blind.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { isSantaFeShutterPricingSchedule } from '@shared/types/pricing/santaFeShutter.types'

export function getSantaFeShutterDimensionCost(
  blindType: Blind,
  width: number,
  height: number,
  pricingSchedule: PricingSchedule
) {
  if (!isSantaFeShutterPricingSchedule(pricingSchedule)) return undefined

  return 999
}

// magic number 5000
function isInputValid(width: number, height: number) {
  if (!width || !height) return false
  if (width <= 0 || width >= 5000) return false
  if (height <= 0 || height >= 5000) return false

  return true
}
