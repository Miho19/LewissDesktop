import { describe, vi, it, expect } from 'vitest'
import {
  getExampleAccessorySchedule,
  getExamplePricingSchedule,
  getWindowDisplayAndProjectFile
} from '../utility'
import { Blind } from '@shared/types/blind/blind.types'
import { getTableEntryListAsync } from '@renderer/utility/process/tableEntry'
import { getKineticsMikronwoodWorksheetExtraCostAsync } from '@renderer/utility/process/worksheet/cost'

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
describe('getKineticsMikronwoodWorksheetExtraCostAsync', () => {
  const blindType: Blind = 'Kinetics Mikronwood 50mm Venetian'

  const { windowDisplayList, projectFile } = getWindowDisplayAndProjectFile(blindType)

  it('should return a list of extras', async () => {
    const tableEntryList = await getTableEntryListAsync(blindType, windowDisplayList, projectFile)

    const extraList = await getKineticsMikronwoodWorksheetExtraCostAsync(
      blindType,
      tableEntryList,
      windowDisplayList,
      projectFile
    )

    expect(extraList).toBeDefined()
    expect(Array.isArray(extraList)).toBeTruthy()

    if (typeof extraList === 'undefined') expect.fail('extra list is undefined')

    expect(extraList.length).toBeGreaterThan(0)
    expect(extraList.find((e) => e.name === '15 Channel Remote')).toBeDefined()
    expect(extraList.find((e) => e.name === 'USB Charger Cable')).toBeDefined()
  })
})
