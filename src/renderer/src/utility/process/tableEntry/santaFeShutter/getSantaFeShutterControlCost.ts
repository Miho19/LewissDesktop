import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import {
  isSantaFeShutterPricingSchedule,
  SantaFeShutterPricingSchedule
} from '@shared/types/pricing/santaFeShutter.types'

export function getSantaFeShutterControlCost(control: string, pricingSchedule: PricingSchedule) {
  if (!isSantaFeShutterPricingSchedule(pricingSchedule)) return undefined
  if (isEmpty(control)) return 0 // an empty value is valid for this control
  if (!isMotorised(control)) return undefined
  const cost = getMotorCost(pricingSchedule)
  return cost
}

// magic value setup for zod later
function isMotorised(control: string) {
  return control.includes('Lithium Smart Motor')
}

function isEmpty(control: string) {
  if (!control) return true
  if (control.trim().length === 0) return true

  return false
}

function getMotorCost(pricingSchedule: SantaFeShutterPricingSchedule) {
  const { control } = pricingSchedule
  const found = control.find((c) => c.name === 'Lithium Smart Motor')
  if (typeof found === 'undefined') return undefined
  return found.cost
}
