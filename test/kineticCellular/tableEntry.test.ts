import { describe, vi, it, expect } from 'vitest'
import { getWindowDisplayAndProjectFile } from '../utility'
import { getKineticsCellularTableEntryAsync } from '@renderer/utility/process/tableEntry/kineticsCellular/getKineticsCellularTableEntryList'
import { getRoom } from '@renderer/utility/windowDisplay/getRoom'
import { getWindow } from '@renderer/utility/windowDisplay/getWindow'
import { isKineticsCellularTableEntry } from '@shared/types/tableEntry/kineticsCellular.types'

describe('getKineticsCellularTableEntryAsync', () => {
  const { projectFile, windowDisplayList } = getWindowDisplayAndProjectFile(
    'Kinetics 10mm Cellular Blind'
  )

  it('should return a table entry with a cost', async () => {
    const windowDisplay = windowDisplayList[0]

    const room = getRoom(windowDisplay.roomId, projectFile)
    const windowMeasurement = getWindow(windowDisplay.windowId, projectFile)

    if (typeof room === 'undefined' || typeof windowMeasurement === 'undefined')
      expect.fail('undefined room or window')

    const result = await getKineticsCellularTableEntryAsync(
      'Kinetics 10mm Cellular Blind',
      0,
      windowDisplay,
      room,
      windowMeasurement,
      [],
      projectFile
    )

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBeTruthy()

    const tableEntry = result[0]
    expect(tableEntry).toBeDefined()
    expect(isKineticsCellularTableEntry(tableEntry)).toBeTruthy()
    expect(parseInt(tableEntry.price)).toBeGreaterThan(0)
  })
})
