import { updateKineticsRollerCellPriceAsync } from '@/components/windowTable/utility/updatePrice/kineticsRoller'
import { Blind } from '@shared/types/blind/blind.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export * from './kineticsRoller'

type updateFn = (windowTableEntry: WindowTableEntry) => Promise<WindowTableEntry>

const updateFnMap: Record<Blind, updateFn> = {
  'Kinetics Sunscreen Roller Blind': updateKineticsRollerCellPriceAsync,
  'Kinetics Blockout Roller Blind': updateKineticsRollerCellPriceAsync,
  'Kinetics Light Filtering Roller Blind': updateKineticsRollerCellPriceAsync,
  'Kinetics 10mm Cellular Blind': function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  },
  'Kinetics 20mm Cellular Blind': function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 25mm Aluminium Venetian": function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Aluminium Venetian": function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Fauxwood Venetian": function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 63mm Fauxwood Venetian": function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Phoenixwood Venetian": function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 63mm Phoenixwood Venetian": function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Mikronwood 50mm Venetian': function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Woodlore Shutter': function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Woodlore Plus Shutter': function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Waterproof Woodlore Plus Shutter': function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Normandy Shutter': function (
    _windowTableEntry: WindowTableEntry
  ): Promise<WindowTableEntry> {
    throw new Error('Function not implemented.')
  }
}

export async function updateWindowTableEntryCost(windowTableEntry: WindowTableEntry) {
  const { blindType } = windowTableEntry
  const updateFn = updateFnMap[blindType]
  if (typeof updateFn === 'undefined') {
    console.error(`update function not implemented ${blindType}`)
    return windowTableEntry
  }

  return await updateFn(windowTableEntry)
}
