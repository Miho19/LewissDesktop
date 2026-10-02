import { getWindowDisplayList } from '@/utility/windowDisplay/getWindowDisplayList'
import { getExampleProjectFile } from '../utility'
import { describe, it, expect } from 'vitest'

describe.skip('getWindowDisplayList', () => {
  it('should return a list of window display', () => {
    const projectFile = getExampleProjectFile()

    const list = getWindowDisplayList(projectFile)

    expect(list).toBeDefined()
    if (typeof list === 'undefined') return
    expect(Array.isArray(list)).toBeTruthy()
    expect(list.length).toBeGreaterThan(0)

    const output = list.map((wd) => {
      return `${wd.roomId}-${wd.windowId}-${wd.width}-${wd.height}-${wd.fit}-${wd.spec.fabric?.name}`
    })

    console.log(output)
  })
})

// `${roomId}-${windowId}-${width}-${height}-${fit}-${spec.fabric?.name}`
