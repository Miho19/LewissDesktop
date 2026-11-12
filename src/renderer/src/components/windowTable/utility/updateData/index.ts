import { kineticsRollerUpdateWindowTableEntry } from '@/components/windowTable/utility/updateData/kineticsRoller'
import { Blind } from '@shared/types/blind/blind.types'
import { UpdateWindowTableEntryFn, WindowTableEntry } from '@shared/types/WindowTableForm.types'

export function updateWindowTableEntryData(
  prevData: WindowTableEntry,
  columnId: string,
  value: unknown
) {
  const blindType = prevData.blindType
  const updateFn = updateDataMap[blindType]
  if (typeof updateFn === 'undefined')
    throw new Error(`${blindType} does not have an update winow table entry function`)

  return updateFn(prevData, columnId, value)
}

const updateDataMap: Record<Blind, UpdateWindowTableEntryFn> = {
  'Kinetics 10mm Cellular Blind': windowTableEntryDefaultUpdate,
  'Kinetics 20mm Cellular Blind': windowTableEntryDefaultUpdate,
  'Kinetics Sunscreen Roller Blind': kineticsRollerUpdateWindowTableEntry,
  'Kinetics Blockout Roller Blind': kineticsRollerUpdateWindowTableEntry,
  'Kinetics Light Filtering Roller Blind': kineticsRollerUpdateWindowTableEntry,
  "Lewis's 25mm Aluminium Venetian": windowTableEntryDefaultUpdate,
  "Lewis's 50mm Aluminium Venetian": windowTableEntryDefaultUpdate,
  "Lewis's 50mm Fauxwood Venetian": windowTableEntryDefaultUpdate,
  "Lewis's 63mm Fauxwood Venetian": windowTableEntryDefaultUpdate,
  "Lewis's 50mm Phoenixwood Venetian": windowTableEntryDefaultUpdate,
  "Lewis's 63mm Phoenixwood Venetian": windowTableEntryDefaultUpdate,
  'Kinetics Mikronwood 50mm Venetian': windowTableEntryDefaultUpdate,
  'Santa Fe Woodlore Shutter': windowTableEntryDefaultUpdate,
  'Santa Fe Woodlore Plus Shutter': windowTableEntryDefaultUpdate,
  'Santa Fe Waterproof Woodlore Plus Shutter': windowTableEntryDefaultUpdate,
  'Santa Fe Normandy Shutter': windowTableEntryDefaultUpdate,
  'Roman Blind': windowTableEntryDefaultUpdate,
  'Separate Lining': windowTableEntryDefaultUpdate,
  'Unlined Curtain': windowTableEntryDefaultUpdate,
  'Lined Curtain': windowTableEntryDefaultUpdate,
  'Sheer Curtain': windowTableEntryDefaultUpdate,
  'Interlined Curtain': windowTableEntryDefaultUpdate
}

export function windowTableEntryDefaultUpdate(
  prevData: WindowTableEntry,
  columnId: string,
  value: unknown
) {
  const updated: WindowTableEntry = {
    ...prevData,
    tableEntry: {
      ...prevData.tableEntry,
      [columnId]: value
    }
  }

  return updated
}
