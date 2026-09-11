import {
  isKineticsMikronwoodPricingSchedule,
  KineticsMikronwoodPricingSchedule
} from '@shared/types/pricing/kineticsMikronwood.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { VenetianSpec } from '@shared/types/spec/venetian.types'

export function getKineticsMikronwoodControlCost(
  control: string,
  pricingSchedule: PricingSchedule
) {
  if (!isKineticsMikronwoodPricingSchedule(pricingSchedule)) return undefined
  if (!isInputValid(control)) return undefined
  if (control.trim().length === 0) return 0

  if (isCord(control)) return 0

  if (!isMotorised(control)) return undefined

  const motorisationCost = getMotorisationCost(pricingSchedule)

  return motorisationCost
}

function isInputValid(control: string) {
  if (!control) return false
  if (typeof control !== 'string') return false

  return true
}

function isCord(control: string) {
  return control.localeCompare('cord', undefined, { sensitivity: 'base' }) === 0
}

function isMotorised(control: string) {
  return control.localeCompare('lithium-ion', undefined, { sensitivity: 'base' }) === 0
}

function getMotorisationCost(pricingSchedule: KineticsMikronwoodPricingSchedule) {
  const { control } = pricingSchedule
  const found = control.find((c) => c.id === 'lithium')
  if (typeof found === 'undefined') return undefined
  return found.cost
}

// this function is dealing with values from measure pro
export function getKineticsMikronwoodControl(spec: VenetianSpec) {
  const { motorisation } = spec
  if (motorisation == null) return 'Cord'

  if (motorisation.localeCompare('lithium', undefined, { sensitivity: 'base' }) === 0)
    return 'Lithium-ion'

  return undefined
}
