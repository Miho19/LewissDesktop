import { isKineticsCellularPricingSchedule } from '@shared/types/pricing/kineticsCellular.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export function getKineticsCellularControlCost(control: string, pricingSchedule: PricingSchedule) {
  if (!isKineticsCellularPricingSchedule(pricingSchedule)) return undefined

  if (!isControlValid(control)) return undefined
  if (isControlCord(control)) return undefined
  if (isControlMotorised(control)) return pricingSchedule.control['Lithium-ion'].cost

  return undefined
}

function isControlValid(control: string) {
  if (!control) return false
  if (control.trim().length === 0) return false
  return true
}

function isControlCord(control: string) {
  const controlAdjusted = control.trim().toLowerCase()
  return controlAdjusted.localeCompare('cord', undefined, { sensitivity: 'base' }) === 0
}

function isControlMotorised(control: string) {
  const controlAdjusted = control.trim().toLowerCase()
  return controlAdjusted.localeCompare('lithium-ion', undefined, { sensitivity: 'base' }) === 0
}
