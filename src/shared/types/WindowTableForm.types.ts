import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'

export type WindowTableEntry = {
  blindType: Blind
  windowDisplay: WindowDisplay
  tableEntry: TableEntry
}

export type PreProcessFn = (
  blindType: Blind,
  windowTableEntryList: WindowTableEntry[],
  file: ProjectFile
) => WindowTableEntry[]

export type UpdateWindowTablePriceFn = (
  windowTableEntry: WindowTableEntry
) => Promise<WindowTableEntry>

export type WindowTableMeta = {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void
}

export type UpdateWindowTableEntryFn = (
  prevData: WindowTableEntry,
  columnId: string,
  value: unknown
) => WindowTableEntry
