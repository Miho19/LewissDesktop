import { Blind } from '@shared/types/blind/blind.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'

export type WindowTableEntry = {
  blindType: Blind
  windowDisplay: WindowDisplay
  tableEntry: TableEntry
}

export type WindowTableMeta = {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void
}

// These will be deleted once we no longer need window table form

// General
export const ControlSideOption = ['left', 'right'] as const

// Kinetics

export const KineticsRollerRollOption = ['front', 'back'] as const

const kineticsRollerBracketColourOption = ['white', 'cream', 'grey', 'black'] as const

const kineticsRollerBracketSizeOption = [
  'standard',
  'extra large',
  'double bracket front',
  'double bracket back'
] as const

export const kineticsRollerBracketOption = kineticsRollerBracketColourOption
  .map((colour) => kineticsRollerBracketSizeOption.map((size) => `${size} - ${colour}`))
  .flat()
