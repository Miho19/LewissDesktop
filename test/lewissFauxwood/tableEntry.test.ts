import { describe, vi, it, expect, afterAll } from 'vitest'

import {
  getExampleAccessorySchedule,
  getExamplePricingSchedule,
  getWindowDisplayAndProjectFile
} from '../utility'

import { getRoom } from '@renderer/utility/windowDisplay/getRoom'
import { getWindow } from '@renderer/utility/windowDisplay/getWindow'

import type { Blind } from '@shared/types/blind/blind.types'
import { getLewissFauxwoodTableEntryAsync } from '@/utility/process/tableEntry/lewissFauxwood'
import { isLewissFauxwoodTableEntry } from '@shared/types/tableEntry/lewissFauxwood.types'

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

describe('getLewissFauxwoodTableEntryAsync', () => {
  afterAll(() => vi.clearAllMocks())

  const entryInput: { blindType: Blind }[] = [
    { blindType: "Lewis's 50mm Fauxwood Venetian" },
    { blindType: "Lewis's 63mm Fauxwood Venetian" }
  ]

  it.each(entryInput)(
    'should return a table entry with a cost for a $blindType ',
    async ({ blindType }) => {
      const { projectFile, windowDisplayList } = getWindowDisplayAndProjectFile(blindType)

      const windowDisplay = windowDisplayList[0]

      const room = getRoom(windowDisplay.roomId, projectFile)
      const windowMeasurement = getWindow(windowDisplay.windowId, projectFile)

      if (typeof room === 'undefined' || typeof windowMeasurement === 'undefined')
        expect.fail('undefined room or window')

      const result = await getLewissFauxwoodTableEntryAsync(
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
      expect(isLewissFauxwoodTableEntry(tableEntry)).toBeTruthy()
      expect(parseInt(tableEntry.price)).toBeGreaterThan(0)
    }
  )
})
