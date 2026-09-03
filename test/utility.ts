import { Blind } from '@shared/types/blind/blind.types'
import exampleProjectFile from './fixtures/projectFile.json'
import { ProjectFile } from '@shared/types/Project.types'
import { getWindowDisplayList } from '@renderer/utility/windowDisplay/getWindowDisplayList'
import { getBlindTypeFromSpec } from '@renderer/utility/process/worksheet/getBlindTypeFromSpec'
import { WindowDisplay } from '@shared/types/Window.types'
import kineticsCellularPricingSchedule from './fixtures/kinetics-cellular-pricing-schedule.json'

export function getWindowDisplayAndProjectFile(blindType: Blind) {
  const projectFile = getProjectFile()
  const filteredList = getFilterWindowDisplay(blindType, projectFile)

  return { windowDisplayList: filteredList, projectFile }
}

function getProjectFile() {
  const projectFile: ProjectFile = JSON.parse(JSON.stringify(exampleProjectFile))
  return projectFile
}

function getFilterWindowDisplay(blindType: Blind, file: ProjectFile) {
  const windowDisplayList = getWindowDisplayList(file)
  if (typeof windowDisplayList === 'undefined') throw new Error('Window display list is undefined')

  const output: WindowDisplay[] = []

  for (const w of windowDisplayList) {
    const { fit, treatment } = w
    const spec = fit === 'inside' ? treatment.insideLayer.spec : treatment.outsideLayer.spec
    const windowBlindType = getBlindTypeFromSpec(spec)
    if (typeof windowBlindType === 'undefined') continue
    if (windowBlindType !== blindType) continue
    output.push(w)
  }

  return output
}

function getExamplePricingSchedule(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
    case 'Kinetics 20mm Cellular Blind':
      return kineticsCellularPricingSchedule

    default:
      throw new Error(`${blindType} does not have a pricing schedule`)
  }
}
