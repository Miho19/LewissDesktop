import { Blind } from '@shared/types/blind/blind.types'
import { Room, WindowMeasurement, ProjectFile } from '@shared/types/Project.types'
import { CurtainTableEntry } from '@shared/types/tableEntry/curtain.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'

export async function getCurtainTableEntryAsync(
  _blindType: Blind,
  _index: number,
  _windowDisplay: WindowDisplay,
  _room: Room,
  _windowMeasurement: WindowMeasurement,
  _entries: TableEntry[],
  _file: ProjectFile
): Promise<CurtainTableEntry[]> {
  return []
}
