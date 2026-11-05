import { describe, expect, it } from 'vitest'
import jsonProjectFile from '../fixtures/project-file-kinetics-roller-butting.json'
import { ProjectFile } from '@shared/types/Project.types'
import { getWindowDisplayList } from '@/utility/windowDisplay/getWindowDisplayList'

function getProjectFileFromJSON() {
  const outFile: ProjectFile = JSON.parse(JSON.stringify(jsonProjectFile))
  return outFile
}

describe('Kinetics Roller Table Entry Butting', () => {
  const projectFile = getProjectFileFromJSON()

  it('should return a table entry list of butting blinds', async () => {
    const windowDisplayList = getWindowDisplayList(projectFile)

    expect(windowDisplayList).toBeDefined()
    expect(windowDisplayList.length).toBe(2)
  })
})
