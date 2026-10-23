import { getKineticsRollerCostAsync } from '@/utility/process/tableEntry/kineticsRoller'
import { isKineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export async function updateKineticsRollerCellPriceAsync(windowTableEntry: WindowTableEntry) {
  const { blindType, windowDisplay, tableEntry } = windowTableEntry

  const fabric = windowDisplay.spec.fabric
  if (typeof fabric === 'undefined') return windowTableEntry

  if (!isKineticsRollerTableEntry(tableEntry)) return windowTableEntry

  const { width, height, control, bracket } = tableEntry
  const pelmet = ''

  const priceUpdated = await getKineticsRollerCostAsync(
    blindType,
    width,
    height,
    fabric,
    control,
    tableEntry['bottom rail'],
    pelmet,
    bracket
  )

  return windowTableEntry
}
