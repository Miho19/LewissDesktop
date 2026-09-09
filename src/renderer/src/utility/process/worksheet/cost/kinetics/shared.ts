import { getMaxRemote } from '@renderer/utility/process/tableEntry/shared/kinetics'
import {
  isKineticsAccessorySchedule,
  KineticsAccessorySchedule
} from '@shared/types/pricing/kineticsAccessories.types'
import { KineticsTableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { Extra } from '@shared/types/worksheet/Cost.types'
import { retrieveAccessorySchedule } from '@renderer/utility/process/pricingSchedule/retrievePricingSchedule'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { WindowDisplay } from '@shared/types/Window.types'

/**
 *
 * we are going to use the legacy version of this --- likely we need to prompt the user to
 * select the additional products
 * even if the product quantity is zero we still fill an extra entry
 * the pdf will handle whether it is printed or not
 */

export async function getExtraMotorProductsAsync(
  blindType: Blind,
  tableEntryList: KineticsTableEntry[],
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
): Promise<Extra[] | undefined> {
  const accessorySchedule = await retrieveAccessorySchedule(blindType)
  if (typeof accessorySchedule === 'undefined') return undefined
  if (!isKineticsAccessorySchedule(accessorySchedule)) return undefined

  const output: Extra[] = []

  const remoteExtra = getRemoteExtra(tableEntryList, accessorySchedule)
  if (typeof remoteExtra === 'undefined') return undefined

  output.push(remoteExtra)

  const chargerExtra = getChargerExtra(remoteExtra, accessorySchedule)
  if (typeof chargerExtra === 'undefined') return undefined

  output.push(chargerExtra)

  return output
}

function getRemoteExtra(
  tableEntryList: KineticsTableEntry[],
  accessorySchedule: KineticsAccessorySchedule
) {
  const remoteCostObject = accessorySchedule.motorisation.find(
    (m) => m.name.localeCompare('remote', undefined, { sensitivity: 'base' }) === 0
  )
  if (typeof remoteCostObject === 'undefined') return undefined

  const maxRemote = getMaxRemote(tableEntryList)

  const remoteExtra: Extra = {
    name: '15 Channel Remote',
    quantity: maxRemote,
    cost: remoteCostObject.cost
  }

  return remoteExtra
}

function getChargerExtra(remoteExtra: Extra, accessorySchedule: KineticsAccessorySchedule) {
  if (typeof remoteExtra === 'undefined') return undefined
  const { quantity } = remoteExtra

  let chargerQuantity = 0
  if (quantity > 6) chargerQuantity = 6
  if (quantity > 0) chargerQuantity = 1

  const chargerCostObject = accessorySchedule.motorisation.find((m) => m.name === 'usbCharger')
  if (typeof chargerCostObject === 'undefined') return undefined

  const cost = chargerCostObject.cost

  const chargerExtra: Extra = {
    name: 'USB Charger Cable',
    quantity: chargerQuantity,
    cost: cost
  }

  return chargerExtra
}
