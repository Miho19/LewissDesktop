import { getKineticsRollerBracketCost } from '@/utility/process/tableEntry/kineticsRoller/getKineticsBracketCost'

import { getExamplePricingSchedule } from '../utility'
import { describe, it, expect } from 'vitest'
import {
  KineticsRollerBracketColourOption,
  KineticsRollerBracketSizeOption,
  KineticsRollerConnectedBracketColourOption,
  KineticsRollerConnectedBracketOption
} from '@shared/types/spec/kineticsRoller.types'

const bracketInput: {
  colour: (typeof KineticsRollerBracketColourOption)[number]
  size: (typeof KineticsRollerBracketSizeOption)[number]
  butting: string
  expected: number | undefined
}[] = [
  { colour: 'black', size: '40mm', butting: '', expected: 0 },
  { colour: 'black', size: 'combo front', butting: '', expected: 54 },
  { colour: 'black', size: 'combo back', butting: '', expected: 0 },
  { colour: 'black', size: '55mm', butting: '', expected: 0 },
  { colour: 'cream', size: '40mm', butting: '', expected: 0 },
  {
    colour: '' as (typeof KineticsRollerBracketColourOption)[number],
    size: '' as (typeof KineticsRollerBracketSizeOption)[number],
    butting: '',
    expected: undefined
  }
]

const connectedBracketInput: {
  colour: (typeof KineticsRollerConnectedBracketColourOption)[number]
  option: (typeof KineticsRollerConnectedBracketOption)[number]
  butting: string
  expected: number | undefined
}[] = [
  { colour: 'black', option: 'inline', butting: 'LHS', expected: 109 },
  { colour: 'black', option: 'inline', butting: 'RHS', expected: 0 },
  { colour: 'black', option: 'intermediate', butting: 'LHS', expected: 54 },
  { colour: 'black', option: 'intermediate', butting: 'RHS', expected: 0 },
  {
    colour: '' as (typeof KineticsRollerConnectedBracketColourOption)[number],
    option: 'inline',
    butting: 'LHS',
    expected: undefined
  },
  {
    colour: 'black',
    option: '' as (typeof KineticsRollerConnectedBracketOption)[number],
    butting: 'LHS',
    expected: undefined
  }

  // will add these back in later date
  // {
  //   colour: 'black',
  //   option: 'inline',
  //   butting: '',
  //   expected: undefined
  // },

  // {
  //   colour: 'black',
  //   option: 'inline',
  //   butting: '   ',
  //   expected: undefined
  // }
]

describe('getKineticsRollerBracketCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics Blockout Roller Blind')

  it.each(bracketInput)(
    'given the bracket $size - $colour with butting $butting expect $expected',
    ({ colour, size, butting, expected }) => {
      const bracket = `${size} - ${colour}`

      if (typeof expected === 'undefined') {
        expect(() => getKineticsRollerBracketCost(bracket, butting, pricingSchedule)).toThrow()
      } else {
        expect(getKineticsRollerBracketCost(bracket, butting, pricingSchedule)).toBeCloseTo(
          expected
        )
      }
    }
  )

  it.each(connectedBracketInput)(
    'given the bracket $option - $colour with butting $butting expect $expected',
    ({ colour, option, butting, expected }) => {
      const bracket = `${option} - ${colour}`

      if (typeof expected === 'undefined') {
        expect(() => getKineticsRollerBracketCost(bracket, butting, pricingSchedule)).toThrow()
      } else {
        expect(getKineticsRollerBracketCost(bracket, butting, pricingSchedule)).toBeCloseTo(
          expected
        )
      }
    }
  )
})
