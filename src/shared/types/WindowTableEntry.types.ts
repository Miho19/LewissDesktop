import { Blind } from '@shared/types/blind/blind.types'
import { Line, ProcessFile } from '@shared/types/process/Process.types'
import { ProjectFile } from '@shared/types/Project.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'

export type WindowTableEntry = {
  blindType: Blind
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

export type CreateWindowTableEntryListFn = (
  lineList: Line[],
  file: ProcessFile
) => Promise<WindowTableEntry[]>
