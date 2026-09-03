// @vitest-environment happy-dom

import { describe, it, expect } from 'vitest'

const controlInput: [string, number | undefined][] = [
  ['a', undefined],
  ['', undefined],
  [' ', undefined],
  ['cord', undefined],
  ['lithium-ion', 154]
]

describe('Control Pricing', () => {
  it.each(controlInput)("Given the control '%s' return '%s'", () => {})
})
