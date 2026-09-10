import { describe, vi, it, expect } from 'vitest'
import {
  getExampleAccessorySchedule,
  getExamplePricingSchedule,
  getWindowDisplayAndProjectFile
} from '../utility'
import { Blind } from '@shared/types/blind/blind.types'
import { getTableEntryListAsync } from '@/utility/process/tableEntry'
import { getSantaFeShutterWorksheetExtraCostAsync } from '@/utility/process/worksheet/cost/kinetics/getSantaFeShutterWorksheetExtraCost'

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

describe('getSantaFeShutterWorksheetExtraCostAsync', () => {
  const blindType: Blind = 'Santa Fe Woodlore Plus Shutter'

  const { windowDisplayList, projectFile } = getWindowDisplayAndProjectFile(blindType)

  it('should return a list of extras', async () => {
    const tableEntryList = await getTableEntryListAsync(blindType, windowDisplayList, projectFile)

    const extraList = await getSantaFeShutterWorksheetExtraCostAsync(
      blindType,
      tableEntryList,
      windowDisplayList,
      projectFile
    )

    expect(extraList).toBeDefined()
    expect(Array.isArray(extraList)).toBeTruthy()

    if (typeof extraList === 'undefined') expect.fail('extra list is undefined')

    expect(extraList.length).toBeGreaterThan(0)
    expect(extraList.find((e) => e.name === 'Designer Colour')).toBeDefined()
    expect(extraList.find((e) => e.name === 'SmartDial 5Ch Remote')).toBeDefined()
    expect(extraList.find((e) => e.name === 'ShadeAuto Hub')).toBeDefined()
    expect(extraList.find((e) => e.name === 'USB Charging Cable')).toBeDefined()
  })
})
