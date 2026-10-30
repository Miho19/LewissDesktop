import { Blind } from '@shared/types/blind/blind.types'
import { Room, WindowMeasurement, ProjectFile } from '@shared/types/Project.types'
import { RomanTableEntry } from '@shared/types/tableEntry/roman'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'

export async function getRomanTableEntryAsync(
  _blindType: Blind,
  _index: number,
  _windowDisplay: WindowDisplay,
  _room: Room,
  _windowMeasurement: WindowMeasurement,
  _entries: TableEntry[],
  _file: ProjectFile
): Promise<RomanTableEntry[]> {
  return []
}
