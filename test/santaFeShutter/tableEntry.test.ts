import { Blind } from '@shared/types/blind/blind.types'
import { describe, vi, it, expect } from 'vitest'
import {
  getExamplePricingSchedule,
  getExampleAccessorySchedule,
  getWindowDisplayAndProjectFile
} from '../utility'
import { getRoom } from '@renderer/utility/windowDisplay/getRoom'
import { getWindow } from '@renderer/utility/windowDisplay/getWindow'
import { getSantaFeShutterTableEntryAsync } from '@renderer/utility/process/tableEntry/santaFeShutter'
import { isSantaFeShutterTableEntry } from '@shared/types/tableEntry/santaFeShutter.types'

vi.mock(
  '@renderer/utility/process/pricingSchedule/retrievePricingSchedule',
  async (importOriginal) => {
    const actual =
      await importOriginal<
        typeof import('@renderer/utility/process/pricingSchedule/retrievePricingSchedule')
      >()
    return {
      ...actual,
      retrievePricingScheduleAsync: vi
        .fn()
        .mockImplementation((blindType: Blind) => getExamplePricingSchedule(blindType)),
      retrieveAccessorySchedule: vi
        .fn()
        .mockImplementation((blindType: Blind) => getExampleAccessorySchedule(blindType))
    }
  }
)

const inputList: { blindType: Blind }[] = [
  { blindType: 'Santa Fe Normandy Shutter' },
  { blindType: 'Santa Fe Waterproof Woodlore Plus Shutter' },
  { blindType: 'Santa Fe Woodlore Plus Shutter' },
  { blindType: 'Santa Fe Woodlore Shutter' }
]

describe('getSantaFeShutterTableEntryAsync', () => {
  it.each(inputList)('should return a table entry list for $blindType', async ({ blindType }) => {
    const { projectFile, windowDisplayList } = getWindowDisplayAndProjectFile(blindType)

    const windowDisplay = windowDisplayList[0]

    if (typeof windowDisplay === 'undefined') return

    const room = getRoom(windowDisplay.roomId, projectFile)
    const windowMeasurement = getWindow(windowDisplay.windowId, projectFile)

    if (typeof room === 'undefined' || typeof windowMeasurement === 'undefined')
      expect.fail('undefined room or window')

    const result = await getSantaFeShutterTableEntryAsync(
      blindType,
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
    expect(isSantaFeShutterTableEntry(tableEntry)).toBeTruthy()
    expect(parseInt(tableEntry.price)).toBeGreaterThan(0)
  })
})
