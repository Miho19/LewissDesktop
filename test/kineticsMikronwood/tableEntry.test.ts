import { describe, vi, it, expect, afterAll } from 'vitest'

import {
  getExampleAccessorySchedule,
  getExamplePricingSchedule,
  getWindowDisplayAndProjectFile
} from '../utility'

import { getRoom } from '@renderer/utility/windowDisplay/getRoom'
import { getWindow } from '@renderer/utility/windowDisplay/getWindow'

import type { Blind } from '@shared/types/blind/blind.types'
import { isKineticsMikronwoodTableEntry } from '@shared/types/tableEntry/kineticsMikronwood.types'
import { getKineticsMikronwoodTableEntryAsync } from '@/utility/process/tableEntry/kineticsMikronwood'

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

describe('getKineticsMikronwoodTableEntryAsync', () => {
  afterAll(() => vi.clearAllMocks())

  const blindType: Blind = 'Kinetics Mikronwood 50mm Venetian'

  const { projectFile, windowDisplayList } = getWindowDisplayAndProjectFile(blindType)

  it('should return a table entry with a cost', async () => {
    const windowDisplay = windowDisplayList[0]

    const room = getRoom(windowDisplay.roomId, projectFile)
    const windowMeasurement = getWindow(windowDisplay.windowId, projectFile)

    if (typeof room === 'undefined' || typeof windowMeasurement === 'undefined')
      expect.fail('undefined room or window')

    const result = await getKineticsMikronwoodTableEntryAsync(
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
    expect(isKineticsMikronwoodTableEntry(tableEntry)).toBeTruthy()
    expect(parseInt(tableEntry.price)).toBeGreaterThan(0)
  })
})
