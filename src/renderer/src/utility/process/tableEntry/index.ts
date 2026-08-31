import { Blind } from 'shared/types/blind/blind.types'
import { ProjectFile, Room, WindowMeasurement } from 'shared/types/Project.types'
import { createTableEntryFn, TableEntry } from 'shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from 'shared/types/Window.types'
import { getRoom } from '../../windowDisplay/getRoom'
import { getWindow } from '../../windowDisplay/getWindow'

export async function getTableEntryListAsync(
  blindType: Blind,
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
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
    const result = await createFn(index, w, room, windowMeasurement, entries, file)

    for (const newEntry of result) {
      if (typeof newEntry === 'undefined') continue
      entries.push(newEntry)
    }
  }

  return entries
}

function getCurrentTableEntryIndex(tableEntryList: TableEntry[]) {
  const currentMax = tableEntryList.reduce((max, curr) => (curr.index > max ? curr.index : max), -1)
  return currentMax + 1
}

const getTableEntryFunctionMap: Record<Blind, createTableEntryFn> = {
  'Kinetics 10mm Cellular Blind': function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Kinetics 20mm Cellular Blind': function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Sunscreen Roller Blind': function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Blockout Roller Blind': function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Light Filtering Roller Blind': function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 25mm Aluminium Venetian": function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Aluminium Venetian": function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Fauxwood Venetian": function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 63mm Fauxwood Venetian": function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Phoenixwood Venetian": function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 63mm Phoenixwood Venetian": function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Mikronwood 50mm Venetian': function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Woodlore Shutter': function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Woodlore Plus Shutter': function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Waterproof Woodlore Plus Shutter': function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Normandy Shutter': function (
    index: number,
    windowDisplay: WindowDisplay,
    room: Room,
    windowMeasurement: WindowMeasurement,
    entries?: TableEntry[],
    file?: ProjectFile
  ): Promise<TableEntry[]> {
    throw new Error('Function not implemented.')
  }
}
