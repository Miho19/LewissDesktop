import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getSantaFeShutterControlCost } from '@renderer/utility/process/tableEntry/santaFeShutter'

const dimensionInput: {
  control: string
  expected: number | undefined
}[] = [
  { control: '', expected: 0 },
  { control: ' ', expected: 0 },
  { control: 'asdasdas', expected: undefined },
  { control: 'Lithium Smart Motor', expected: 334 }
]

describe('getSantaFeShutterControlCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Santa Fe Normandy Shutter')

  it.each(dimensionInput)(
    "Given the control: $control should return '$expected' ",
    ({ control, expected }) => {
      const result = getSantaFeShutterControlCost(control, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
