import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsRollerPelmetCost } from '@renderer/utility/process/tableEntry/kineticsRoller'

/**
 *  add these in later
 * 
 *  [1260, "110mm - Inside", 69.49],
    [1000, "110mm - Inside", 46.33],
    [240, "110mm - Inside", 46.33],
    [5000, "110mm - Inside", 231.64],
    [1260, "160mm - Outside", 142.84],
    [1000, "160mm - Outside", 95.23],
    [240, "160mm - Outside", 95.23],
 * 
 */

const petlmetInput: {
  width: number
  pelmet: string
  expected: number | undefined
}[] = [
  {
    width: 1200,
    pelmet: '110 I/S',
    expected: 57.91
  },
  {
    width: 0,
    pelmet: '"110 I/S"',
    expected: undefined
  },

  {
    width: -1,
    pelmet: '"110 I/S"',
    expected: undefined
  },
  {
    width: 10000,
    pelmet: '"110 I/S"',
    expected: undefined
  },

  {
    width: 1200,
    pelmet: '"110',
    expected: undefined
  },

  { width: 1200, pelmet: 'I/S', expected: undefined },

  {
    width: 1200,
    pelmet: '',
    expected: undefined
  },

  {
    width: 1200,
    pelmet: '  ',
    expected: undefined
  },

  {
    width: 1200,
    pelmet: ' I/S',
    expected: undefined
  },

  {
    width: 1200,
    pelmet: '110  ',
    expected: undefined
  },
  { width: 240, pelmet: '110 I/S', expected: 46.33 },
  { width: 1200, pelmet: '150 I/S', expected: undefined }
]

describe('getKineticsRollerPelmetCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics Blockout Roller Blind')

  it.each(petlmetInput)(
    'given the width $width with pelmet $pelmet should return $expected',
    ({ width, pelmet, expected }) => {
      const result = getKineticsRollerPelmetCost(width, pelmet, pricingSchedule)
      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
