import {
  isKineticsRollerPricingSchedule,
  KineticsRollerPricingSchedule
} from '@shared/types/pricing/kineticsRoller.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { KineticsRollerSpec } from '@shared/types/spec/kineticsRoller.types'

const VALID_PELMET_SIZE = [110, 160] as const

export function getKineticsRollerPelmetCost(
  width: number,
  pelmet: string,
  pricingSchedule: PricingSchedule
) {
  if (!isKineticsRollerPricingSchedule(pricingSchedule)) return undefined
  if (!isWidthValid(width)) return undefined
  if (!isPelmetValid(pelmet)) return undefined

  let size: number, fit: 'inside' | 'outside'

  try {
    size = getPelmetSize(pelmet)
    fit = getPelmetFit(pelmet)
  } catch (error) {
    return undefined
  }

  const costArray = getCostArray(size, fit, pricingSchedule)
  if (typeof costArray === 'undefined') return undefined

  const widthIndex = getPelmetWidthArrayIndex(width, pricingSchedule)
  if (typeof widthIndex === 'undefined') return undefined

  const cost = costArray[widthIndex]

  return cost
}

function isWidthValid(width: number) {
  if (!width) return false
  if (width <= 0) return false
  if (width >= 5000) return false

  return true
}

function isPelmetValid(pelmet: string) {
  if (!pelmet) return false
  if (pelmet.trim().length === 0) return false

  return true
}

export function getKineticsRollerPelmet(spec: KineticsRollerSpec) {
  const { pelmetType } = spec
  if (pelmetType == null) return ''
  if (pelmetType.trim().length === 0) return ''

  const size = getPelmetSize(pelmetType)
  const fit = getPelmetFit(pelmetType)

  return `${size}mm - ${fit}`
}

// this function assumes the format of the pelmet
function getPelmetSize(pelmet: string) {
  const [size, _] = splitPelmetString(pelmet)
  const parsedSize = parseInt(size)

  if (!(VALID_PELMET_SIZE as readonly number[]).includes(parsedSize))
    throw new Error('pelmet size is incorrect')

  return parsedSize
}

function getPelmetFit(pelmet: string) {
  const [_, fit] = splitPelmetString(pelmet)

  const fitAdjusted = fit.trim().toLocaleLowerCase()

  switch (fitAdjusted) {
    case 'i/s':
      return 'inside'
    case 'o/s':
      return 'outside'
    default:
      throw new Error(`${fitAdjusted} is not a valid fit for pelmet`)
  }
}

function splitPelmetString(pelmet: string): [string, string] {
  const split = pelmet.trim().split(' ')
  if (split.length !== 2) throw new Error('Incorrect pelmet string format')
  return [split[0], split[1]]
}

function getCostArray(
  size: number,
  fit: 'inside' | 'outside',
  pricingSchedule: KineticsRollerPricingSchedule
) {
  const sizeObject = pricingSchedule.pelmet.cost.find((s) => s.size === size.toString())
  if (typeof sizeObject === 'undefined') return undefined
  return fit === 'inside' ? sizeObject.inside : sizeObject.outside
}

function getPelmetWidthArrayIndex(width: number, pricingSchedule: KineticsRollerPricingSchedule) {
  let adjustedWidth = getAdjustedWidth(width)

  const { widthHeader } = pricingSchedule.pelmet
  const minWidth = widthHeader.at(0)
  if (typeof minWidth === 'undefined') return undefined
  if (adjustedWidth < minWidth) adjustedWidth = minWidth

  const maxWidth = widthHeader.at(-1)
  if (typeof maxWidth === 'undefined') return undefined
  if (adjustedWidth > maxWidth && width !== maxWidth) return undefined

  const index = widthHeader.findIndex((w) => w === adjustedWidth || w === width)
  if (index === -1) return undefined

  return index
}

function getAdjustedWidth(width: number) {
  return Math.ceil(width / 250) * 250
}
