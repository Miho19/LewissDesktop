import {
  isKineticsRollerPricingSchedule,
  KineticsRollerPricingSchedule
} from '@shared/types/pricing/kineticsRoller.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { WindowMeasurement } from '@shared/types/Project.types'
import { KineticsRollerSpec } from '@shared/types/spec/kineticsRoller.types'

export const KineticsRollerControlOption = [
  'Chain FastRise',
  'Lithium-ion',
  'Hardwired Smart Home',
  'Hardwired WiFi Remote Control'
] as const

export const KineticsRollerChainColour = [
  'white',
  'black',
  'grey',
  'cream',
  'nickel',
  'white metal',
  'black metal',
  'stainless steel'
] as const

export const KineticsRollerChainLength = [
  '500',
  '750',
  '1000',
  '1250',
  '1500',
  '1750',
  '2000',
  '2250',
  '2500',
  '2750',
  '3000'
] as const

// control input is type - colour - length

export function getKineticsRollerControlCost(control: string, pricingSchedule: PricingSchedule) {
  if (!isKineticsRollerPricingSchedule(pricingSchedule)) return undefined
  if (!control || control.trim().length === 0) return undefined

  if (isChain(control)) {
    return getChainCost(control, pricingSchedule)
  }

  return getMotorisationCost(control, pricingSchedule)
}

// magic values currently

function isControlLengthValid(controlLength: string) {
  if (!controlLength) return false

  const lengthParsed = parseInt(controlLength)
  if (isNaN(lengthParsed)) return false
  if (lengthParsed <= 0) return false
  if (lengthParsed > 5000) return false

  return true
}

function isChain(control: string) {
  return control.trim().toLocaleLowerCase().includes('chain')
}

function getChainCost(control: string, pricingSchedule: KineticsRollerPricingSchedule) {
  const splitChain = kineticsRollerDestructureControlString(control)
  if (typeof splitChain === 'undefined') return undefined

  const { colour, length } = splitChain
  if (!isControlLengthValid(length)) return undefined

  const baseCost = pricingSchedule.control.chain.cost

  const surchargeColours = pricingSchedule.control.chain.colours
  const foundColour = surchargeColours.find(
    (c) => c.name.localeCompare(colour, undefined, { sensitivity: 'base' }) === 0
  )
  if (typeof foundColour === 'undefined') return baseCost

  const lengthParsed = parseInt(length)

  return foundColour.cost * (lengthParsed / 1000) + baseCost
}

export function kineticsRollerDestructureControlString(control: string):
  | {
      type: string
      colour: string
      length: string
    }
  | undefined {
  const split = control.split('-').map((s) => s.trim())
  if (split.length !== 3) return undefined
  return { type: split[0], colour: split[1], length: split[2] }
}

function destructureMotor(control: string): { type: string } | undefined {
  const split = control.split('-').map((c) => c.trim())

  if (split.length <= 0) return undefined

  if (split[0].toLocaleLowerCase().includes('lithium')) split[0] = 'Lithium-ion'

  return { type: split[0] }
}

function getMotorisationCost(control: string, pricingSchedule: KineticsRollerPricingSchedule) {
  const splitMotor = destructureMotor(control)
  if (typeof splitMotor === 'undefined') return undefined

  const { type } = splitMotor

  const foundMotor = Object.entries(pricingSchedule.control).find(
    ([_, value]) => value.name.localeCompare(type, undefined, { sensitivity: 'base' }) === 0
  )

  if (typeof foundMotor === 'undefined') return undefined

  const [_, motor] = foundMotor

  return motor.cost
}

export function getKineticsRollerControl(
  spec: KineticsRollerSpec,
  windowMeasurement: WindowMeasurement
) {
  const controlLength = windowMeasurement.controlLength || '1000'

  if (spec.motorisation == null) {
    return `Chain FastRise - ${spec.chainColour} - ${controlLength}mm`
  }

  const motorisation = spec.motorisation
  if (motorisation.localeCompare('lithium', undefined, { sensitivity: 'base' }) === 0)
    return 'Lithium-ion'

  return motorisation
}
