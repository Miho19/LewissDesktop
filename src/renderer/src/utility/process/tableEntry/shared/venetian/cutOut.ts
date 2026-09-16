import { lewissVenetianIsBlindTypeValid } from '@/utility/process/tableEntry/shared/venetian'
import { Blind } from '@shared/types/blind/blind.types'
import { AccessorySchedule } from '@shared/types/pricing/pricingSchedule.types'
import {
  isLewissAccessorySchedule,
  LewissAccessorySchedule
} from '@shared/types/pricing/venetianAccessories.types'
import { VenetianSpec } from '@shared/types/spec/venetian.types'

const option = ['yes', 'no'] as const

export function getLewissVenetianCutOut(spec: VenetianSpec) {
  if (spec.cutout == null) return 'No'

  return spec.cutout ? 'Yes' : 'No'
}

export function getLewissVenetianCutoutCost(
  blindType: Blind,
  cutOut: 'Yes' | 'No',
  pricingSchedule: AccessorySchedule
) {
  if (!isLewissAccessorySchedule(pricingSchedule)) return undefined

  if (!isInputValid(cutOut)) return undefined
  if (!lewissVenetianIsBlindTypeValid(blindType)) return undefined
  if (!isValidOption(cutOut, option as readonly string[])) return undefined

  const adjusted = getAdjustedInput(cutOut)
  if (adjusted === 'no') return 0

  const cost = getCutOutCost(pricingSchedule)
  if (typeof cost === 'undefined') return undefined

  return cost
}

function isInputValid(cutOut: string) {
  if (typeof cutOut !== 'string') return false
  if (cutOut.trim().length === 0) return false
  return true
}

function isValidOption(cutOut: string, option: readonly string[]) {
  const adjusted = getAdjustedInput(cutOut)
  return option.includes(adjusted)
}

function getAdjustedInput(input: string) {
  return input.trim().toLocaleLowerCase()
}

function getCutOutCost(pricingSchedule: LewissAccessorySchedule) {
  const { cutOut } = pricingSchedule
  if (typeof cutOut === 'undefined') return undefined
  return cutOut.cost
}
