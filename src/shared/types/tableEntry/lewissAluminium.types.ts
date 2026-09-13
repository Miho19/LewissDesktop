import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'

export type LewissAluminiumTableEntry = {
  index: number
  location: string
  width: number
  height: number
  fit: string
  colour: string
  control: string
  'control side': string
  'tilt side': string
  'Spacer Block': string
  price: string
}

export function isLewissAluminiumTableEntry(
  tableEntry: TableEntry
): tableEntry is LewissAluminiumTableEntry {
  if (typeof tableEntry === 'undefined') return false

  if (!('tilt side' in tableEntry)) return false
  if (!('Spacer Block' in tableEntry)) return false

  return true
}

export function isLewissAluminiumTableEntryList(
  tableEntryList: TableEntry[]
): tableEntryList is LewissAluminiumTableEntry[] {
  if (typeof tableEntryList === 'undefined') return false
  if (!Array.isArray(tableEntryList)) return false
  if (tableEntryList.length === 0) return false
  return tableEntryList.every((e) => isLewissAluminiumTableEntry(e))
}
