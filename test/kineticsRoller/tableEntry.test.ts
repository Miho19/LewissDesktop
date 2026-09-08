import { Blind } from 'shared/types/blind/blind.types'
import { describe, vi, it, expect, afterAll } from 'vitest'
import {
  getExamplePricingSchedule,
  getExampleAccessorySchedule,
  getWindowDisplayAndProjectFile
} from '../utility'
import { getRoom } from '@renderer/utility/windowDisplay/getRoom'
import { getWindow } from '@renderer/utility/windowDisplay/getWindow'
import { isKineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { getKineticsRollerTableEntryAsync } from '@renderer/utility/process/tableEntry/kineticsRoller'

vi.mock(
  '@renderer/utility/process/tableEntry/shared/retrievePricingSchedule',
  async (importOriginal) => {
    const actual =
      await importOriginal<
        typeof import('@renderer/utility/process/tableEntry/shared/retrievePricingSchedule')
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

describe('getKineticsRollerTableEntryAsync', () => {
  afterAll(() => vi.clearAllMocks())

  const blindType: Blind = 'Kinetics Blockout Roller Blind'

  const { projectFile, windowDisplayList } = getWindowDisplayAndProjectFile(blindType)

  it('should return a table entry with a cost', async () => {
    const windowDisplay = windowDisplayList[0]
    const room = getRoom(windowDisplay.roomId, projectFile)
    const windowMeasurement = getWindow(windowDisplay.windowId, projectFile)

    if (typeof room === 'undefined' || typeof windowMeasurement === 'undefined')
      expect.fail('undefined room or window')

    const result = await getKineticsRollerTableEntryAsync(
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
    expect(isKineticsRollerTableEntry(tableEntry)).toBeTruthy()
    expect(parseInt(tableEntry.price)).toBeGreaterThan(0)
  })
})
