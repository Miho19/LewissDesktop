import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { isKineticsCellularTableEntry } from '@shared/types/tableEntry/kineticsCellular.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export function preProcessKineticsCellular(
  blindType: Blind,
  windowTableEntry: WindowTableEntry[],
  _file: ProjectFile
) {
  const updatedIndex = updateIndex(windowTableEntry)

  const updatedButting = updateButting(blindType, updatedIndex)

  return updatedButting
}

function updateIndex(windowTableEntry: WindowTableEntry[]) {
  return windowTableEntry.map((wt, index) => {
    const adjustedIndex = index + 1
    wt.tableEntry.index = adjustedIndex
    return wt
  })
}

function updateButting(blindType: Blind, windowTableEntry: WindowTableEntry[]) {
  return windowTableEntry.map((wt) => {
    const tableEntry = wt.tableEntry

    if (!isKineticsCellularTableEntry(tableEntry))
      throw new Error(`Must be ${blindType} table entry`)

    const currentButtingString = tableEntry.butting.toLocaleLowerCase().trim()

    if (currentButtingString.length === 0 || currentButtingString.includes('rhs')) return wt

    const { toIndex } = getKineticsCellularSplitButting(currentButtingString)

    const buttingBlind = windowTableEntry.find((wt) => {
      const tableEntry = wt.tableEntry

      if (!isKineticsCellularTableEntry(tableEntry))
        throw new Error(`Must be ${blindType} table entry`)

      const queryButting = tableEntry.butting.toLocaleLowerCase().trim()

      if (queryButting.length === 0 || queryButting.includes('lhs') || queryButting.includes('to'))
        return false

      const { side: querySide, toIndex: queryButtingIndex } = getKineticsCellularSplitButting(
        tableEntry.butting
      )

      return queryButtingIndex === toIndex && querySide === 'rhs'
    })

    if (typeof buttingBlind === 'undefined') return wt
    const buttingIndex = buttingBlind.tableEntry.index

    const LHSButting = getKineticsCellularButtingString('LHS', buttingIndex)

    const RHSButting = getKineticsCellularButtingString('RHS', tableEntry.index)

    tableEntry.butting = LHSButting
    buttingBlind.tableEntry['butting'] = RHSButting

    return wt
  })
}

function getKineticsCellularButtingString(side: 'LHS' | 'RHS', index: number) {
  return side === 'LHS' ? `LHS to #${index}` : `RHS to #${index}`
}

function getKineticsCellularSplitButting(butting: string) {
  const split = butting.split('/')

  console.log(split)

  return {
    side: split[0].toLocaleLowerCase().trim(),
    toIndex: split[1].toLocaleLowerCase().trim()
  }
}
