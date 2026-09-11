// getKineticsMikronwoodDimensionCost

import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsMikronwoodDimensionCost } from '@/utility/process/tableEntry/kineticsMikronwood'

const dimensionInput: { width: number; height: number; expected: number | undefined }[] = [
  { width: 1200, height: 900, expected: 528 },
  { width: 1199, height: 900, expected: 528 },
  { width: 1101, height: 900, expected: 528 },
  { width: 1200, height: 899, expected: 528 },
  { width: 1200, height: 801, expected: 528 },
  { width: 0, height: 900, expected: undefined },
  { width: -1, height: 900, expected: undefined },
  { width: 1200, height: 0, expected: undefined },
  { width: 1200, height: -1, expected: undefined }
]

describe('getKineticsMikronwoodDimensionCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics Mikronwood 50mm Venetian')

  it.each(dimensionInput)(
    'Given the dimensions ($width x $height) should return $expected',
    ({ width, height, expected }) => {
      const result = getKineticsMikronwoodDimensionCost(width, height, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
