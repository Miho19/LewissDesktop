import { getKineticsCellularCost } from '@/utility/process/tableEntry/kineticsCellular'
import { isKineticsCellularSpec } from '@shared/types/spec/kineticsCellular.types'
import { isKineticsCellularTableEntry } from '@shared/types/tableEntry/kineticsCellular.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export async function updateKineticsCellularCellPriceAsync(windowTableEntry: WindowTableEntry) {
  const { blindType, windowDisplay, tableEntry } = windowTableEntry
  const { spec } = windowDisplay

  if (!isKineticsCellularSpec(spec)) throw new Error('must be kinetics cellular spec')

  const fabric = spec.fabric
  if (fabric == null) return windowTableEntry

  if (!isKineticsCellularTableEntry(tableEntry)) return windowTableEntry

  const { width, height, control } = tableEntry
  const headrailColour = tableEntry['headrail colour']
  const sideChannel = tableEntry['side channel']

  const priceUpdated = await getKineticsCellularCost(
    blindType,
    width,
    height,
    fabric.name,
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
