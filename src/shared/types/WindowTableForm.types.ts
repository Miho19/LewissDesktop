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

export const kineticsRollerBracketColourOption = ['white', 'cream', 'grey', 'black'] as const

export const kineticsRollerBracketSizeOption = [
  '40mm',
  '55mm',
  'combo front',
  'combo back'
] as const

export const KineticsCellularHeadrailColour = ['white', 'off white', 'silver', 'black'] as const
export const KineticsCellularBottomRailColour = ['white', 'off white', 'silver', 'black'] as const
