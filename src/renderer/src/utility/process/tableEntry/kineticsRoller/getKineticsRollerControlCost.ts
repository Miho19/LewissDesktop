import {
  isKineticsRollerPricingSchedule,
  KineticsRollerPricingSchedule
} from '@shared/types/pricing/kineticsRoller.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

export function getKineticsRollerControlCost(
  control: string,
  controlLength: string,
  pricingSchedule: PricingSchedule
) {
  if (!isKineticsRollerPricingSchedule(pricingSchedule)) return undefined
  if (!control || control.trim().length === 0) return undefined
  if (!isControlLengthValid(controlLength)) return undefined

  if (isChain(control)) return getChainCost(control, controlLength, pricingSchedule)

  return 999
}

// magic values currently

function isControlLengthValid(controlLength: string) {
  if (!controlLength) return false

  const lengthParsed = Number(controlLength)
  if (isNaN(lengthParsed)) return false
  if (lengthParsed <= 0) return false
  if (lengthParsed > 5000) return false

  return true
}

function isChain(control: string) {
  return control.trim().toLocaleLowerCase().includes('chain')
}

function getChainCost(
  control: string,
  controlLength: string,
  pricingSchedule: KineticsRollerPricingSchedule
) {
  const baseCost = pricingSchedule.control.chain.cost

  const controlSplit = control.split(' ')
  if (controlSplit.length !== 3) return undefined
  const colour = controlSplit[2]

  const surchargeColours = pricingSchedule.control.chain.colours
  const foundColour = surchargeColours.find(
    (c) => c.name.localeCompare(colour, undefined, { sensitivity: 'base' }) === 0
  )
  if (typeof foundColour === 'undefined') return baseCost

  const lengthParsed = Number(controlLength)

  return foundColour.cost * (lengthParsed / 1000) + baseCost
}
