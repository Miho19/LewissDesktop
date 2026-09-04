import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsCellularHeadrailCost } from '@renderer/utility/process/tableEntry/kineticsCellular'

const headrailInput: [string, number | undefined][] = [
  ['', undefined],
  ['black', 0],
  ['white', 0],
  ['off white', 0],
  [' ', undefined],
  ['custom', 103]
]

describe('getKineticsCellularHeadrailCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics 10mm Cellular Blind')

  it.each(headrailInput)(
    "Given the headrail colour '%s' should return '%s'",
    (headrailColour, expected) => {
      const result = getKineticsCellularHeadrailCost(headrailColour, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
