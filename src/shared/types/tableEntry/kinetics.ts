import { isKineticsCellularTableEntry } from './kineticsCellular.types'
import { isKineticsMikronwoodTableEntry } from './kineticsMikronwood.types'
import { isKineticsRollerTableEntry } from './kineticsRoller.types'
import { KineticsTableEntry, TableEntry } from './TableEntry.types'

// had to remove the array length
//
export function isKineticsTableEntryList(
  tableEntryList: TableEntry[]
): tableEntryList is KineticsTableEntry[] {
  if (typeof tableEntryList === 'undefined') return false
  return tableEntryList.every((e) => isKineticsTableEntry(e))
}

function isKineticsTableEntry(tableEntry: TableEntry): tableEntry is KineticsTableEntry {
  if (typeof tableEntry === 'undefined') return false
  if (!isKineticsCellularTableEntry(tableEntry)) return false
  if (!isKineticsRollerTableEntry(tableEntry)) return false
  if (!isKineticsMikronwoodTableEntry(tableEntry)) return false
  return true
}
