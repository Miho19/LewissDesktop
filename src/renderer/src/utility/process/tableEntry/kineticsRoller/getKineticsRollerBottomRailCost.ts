import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import {
  isKineticsRollerPricingSchedule,
  KineticsRollerPricingSchedule
} from '@shared/types/pricing/kineticsRoller.types'
import { roundMeasurementUp } from '@renderer/utility/process/tableEntry/shared/roundMeasurementUp'

export function getKineticsRollerBottomRailCost(
  width: number,
  bottomRailType: string,
  bottomRailColour: string,
  pricingSchedule: PricingSchedule
) {
  if (!isKineticsRollerPricingSchedule(pricingSchedule)) return undefined
  if (!isWidthValid(width)) return undefined
  if (!isBottomRailTypeValid(bottomRailType) || !isBottomRailColourValid(bottomRailColour))
    return undefined

  const baseCost = getBottomRailTypeCost(width, bottomRailType, pricingSchedule)
  if (typeof baseCost === 'undefined') return undefined

  const colourCost = getColourCost(bottomRailColour, pricingSchedule)

  return baseCost + colourCost
}

function isWidthValid(width: number) {
  if (!width) return false
  if (width <= 0 || width >= 5000) return false
  return true
}

function isBottomRailTypeValid(bottomRailType: string) {
  if (!bottomRailType) return false
  if (bottomRailType.trim().length === 0) return false

  return true
}

function isBottomRailColourValid(bottomRailColour: string) {
  if (!bottomRailColour) return false
  if (bottomRailColour.trim().length === 0) return false

  return true
}

function getBottomRailTypeCost(
  width: number,
  bottomRailType: string,
  pricingSchedule: KineticsRollerPricingSchedule
) {
  const bottomRailTypeOptions = pricingSchedule.bottomRail.cost

  const found = bottomRailTypeOptions.find(
    (b) => b.name.localeCompare(bottomRailType, undefined, { sensitivity: 'base' }) === 0
  )
  if (typeof found === 'undefined') return undefined

  const widthAdjusted = roundMeasurementUp(width)

  return found.cost * (widthAdjusted / 1000)
}

function getColourCost(bottomRailColour: string, pricingSchedule: KineticsRollerPricingSchedule) {
  if (!bottomRailColour.trim().toLocaleLowerCase().includes('custom')) return 0

  return pricingSchedule.bottomRail.customColour.cost
}
