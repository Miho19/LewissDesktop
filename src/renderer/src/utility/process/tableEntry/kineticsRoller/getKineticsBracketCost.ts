import {
  isKineticsRollerPricingSchedule,
  KineticsRollerPricingSchedule
} from '@shared/types/pricing/kineticsRoller.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { KineticsRollerSpec } from '@shared/types/spec/kineticsRoller.types'

export function getKineticsRollerBracketCost(bracket: string, pricingSchedule: PricingSchedule) {
  if (!isKineticsRollerPricingSchedule(pricingSchedule))
    throw new Error('Kinetics Pricing Schedule required for bracket cost')

  const cost = getBracketCost(bracket, pricingSchedule)

  return cost
}

export function getKineticsRollerBracket(spec: KineticsRollerSpec) {
  const size = `40mm` // measure pro does not supply the bracket type currently
  const colour = spec.bracketColour
  return `${size} - ${colour}`
}

function destructureBracket(bracket: string): { size: string; colour: string } {
  if (typeof bracket === 'undefined') throw new Error('Brackeet is undefined')
  const split = bracket.split('-')

  if (split.length !== 2) throw new Error('Incorrect bracket structure')

  const [size, colour] = [split[0].trim(), split[1].trim()]

  if (size.length === 0) throw new Error('Invalid bracket size')
  if (colour.length === 0) throw new Error('Invalid bracket colour')

  return { size, colour }
}

function getBracketCost(bracketString: string, pricingSchedule: KineticsRollerPricingSchedule) {
  const { size } = destructureBracket(bracketString)

  const { bracket } = pricingSchedule
  if (typeof bracket === 'undefined')
    throw new Error('Bracket object was not found in pricing schedule')

  const bracketCost = bracket.find(
    (b) => b.name.localeCompare(size, undefined, { sensitivity: 'base' }) === 0
  )

  if (typeof bracketCost === 'undefined') return 0

  return bracketCost.cost
}
