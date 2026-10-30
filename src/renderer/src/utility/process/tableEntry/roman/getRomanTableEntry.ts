import { Blind } from '@shared/types/blind/blind.types'
import { Room, WindowMeasurement, ProjectFile } from '@shared/types/Project.types'
import { RomanTableEntry } from '@shared/types/tableEntry/roman'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'

export async function getRomanTableEntryAsync(
  blindType: Blind,
  index: number,
  windowDisplay: WindowDisplay,
  _room: Room,
  windowMeasurement: WindowMeasurement,
  entries: TableEntry[],
  _file: ProjectFile
): Promise<RomanTableEntry[]> {
  return []
}
