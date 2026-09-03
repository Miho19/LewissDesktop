// @vitest-environment happy-dom

import { describe, it, expect } from 'vitest'
import { getWindowDisplayAndProjectFile } from '../utility'

const controlInput: [string, number | undefined][] = [
  ['a', undefined],
  ['', undefined],
  [' ', undefined],
  ['cord', undefined],
  ['lithium-ion', 154]
]

describe('Control Pricing', () => {
  const { projectFile, windowDisplayList } = getWindowDisplayAndProjectFile(
    'Kinetics 10mm Cellular Blind'
  )

  it.each(controlInput)("Given the control '%s' return '%s'", () => {})
})
