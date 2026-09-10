import { getSantaFeShutterFlushBoltCost } from '@renderer/utility/process/tableEntry/santaFeShutter'
import { getExamplePricingSchedule } from '../utility'
import { describe, expect, it } from 'vitest'

const controlInput: {
  flushBolt: boolean
  expected: number | undefined
}[] = [
  { flushBolt: true, expected: 19 },
  { flushBolt: false, expected: 0 }
]

describe('getSantaFeShutterFlushBoltCost(', () => {
  const pricingSchedule = getExamplePricingSchedule('Santa Fe Normandy Shutter')

  it.each(controlInput)(
    'should given the flush bolt status: $flushBolt return $expected',
    ({ flushBolt, expected }) => {
      const result = getSantaFeShutterFlushBoltCost(flushBolt, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
