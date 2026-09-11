import {
  getWindowDisplay,
  getWindowDisplayList
} from '@/utility/windowDisplay/getWindowDisplayList'
import { getExampleProjectFile } from '../utility'
import { describe, it, expect } from 'vitest'

describe('getWindowDisplayList', () => {
  it('should return a list of window display', () => {
    const projectFile = getExampleProjectFile()

    const result = getWindowDisplayList(projectFile)

    expect(result).toBeDefined()
    if (typeof result === 'undefined') return
    expect(Array.isArray(result)).toBeTruthy()
    expect(result.length).toBeGreaterThan(0)
  })
})
