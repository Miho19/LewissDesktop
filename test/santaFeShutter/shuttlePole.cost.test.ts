import { getSantaFeShutterShuttlePoleCost } from '@renderer/utility/process/tableEntry/santaFeShutter'
import { getExamplePricingSchedule } from '../utility'
import { describe, expect, it } from 'vitest'

const controlInput: {
  isPole: boolean
  expected: number | undefined
}[] = [
  { isPole: true, expected: 51 },
  { isPole: false, expected: 0 }
]

describe('getSantaFeShutterShuttlePoleCost(', () => {
  const pricingSchedule = getExamplePricingSchedule('Santa Fe Normandy Shutter')

  it.each(controlInput)(
    'should given the shuttle pole status: $isPole return $expected',
    ({ isPole, expected }) => {
      const result = getSantaFeShutterShuttlePoleCost(isPole, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
