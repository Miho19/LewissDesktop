import { describe, vi, it, expect } from 'vitest'
import {
  getExampleAccessorySchedule,
  getExamplePricingSchedule,
  getWindowDisplayAndProjectFile
} from '../utility'
import { Blind } from '@shared/types/blind/blind.types'
import { getTableEntryListAsync } from '@renderer/utility/process/tableEntry'
import { getLewissAluminiumWorksheetExtraCostAsync } from '@/utility/process/worksheet/cost'

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

const input: { blindType: Blind }[] = [
  { blindType: "Lewis's 25mm Aluminium Venetian" },
  { blindType: "Lewis's 50mm Aluminium Venetian" }
]

describe('getLewissAluminiumWorksheetExtraCostAsync', () => {
  it.each(input)('should return a list of extras for $blindType', async ({ blindType }) => {
    const { windowDisplayList, projectFile } = getWindowDisplayAndProjectFile(blindType)
    const tableEntryList = await getTableEntryListAsync(blindType, windowDisplayList, projectFile)

    const extraList = await getLewissAluminiumWorksheetExtraCostAsync(
      blindType,
      tableEntryList,
      windowDisplayList,
      projectFile
    )

    expect(extraList).toBeDefined()
    expect(Array.isArray(extraList)).toBeTruthy()

    if (typeof extraList === 'undefined') expect.fail('extra list is undefined')

    expect(extraList.length).toBe(0)
  })
})
