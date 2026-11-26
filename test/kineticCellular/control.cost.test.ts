import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsCellularControlCost } from '@renderer/utility/process/tableEntry/kineticsCellular'
import { WHOLESALE_RATE_MAIN, WHOLESALE_RATE_MOTOR } from '@/utility/process/tableEntry'

const controlInput: [string, number | undefined][] = [
  ['a', undefined],
  ['', undefined],
  [' ', undefined],
  ['cord', 0],
  ['lithium-ion', 154]
]

describe('Control Pricing', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics 10mm Cellular Blind')

  it.each(controlInput)("Given the control '%s' return '%s'", (control, expected) => {
    const result = getKineticsCellularControlCost(control, pricingSchedule)
    if (typeof expected === 'undefined') {
      expect(result).toBeUndefined()
      return
    }

    if (control.toLocaleLowerCase().includes('cord')) {
      expect(result).toBeCloseTo(expected * WHOLESALE_RATE_MAIN)
      return
    }

    expect(result).toBeCloseTo(expected * WHOLESALE_RATE_MOTOR)
  })
})
