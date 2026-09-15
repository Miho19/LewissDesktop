import { getHeightIndex } from '@/utility/process/tableEntry/shared/getHeightIndex'
import { getWidthIndex } from '@/utility/process/tableEntry/shared/getWidthIndex'
import { getToNearest } from '@/utility/process/tableEntry/shared/roundMeasurementUp'
import {
  lewissVenetianIsInputValid,
  lewissVenetianIsBlindTypeValid,
  getLewissVenetianControlMultiplier
} from '@/utility/process/tableEntry/shared/venetian'
import { Blind } from '@shared/types/blind/blind.types'
import { isLewissFauxwoodPricingSchedule } from '@shared/types/pricing/lewissFauxwood.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export function getLewissFauxwoodDimensionCost(
  blindType: Blind,
  width: number,
  height: number,
  fabricMultiplier: number,
  control: string,
  pricingSchedule: PricingSchedule
) {
  if (!isLewissFauxwoodPricingSchedule(pricingSchedule)) return undefined

  if (!lewissVenetianIsInputValid(width, height, fabricMultiplier, control)) return undefined
  if (!lewissVenetianIsBlindTypeValid(blindType)) return undefined

  // this code block is repeated for every dimension cost...
  const nearestTo = getToNearest(blindType)
  const widthIndex = getWidthIndex(width, nearestTo, pricingSchedule)
  const heightIndex = getHeightIndex(height, nearestTo, pricingSchedule)
  if (typeof widthIndex === 'undefined' || typeof heightIndex === 'undefined') return undefined

  const dimensionCost = pricingSchedule.dimension.data[heightIndex][widthIndex]
  if (typeof dimensionCost === 'undefined') return undefined

  const controlMultiplier = getLewissVenetianControlMultiplier(blindType, control, pricingSchedule)
  if (typeof controlMultiplier === 'undefined') return undefined

  return dimensionCost * controlMultiplier * fabricMultiplier
}
