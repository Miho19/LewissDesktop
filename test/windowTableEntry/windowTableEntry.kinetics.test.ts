import { Blind } from '@shared/types/blind/blind.types'
import {
  getExamplePricingSchedule,
  getExampleAccessorySchedule,
  getExampleProcessFile
} from '../utility'
import { vi, describe, it, expect, afterAll } from 'vitest'
import { getWindowTableEntryListAsync } from '@/utility/process/windowTableEntry/getWindowTableEntryList'
import { isKineticsCellularTableEntryList } from '@shared/types/tableEntry/kineticsCellular.types'

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

describe('Window Table Entry List Kinetics', () => {
  afterAll(() => vi.clearAllMocks())

  it('should return a list of window table entry for Kinetics Cellular', async () => {
    const blindType: Blind = 'Kinetics 10mm Cellular Blind'
    const processFile = getExampleProcessFile(blindType)

    const result = await getWindowTableEntryListAsync(processFile)

    const tableEntryList = result.filter((w) => w.blindType === blindType).map((w) => w.tableEntry)
    expect(tableEntryList.length).toBeGreaterThan(0)
    expect(isKineticsCellularTableEntryList(tableEntryList)).toBeTruthy()
  })
})
