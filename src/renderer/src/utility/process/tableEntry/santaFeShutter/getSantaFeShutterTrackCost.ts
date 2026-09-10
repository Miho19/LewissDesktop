import { getWidthIndex } from '@renderer/utility/process/tableEntry/shared/getWidthIndex'
import {
  getToNearest,
  roundMeasurementUp
} from '@renderer/utility/process/tableEntry/shared/roundMeasurementUp'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import {
  isSantaFeShutterPricingSchedule,
  SantaFeShutterPricingSchedule
} from '@shared/types/pricing/santaFeShutter.types'

export function getSantaFeShutterTrackCost(
  width: number,
  track: string,
  pricingSchedule: PricingSchedule
) {
  if (!isSantaFeShutterPricingSchedule(pricingSchedule)) return undefined
  if (!isTrackPresent(track)) return 0
  if (!isWidthValid(width)) return undefined

  const costPerWidthMetre = getTrackCostPerWidthMetre(track, pricingSchedule)
  if (typeof costPerWidthMetre === 'undefined') return undefined

  const widthMetreRounded = getWidthMetreRounded(width, pricingSchedule)
  if (typeof widthMetreRounded === 'undefined') return undefined

  // the width is undefined, we need to round to 2950 but we are rounding to 3000.......

  return costPerWidthMetre * widthMetreRounded
}

function getWidthMetreRounded(width: number, pricingSchedule: SantaFeShutterPricingSchedule) {
  const toNearest = getToNearest('Santa Fe Normandy Shutter')
  const roundedWidth = roundMeasurementUp(width, toNearest)
  const widthIndex = getWidthIndex(roundedWidth, toNearest, pricingSchedule)
  if (typeof widthIndex === 'undefined') return undefined

  return roundedWidth / 1000
}

function isTrackPresent(track: string) {
  if (!track) return false
  if (typeof track !== 'string') return false
  if (track.trim().length === 0) return false

  return true
}

function isWidthValid(width: number) {
  if (!width) return false
  if (width <= 0) return false

  return true
}

function getTrackCostPerWidthMetre(query: string, pricingSchedule: SantaFeShutterPricingSchedule) {
  const { track } = pricingSchedule
  const found = track.find(
    (t) => t.name.localeCompare(query, undefined, { sensitivity: 'base' }) === 0
  )
  if (typeof found === 'undefined') return undefined

  return found.cost
}
