import {
  isKineticsMikronwoodPricingSchedule,
  KineticsMikronwoodPricingSchedule
} from '@shared/types/pricing/kineticsMikronwood.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { VenetianSpec } from '@shared/types/spec/venetian.types'

export function getKineticsMikronwoodFasciaCost(fascia: string, pricingSchedule: PricingSchedule) {
  if (!isKineticsMikronwoodPricingSchedule(pricingSchedule)) return undefined
  if (!isInputValid(fascia)) return undefined
  if (fascia.trim().length === 0) return 0

  const fasciaCost = getCost(fascia, pricingSchedule)

  return fasciaCost
}

function isInputValid(fascia: string) {
  if (!fascia) return false
  if (typeof fascia !== 'string') return false
  return true
}

function getCost(query: string, pricingSchedule: KineticsMikronwoodPricingSchedule) {
  const { fascia } = pricingSchedule
  const found = fascia.find(
    (f) => f.id.localeCompare(query, undefined, { sensitivity: 'base' }) === 0
  )

  if (typeof found === 'undefined') return undefined

  return found.cost
}

// value comes from measure pro
export function getKineticsMikronwoodFascia(spec: VenetianSpec) {
  const { fasciaColonialReturns, fasciaFlatReturns } = spec
  if (typeof fasciaColonialReturns === 'boolean' && fasciaColonialReturns) return 'Colonial'

  if (typeof fasciaFlatReturns === 'boolean' && fasciaFlatReturns) return 'Flat'

  return undefined
}
