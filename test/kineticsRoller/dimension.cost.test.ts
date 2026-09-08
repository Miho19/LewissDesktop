import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getKineticsRollerDimensionCost } from '@renderer/utility/process/tableEntry/kineticsRoller'
import { Fabric } from '@shared/types/Project.types'

const lightFilteringFabric: Fabric = {
  name: '',
  collection: '',
  multiplier: 1,
  imageUrl: '',
  chipImageUrl: ''
}

const dimensionInput: {
  width: number
  height: number
  fabric: Fabric
  expected: number | undefined
}[] = [
  { width: 1200, height: 900, fabric: lightFilteringFabric, expected: 333.03 },
  { width: 1199, height: 900, fabric: lightFilteringFabric, expected: 333.03 },
  { width: 1101, height: 900, fabric: lightFilteringFabric, expected: 333.03 },
  { width: 1200, height: 899, fabric: lightFilteringFabric, expected: 333.03 },
  { width: 1200, height: 801, fabric: lightFilteringFabric, expected: 333.03 },
  { width: 1101, height: 801, fabric: lightFilteringFabric, expected: 333.03 },
  { width: 0, height: 900, fabric: lightFilteringFabric, expected: undefined },
  { width: -1, height: 900, fabric: lightFilteringFabric, expected: undefined },
  { width: 1200, height: -1, fabric: lightFilteringFabric, expected: undefined }
]

describe('getKineticsRollerDimensionCost', () => {
  const pricingSchedule = getExamplePricingSchedule('Kinetics Blockout Roller Blind')

  it.each(dimensionInput)(
    "Given the dimensions ($width x $height) with multiplier '$fabric.multiplier' should return '$expected' ",
    ({ width, height, fabric, expected }) => {
      const result = getKineticsRollerDimensionCost(width, height, fabric, pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
