import { Blind } from '@shared/types/blind/blind.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import {
  isSantaFeShutterPricingSchedule,
  SantaFeShutterPricingSchedule
} from '@shared/types/pricing/santaFeShutter.types'
import { SantaFeShutterBlindOptions } from '@shared/types/blind/santaFe.types'
import { getWidthIndex } from '@renderer/utility/process/tableEntry/shared/getWidthIndex'
import { getHeightIndex } from '@renderer/utility/process/tableEntry/shared/getHeightIndex'
import { getToNearest } from '@renderer/utility/process/tableEntry/shared/roundMeasurementUp'

export function getSantaFeShutterDimensionCost(
  blindType: Blind,
  width: number,
  height: number,
  pricingSchedule: PricingSchedule
) {
  if (!isSantaFeShutterPricingSchedule(pricingSchedule)) return undefined
  if (!isInputValid(blindType, width, height)) return undefined

  const toNearest = getToNearest(blindType)

  const widthIndex = getWidthIndex(width, toNearest, pricingSchedule)
  if (typeof widthIndex === 'undefined') return undefined

  const heightIndex = getHeightIndex(height, toNearest, pricingSchedule)
  if (typeof heightIndex === 'undefined') return undefined

  const cost = pricingSchedule.dimension.data[heightIndex][widthIndex]
  if (typeof cost === 'undefined') return undefined

  const multiplier = getWoodTypeMultiplier(blindType, pricingSchedule)
  if (typeof multiplier === 'undefined') return undefined

  return cost * multiplier
}

// magic number 5000
function isInputValid(blindType: Blind, width: number, height: number) {
  if (!isSantaFeShutter(blindType)) return false
  if (!width || !height) return false
  if (width <= 0 || width >= 5000) return false
  if (height <= 0 || height >= 5000) return false

  return true
}

function isSantaFeShutter(blindType: Blind) {
  const optionSet = new Set<string>(SantaFeShutterBlindOptions)
  if (!optionSet.has(blindType)) return false
  return true
}

function getWoodTypeMultiplier(blindType: Blind, pricingSchedule: SantaFeShutterPricingSchedule) {
  const { woodType } = pricingSchedule
  if (typeof woodType === 'undefined') return undefined

  const found = woodType.find((w) => w.name === blindType)
  if (typeof found === 'undefined') return undefined

  return found.cost
}
