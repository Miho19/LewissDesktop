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
  const indexAdded = windowTableEntry.map((wt, index) => {
    wt.tableEntry.index = ++index
    return wt
  })

  const buttingAdjusted = indexAdded.map((wt) => {
    const tableEntry = wt.tableEntry
    if (!isKineticsRollerTableEntry(tableEntry)) throw new Error(`Must be ${blindType} table entry`)

    if (tableEntry.butting.toLocaleLowerCase().includes('rhs')) return wt

    const rhsTableEntry = tableEntry.buttingBlindRef
    if (typeof rhsTableEntry === 'undefined') return wt

    if (!isKineticsRollerTableEntry(rhsTableEntry))
      throw new Error(`Must be ${blindType} table entry`)

    if (rhsTableEntry.butting.toLocaleLowerCase().includes('lhs')) return wt

    const lhsIndex = tableEntry.index
    const rhsIndex = rhsTableEntry.index

    tableEntry.butting = `LHS to #${rhsIndex}`
    rhsTableEntry.butting = `RHS to #${lhsIndex}`

    delete rhsTableEntry.buttingBlindRef
    delete tableEntry.buttingBlindRef

    return wt
  })

  return buttingAdjusted.map((wt) => {
    const tableEntry = wt.tableEntry

    if (!isKineticsRollerTableEntry(tableEntry)) throw new Error(`Must be ${blindType} table entry`)
    tableEntry.control = adjustControlString(tableEntry.control)

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
