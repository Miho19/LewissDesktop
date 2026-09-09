import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getSantaFeShutterDimensionCost } from '@renderer/utility/process/tableEntry/santaFeShutter'
import { Blind } from '@shared/types/blind/blind.types'

const dimensionInput: {
  blindType: Blind
  width: number
  height: number
  expected: number | undefined
}[] = [
  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 1200,
    height: 900,
    expected: 456.4
  },
  {
    blindType: 'Kinetics 10mm Cellular Blind',
    width: 1200,
    height: 900,
    expected: undefined
  },
  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 1199,
    height: 900,
    expected: 456.4
  },
  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 1101,
    height: 900,
    expected: 456.4
  },

  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 1200,
    height: 899,
    expected: 456.4
  },

  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 1200,
    height: 801,
    expected: 456.4
  },

  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 0,
    height: 900,
    expected: undefined
  },

  {
    blindType: 'Santa Fe Normandy Shutter',
    width: -1,
    height: 900,
    expected: undefined
  },

  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 1200,
    height: 0,
    expected: undefined
  },

  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 1200,
    height: -1,
    expected: undefined
  },

  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 0,
    height: 0,
    expected: undefined
  },

  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 2966,
    height: 900,
    expected: undefined
  },

  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 1200,
    height: 3001,
    expected: undefined
  },

  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 1900,
    height: 1300,
    expected: 1045.8
  },

  {
    blindType: 'Santa Fe Normandy Shutter',
    width: 2950,
    height: 3000,
    expected: 3746.4
  }
]

describe('getKineticsRollerDimensionCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Santa Fe Normandy Shutter')

  it.each(dimensionInput)(
    "Given the blindType: $blindType at dimensions ($width x $height) should return '$expected' ",
    ({ blindType, width, height, expected }) => {
      const result = getSantaFeShutterDimensionCost(blindType, width, height, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
