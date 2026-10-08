import { kineticsCellularWindowTableColumnDefinition } from '@/components/windowTable/utility/columnDefinitions/kineticsCellular'
import { windowTableColumnBase } from '@/components/windowTable/utility/columnDefinitions/defaultDefinition'
import { Blind } from '@shared/types/blind/blind.types'
import { kineticsRollerWindowTableColumnDefinition } from '@/components/windowTable/utility/columnDefinitions/kineticsRoller'

export * from './kineticsCellular'

export function getWindowFormTableColumnDefinition(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
    case 'Kinetics 20mm Cellular Blind':
      return kineticsCellularWindowTableColumnDefinition
    case 'Kinetics Blockout Roller Blind':
    case 'Kinetics Light Filtering Roller Blind':
    case 'Kinetics Sunscreen Roller Blind':
      return kineticsRollerWindowTableColumnDefinition
    default:
      return windowTableColumnBase
  }
}
