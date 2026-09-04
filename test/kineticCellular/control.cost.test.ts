import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsCellularControlCost } from '@renderer/utility/process/tableEntry/kineticsCellular'

const controlInput: [string, number | undefined][] = [
  ['a', undefined],
  ['', undefined],
  [' ', undefined],
  ['cord', undefined],
  ['lithium-ion', 154]
]

describe('Control Pricing', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics 10mm Cellular Blind')

  it.each(controlInput)("Given the control '%s' return '%s'", (control, expected) => {
    const result = getKineticsCellularControlCost(control, pricingSchedule)
    if (typeof expected === 'undefined') {
      expect(result).toBeUndefined()
    } else {
      expect(result).toBeCloseTo(expected)
    }
  })
})
