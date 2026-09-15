import { describe, it, expect } from 'vitest'
import { getExampleAccessorySchedule } from '../utility'

import { Blind } from '@shared/types/blind/blind.types'
import { getLewissVenetianSpacerBlockCost } from '@/utility/process/tableEntry/shared/venetian'

type SpacerBlockInput = {
  blindType: Blind
  spacerBlock: string
  expected: number | undefined
}

const spacerBlockCheckCost: SpacerBlockInput[] = [
  { blindType: "Lewis's 25mm Aluminium Venetian", spacerBlock: 'Yes', expected: 7 },
  { blindType: "Lewis's 25mm Aluminium Venetian", spacerBlock: 'No', expected: 0 },
  { blindType: "Lewis's 50mm Aluminium Venetian", spacerBlock: 'Yes', expected: 7 },
  { blindType: "Lewis's 50mm Aluminium Venetian", spacerBlock: 'No', expected: 0 }
]

const spacerBlockCheckBlindType: SpacerBlockInput[] = [
  { blindType: "Lewis's 25mm Aluminium Venetian", spacerBlock: 'Yes', expected: 7 },
  { blindType: 'Kinetics 10mm Cellular Blind', spacerBlock: 'Yes', expected: undefined }
]

const spacerBlockCheckSpacerBlock: SpacerBlockInput[] = [
  { blindType: "Lewis's 25mm Aluminium Venetian", spacerBlock: 'Yes', expected: 7 },
  { blindType: "Lewis's 25mm Aluminium Venetian", spacerBlock: 'YES', expected: 7 },
  { blindType: "Lewis's 25mm Aluminium Venetian", spacerBlock: '', expected: undefined },
  { blindType: "Lewis's 25mm Aluminium Venetian", spacerBlock: ' ', expected: undefined },
  { blindType: "Lewis's 25mm Aluminium Venetian", spacerBlock: 'asdsada', expected: undefined }
]

const spacerBlockInput: SpacerBlockInput[] = [
  ...spacerBlockCheckCost,
  ...spacerBlockCheckBlindType,
  ...spacerBlockCheckSpacerBlock
]

describe('getLewissAluminiumSpacerBlockCost', () => {
  it.each(spacerBlockInput)(
    'Given a $blindType and spacerBlock status $spacerBlock should return $expected',
    ({ blindType, spacerBlock, expected }) => {
      const pricingSchedule = getExampleAccessorySchedule(blindType)

      const result = getLewissVenetianSpacerBlockCost(spacerBlock as 'Yes' | 'No', pricingSchedule)

      if (typeof expected === 'undefined') {
        expect(result).toBeUndefined()
      } else {
        expect(result).toBeCloseTo(expected)
      }
    }
  )
})
