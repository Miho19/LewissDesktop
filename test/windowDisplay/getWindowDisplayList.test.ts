import {
  getWindowDisplay,
  getWindowDisplayList
} from '@/utility/windowDisplay/getWindowDisplayList'
import { getExampleProjectFile } from '../utility'
import { describe, it, expect } from 'vitest'
import { Room } from '@shared/types/Project.types'

describe('getWindowDisplayList', () => {
  it('should return a list of window display', () => {
    const projectFile = getExampleProjectFile()

    projectFile.project.rooms = room

    const list = getWindowDisplayList(projectFile)

    expect(list).toBeDefined()
    if (typeof list === 'undefined') return
    expect(Array.isArray(list)).toBeTruthy()
    expect(list.length).toBeGreaterThan(0)

    const filtered = list?.filter((w) => w.blindCount === 'dual')

    const windowDisplay = filtered[0]
  })
})
