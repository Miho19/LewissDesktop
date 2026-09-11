import {
  isKineticsMikronwoodPricingSchedule,
  KineticsMikronwoodPricingSchedule
} from '@shared/types/pricing/kineticsMikronwood.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export function getKineticsMikronwoodHoldDownBracketCost(
  holdDownBracket: string,
  pricingSchedule: PricingSchedule
) {
  if (!isKineticsMikronwoodPricingSchedule(pricingSchedule)) return undefined
  if (!isInputValid(holdDownBracket)) return undefined
  if (holdDownBracket.trim().length === 0) return 0

  const holdDownBracketCost = getCost(holdDownBracket, pricingSchedule)

  return holdDownBracketCost
}

function isInputValid(fascia: string) {
  if (!fascia) return false
  if (typeof fascia !== 'string') return false
  return true
}

function getCost(query: string, pricingSchedule: KineticsMikronwoodPricingSchedule) {
  const { holdDownBracket } = pricingSchedule

  if (holdDownBracket.name.localeCompare(query, undefined, { sensitivity: 'base' }) !== 0)
    return undefined

  return holdDownBracket.cost
}
