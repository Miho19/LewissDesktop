import { describe, it, expect } from 'vitest'
import { getExampleAccessorySchedule, getExamplePricingSchedule } from '../utility'

import { Blind } from '@shared/types/blind/blind.types'
import { getLewissFauxwoodFasciaCost } from '@/utility/process/tableEntry/lewissFauxwood'

type Input = {
  blindType: Blind
  width: 1200
  fascia: string
  expected: number | undefined
}

const inputArray: Input[] = [
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    fascia: '',
    expected: 0,
    width: 1200
  },
  {
    blindType: "Lewis's 63mm Fauxwood Venetian",
    fascia: '',
    expected: 0,
    width: 1200
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    fascia: 'Fauxwood Fascia',
    expected: 8.4,
    width: 1200
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    fascia: 'fauxwood fascia',
    expected: 8.4,
    width: 1200
  },
  {
    blindType: 'Kinetics 10mm Cellular Blind',
    fascia: 'Fauxwood Fascia',
    expected: undefined,
    width: 1200
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    fascia: ' ',
    expected: 0,
    width: 1200
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    fascia: 'asdasdasda',
    expected: undefined,
    width: 1200
  }
]

describe('getLewissFauxwoodFasciaCost', () => {
  it.each(inputArray)(
    'Given a $blindType with width $width and fascia $fascia should return $expected',
    ({ blindType, width, fascia, expected }) => {
      const pricingSchedule = getExamplePricingSchedule(blindType)

      const result = getLewissFauxwoodFasciaCost(blindType, width, fascia, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
