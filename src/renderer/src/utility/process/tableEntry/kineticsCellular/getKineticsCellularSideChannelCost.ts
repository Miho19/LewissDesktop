import {
  isKineticsCellularPricingSchedule,
  KineticsCellularPricingSchedule
} from '@shared/types/pricing/kineticsCellular.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { sideChannelColourOptions } from '@shared/types/spec/kineticsCellular.types'
import { roundMeasurementUp } from '@renderer/utility/process/tableEntry/shared/roundMeasurementUp'

export function getKineticsCellularSideChannelCost(
  height: number,
  sideChannelColour: string,
  pricingSchedule: PricingSchedule
) {
  if (!isKineticsCellularPricingSchedule(pricingSchedule)) return undefined
  if (!isHeightValid(height)) return undefined
  if (!isSideChannelColourValid(sideChannelColour)) return undefined
  if (!isSideChannelColourOptionValid(sideChannelColour)) return undefined
  if (isSideChannelColourNone(sideChannelColour)) return 0

  const colourSurchage = getColourSurcharge(sideChannelColour, pricingSchedule)
  const costPerMetreHeight = getCostPerMetreHeight(height, pricingSchedule)

  return costPerMetreHeight + colourSurchage
}

function isHeightValid(height: number) {
  if (height == null) return false
  if (height <= 0) return false
  return true
}

function isSideChannelColourNone(sideChannelColour: string) {
  return sideChannelColour.localeCompare('none', undefined, { sensitivity: 'base' }) === 0
}

function isSideChannelColourValid(sideChannelColour: string) {
  if (!sideChannelColour) return false
  if (sideChannelColour.trim().length === 0) return false
  return true
}

function isSideChannelColourOptionValid(sideChannelColour: string) {
  const sideChannelColourAdjusted = sideChannelColour.trim()

  const found = sideChannelColourOptions.find(
    (c) => c.localeCompare(sideChannelColourAdjusted, undefined, { sensitivity: 'base' }) === 0
  )

  return typeof found !== 'undefined'
}

function getColourSurcharge(
  sideChannelColour: string,
  pricingSchedule: KineticsCellularPricingSchedule
) {
  if (sideChannelColour.localeCompare('custom', undefined, { sensitivity: 'base' }) !== 0) return 0

  return pricingSchedule.sideChannelCustomColourSurcharge
}

function getCostPerMetreHeight(height: number, pricingSchedule: KineticsCellularPricingSchedule) {
  const heightAdjusted = roundMeasurementUp(height) / 1000
  const perMCost = pricingSchedule.sideChannelCostPerMetreHeight

  return heightAdjusted * perMCost
}
