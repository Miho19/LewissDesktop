import { Fit } from '../Window.types'
import { TableEntry } from './TableEntry.types'

export type KineticsCellularTableEntry = {
  index: number
  location: string
  width: number
  height: number
  fit: Fit
  comb: string
  fabric: string
  control: string
  'control side': string
  'headrail colour': string
  'side channel colour': string
  butting: string
  remote: number
  channel: number
  price: string
}

export function isKineticsCellularTableEntryList(
  tableEntryList: TableEntry[]
): tableEntryList is KineticsCellularTableEntry[] {
  if (typeof tableEntryList === 'undefined') return false
  if (!Array.isArray(tableEntryList)) return false
  if (tableEntryList.length === 0) return false
  return tableEntryList.every((e) => isKineticsCellularTableEntry(e))
}

export function isKineticsCellularTableEntry(
  tableEntry: TableEntry
): tableEntry is KineticsCellularTableEntry {
  if (typeof tableEntry === 'undefined') return false
  if (!('comb' in tableEntry)) return false
  if (!('headrail colour' in tableEntry)) return false
  if (!('side channel colour' in tableEntry)) return false
  return true
}
