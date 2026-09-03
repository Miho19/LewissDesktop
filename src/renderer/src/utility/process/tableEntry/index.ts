import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile, Room, WindowMeasurement } from '@shared/types/Project.types'
import { createTableEntryFn, TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/Window.types'
import { getRoom } from '../../windowDisplay/getRoom'
import { getWindow } from '../../windowDisplay/getWindow'
import { getKineticsCellularTableEntryAsync } from './kineticsCellular/getKineticsCellularTableEntryList'

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
    const result = await createFn(blindType, index, w, room, windowMeasurement, entries, file)

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
  'Kinetics 10mm Cellular Blind': getKineticsCellularTableEntryAsync,
  'Kinetics 20mm Cellular Blind': getKineticsCellularTableEntryAsync
}
