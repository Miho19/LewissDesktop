import { Blind } from '@shared/types/blind/blind.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'

export type WindowTableEntry = {
  blindType: Blind
  windowDisplay: WindowDisplay
  tableEntry: TableEntry
}
