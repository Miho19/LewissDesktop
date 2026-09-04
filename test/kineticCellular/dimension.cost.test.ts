import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsCellularDimensionCost } from '@renderer/utility/process/tableEntry/kineticsCellular'

const dimensionInput: [number, number, string, number | undefined][] = [
  [1200, 900, 'Translucent', 387],
  [1986, 988, 'Translucent', 613],
  [-1000, 988, 'Translucent', undefined],
  [1200, 988, 'Translunt', undefined],
  [1000, -988, 'Translucent', undefined],
  [240, 900, 'Translucent', 197],
  [300, 3600, 'Translucent', 423],
  [3499, 1999, 'Translucent', 1769],
  [0, 0, 'Blockout', undefined],
  [-1, 0, 'Blockout', undefined],
  [0, -1, 'Blockout', undefined],
  [-1, -1, 'Blockout', undefined],
  [1200, 900, 'Blockout', 445.05],
  [0, 0, 'Translucent', undefined],
  [0, 0, '432', undefined],
  [1200, 900, '', undefined],
  [1200, 900, '    ', undefined],
  [240, 240, 'Translucent', 161]
]

describe('getKineticsCellularDimensionCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics 10mm Cellular Blind')

  it.each(dimensionInput)(
    "Given the dimensions (%i x %i) with fabric '%s' should return '%s'",
    (width, height, fabricName, expected) => {
      const result = getKineticsCellularDimensionCost(width, height, fabricName, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
