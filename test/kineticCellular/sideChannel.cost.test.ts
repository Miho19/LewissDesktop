import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsCellularSideChannelCost } from '@renderer/utility/process/tableEntry/kineticsCellular'

const sideChannelInput: [number, string, number | undefined][] = [
  // [0, 'None', undefined],
  // [1200, ' ', undefined],
  // [1200, '', undefined],
  // [-1, 'Custom', undefined],
  [1200, 'anything', undefined]
  // [1200, 'WhIte', 150],
  // [1200, 'custom', 150],
  // [1200, 'None', 0]
]

describe('getKineticsCellularSideChannelCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics 10mm Cellular Blind')

  it.each(sideChannelInput)(
    "Given the height %i and side channel colour '%s' should return %s",
    (height, sideChannelColour, expected) => {
      const result = getKineticsCellularSideChannelCost(height, sideChannelColour, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
