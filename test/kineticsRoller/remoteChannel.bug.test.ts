import { describe, it, vi, afterAll, expect } from 'vitest'
import jsonProjectFile from '../fixtures/project-file-bug-remote-channel.json'
import { ProjectFile } from '@shared/types/Project.types'
import { getWindowDisplayList } from '@/utility/windowDisplay/getWindowDisplayList'
import { Blind } from '@shared/types/blind/blind.types'
import { getExamplePricingSchedule, getExampleAccessorySchedule } from '../utility'
import { getTableEntryListAsync } from '@/utility/process/tableEntry'
import { isKineticsTableEntryList } from '@shared/types/tableEntry/kinetics'
import { isKineticsRollerTableEntryList } from '@shared/types/tableEntry/kineticsRoller.types'

// for this specfic file
// remote and channel of lithium-ion blinds, first two are not being
// allocated a remote and channel automatically

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

describe('Kinetics Roller Remote Channel Bug Fix', () => {
  afterAll(() => vi.clearAllMocks())

  const projectFile = getProjectFileFromJSON()
  const blindType: Blind = 'Kinetics Sunscreen Roller Blind'

  it('should return a list of table entry with lithium-ion entries having a remote and channel', async () => {
    const list = getWindowDisplayList(projectFile)

    const tableEntryList = await getTableEntryListAsync(blindType, list, projectFile)

    expect(tableEntryList).toBeDefined()
    expect(tableEntryList.length).toBeGreaterThan(0)

    if (!isKineticsRollerTableEntryList(tableEntryList)) {
      expect.fail('List should be Kinetics Roller table entry')
      return
    }

    const filteredList = tableEntryList.filter((t) => t.control.includes('Lithium-ion'))
    if (filteredList.length === 0) {
      expect.fail('failed to get lithium-ion entries')
      return
    }

    filteredList.forEach((t) => {
      expect(t.remote).toBeGreaterThan(0)
      expect(t.channel).toBeGreaterThan(0)
    })
  })
})
