import { KineticsBlindTypeOptions } from '@shared/types/blind/kinetics.types'

import { AccessorySchedule } from '@shared/types/pricing/pricingSchedule.types'

export type KineticsAccessorySchedule = {
  blindType: string[]
  motorisation: Base[]
  sillClip: Base
  customColours: string[]
}

type Base = {
  id: string
  name: string
  cost: number
}

export function isKineticsAccessorySchedule(
  accessorySchedule: AccessorySchedule
): accessorySchedule is KineticsAccessorySchedule {
  if (typeof accessorySchedule === 'undefined') return false
  if (!('blindType' in accessorySchedule)) return false
  if (!('motorisation' in accessorySchedule)) return false

  const { blindType } = accessorySchedule

  const result = blindType.every((b) => (KineticsBlindTypeOptions as readonly string[]).includes(b))
  return result
}
