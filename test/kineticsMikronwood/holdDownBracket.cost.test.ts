import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsMikronwoodHoldDownBracketCost } from '@/utility/process/tableEntry/kineticsMikronwood'

const fasciaInput: { holdDownBracket: string; expected: number | undefined }[] = [
  { holdDownBracket: '', expected: undefined },
  { holdDownBracket: ' ', expected: 0 },
  { holdDownBracket: 'sadad', expected: undefined },
  { holdDownBracket: 'Antique Brass', expected: 12 },
  { holdDownBracket: 'antique brass', expected: 12 }
]

describe('getKineticsMikronwoodHoldDownBracketCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics Mikronwood 50mm Venetian')

  it.each(fasciaInput)(
    'Given the hold down bracket $holdDownBracket should return $expected',
    ({ holdDownBracket, expected }) => {
      const result = getKineticsMikronwoodHoldDownBracketCost(holdDownBracket, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
