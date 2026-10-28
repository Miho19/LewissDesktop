import { capitalise } from '@/utility/general/capitalise'
import {
  isKineticsRollerPricingSchedule,
  KineticsRollerPricingSchedule
} from '@shared/types/pricing/kineticsRoller.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { KineticsRollerSpec } from '@shared/types/spec/kineticsRoller.types'
import { Fit, isValidFit } from '@shared/types/WindowDisplay.types'

const VALID_PELMET_SIZE = [110, 160] as const

export function getKineticsRollerPelmetCost(
  width: number,
  pelmet: string,
  pricingSchedule: PricingSchedule
) {
  if (!isKineticsRollerPricingSchedule(pricingSchedule))
    throw new Error('Kinetics Pricing Schedule required for bracket cost')
  if (!isWidthValid(width)) throw new Error('Invalid width')
  if (!isPelmetValid(pelmet)) return 0 // if pelmet is not specified we assume it is not needed

  const { size, fit } = getPelmetInformation(pelmet)

  const costArray = getCostArray(size, fit, pricingSchedule)
  if (typeof costArray === 'undefined') throw new Error('Failed to retrieve pelmet cost object')

  const widthIndex = getPelmetWidthArrayIndex(width, pricingSchedule)
  if (typeof widthIndex === 'undefined') throw new Error('Width is out of bounds')

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

function getCostArray(size: number, fit: Fit, pricingSchedule: KineticsRollerPricingSchedule) {
  const sizeObject = pricingSchedule.pelmet.cost.find((s) => s.size === size.toString())
  if (typeof sizeObject === 'undefined') return undefined
  return fit.toLocaleLowerCase() === 'inside' ? sizeObject.inside : sizeObject.outside
}

function getPelmetInformation(pelmet: string): { size: number; fit: Fit } {
  if (!pelmet.includes('-')) throw new Error('Pelmet string missing delimiter')

  const split = pelmet.split('-')
  if (split.length !== 2) throw new Error(`Pelmet string must be in the shape 'size - fit'`)

  const [size, fit] = [split[0].trim(), split[1].trim()]
  if (size.length === 0) throw new Error(`Pelmet size is missing`)
  if (fit.length === 0) throw new Error(`Pelmet fit is missing`)

  if (!isValidFit(fit)) throw new Error(`Pelmet fit must be either 'inside' or 'outside'`)

  return { size: parseInt(size), fit }
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

/**
 * Handles transforming measure pro pelmet type
 * @param spec
 *
 * @returns
 */

export function getKineticsRollerPelmet(spec: KineticsRollerSpec) {
  const { pelmetType } = spec

  if (pelmetType == null) return ''
  if (pelmetType.trim().length === 0) return ''

  const size = getPelmetSizeFromSpec(pelmetType)
  const fit = capitalise(getPelmetFitFromSpec(pelmetType))

  return `${size}mm - ${fit}`
}

// this function assumes the format of the pelmet
function getPelmetSizeFromSpec(pelmet: string) {
  const [size, _] = splitPelmetTypeString(pelmet)
  const parsedSize = parseInt(size)

  if (!(VALID_PELMET_SIZE as readonly number[]).includes(parsedSize))
    throw new Error('pelmet size is incorrect')

  return parsedSize
}

function getPelmetFitFromSpec(pelmet: string): Fit {
  const [_, fit] = splitPelmetTypeString(pelmet)

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

function splitPelmetTypeString(pelmet: string): [string, string] {
  const split = pelmet.trim().split(' ')
  if (split.length !== 2) throw new Error('Incorrect pelmet string format')
  return [split[0], split[1]]
}
