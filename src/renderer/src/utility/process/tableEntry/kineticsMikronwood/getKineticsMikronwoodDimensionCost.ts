import { getHeightIndex } from '@/utility/process/tableEntry/shared/getHeightIndex'
import { getWidthIndex } from '@/utility/process/tableEntry/shared/getWidthIndex'
import { getToNearest } from '@/utility/process/tableEntry/shared/roundMeasurementUp'
import { isKineticsMikronwoodPricingSchedule } from '@shared/types/pricing/kineticsMikronwood.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export function getKineticsMikronwoodDimensionCost(
  width: number,
  height: number,
  pricingSchedule: PricingSchedule
) {
  if (!isKineticsMikronwoodPricingSchedule(pricingSchedule)) return undefined
  if (!isInputValid(width, height)) return undefined

  const toNearest = getToNearest('Kinetics Mikronwood 50mm Venetian')
  const widthIndex = getWidthIndex(width, toNearest, pricingSchedule)
  if (typeof widthIndex === 'undefined') return undefined

  const heightIndex = getHeightIndex(height, toNearest, pricingSchedule)
  if (typeof heightIndex === 'undefined') return undefined

  const cost = pricingSchedule.dimension.data[heightIndex][widthIndex]

  return cost
}

// magic number 5000

function isInputValid(width: number, height: number) {
  if (!width) return false
  if (typeof width !== 'number') return false
  if (width <= 0 || width >= 5000) return false

  if (!height) return false
  if (typeof height !== 'number') return false
  if (height <= 0 || height >= 5000) return false

  return true
}
