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
import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { WHOLESALE_RATE_MOTOR } from '@/utility/process/tableEntry'

/**
 *
 * we are going to use the legacy version of this --- likely we need to prompt the user to
 * select the additional products
 * even if the product quantity is zero we still fill an extra entry
 * the pdf will handle whether it is printed or not
 * also missing smart hub link from this
 */

export async function getExtraMotorProductsAsync(
  blindType: Blind,
  tableEntryList: KineticsTableEntry[],
  _windowDisplayList: WindowDisplay[],
  _file: ProjectFile
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

  const cost = remoteCostObject.cost * WHOLESALE_RATE_MOTOR

  const remoteExtra: Extra = {
    name: '15 Channel Remote',
    quantity: maxRemote,
    cost: cost
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

  const cost = chargerCostObject.cost * WHOLESALE_RATE_MOTOR

  const chargerExtra: Extra = {
    name: 'USB Charger Cable',
    quantity: chargerQuantity,
    cost: cost
  }

  return chargerExtra
}

export async function kineticsGetExtraListAsync(
  remoteNumber: number,
  chargerNumber: number,
  smartHubNumber: number
) {
  const accessorySchedule = await retrieveAccessorySchedule('Kinetics 10mm Cellular Blind')
  if (typeof accessorySchedule === 'undefined') return undefined
  if (!isKineticsAccessorySchedule(accessorySchedule)) return undefined

  const output: Extra[] = []

  const remoteCostObject = accessorySchedule.motorisation.find(
    (m) => m.name.localeCompare('remote', undefined, { sensitivity: 'base' }) === 0
  )
  if (typeof remoteCostObject === 'undefined') return undefined

  const remoteCost = remoteCostObject.cost * WHOLESALE_RATE_MOTOR

  const remoteExtra: Extra = {
    name: '15 Channel Remote',
    quantity: remoteNumber,
    cost: remoteCost
  }

  output.push(remoteExtra)

  const chargerCostObject = accessorySchedule.motorisation.find((m) => m.name === 'usbCharger')
  if (typeof chargerCostObject === 'undefined') return undefined

  const chargerCost = chargerCostObject.cost * WHOLESALE_RATE_MOTOR

  const chargerExtra: Extra = {
    name: 'USB Charger Cable',
    quantity: chargerNumber,
    cost: chargerCost
  }

  output.push(chargerExtra)

  const smartHubObject = accessorySchedule.motorisation.find((m) => m.name === 'smartLinkHub')
  if (typeof smartHubObject === 'undefined') return undefined

  const smartLinkHubCost = smartHubObject.cost * WHOLESALE_RATE_MOTOR

  const smartHubExtra: Extra = {
    name: 'Smart Link Hub',
    quantity: smartHubNumber,
    cost: smartLinkHubCost
  }

  output.push(smartHubExtra)

  return output
}
