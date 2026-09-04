import { roundMeasurementUp } from '@renderer/utility/process/tableEntry/shared/roundMeasurementUp'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export function getWidthIndex(width: number, pricingSchedule: PricingSchedule) {
  let widthRounded = roundMeasurementUp(width)

  const { widthHeader } = pricingSchedule.dimension

  const minWidth = widthHeader.at(0)
  if (typeof minWidth === 'undefined') return undefined
  if (widthRounded < minWidth) widthRounded = minWidth

  const maxWidth = widthHeader.at(-1)
  if (typeof maxWidth === 'undefined') return undefined
  if (widthRounded > maxWidth && width !== maxWidth) return undefined

  const index = widthHeader.findIndex((w) => w === widthRounded || w === width)
  if (index === -1) return undefined

  return index
}
