import { isKineticsCellularPricingSchedule } from '@shared/types/pricing/kineticsCellular.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export function getKineticsCellularHeadrailCost(
  headrailColour: string,
  pricingSchedule: PricingSchedule
) {
  if (!isKineticsCellularPricingSchedule(pricingSchedule)) return undefined
  if (!isHeadrailColourValid(headrailColour)) return undefined

  const { headRailCustomColourSurcharge } = pricingSchedule

  if (isCustom(headrailColour)) return headRailCustomColourSurcharge

  return 0
}

function isHeadrailColourValid(headrailColour: string) {
  if (!headrailColour) return false
  if (headrailColour.trim().length === 0) return false

  return true
}

function isCustom(headrailColour: string) {
  return headrailColour.localeCompare('custom', undefined, { sensitivity: 'base' }) === 0
}
