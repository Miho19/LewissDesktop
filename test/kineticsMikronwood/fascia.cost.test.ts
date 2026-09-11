import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsMikronwoodFasciaCost } from '@/utility/process/tableEntry/kineticsMikronwood'

const fasciaInput: { fascia: string; expected: number | undefined }[] = [
  { fascia: '', expected: undefined },
  { fascia: ' ', expected: 0 },
  { fascia: 'sadad', expected: undefined },
  { fascia: 'Flat', expected: 19 },
  { fascia: 'flat', expected: 19 },
  { fascia: 'Colonial', expected: 19 },
  { fascia: 'colonial', expected: 19 }
]

describe('getKineticsMikronwoodFasciaCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics Mikronwood 50mm Venetian')

  it.each(fasciaInput)(
    'Given the fascia $fascia should return $expected',
    ({ fascia, expected }) => {
      const result = getKineticsMikronwoodFasciaCost(fascia, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
