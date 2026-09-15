import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getLewissAluminiumDimensionCost } from '@/utility/process/tableEntry/lewissAluminium'
import { Blind } from '@shared/types/blind/blind.types'
import { getLewissFauxwoodDimensionCost } from '@/utility/process/tableEntry/lewissFauxwood'

type TestInput = {
  blindType: Blind
  width: number
  height: number
  fabricMultiplier: number
  control: string
  expected: number | undefined
}

describe('getLewissFauxwoodDimensionCost', () => {
  it.each(dimensionInput)(
    'Given a $blindType with dimensions ($width x $height) with a fabric multiplier of $fabricMultiplier and control $control should return $expected',
    ({ blindType, width, height, fabricMultiplier, control, expected }) => {
      const pricingSchedule = getExamplePricingSchedule(blindType)

      const result = getLewissFauxwoodDimensionCost(
        blindType,
        width,
        height,
        fabricMultiplier,
        control,
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
