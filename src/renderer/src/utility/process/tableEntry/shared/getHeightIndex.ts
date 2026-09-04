import { roundMeasurementUp } from '@renderer/utility/process/tableEntry/shared/roundMeasurementUp'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export function getHeightIndex(height: number, pricingSchedule: PricingSchedule) {
  let heightAdjusted = roundMeasurementUp(height)
  const { heightHeader } = pricingSchedule.dimension

  const minHeight = heightHeader.at(0)
  if (typeof minHeight === 'undefined') return undefined

  if (heightAdjusted < minHeight) heightAdjusted = minHeight

  const maxHeight = heightHeader.at(-1)
  if (typeof maxHeight === 'undefined') return undefined
  if (heightAdjusted > maxHeight && height !== maxHeight) return undefined

  const index = heightHeader.findIndex((h) => h === heightAdjusted || h === height)
  if (index === -1) return undefined

  return index
}
