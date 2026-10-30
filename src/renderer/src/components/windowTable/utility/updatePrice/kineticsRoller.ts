import { getKineticsRollerCostAsync } from '@/utility/process/tableEntry/kineticsRoller'
import { isKineticsRollerSpec } from '@shared/types/spec/kineticsRoller.types'
import { isKineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export async function updateKineticsRollerCellPriceAsync(windowTableEntry: WindowTableEntry) {
  const { blindType, windowDisplay, tableEntry } = windowTableEntry
  const { spec } = windowDisplay
  if (!isKineticsRollerSpec(spec)) throw new Error('must be kinetics roller spec')

  const fabric = spec.fabric
  if (fabric == null) return windowTableEntry

  if (!isKineticsRollerTableEntry(tableEntry)) return windowTableEntry

  const { width, height, control, pelmet, bracket } = tableEntry
  const bottomRail = tableEntry['bottom rail']

  const priceUpdated = await getKineticsRollerCostAsync(
    blindType,
    width,
    height,
    fabric,
    control,
    bottomRail,
    pelmet,
    bracket
  )

  if (typeof priceUpdated === 'undefined') {
    console.error(`failed to update price for ${windowTableEntry}`)
    return windowTableEntry
  }

  windowTableEntry.tableEntry.price = priceUpdated.toFixed(2)

  return windowTableEntry
}
