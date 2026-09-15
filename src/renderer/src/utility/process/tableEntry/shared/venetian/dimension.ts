import { Blind } from '@shared/types/blind/blind.types'
import { VenetianBlind, VenetianBlindOptions } from '@shared/types/blind/venetian.types'
import { LewissAluminiumPricingSchedule } from '@shared/types/pricing/lewissAluminium.types'
import {
  PricingSchedule,
  isLewissVenetianPricingSchedule
} from '@shared/types/pricing/pricingSchedule.types'

export function lewissVenetianIsInputValid(
  width: number,
  height: number,
  fabricMultiplier: number,
  control: string
) {
  if (typeof width !== 'number') return false
  if (width <= 0 || width >= 5000) return false

  if (typeof height !== 'number') return false
  if (height <= 0 || height >= 5000) return false

  if (typeof fabricMultiplier !== 'number') return false
  if (fabricMultiplier <= 0 || fabricMultiplier >= 10) return false

  if (typeof control !== 'string') return false
  if (control.trim().length === 0) return false

  return true
}

export function lewissVenetianIsBlindTypeValid(blindType: Blind) {
  if (typeof blindType !== 'string') return false

  const optionSet = new Set<string>(VenetianBlindOptions)

  return optionSet.has(blindType)
}

export function getLewissVenetianControlMultiplier(
  blindType: Blind,
  control: string,
  pricingSchedule: PricingSchedule
) {
  if (!isLewissVenetianPricingSchedule(pricingSchedule)) return undefined

  const controlArray = getControlArray(blindType, pricingSchedule)
  if (typeof controlArray === 'undefined') return undefined

  const controlAdjusted = control.trim()

  const found = controlArray.find(
    (c) => c.id.localeCompare(controlAdjusted, undefined, { sensitivity: 'base' }) === 0
  )

  if (typeof found === 'undefined') return undefined

  return found.cost
}

function getSlatSize(blindType: Blind) {
  if (blindType.includes('25mm')) return '25'
  if (blindType.includes('50mm')) return '50'

  return undefined
}

function getControlArray(blindType: Blind, pricingSchedule: LewissAluminiumPricingSchedule) {
  const slatName = getControlObjectName(blindType)
  if (typeof slatName === 'undefined') return undefined

  const { control } = pricingSchedule
  const controlArray = control[slatName as keyof typeof pricingSchedule.control]

  return controlArray
}

function getControlObjectName(blindType: Blind) {
  const slatSize = getSlatSize(blindType)
  const slatPrefix = getSlatPrefix(blindType as VenetianBlind)

  if (typeof slatPrefix === 'undefined') return undefined

  return `${slatPrefix}${slatSize}`
}

function getSlatPrefix(blindType: VenetianBlind) {
  const map: Record<VenetianBlind, string> = {
    "Lewis's 25mm Aluminium Venetian": 'aluminium',
    "Lewis's 50mm Aluminium Venetian": 'aluminium',
    "Lewis's 50mm Fauxwood Venetian": 'fauxwood',
    "Lewis's 63mm Fauxwood Venetian": 'fauxwood',
    "Lewis's 50mm Phoenixwood Venetian": 'phoenixwood',
    "Lewis's 63mm Phoenixwood Venetian": 'phoenixwood',
    'Kinetics Mikronwood 50mm Venetian': 'mikron'
  }

  const prefixName = map[blindType]
  if (typeof prefixName === 'undefined') return undefined

  return prefixName
}
