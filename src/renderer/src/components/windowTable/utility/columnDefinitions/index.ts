import { kineticsCellularWindowTableColumnDefinition } from '@/components/windowTable/utility/columnDefinitions/kineticsCellular'
import { windowTableColumnBase } from '@/components/windowTable/utility/columnDefinitions/defaultDefinition'
import { Blind } from '@shared/types/blind/blind.types'
import { kineticsRollerWindowTableColumnDefinition } from '@/components/windowTable/utility/columnDefinitions/kineticsRoller'
import { kineticsMikronwoodWindowTableColumnDefinition } from '@/components/windowTable/utility/columnDefinitions/kineticsMikronwood'
import {
  LewissAluminiumWindowTableColumnDefinition,
  LewissFauxwoodWindowTableColumnDefinition,
  LewissPhoenixwoodWindowTableColumnDefinition
} from '@/components/windowTable/utility/columnDefinitions/venetian'
import { SantaFeShutterWindowTableColumnDefinition } from '@/components/windowTable/utility/columnDefinitions/santaFeShutter'

export * from './kineticsCellular'
export * from './kineticsRoller'
export * from './kineticsMikronwood'
export * from './santaFeShutter'
export * from './venetian'

export function getWindowFormTableColumnDefinition(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
    case 'Kinetics 20mm Cellular Blind':
      return kineticsCellularWindowTableColumnDefinition
    case 'Kinetics Blockout Roller Blind':
    case 'Kinetics Light Filtering Roller Blind':
    case 'Kinetics Sunscreen Roller Blind':
      return kineticsRollerWindowTableColumnDefinition
    case 'Kinetics Mikronwood 50mm Venetian':
      return kineticsMikronwoodWindowTableColumnDefinition

    case "Lewis's 25mm Aluminium Venetian":
    case "Lewis's 50mm Aluminium Venetian":
      return LewissAluminiumWindowTableColumnDefinition
    case "Lewis's 50mm Fauxwood Venetian":
    case "Lewis's 63mm Fauxwood Venetian":
      return LewissFauxwoodWindowTableColumnDefinition

    case "Lewis's 50mm Phoenixwood Venetian":
    case "Lewis's 63mm Phoenixwood Venetian":
      return LewissPhoenixwoodWindowTableColumnDefinition

    case 'Santa Fe Normandy Shutter':
    case 'Santa Fe Waterproof Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Shutter':
      return SantaFeShutterWindowTableColumnDefinition
    default:
      return windowTableColumnBase
  }
}
