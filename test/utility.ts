import { Blind } from '@shared/types/blind/blind.types'
import exampleProjectFile from './fixtures/projectFile.json'
import { ProjectFile } from '@shared/types/Project.types'
import { getWindowDisplayList } from '@renderer/utility/windowDisplay/getWindowDisplayList'
import { getBlindTypeFromSpec } from '@renderer/utility/process/worksheet/getBlindTypeFromSpec'
import { WindowDisplay } from '@shared/types/Window.types'
import kineticsCellularPricingSchedule from './fixtures/kinetics-cellular-pricing-schedule.json'
import kineticsRollerBlockoutLightFilteringPricingSchedule from './fixtures/kinetics-roller-blockout-lightfiltering-pricing-schedule.json'
import kineticsRollerSunscreenPricingSchedule from './fixtures/kinetics-roller-sunscreen-pricing-schedule.json'
import kineticsMikronwoodPricingSchedule from './fixtures/kinetics-mikronwood-pricing-schedule.json'
import lewissAluminiumPricingSchedule from './fixtures/lewiss-aluminium-venetian-pricing-schedule.json'
import lewissFauxwoodPricingSchedule from './fixtures/lewiss-fauxwood-pricing-schedule.json'
import lewissPhoenixwoodPricingSchedule from './fixtures/lewiss-phoenixwood-pricing-schedule.json'
import santaFeShutterPricingSchedule from './fixtures/santaFeShutterPricingSchedule.json'
import kineticsAccessorySchedule from './fixtures/kinetics-accessories.json'
import venetianAccessorySchedule from './fixtures/venetian-accessories.json'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'

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

export function getExamplePricingSchedule(blindType: Blind): PricingSchedule {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
    case 'Kinetics 20mm Cellular Blind':
      return kineticsCellularPricingSchedule
    case 'Kinetics Blockout Roller Blind':
    case 'Kinetics Light Filtering Roller Blind':
      return kineticsRollerBlockoutLightFilteringPricingSchedule
    case 'Kinetics Sunscreen Roller Blind':
      return kineticsRollerSunscreenPricingSchedule
    case 'Kinetics Mikronwood 50mm Venetian':
      return kineticsMikronwoodPricingSchedule
    case "Lewis's 25mm Aluminium Venetian":
    case "Lewis's 50mm Aluminium Venetian":
      return lewissAluminiumPricingSchedule
    case "Lewis's 50mm Fauxwood Venetian":
    case "Lewis's 63mm Fauxwood Venetian":
      return lewissFauxwoodPricingSchedule
    case "Lewis's 50mm Phoenixwood Venetian":
    case "Lewis's 63mm Phoenixwood Venetian":
      return lewissPhoenixwoodPricingSchedule
    case 'Santa Fe Normandy Shutter':
    case 'Santa Fe Waterproof Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Shutter':
      return santaFeShutterPricingSchedule

    default:
      throw new Error(`${blindType} does not have a pricing schedule`)
  }
}

export function getExampleAccessorySchedule(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
    case 'Kinetics 20mm Cellular Blind':
    case 'Kinetics Blockout Roller Blind':
    case 'Kinetics Light Filtering Roller Blind':
    case 'Kinetics Sunscreen Roller Blind':
    case 'Kinetics Mikronwood 50mm Venetian':
      return kineticsAccessorySchedule
    case "Lewis's 25mm Aluminium Venetian":
    case "Lewis's 50mm Aluminium Venetian":
    case "Lewis's 50mm Fauxwood Venetian":
    case "Lewis's 63mm Fauxwood Venetian":
    case "Lewis's 50mm Phoenixwood Venetian":
    case "Lewis's 63mm Phoenixwood Venetian":
      return venetianAccessorySchedule
    case 'Santa Fe Normandy Shutter':
    case 'Santa Fe Waterproof Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Shutter':
      return santaFeShutterPricingSchedule
    default:
      throw new Error(`${blindType} does not have a accessory schedule`)
  }
}
