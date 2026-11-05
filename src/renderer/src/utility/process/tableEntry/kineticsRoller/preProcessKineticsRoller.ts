import { updateKineticsRollerCellPriceAsync } from '@/components/windowTable/utility/updatePrice'
import {
  kineticsRollerDestructureControlString,
  kineticsRollerIsChain
} from '@/utility/process/tableEntry/kineticsRoller'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { isKineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export async function preProcessKineticsRollerAsync(
  blindType: Blind,
  windowTableEntry: WindowTableEntry[],
  _file: ProjectFile
) {
  const jobs = windowTableEntry.map(async (wt) => {
    const tableEntry = wt.tableEntry
    if (!isKineticsRollerTableEntry(tableEntry)) throw new Error(`Must be ${blindType} table entry`)

    tableEntry.control = adjustControlString(tableEntry.control)

    // recalc price code

    return await updateKineticsRollerCellPriceAsync(wt)
  })

  const result = await Promise.allSettled(jobs)
  const fulfilled = result.filter((r) => r.status === 'fulfilled').map((r) => r.value)

  const rejected = result
    .filter((r) => r.status === 'rejected')
    .map((r) => {
      console.error(r.reason)
      return r
    })

  return fulfilled
}

// remove colour and length from motor option
function adjustControlString(control: string) {
  if (kineticsRollerIsChain(control)) return control

  const controlObject = kineticsRollerDestructureControlString(control)
  if (typeof controlObject === 'undefined') return control

  return controlObject.type
}
