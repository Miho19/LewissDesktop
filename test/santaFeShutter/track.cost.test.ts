import { getSantaFeShutterTrackCost } from '@renderer/utility/process/tableEntry/santaFeShutter'
import { getExamplePricingSchedule } from '../utility'
import { describe, expect, it } from 'vitest'
import { SantaFeShutterTrack } from '@shared/types/spec/santaFe.types'

const controlInput: {
  width: number
  track: SantaFeShutterTrack
  expected: number | undefined
}[] = [
  { width: 1200, track: 'Single Sliding Track', expected: 170.4 },
  { width: 1199, track: 'Single Sliding Track', expected: 170.4 },
  { width: 1101, track: 'Single Sliding Track', expected: 170.4 },
  { width: 0, track: 'Single Sliding Track', expected: undefined },
  { width: -1, track: 'Single Sliding Track', expected: undefined },
  { width: 1200, track: ' ' as SantaFeShutterTrack, expected: 0 },
  { width: 1200, track: '' as SantaFeShutterTrack, expected: 0 },
  { width: 1200, track: 'asdasdad' as SantaFeShutterTrack, expected: undefined },

  { width: 1200, track: 'Double Sliding Track', expected: 211.2 },
  { width: 1200, track: '90 Degree Bifold Track', expected: 170.4 },
  { width: 1200, track: '180 Degree Bifold Track', expected: 202.8 },
  { width: 1200, track: 'Hinge Track Bifold', expected: 202.8 },

  { width: 2000, track: 'Single Sliding Track', expected: 284 },
  { width: 2950, track: 'Single Sliding Track', expected: 418.9 },
  { width: 2949, track: 'Single Sliding Track', expected: 418.9 },
  { width: 2951, track: 'Single Sliding Track', expected: undefined },
  { width: 3000, track: 'Single Sliding Track', expected: undefined }
]

describe('getSantaFeShutterControlCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Santa Fe Normandy Shutter')

  it.each(controlInput)(
    'should given the width $width mm on track $track return $expected',
    ({ width, track, expected }) => {
      const result = getSantaFeShutterTrackCost(width, track, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
