import { describe, it, expect } from 'vitest'
import { getExampleAccessorySchedule } from '../utility'

import { Blind } from '@shared/types/blind/blind.types'
import { getLewissFauxwoodValanceCost } from '@/utility/process/tableEntry/lewissFauxwood'

type ValanceInput = {
  blindType: Blind
  valance: string
  expected: number | undefined
}

const valanceInput: ValanceInput[] = [
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    valance: '',
    expected: 0
  },
  {
    blindType: "Lewis's 63mm Fauxwood Venetian",
    valance: '',
    expected: 0
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    valance: '83 Designer Crown',
    expected: 28
  },

  {
    blindType: 'Kinetics 10mm Cellular Blind',
    valance: '83 Designer Crown',
    expected: undefined
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    valance: ' ',
    expected: 0
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    valance: 'asdasdasda',
    expected: undefined
  }
]

describe('getLewissFauxwoodValanceCost', () => {
  it.each(valanceInput)(
    'Given a $blindType and valance $valance should return $expected',
    ({ blindType, valance, expected }) => {
      const pricingSchedule = getExampleAccessorySchedule(blindType)

      const result = getLewissFauxwoodValanceCost(blindType, valance, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
