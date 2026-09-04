import { Blind } from '@shared/types/blind/blind.types'
import { describe, vi, it, expect } from 'vitest'
import {
  getExamplePricingSchedule,
  getExampleAccessorySchedule,
  getWindowDisplayAndProjectFile
} from '../utility'
import { getKineticsCellularWorksheetCostAsync } from '@renderer/utility/process/worksheet/cost'
import { getTableEntryListAsync } from '@renderer/utility/process/tableEntry'

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

describe('getKineticsCellularWorksheetCostAsync', () => {
  const blindType: Blind = 'Kinetics 10mm Cellular Blind'

  const { windowDisplayList, projectFile } = getWindowDisplayAndProjectFile(blindType)

  it('should a worksheet cost object', async () => {
    const tableEntryList = await getTableEntryListAsync(blindType, windowDisplayList, projectFile)

    const result = await getKineticsCellularWorksheetCostAsync(
      blindType,
      tableEntryList,
      windowDisplayList,
      projectFile
    )

    expect(result).toBeDefined()

    console.log(result)

    if (typeof result === 'undefined') expect.fail('result is undefined')

    expect('blindTotal' in result).toBeTruthy()
    expect(result.blindTotal).toBeGreaterThan(0)

    expect('gst' in result).toBeTruthy()
    expect(result.gst).toBeGreaterThan(0)

    expect('total' in result).toBeTruthy()
    expect(result.total).toBeGreaterThan(0)

    expect('extra' in result).toBeTruthy()
  })
})
