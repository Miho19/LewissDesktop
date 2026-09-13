import { getHeightIndex } from '@/utility/process/tableEntry/shared/getHeightIndex'
import { getWidthIndex } from '@/utility/process/tableEntry/shared/getWidthIndex'
import { getToNearest } from '@/utility/process/tableEntry/shared/roundMeasurementUp'
import { Blind } from '@shared/types/blind/blind.types'
import { VenetianBlindOptions } from '@shared/types/blind/venetian.types'
import {
  isLewissAluminiumPricingSchedule,
  LewissAluminiumPricingSchedule
} from '@shared/types/pricing/lewissAluminium.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export function getLewissAluminiumDimensionCost(
  blindType: Blind,
  width: number,
  height: number,
  fabricMultiplier: number,
  control: string,
  pricingSchedule: PricingSchedule
) {
  if (!isLewissAluminiumPricingSchedule(pricingSchedule)) return undefined
  if (!isInputValid(width, height, fabricMultiplier, control)) return undefined
  if (!isBlindTypeValid(blindType)) return undefined

  const nearestTo = getToNearest(blindType)
  const widthIndex = getWidthIndex(width, nearestTo, pricingSchedule)
  const heightIndex = getHeightIndex(height, nearestTo, pricingSchedule)
  if (typeof widthIndex === 'undefined' || typeof heightIndex === 'undefined') return undefined

  const dimensionCost = pricingSchedule.dimension.data[heightIndex][widthIndex]
  if (typeof dimensionCost === 'undefined') return undefined

  const controlMultiplier = getControlMultiplier(blindType, control, pricingSchedule)
  if (typeof controlMultiplier === 'undefined') return undefined

  return dimensionCost * controlMultiplier * fabricMultiplier
}

// magic number 5000 and 10
function isInputValid(width: number, height: number, fabricMultiplier: number, control: string) {
  if (typeof width !== 'number') return false
  if (width <= 0 || width >= 5000) return false

  if (typeof height !== 'number') return false
  if (height <= 0 || height >= 5000) return false

  if (typeof fabricMultiplier !== 'number') return false
  if (fabricMultiplier <= 0 || fabricMultiplier >= 10) return false

  if (typeof control !== 'string') return false
  if (control.trim().length === 0) return false

  return true
}

function isBlindTypeValid(blindType: Blind) {
  if (typeof blindType !== 'string') return false

  const optionSet = new Set<string>(VenetianBlindOptions)

  return optionSet.has(blindType)
}

function getControlMultiplier(
  blindType: Blind,
  control: string,
  pricingSchedule: LewissAluminiumPricingSchedule
) {
  const controlArray = getControlArray(blindType, pricingSchedule)
  if (typeof controlArray === 'undefined') return undefined

  const controlAdjusted = control.trim()

  const found = controlArray.find(
    (c) => c.id.localeCompare(controlAdjusted, undefined, { sensitivity: 'base' }) === 0
  )

  if (typeof found === 'undefined') return undefined

  return found.cost
}

function getSlatSize(blindType: Blind) {
  if (blindType.includes('25mm')) return '25'
  if (blindType.includes('50mm')) return '50'

  return undefined
}

function getControlArray(blindType: Blind, pricingSchedule: LewissAluminiumPricingSchedule) {
  const slatSize = getSlatSize(blindType)
  if (typeof slatSize === 'undefined') return undefined
  const slatName = `aluminium${slatSize}`

  const { control } = pricingSchedule
  const controlArray = control[slatName as keyof typeof pricingSchedule.control]

  return controlArray
}
