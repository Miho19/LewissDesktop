import {
  isSantaFeShutterPricingSchedule,
  SantaFeShutterPricingSchedule
} from '@shared/types/pricing/santaFeShutter.types'

export * from './getSantaFeShutterTableEntry'
export * from './getSantaFeShutterCost'
export * from './getSantaFeShutterDimensionCost'
export * from './getSantaFeShutterFlushBoltCost'
export * from './getSantaFeShutterShutterPoleCost'
export * from './getSantaFeShutterTrackCost'
export * from './getSantaFeShutterControlCost'

export function getSantaFeAccessoryCost(
  accessoryId: string,
  pricingSchedule: SantaFeShutterPricingSchedule
) {
  if (!isSantaFeShutterPricingSchedule(pricingSchedule)) return undefined
  if (typeof accessoryId !== 'string') return undefined
  const trimmedInput = accessoryId.trim()
  if (trimmedInput.length === 0) return undefined

  const { accessories } = pricingSchedule
  const found = accessories.find(
    (a) => a.id.localeCompare(trimmedInput, undefined, { sensitivity: 'base' }) === 0
  )

  return found
}
