import { getKineticsRollerCostAsync } from '@/utility/process/tableEntry/kineticsRoller'
import { isKineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export async function updateKineticsRollerCellPriceAsync(windowTableEntry: WindowTableEntry) {
  const { blindType, tableEntry } = windowTableEntry

  const fabricMultiplier = 1

  if (!isKineticsRollerTableEntry(tableEntry)) return windowTableEntry

  const { width, height, control, pelmet, bracket, butting } = tableEntry
  const bottomRail = tableEntry['bottom rail']

  const priceUpdated = await getKineticsRollerCostAsync(
    blindType,
    width,
    height,
    fabricMultiplier,
    control,
    bottomRail,
    pelmet,
    bracket,
    butting
  )

  if (typeof priceUpdated === 'undefined') {
    console.error(`failed to update price for ${windowTableEntry.tableEntry}`)
    return windowTableEntry
  }

  windowTableEntry.tableEntry.price = priceUpdated.toFixed(2)

  return windowTableEntry
}
