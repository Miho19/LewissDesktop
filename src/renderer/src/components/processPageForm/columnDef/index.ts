import { processPageTableBaseColumnDef } from '@/components/processPageForm/columnDef/defaultDef'
import { kineticsCellularProcessPageTableColumnDef } from '@/components/processPageForm/columnDef/kineticsCellular'
import { kineticsRollerProcessPageTableColumnDef } from '@/components/processPageForm/columnDef/kineticsRoller'
import { Blind } from '@shared/types/blind/blind.types'

export function getProcessPageTableColumnDef(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
    case 'Kinetics 20mm Cellular Blind':
      return kineticsCellularProcessPageTableColumnDef
    case 'Kinetics Blockout Roller Blind':
    case 'Kinetics Light Filtering Roller Blind':
    case 'Kinetics Sunscreen Roller Blind':
      return kineticsRollerProcessPageTableColumnDef

    case 'Kinetics Mikronwood 50mm Venetian':
      return processPageTableBaseColumnDef

    case "Lewis's 25mm Aluminium Venetian":
    case "Lewis's 50mm Aluminium Venetian":
      return processPageTableBaseColumnDef
    case "Lewis's 50mm Fauxwood Venetian":
    case "Lewis's 63mm Fauxwood Venetian":
      return processPageTableBaseColumnDef

    case "Lewis's 50mm Phoenixwood Venetian":
    case "Lewis's 63mm Phoenixwood Venetian":
      return processPageTableBaseColumnDef

    case 'Santa Fe Normandy Shutter':
    case 'Santa Fe Waterproof Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Shutter':
      return processPageTableBaseColumnDef
    default:
      return processPageTableBaseColumnDef
  }
}
