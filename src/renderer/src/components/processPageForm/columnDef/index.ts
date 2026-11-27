import { ProcessPageTableFeatures } from '@/components/processPageForm/ProcessPageTableUtility'
import { Blind } from '@shared/types/blind/blind.types'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'
import { createColumnHelper } from '@tanstack/react-table'

export function getProcessPageTableColumnDef(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
    case 'Kinetics 20mm Cellular Blind':
      return ProcessPageTableBaseColumnDef
    case 'Kinetics Blockout Roller Blind':
    case 'Kinetics Light Filtering Roller Blind':
    case 'Kinetics Sunscreen Roller Blind':
      return ProcessPageTableBaseColumnDef
    case 'Kinetics Mikronwood 50mm Venetian':
      return ProcessPageTableBaseColumnDef

    case "Lewis's 25mm Aluminium Venetian":
    case "Lewis's 50mm Aluminium Venetian":
      return ProcessPageTableBaseColumnDef
    case "Lewis's 50mm Fauxwood Venetian":
    case "Lewis's 63mm Fauxwood Venetian":
      return ProcessPageTableBaseColumnDef

    case "Lewis's 50mm Phoenixwood Venetian":
    case "Lewis's 63mm Phoenixwood Venetian":
      return ProcessPageTableBaseColumnDef

    case 'Santa Fe Normandy Shutter':
    case 'Santa Fe Waterproof Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Shutter':
      return ProcessPageTableBaseColumnDef
    default:
      return ProcessPageTableBaseColumnDef
  }
}

const columnHelper = createColumnHelper<typeof ProcessPageTableFeatures, WindowTableEntry>()

export const ProcessPageTableBaseColumnDef = columnHelper.columns([
  columnHelper.accessor((row) => row.tableEntry.location, {
    size: 250,
    minSize: 200,
    maxSize: 350,
    id: 'location',
    header: 'Location'
  }),

  columnHelper.accessor((row) => row.tableEntry.width, {
    id: 'width',
    header: 'Width (mm)'
  }),

  columnHelper.accessor((row) => row.tableEntry.height, {
    id: 'height',
    header: 'Height (mm)'
  }),

  columnHelper.accessor((row) => row.tableEntry.fit, {
    id: 'fit',
    header: 'Fit'
  })
])
