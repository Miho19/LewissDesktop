import { Blind } from '@shared/types/blind/blind.types'
import { Room, WindowMeasurement, ProjectFile } from '@shared/types/Project.types'
import { CurtainTableEntry } from '@shared/types/tableEntry/curtain.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'

export async function getCurtainTableEntryAsync(
  blindType: Blind,
  index: number,
  windowDisplay: WindowDisplay,
  _room: Room,
  windowMeasurement: WindowMeasurement,
  entries: TableEntry[],
  _file: ProjectFile
): Promise<CurtainTableEntry[]> {
  return []
}
