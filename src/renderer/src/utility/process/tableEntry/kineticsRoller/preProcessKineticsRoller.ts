import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import {
  isKineticsRollerTableEntryList,
  KineticsRollerTableEntry
} from '@shared/types/tableEntry/kineticsRoller.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export async function preProcessKineticsRollerAsync(
  _blindType: Blind,
  windowTableEntry: WindowTableEntry[],
  _file: ProjectFile
) {
  const tableEntryList = windowTableEntry.map((wt) => wt.tableEntry)
  if (!isKineticsRollerTableEntryList(tableEntryList))
    throw new Error('Incorrect table entry list type')

  return tableEntryList
}

function adjustControlString(tableEntryList: KineticsRollerTableEntry[]) {}
