import { getWidthIndex } from '@/utility/process/tableEntry/shared/getWidthIndex'
import {
  getToNearest,
  roundMeasurementUp
} from '@/utility/process/tableEntry/shared/roundMeasurementUp'
import { Blind } from '@shared/types/blind/blind.types'
import {
  isLewissFauxwoodPricingSchedule,
  LewissFauxwoodPricingSchedule
} from '@shared/types/pricing/lewissFauxwood.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

const option = ['fauxwood fascia'] as const

export function getLewissFauxwoodFasciaCost(
  blindType: Blind,
  width: number,
  fascia: string,
  pricingSchedule: PricingSchedule
) {
  if (!isLewissFauxwoodPricingSchedule(pricingSchedule)) return undefined
  if (!isWidthValid(width)) return undefined
  if (!isFasciaValid(fascia)) return 0
  if (!isFasciaOption(fascia)) return undefined

  const toNearest = getToNearest(blindType)
  const widthIndex = getWidthIndex(width, toNearest, pricingSchedule)
  if (typeof widthIndex === 'undefined') return undefined

  // this is a bold assumption here, that we have not selected min or max of width...
  const widthRounded = roundMeasurementUp(width, toNearest)

  const fasciaCost = getFasciaCost(pricingSchedule)
  if (typeof fasciaCost === 'undefined') return undefined

  return (widthRounded / 1000) * fasciaCost
}

// magic number 5000
function isWidthValid(width: number) {
  if (typeof width !== 'number') return false
  if (width <= 0 || width >= 5000) return false
  return true
}

function isFasciaValid(fascia: string) {
  if (typeof fascia !== 'string') return false
  if (fascia.trim().length === 0) return false

  return true
}

function isFasciaOption(fascia: string) {
  const fasciaAdjusted = fascia.trim().toLocaleLowerCase()

  return (option as readonly string[]).includes(fasciaAdjusted)
}

function getFasciaCost(pricingSchedule: LewissFauxwoodPricingSchedule) {
  const { fascia } = pricingSchedule
  if (typeof fascia === 'undefined') return undefined
  return fascia.cost
}
