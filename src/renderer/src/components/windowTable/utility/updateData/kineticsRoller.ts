import { windowTableEntryDefaultUpdate } from '@/components/windowTable/utility/updateData'
import { kineticsRollerDestructureControlString } from '@/utility/process/tableEntry/kineticsRoller'
import { isKineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

const kineticsRollerControlSplitName = ['controlType', 'controlColour', 'controlLength'] as const
type KineticsRollerControlSplit = (typeof kineticsRollerControlSplitName)[number]
export function kineticsRollerUpdateWindowTableEntry(
  prevData: WindowTableEntry,
  columnId: string,
  value: unknown
) {
  if (!(kineticsRollerControlSplitName as readonly string[]).includes(columnId))
    return windowTableEntryDefaultUpdate(prevData, columnId, value)

  const tableEntry = prevData.tableEntry
  if (!isKineticsRollerTableEntry(tableEntry))
    throw new Error(`Must be Kinetics Roller table entry`)

  const controlObject = kineticsRollerDestructureControlString(tableEntry.control)
  if (typeof controlObject === 'undefined') throw new Error(`Unable to destructure control`)

  const controlObjectMapped: Record<KineticsRollerControlSplit, string> = {
    controlType: controlObject.type,
    controlColour: controlObject.colour,
    controlLength: controlObject.length
  }

  const controlObjectMappedUpdated = {
    ...controlObjectMapped,
    [columnId]: value
  }

  const mapToArray = Object.values(controlObjectMappedUpdated).map((s) => s)
  const controlUpdatedString = mapToArray.join(' / ')

  columnId = 'control'
  value = controlUpdatedString

  return windowTableEntryDefaultUpdate(prevData, columnId, value)
}
