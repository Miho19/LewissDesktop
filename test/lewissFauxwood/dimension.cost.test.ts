import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
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

//  ;([1200, 900, 50, 1, 'Cord', 74],
//    [1200, 900, 50, 1, 'Cordless', 92.5],
//    [1200, 900, 63, 1, 'Cord', 77.7],
//    [1200, 900, 63, 1, 'Cordless', 97.68],
//    [100, 900, 63, 1, 'Cordless', 66],
//    [1200, 100, 63, 1, 'Cordless', 66],
//    [0, 100, 50, 1, 'Cordless', undefined],
//    [0, 0, 50, 1, 'Cordless', undefined],
//    [1200, 0, 50, 1, 'Cordless', undefined],
//    [1200, 900, 3, 1, 'Cordless', undefined],
//    [1200, 900, 5, 1, 'Cordless', undefined],
//    [1200, 900, 63, 1.5, 'Cord', 116.55],
//    [1200, 900, 63, 1, 'Corded', undefined],
//    [1200, 900, 63, 1, '', undefined],
//    [1200, 900, 63, 1, '  ', undefined],

const dimensionInputCheckCost: TestInput[] = [
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 74
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cordless',
    expected: 92.5
  },
  {
    blindType: "Lewis's 63mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 77.7
  },
  {
    blindType: "Lewis's 63mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cordless',
    expected: 97.68
  }
]

const dimensionInputCheckControl: TestInput[] = [
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'CORD',
    expected: 74
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cordless',
    expected: 92.5
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'CORDLESS',
    expected: 92.5
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: '',
    expected: undefined
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: '   ',
    expected: undefined
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'asdsada',
    expected: undefined
  }
]

const dimensionInputCheckFabricMultiplier: TestInput[] = [
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 74
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 2,
    control: 'cord',
    expected: 148
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 3,
    control: 'cord',
    expected: 222
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 10,
    control: 'cord',
    expected: undefined
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 0,
    control: 'cord',
    expected: undefined
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: -1,
    control: 'cord',
    expected: undefined
  }
]

const dimensionInputCheckHeight: TestInput[] = [
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 74
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 899,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 74
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 850,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 74
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 849,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 74
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 801,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 74
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 0,
    fabricMultiplier: 1,
    control: 'cord',
    expected: undefined
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: -1,
    fabricMultiplier: 1,
    control: 'cord',
    expected: undefined
  }
]

const dimensionInputCheckWidth: TestInput[] = [
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 74
  },
  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1199,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 74
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1150,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 74
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1149,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 74
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 1101,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 74
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: 0,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: undefined
  },

  {
    blindType: "Lewis's 50mm Fauxwood Venetian",
    width: -1,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: undefined
  }
]

const dimensionInput: TestInput[] = [
  ...dimensionInputCheckCost,
  ...dimensionInputCheckControl,
  ...dimensionInputCheckFabricMultiplier,
  ...dimensionInputCheckHeight,
  ...dimensionInputCheckWidth
]

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
