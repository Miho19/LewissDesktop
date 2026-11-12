import {
  kineticsRollerDestructureControlString,
  kineticsRollerIsChain
} from '@/utility/process/tableEntry/kineticsRoller'
import {
  getKineticsUpdatedButtingPreProcessing,
  getKineticsUpdatedIndexPreProcessing
} from '@/utility/process/tableEntry/shared/kinetics'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { isKineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export function preProcessKineticsRoller(
  _blindType: Blind,
  windowTableEntry: WindowTableEntry[],
  _file: ProjectFile
) {
  const updatedIndex = getKineticsUpdatedIndexPreProcessing(windowTableEntry)
  const updatedButting = getKineticsUpdatedButtingPreProcessing(updatedIndex)

  const updatedControl = getUpdatedControl(updatedButting)

  return updatedControl
}

function getUpdatedControl(windowTableEntry: WindowTableEntry[]) {
  return windowTableEntry.map((wt) => {
    const tableEntry = wt.tableEntry
    if (!isKineticsRollerTableEntry(tableEntry)) throw new Error(`Incorrect table entry type`)

    const updatedControlString = adjustControlString(tableEntry.control)
    tableEntry.control = updatedControlString

    return wt
  })
}

// remove colour and length from motor option
function adjustControlString(control: string) {
  if (kineticsRollerIsChain(control)) {
    control = control.replaceAll('/', '-')

    if (!control.endsWith('mm')) return `${control}mm`
    return control
  }

  const controlObject = kineticsRollerDestructureControlString(control)
  if (typeof controlObject === 'undefined') return control

  return controlObject.type
}
