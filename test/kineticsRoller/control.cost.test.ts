import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsRollerControlCost } from '@renderer/utility/process/tableEntry/kineticsRoller'

// add in test cases for surcharge colours
const controlInput: {
  control: string
  length: string
  expected: number | undefined
}[] = [
  {
    control: 'Chain FastRise White',
    length: '1000',
    expected: 21
  },
  {
    control: 'Chain FastRise White',
    length: '2000',
    expected: 21
  },
  {
    control: 'Chain FastRise White',
    length: '10000000',
    expected: undefined
  },

  {
    control: 'Chain FastRise Black',
    length: '   ',
    expected: undefined
  },

  {
    control: 'Chain FastRise Black',
    length: '',
    expected: undefined
  },
  {
    control: 'Chain FastRise White',
    length: '0',
    expected: undefined
  },

  {
    control: 'Chain FastRise White',
    length: '-1',
    expected: undefined
  },

  {
    control: '',
    length: '1000',
    expected: undefined
  },

  {
    control: '  ',
    length: '1000',
    expected: undefined
  },

  {
    control: 'Chain FastRise',
    length: 'a',
    expected: undefined
  },

  {
    control: 'Lithium-ion',
    length: '1000',
    expected: 170
  },
  {
    control: 'Lithium-ion',
    length: '',
    expected: 170
  },

  {
    control: 'Lithium-ion',
    length: '  ',
    expected: 170
  },

  {
    control: 'Hardwired Smart Home',
    length: '1000',
    expected: 202
  },

  {
    control: 'Hardwired WiFi Remote Control',
    length: '1000',
    expected: 202
  }
]

describe('getKineticsRollerControlCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics Blockout Roller Blind')

  it.each(controlInput)(
    'given the control: $control with length: $length should return $expected',
    ({ control, length, expected }) => {
      const result = getKineticsRollerControlCost(control, length, pricingSchedule)
      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
