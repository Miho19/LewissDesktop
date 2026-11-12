import {
  getKineticsUpdatedButtingPreProcessing,
  getKineticsUpdatedIndexPreProcessing
} from '@/utility/process/tableEntry/shared/kinetics'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export function preProcessKineticsCellular(
  _blindType: Blind,
  windowTableEntry: WindowTableEntry[],
  _file: ProjectFile
) {
  const updatedIndex = getKineticsUpdatedIndexPreProcessing(windowTableEntry)

  const updatedButting = getKineticsUpdatedButtingPreProcessing(updatedIndex)

  return updatedButting
}
