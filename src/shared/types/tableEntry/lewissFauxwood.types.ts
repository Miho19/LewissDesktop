import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'

export type LewissFauxwoodTableEntry = {
  index: number
  location: string
  width: number
  height: number
  fit: string
  fabric: string
  control: string
  'control side': string
  'tilt side': string
  valance: string
  fascia: string
  'Spacer Block': string
  'cut out': string
  'palladian shelf': string
  butting: string
  price: string
}

export function isLewissFauxwoodTableEntry(
  tableEntry: TableEntry
): tableEntry is LewissFauxwoodTableEntry {
  if (typeof tableEntry === 'undefined') return false

  if (!('valance' in tableEntry)) return false
  if (!('fascia' in tableEntry)) return false
  if (!('Spacer Block' in tableEntry)) return false
  if (!('cut out' in tableEntry)) return false
  if (!('palladian shelf' in tableEntry)) return false
  if (!('butting' in tableEntry)) return false
  return true
}

export function isLewissFauxwoodTableEntryList(
  tableEntryList: TableEntry[]
): tableEntryList is LewissFauxwoodTableEntry[] {
  if (typeof tableEntryList === 'undefined') return false
  if (!Array.isArray(tableEntryList)) return false
  if (tableEntryList.length === 0) return false
  return tableEntryList.every((e) => isLewissFauxwoodTableEntry(e))
}
