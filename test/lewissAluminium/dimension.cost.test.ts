import { describe, it, expect } from 'vitest'
import { getExamplePricingSchedule } from '../utility'
import { getLewissAluminiumDimensionCost } from '@/utility/process/tableEntry/lewissAluminium'
import { Blind } from '@shared/types/blind/blind.types'

type TestInput = {
  blindType: Blind
  width: number
  height: number
  fabricMultiplier: number
  control: string
  expected: number | undefined
}

const dimensionInputCheckCost: TestInput[] = [
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cordless',
    expected: 84
  },
  {
    blindType: "Lewis's 50mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 90
  },
  {
    blindType: "Lewis's 50mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cordless',
    expected: 142.8
  }
]

const dimensionInputCheckControl: TestInput[] = [
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'CORD',
    expected: 60
  },
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cordless',
    expected: 84
  },
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'CORDLESS',
    expected: 84
  },

  //
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: '',
    expected: undefined
  },
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: '   ',
    expected: undefined
  },
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'asdsada',
    expected: undefined
  }
]

const dimensionInputCheckFabricMultiplier: TestInput[] = [
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 2,
    control: 'cord',
    expected: 120
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 3,
    control: 'cord',
    expected: 180
  },
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 10,
    control: 'cord',
    expected: undefined
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 0,
    control: 'cord',
    expected: undefined
  },
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: -1,
    control: 'cord',
    expected: undefined
  }
]

const dimensionInputCheckHeight: TestInput[] = [
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 899,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 850,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 849,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 801,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 0,
    fabricMultiplier: 1,
    control: 'cord',
    expected: undefined
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: -1,
    fabricMultiplier: 1,
    control: 'cord',
    expected: undefined
  }
]

const dimensionInputCheckWidth: TestInput[] = [
  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1200,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1199,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1150,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1149,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 1101,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: 60
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
    width: 0,
    height: 900,
    fabricMultiplier: 1,
    control: 'cord',
    expected: undefined
  },

  {
    blindType: "Lewis's 25mm Aluminium Venetian",
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

describe('getLewissAluminiumDimensionCost', () => {
  it.each(dimensionInput)(
    'Given a $blindType with dimensions ($width x $height) with a fabric multiplier of $fabricMultiplier and control $control should return $expected',
    ({ blindType, width, height, fabricMultiplier, control, expected }) => {
      const pricingSchedule = getExamplePricingSchedule(blindType)

      const result = getLewissAluminiumDimensionCost(
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
