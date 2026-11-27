import { Blind } from '@shared/types/blind/blind.types'
import { Cover, Line, ProcessFile } from '@shared/types/process/Process.types'
import { ProjectFile, WindowMeasurement } from '@shared/types/Project.types'
import { Spec } from '@shared/types/spec/Spec.types'
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
  index: number,
  roomName: string,
  spec: Spec,
  cover: Cover,
  window: WindowMeasurement,
  file: ProcessFile
) => Promise<WindowTableEntry[]>
