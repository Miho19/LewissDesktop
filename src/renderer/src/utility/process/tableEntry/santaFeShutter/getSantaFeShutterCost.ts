import { retrievePricingScheduleAsync } from '@renderer/utility/process/pricingSchedule/retrievePricingSchedule'
import { Blind } from '@shared/types/blind/blind.types'
import { isSantaFeShutterPricingSchedule } from '@shared/types/pricing/santaFeShutter.types'
import { getSantaFeShutterDimensionCost } from '@renderer/utility/process/tableEntry/santaFeShutter/getSantaFeShutterDimensionCost'
import { getSantaFeShutterControlCost } from '@renderer/utility/process/tableEntry/santaFeShutter/getSantaFeShutterControlCost'
import { getSantaFeShutterShuttlePoleCost } from '@/utility/process/tableEntry/santaFeShutter/getSantaFeShutterShutterPoleCost'
import { getSantaFeShutterTrackCost } from '@/utility/process/tableEntry/santaFeShutter/getSantaFeShutterTrackCost'
import { getSantaFeShutterFlushBoltCost } from '@/utility/process/tableEntry/santaFeShutter/getSantaFeShutterFlushBoltCost'

export async function getSantaFeShutterCostAsync(
  blindType: Blind,
  width: number,
  height: number,
  control: string,
  track: string,
  shuttlePole: boolean,
  flushBolt: boolean
) {
  const pricingSchedule = await retrievePricingScheduleAsync(blindType)
  if (!isSantaFeShutterPricingSchedule(pricingSchedule)) return undefined

  const dimensionCost = getSantaFeShutterDimensionCost(blindType, width, height, pricingSchedule)
  if (typeof dimensionCost === 'undefined') return undefined

  const controlCost = getSantaFeShutterControlCost(control, pricingSchedule)
  if (typeof controlCost == 'undefined') return undefined

  const trackCost = getSantaFeShutterTrackCost(width, track, pricingSchedule)
  if (typeof trackCost === 'undefined') return undefined

  const shuttlePoleCost = getSantaFeShutterShuttlePoleCost(shuttlePole, pricingSchedule)
  if (typeof shuttlePoleCost === 'undefined') return undefined

  const flushBoltCost = getSantaFeShutterFlushBoltCost(flushBolt, pricingSchedule)
  if (typeof flushBoltCost === 'undefined') return undefined

  return dimensionCost + controlCost + trackCost + shuttlePoleCost
}
