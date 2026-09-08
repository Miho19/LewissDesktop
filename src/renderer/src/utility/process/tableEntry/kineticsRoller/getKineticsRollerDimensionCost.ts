import { getHeightIndex } from '@renderer/utility/process/tableEntry/shared/getHeightIndex'
import { getWidthIndex } from '@renderer/utility/process/tableEntry/shared/getWidthIndex'
import { isKineticsRollerPricingSchedule } from '@shared/types/pricing/kineticsRoller.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { Fabric } from '@shared/types/Project.types'

export function getKineticsRollerDimensionCost(
  width: number,
  height: number,
  fabric: Fabric,
  pricingSchedule: PricingSchedule
) {
  if (!isKineticsRollerPricingSchedule(pricingSchedule)) return undefined

  if (width <= 0 || height <= 0) return undefined

  const widthIndex = getWidthIndex(width, pricingSchedule)
  if (typeof widthIndex === 'undefined') return undefined

  const heightIndex = getHeightIndex(height, pricingSchedule)
  if (typeof heightIndex === 'undefined') return undefined

  const { data } = pricingSchedule.dimension

  const dimensionCost = data[heightIndex][widthIndex]
  if (dimensionCost === 0 || typeof dimensionCost === 'undefined') return undefined

  const multiplier = getMultiplier(fabric)

  return dimensionCost * multiplier
}

function getMultiplier(fabric: Fabric) {
  return fabric.multiplier
}
