import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsRollerDimensionCost } from '@renderer/utility/process/tableEntry/kineticsRoller'

const dimensionInput: {
  width: number
  height: number
  fabricMultiplier: number
  expected: number | undefined
}[] = [
  { width: 1200, height: 900, fabricMultiplier: 1, expected: 333.03 },
  { width: 1199, height: 900, fabricMultiplier: 1, expected: 333.03 },
  { width: 1101, height: 900, fabricMultiplier: 1, expected: 333.03 },
  { width: 1200, height: 899, fabricMultiplier: 1, expected: 333.03 },
  { width: 1200, height: 801, fabricMultiplier: 1, expected: 333.03 },
  { width: 1101, height: 801, fabricMultiplier: 1, expected: 333.03 },
  { width: 0, height: 900, fabricMultiplier: 1, expected: undefined },
  { width: -1, height: 900, fabricMultiplier: 1, expected: undefined },
  { width: 1200, height: -1, fabricMultiplier: 1, expected: undefined }
]

describe('getKineticsRollerDimensionCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics Blockout Roller Blind')

  it.each(dimensionInput)(
    "Given the dimensions ($width x $height) with multiplier '$fabricMultiplier' should return '$expected' ",
    ({ width, height, fabricMultiplier, expected }) => {
      const result = getKineticsRollerDimensionCost(
        width,
        height,
        fabricMultiplier,
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
