import { updateKineticsRollerCellPriceAsync } from '@/components/windowTable/utility/updatePrice/kineticsRoller'
import { Blind } from '@shared/types/blind/blind.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export * from './kineticsRoller'

type updateFn = (windowTableEntry: WindowTableEntry) => Promise<WindowTableEntry>

const updateFnMap: Record<Blind, updateFn> = {
  'Kinetics Sunscreen Roller Blind': updateKineticsRollerCellPriceAsync,
  'Kinetics Blockout Roller Blind': updateKineticsRollerCellPriceAsync,
  'Kinetics Light Filtering Roller Blind': updateKineticsRollerCellPriceAsync
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
