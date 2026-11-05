import {
  kineticsRollerDestructureControlString,
  kineticsRollerIsChain
} from '@/utility/process/tableEntry/kineticsRoller'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { isKineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export function preProcessKineticsRoller(
  blindType: Blind,
  windowTableEntry: WindowTableEntry[],
  _file: ProjectFile
) {
  return windowTableEntry.map((wt) => {
    const tableEntry = wt.tableEntry

    if (!isKineticsRollerTableEntry(tableEntry)) throw new Error(`Must be ${blindType} table entry`)
    tableEntry.control = adjustControlString(tableEntry.control)

    return wt
  })
}

// remove colour and length from motor option
function adjustControlString(control: string) {
  if (kineticsRollerIsChain(control)) {
    if (!control.endsWith('mm')) return `${control}mm`
    return control
  }

  const controlObject = kineticsRollerDestructureControlString(control)
  if (typeof controlObject === 'undefined') return control

  return controlObject.type
}
