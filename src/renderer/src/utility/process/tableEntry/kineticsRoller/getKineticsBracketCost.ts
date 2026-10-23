import {
  isKineticsRollerPricingSchedule,
  KineticsRollerPricingSchedule
} from '@shared/types/pricing/kineticsRoller.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export function getKineticsRollerBracketCost(bracket: string, pricingSchedule: PricingSchedule) {
  if (!isKineticsRollerPricingSchedule(pricingSchedule))
    throw new Error('Kinetics Pricing Schedule required for bracket cost')

  const cost = getBracketCost(bracket, pricingSchedule)

  return cost
}

export function getKineticsRollerBracket(colour: string, size: string) {
  return `${size} - ${colour}`
}

function destructureBracket(bracket: string): { size: string; colour: string } {
  const split = bracket.split('-')

  if (split.length !== 2) throw new Error('Incorrect bracket structure')

  return { size: split[0].trim(), colour: split[1].trim() }
}

function getBracketCost(bracketString: string, pricingSchedule: KineticsRollerPricingSchedule) {
  const { size, colour } = destructureBracket(bracketString)

  const { bracket } = pricingSchedule
  if (typeof bracket === 'undefined')
    throw new Error('Bracket object was not found in pricing schedule')

  const bracketCost = bracket.find(
    (b) => b.name.localeCompare(size, undefined, { sensitivity: 'base' }) === 0
  )

  if (typeof bracketCost === 'undefined') return 0

  return bracketCost.cost
}
