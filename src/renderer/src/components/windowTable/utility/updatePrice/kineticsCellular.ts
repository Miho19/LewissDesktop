import { getKineticsCellularCost } from '@/utility/process/tableEntry/kineticsCellular'
import { isKineticsCellularTableEntry } from '@shared/types/tableEntry/kineticsCellular.types'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'

export async function updateKineticsCellularCellPriceAsync(windowTableEntry: WindowTableEntry) {
  const { blindType, tableEntry } = windowTableEntry

  if (!isKineticsCellularTableEntry(tableEntry)) return windowTableEntry

  const { width, height, control, fabric } = tableEntry
  const headrailColour = tableEntry['headrail colour']
  const sideChannel = tableEntry['side channel']

  const priceUpdated = await getKineticsCellularCost(
    blindType,
    width,
    height,
    fabric,
    control,
    headrailColour,
    sideChannel
  )

  if (typeof priceUpdated === 'undefined') {
    console.error(`failed to update price for ${windowTableEntry}`)
    windowTableEntry.tableEntry.price = 'Error'
    return windowTableEntry
  }

  windowTableEntry.tableEntry.price = priceUpdated.toFixed(2)

  return windowTableEntry
}
