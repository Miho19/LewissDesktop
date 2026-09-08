import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsRollerBottomRailCost } from '@renderer/utility/process/tableEntry/kineticsRoller'

// add in test cases for surcharge custom colours
const bottomRailInput: {
  width: number
  bottomRailType: string
  bottomRailColour: string
  expected: number | undefined
}[] = [
  {
    width: 1200,
    bottomRailType: 'flat bottom',
    bottomRailColour: 'black',
    expected: 0
  },
  {
    width: 0,
    bottomRailType: 'flat bottom',
    bottomRailColour: 'black',
    expected: undefined
  },

  {
    width: -1,
    bottomRailType: 'flat bottom',
    bottomRailColour: 'black',
    expected: undefined
  },
  {
    width: 1200,
    bottomRailType: '',
    bottomRailColour: 'black',
    expected: undefined
  },
  {
    width: 1200,
    bottomRailType: 'flat bottom',
    bottomRailColour: '',
    expected: undefined
  },

  {
    width: 1200,
    bottomRailType: ' ',
    bottomRailColour: 'black',
    expected: undefined
  },
  {
    width: 1200,
    bottomRailType: 'flat bottom',
    bottomRailColour: ' ',
    expected: undefined
  },

  {
    width: 1200,
    bottomRailType: '',
    bottomRailColour: 'black',
    expected: undefined
  },
  {
    width: 1200,
    bottomRailType: 'flat',
    bottomRailColour: 'black',
    expected: undefined
  },

  {
    width: 1200,
    bottomRailType: '',
    bottomRailColour: 'bla',
    expected: undefined
  },

  {
    width: 1200,
    bottomRailType: 'deluxe',
    bottomRailColour: 'black',
    expected: 15.6
  }
]

describe('getKineticsRollerBottomRailCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics Blockout Roller Blind')

  it.each(bottomRailInput)(
    'given the width $width with bottom rail $bottomRailType - $bottomRailColour should return $expected',
    ({ width, bottomRailType, bottomRailColour, expected }) => {
      const result = getKineticsRollerBottomRailCost(
        width,
        bottomRailType,
        bottomRailColour,
        pricingSchedule
      )
      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
