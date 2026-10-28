import {
  getKineticsRollerBracket,
  getKineticsRollerBracketCost
} from '@/utility/process/tableEntry/kineticsRoller/getKineticsBracketCost'
import {
  kineticsRollerBracketColourOption,
  kineticsRollerBracketSizeOption
} from '@shared/types/WindowTableForm.types'
import { getExamplePricingSchedule } from '../utility'
import { describe, it, expect } from 'vitest'

const bracketInput: {
  colour: (typeof kineticsRollerBracketColourOption)[number]
  size: (typeof kineticsRollerBracketSizeOption)[number]
  expected: number | undefined
}[] = [
  { colour: 'black', size: 'standard', expected: 0 },
  { colour: 'black', size: 'double bracket front', expected: 54 },
  { colour: 'black', size: 'double bracket back', expected: 0 },
  { colour: 'black', size: 'extra large', expected: 0 },
  { colour: 'cream', size: 'standard', expected: 0 },
  {
    colour: '' as (typeof kineticsRollerBracketColourOption)[number],
    size: '' as (typeof kineticsRollerBracketSizeOption)[number],
    expected: undefined
  }
]

describe('getKineticsRollerBracketCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics Blockout Roller Blind')

  it.each(bracketInput)(
    'given the colour $colour at size $size expect $expected',
    ({ colour, size, expected }) => {
      const bracket = `${size} - ${colour}`

      if (typeof expected === 'undefined') {
        expect(() => getKineticsRollerBracketCost(bracket, pricingSchedule)).toThrow()
      } else {
        expect(getKineticsRollerBracketCost(bracket, pricingSchedule)).toBeCloseTo(expected)
      }
    }
  )
})
