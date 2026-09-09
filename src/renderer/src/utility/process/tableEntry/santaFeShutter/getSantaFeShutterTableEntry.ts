import { Blind } from '@shared/types/blind/blind.types'
import { Room, WindowMeasurement, ProjectFile } from '@shared/types/Project.types'
import { SantaFeShutterTableEntry } from '@shared/types/tableEntry/santaFeShutter.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/Window.types'

export async function getSantaFeShutterTableEntryAsync(
  blindType: Blind,
  index: number,
  windowDisplay: WindowDisplay,
  room: Room,
  windowMeasurement: WindowMeasurement,
  entries: TableEntry[],
  file: ProjectFile
): Promise<SantaFeShutterTableEntry[]> {
  return []
}
