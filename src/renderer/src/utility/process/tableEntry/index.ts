import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import {
  CreateTableEntryFn,
  PreProcessFn,
  TableEntry
} from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { getRoom } from '../../windowDisplay/getRoom'
import { getWindow } from '../../windowDisplay/getWindow'
import { getKineticsCellularTableEntryAsync } from './kineticsCellular/getKineticsCellularTableEntry'
import { getKineticsRollerTableEntryAsync } from '@renderer/utility/process/tableEntry/kineticsRoller'
import { getSantaFeShutterTableEntryAsync } from '@renderer/utility/process/tableEntry/santaFeShutter'
import { getKineticsMikronwoodTableEntryAsync } from '@/utility/process/tableEntry/kineticsMikronwood'
import { getLewissAluminiumTableEntryAsync } from '@/utility/process/tableEntry/lewissAluminium'
import { getLewisPhoenixwoodTableEntryAsync } from '@/utility/process/tableEntry/lewissPhoenixwood'
import { getLewissFauxwoodTableEntryAsync } from '@/utility/process/tableEntry/lewissFauxwood'
import { getRomanTableEntryAsync } from '@/utility/process/tableEntry/roman'
import { getCurtainTableEntryAsync } from '@/utility/process/tableEntry/curtain'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { preProcessKineticsRollerAsync } from '@/utility/process/tableEntry/kineticsRoller/preprocessKineticsRoller'

export async function getTableEntryListAsync(
  blindType: Blind,
  windowDisplayList: WindowDisplay[],
  file: ProjectFile,
  cb?: (blindType: Blind, windowDisplay: WindowDisplay, tableEntry: TableEntry) => void
) {
  const createFn = getTableEntryFunctionMap[blindType]
  if (typeof createFn === 'undefined')
    throw new Error('Blind type does not have table entry creation function')

  const entries: TableEntry[] = []

  for (const w of windowDisplayList) {
    const room = getRoom(w.roomId, file)
    if (typeof room === 'undefined')
      throw new Error('Window Display room Id did not return a valid room')
    const windowMeasurement = getWindow(w.windowId, file)
    if (typeof windowMeasurement === 'undefined')
      throw new Error('Window Display window Id did not return a valid window measurement')
    const index = getCurrentTableEntryIndex(entries)

    const result = await createFn(blindType, index, w, room, windowMeasurement, entries, file)

    for (const newEntry of result) {
      if (typeof newEntry === 'undefined') continue
      entries.push(newEntry)
      cb?.(blindType, w, newEntry)
    }
  }

  return entries
}

function getCurrentTableEntryIndex(tableEntryList: TableEntry[]) {
  const currentMax = tableEntryList.reduce((max, curr) => (curr.index > max ? curr.index : max), -1)
  if (currentMax <= 0) return 1
  return currentMax + 1
}

const getTableEntryFunctionMap: Record<Blind, CreateTableEntryFn> = {
  'Kinetics 10mm Cellular Blind': getKineticsCellularTableEntryAsync,
  'Kinetics 20mm Cellular Blind': getKineticsCellularTableEntryAsync,
  'Kinetics Blockout Roller Blind': getKineticsRollerTableEntryAsync,
  'Kinetics Light Filtering Roller Blind': getKineticsRollerTableEntryAsync,
  'Kinetics Sunscreen Roller Blind': getKineticsRollerTableEntryAsync,
  'Kinetics Mikronwood 50mm Venetian': getKineticsMikronwoodTableEntryAsync,
  'Santa Fe Normandy Shutter': getSantaFeShutterTableEntryAsync,
  'Santa Fe Waterproof Woodlore Plus Shutter': getSantaFeShutterTableEntryAsync,
  'Santa Fe Woodlore Plus Shutter': getSantaFeShutterTableEntryAsync,
  'Santa Fe Woodlore Shutter': getSantaFeShutterTableEntryAsync,
  "Lewis's 25mm Aluminium Venetian": getLewissAluminiumTableEntryAsync,
  "Lewis's 50mm Aluminium Venetian": getLewissAluminiumTableEntryAsync,
  "Lewis's 50mm Fauxwood Venetian": getLewissFauxwoodTableEntryAsync,
  "Lewis's 63mm Fauxwood Venetian": getLewissFauxwoodTableEntryAsync,
  "Lewis's 50mm Phoenixwood Venetian": getLewisPhoenixwoodTableEntryAsync,
  "Lewis's 63mm Phoenixwood Venetian": getLewisPhoenixwoodTableEntryAsync,
  'Roman Blind': getRomanTableEntryAsync,
  'Separate Lining': getCurtainTableEntryAsync,
  'Unlined Curtain': getCurtainTableEntryAsync,
  'Lined Curtain': getCurtainTableEntryAsync,
  'Sheer Curtain': getCurtainTableEntryAsync,
  'Interlined Curtain': getCurtainTableEntryAsync
}

const getPreProcessFunctionMap: Record<Blind, PreProcessFn> = {
  'Roman Blind': noPreProcess,
  'Separate Lining': noPreProcess,
  'Unlined Curtain': noPreProcess,

  'Lined Curtain': noPreProcess,
  'Sheer Curtain': noPreProcess,
  'Interlined Curtain': noPreProcess,

  'Kinetics 10mm Cellular Blind': noPreProcess,
  'Kinetics 20mm Cellular Blind': noPreProcess,

  'Kinetics Sunscreen Roller Blind': preProcessKineticsRollerAsync,
  'Kinetics Blockout Roller Blind': preProcessKineticsRollerAsync,
  'Kinetics Light Filtering Roller Blind': preProcessKineticsRollerAsync,

  "Lewis's 25mm Aluminium Venetian": noPreProcess,
  "Lewis's 50mm Aluminium Venetian": noPreProcess,
  "Lewis's 50mm Fauxwood Venetian": noPreProcess,
  "Lewis's 63mm Fauxwood Venetian": noPreProcess,
  "Lewis's 50mm Phoenixwood Venetian": noPreProcess,
  "Lewis's 63mm Phoenixwood Venetian": noPreProcess,
  'Kinetics Mikronwood 50mm Venetian': noPreProcess,

  'Santa Fe Waterproof Woodlore Plus Shutter': noPreProcess,
  'Santa Fe Normandy Shutter': noPreProcess,
  'Santa Fe Woodlore Shutter': noPreProcess,
  'Santa Fe Woodlore Plus Shutter': noPreProcess
}

async function noPreProcess(
  _blindType: Blind,
  windowTableEntry: WindowTableEntry[],
  _file: ProjectFile
) {
  return windowTableEntry.map((wt) => wt.tableEntry)
}
