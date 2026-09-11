import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsMikronwoodControlCost } from '@/utility/process/tableEntry/kineticsMikronwood'

const controlInput: { control: string; expected: number | undefined }[] = [
  { control: '', expected: undefined },
  { control: ' ', expected: 0 },
  { control: 'Cord', expected: 0 },
  { control: 'cord', expected: 0 },
  { control: 'lithium-ion', expected: 257 },
  { control: 'Lithium-ion', expected: 257 }
]

describe('getKineticsMikronwoodDimensionCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics Mikronwood 50mm Venetian')

  it.each(controlInput)(
    'Given the control $control should return $expected',
    ({ control, expected }) => {
      const result = getKineticsMikronwoodControlCost(control, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
