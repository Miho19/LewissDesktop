import { TableEntry } from './TableEntry.types'

export type KineticsMikronwoodTableEntry = {
  index: number
  location: string
  width: number
  height: number
  fit: string
  colour: string
  control: string
  'control side': string
  'tilt side': string
  fascia: string
  'hold down bracket': string
  butting: string
  remote: number
  channel: number
  price: string
}

export function isKineticsMikronwoodTableEntryList(
  tableEntryList: TableEntry[]
): tableEntryList is KineticsMikronwoodTableEntry[] {
  if (typeof tableEntryList === 'undefined') if (!Array.isArray(tableEntryList)) return false
  if (tableEntryList.length === 0) return false
  return tableEntryList.every((e) => isKineticsMikronwoodTableEntry(e))
}

export function isKineticsMikronwoodTableEntry(
  tableEntry: TableEntry
): tableEntry is KineticsMikronwoodTableEntry {
  if (typeof tableEntry === 'undefined') return false
  if (!('tilt side' in tableEntry)) return false
  if (!('fascia' in tableEntry)) return false
  if (!('hold down bracket' in tableEntry)) return false

  return true
}
