import { describe, expect, it, vi } from 'vitest'
import jsonProjectFile from '../fixtures/project-file-kinetics-roller-butting.json'
import { ProjectFile } from '@shared/types/Project.types'
import { getWindowDisplayList } from '@/utility/windowDisplay/getWindowDisplayList'
import { getTableEntryListAsync } from '@/utility/process/tableEntry'
import { Blind } from '@shared/types/blind/blind.types'
import { getExamplePricingSchedule, getExampleAccessorySchedule } from '../utility'

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

function getProjectFileFromJSON() {
  const outFile: ProjectFile = JSON.parse(JSON.stringify(jsonProjectFile))
  return outFile
}

describe('Kinetics Roller Table Entry Butting', () => {
  it('should return a table entry list of butting blinds', async () => {
    const projectFile = getProjectFileFromJSON()
    const blindType: Blind = 'Kinetics Sunscreen Roller Blind'

    const windowDisplayList = getWindowDisplayList(projectFile)

    expect(windowDisplayList).toBeDefined()
    expect(windowDisplayList.length).toBe(2)

    const tableEntryList = await getTableEntryListAsync(blindType, windowDisplayList, projectFile)
    console.log(tableEntryList)
    expect(tableEntryList.length).toBe(4)
  })
})
