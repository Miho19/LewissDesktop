import {
  getToNearest,
  roundMeasurementUp
} from '@/utility/process/tableEntry/shared/roundMeasurementUp'
import { lewissVenetianIsBlindTypeValid } from '@/utility/process/tableEntry/shared/venetian'
import { Blind } from '@shared/types/blind/blind.types'
import { AccessorySchedule } from '@shared/types/pricing/pricingSchedule.types'
import {
  isLewissAccessorySchedule,
  LewissAccessorySchedule
} from '@shared/types/pricing/venetianAccessories.types'

export function getLewissVenetianPalladianShelfCost(
  blindType: Blind,
  width: number,
  palladianShelf: string,
  pricingSchedule: AccessorySchedule
) {
  if (!isLewissAccessorySchedule(pricingSchedule)) return undefined
  if (!lewissVenetianIsBlindTypeValid(blindType)) return undefined
  if (!isWidthValid(width)) return undefined
  if (!isPalladianShelfValid(palladianShelf)) return 0

  // refactor this later date
  const toNearest = getToNearest(blindType)
  // this is a bold assumption here, that we have not selected min or max of width...
  const widthRounded = roundMeasurementUp(width, toNearest) / 1000

  const baseCost = getPalladianShelfCost(pricingSchedule)
  if (typeof baseCost === 'undefined') return undefined

  const colourCost = getPalladianShelfColourCost(palladianShelf, pricingSchedule)
  if (typeof colourCost === 'undefined') return undefined

  return widthRounded * baseCost + colourCost
}

function isWidthValid(width: number) {
  if (typeof width !== 'number') return false
  if (width <= 0 || width >= 5000) return false
  return true
}

function isPalladianShelfValid(palladianShelf: string) {
  if (typeof palladianShelf !== 'string') return false
  const adjusted = getAdjustedInput(palladianShelf)
  if (adjusted.length === 0) return false

  return true
}

function getAdjustedInput(input: string) {
  return input.trim().toLocaleLowerCase()
}

function getPalladianShelfCost(pricingSchedule: LewissAccessorySchedule) {
  const { palladianShelf } = pricingSchedule
  if (typeof palladianShelf === 'undefined') return undefined

  return palladianShelf.cost
}

function getPalladianShelfColourCost(query: string, pricingSchedule: LewissAccessorySchedule) {
  const { palladianShelf } = pricingSchedule
  if (typeof palladianShelf === 'undefined') return undefined

  const { colour } = palladianShelf
  if (typeof colour === 'undefined') return undefined

  const queryAdjusted = getAdjustedInput(query)

  const found = colour.find(
    (c) => c.name.localeCompare(queryAdjusted, undefined, { sensitivity: 'base' }) === 0
  )
  if (typeof found === 'undefined') return undefined

  return found.cost
}
