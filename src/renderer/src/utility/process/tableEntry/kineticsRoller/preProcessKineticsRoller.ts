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
    const updatedIndex = ++index
    const oldIndex = wt.tableEntry.index

    const found = windowTableEntry.find((wt) => {
      const tableEntry = wt.tableEntry
      if (!isKineticsRollerTableEntry(tableEntry))
        throw new Error(`Must be ${blindType} table entry`)

      const buttingRef = tableEntry.buttingBlindRef
      if (buttingRef == null) return false

      if (buttingRef.index !== oldIndex) return false

      return true
    })

    wt.tableEntry.index = updatedIndex

    if (typeof found === 'undefined') return wt

    const foundTableEntry = found.tableEntry
    if (!isKineticsRollerTableEntry(foundTableEntry))
      throw new Error(`Must be ${blindType} table entry`)

    const buttingBlindRef = foundTableEntry.buttingBlindRef ?? null
    if (buttingBlindRef == null) return wt

    buttingBlindRef.index = updatedIndex

    return wt
  })

  const buttingAdjusted = indexAdded.map((wt) => {
    const tableEntry = wt.tableEntry
    if (!isKineticsRollerTableEntry(tableEntry)) throw new Error(`Must be ${blindType} table entry`)

    const buttingBlindIndex = tableEntry.buttingBlindRef?.index ?? 0

    const currentButting = tableEntry.butting.toLocaleLowerCase()

    if (!currentButting.includes('lhs') && !currentButting.includes('rhs')) return wt

    const updatedButting = currentButting.includes('lhs')
      ? `LHS to #${buttingBlindIndex}`
      : `RHS to #${buttingBlindIndex}`

    tableEntry.butting = updatedButting
    delete tableEntry.buttingBlindRef

    return wt
  })

  return buttingAdjusted.map((wt) => {
    const tableEntry = wt.tableEntry
    if (!isKineticsRollerTableEntry(tableEntry)) throw new Error(`Must be ${blindType} table entry`)

    const updatedControlString = adjustControlString(tableEntry.control)

    return { ...wt, tableEntry: { ...wt.tableEntry, ['control']: updatedControlString } }
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
