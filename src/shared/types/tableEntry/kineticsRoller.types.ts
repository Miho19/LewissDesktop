import { TableEntry } from './TableEntry.types'

export type KineticsRollerTableEntry = {
  index: number
  location: string
  width: number
  height: number
  fit: string
  roll: string
  fabric: string
  control: string
  'control side': string
  'bottom rail': string
  bracket: string
  pelmet: string
  butting: string
  remote: number
  channel: number
  price: string
}

export function isKineticsRollerTableEntryList(
  tableEntryList: TableEntry[]
): tableEntryList is KineticsRollerTableEntry[] {
  if (typeof tableEntryList === 'undefined') return false
  if (!Array.isArray(tableEntryList)) return false
  if (tableEntryList.length === 0) return false
  return tableEntryList.every((e) => isKineticsRollerTableEntry(e))
}

export function isKineticsRollerTableEntry(
  tableEntry: TableEntry
): tableEntry is KineticsRollerTableEntry {
  if (typeof tableEntry === 'undefined') return false
  if (!('roll' in tableEntry)) return false
  if (!('bottom rail' in tableEntry)) return false
  if (!('bracket' in tableEntry)) return false
  if (!('pelmet' in tableEntry)) return false

  return true
}
