import {
  isKineticsCellularPricingSchedule,
  KineticsCellularPricingSchedule
} from '@shared/types/pricing/kineticsCellular.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { getHeightIndex } from '@renderer/utility/process/tableEntry/shared/getHeightIndex'
import { getWidthIndex } from '@renderer/utility/process/tableEntry/shared/getWidthIndex'
import { getFabricOpacity } from '@renderer/utility/process/tableEntry/kineticsCellular/getKineticsCellularTableEntryList'

export function getKineticsCellularDimensionCost(
  width: number,
  height: number,
  fabricName: string,
  pricingSchedule: PricingSchedule
) {
  if (!isKineticsCellularPricingSchedule(pricingSchedule)) return undefined

  if (width <= 0 || height <= 0) return undefined

  const widthIndex = getWidthIndex(width, pricingSchedule)
  if (typeof widthIndex === 'undefined') return undefined

  const heightIndex = getHeightIndex(height, pricingSchedule)
  if (typeof heightIndex === 'undefined') return undefined

  const { data } = pricingSchedule.dimension

  const dimensionCost = data[heightIndex][widthIndex]
  if (dimensionCost === 0 || typeof dimensionCost === 'undefined') return undefined

  const multiplier = getMultiplier(fabricName, pricingSchedule)
  if (typeof multiplier === 'undefined') return undefined

  return dimensionCost * multiplier
}

function getMultiplier(fabricName: string, pricingSchedule: KineticsCellularPricingSchedule) {
  const opacity = getFabricOpacity(fabricName)
  if (typeof opacity === 'undefined') return undefined

  if (opacity.localeCompare('translucent', undefined, { sensitivity: 'base' }) === 0) return 1

  return pricingSchedule.blockoutMultiplier
}
