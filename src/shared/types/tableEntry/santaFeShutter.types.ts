import { TableEntry } from './TableEntry.types'

export type SantaFeShutterTableEntry = {
  index: number
  location: string
  width: number
  height: number
  fit: string
  colour: string
  control: string
  'control side': string
  track: string
  'shutter pole': string
  'flush bolt': string
  price: string
}

export function isSantaFeShutterTableEntryList(
  tableEntryList: TableEntry[]
): tableEntryList is SantaFeShutterTableEntry[] {
  if (typeof tableEntryList === 'undefined') return false
  if (!Array.isArray(tableEntryList)) return false
  if (tableEntryList.length === 0) return false
  return tableEntryList.every((e) => isSantaFeShutterTableEntry(e))
}

export function isSantaFeShutterTableEntry(
  tableEntry: TableEntry
): tableEntry is SantaFeShutterTableEntry {
  if (typeof tableEntry === 'undefined') return false
  if (!('colour' in tableEntry)) return false
  if (!('track' in tableEntry)) return false
  if (!('shutter pole' in tableEntry)) return false
  if (!('flush bolt' in tableEntry)) return false

  return true
}
