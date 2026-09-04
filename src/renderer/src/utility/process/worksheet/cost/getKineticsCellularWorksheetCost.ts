import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/Window.types'
import { Cost, Extra } from '@shared/types/worksheet/Cost.types'
import { getTableEntryCost } from '@renderer/utility/process/worksheet/cost/getWorksheetCost'
import {
  isKineticsCellularTableEntryList,
  KineticsCellularTableEntry
} from '@shared/types/tableEntry/kineticsCellular.types'
import { retrieveAccessorySchedule } from '@renderer/utility/process/tableEntry/shared/retrievePricingSchedule'
import {
  isKineticsAccessorySchedule,
  KineticsAccessorySchedule
} from '@shared/types/pricing/kineticsAccessories.types'
import { getMaxRemote } from '@renderer/utility/process/tableEntry/shared/kinetics'

export async function getKineticsCellularWorksheetCostAsync(
  blindType: Blind,
  tableEntryList: TableEntry[],
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
) {
  if (!isKineticsCellularTableEntryList(tableEntryList)) return undefined

  const blindTotal = getTableEntryCost(tableEntryList)
  if (typeof blindTotal === 'undefined') return undefined

  const worksheetCost: Cost = {
    blindTotal: blindTotal,
    gst: 0,
    total: 0,
    extra: []
  }

  return worksheetCost
}

/**
 *
 * @param blindType
 * @param tableEntryList
 * @param windowDisplayList
 * @param file
 *
 * we are going to use the legacy version of this --- likely we need to prompt the user to
 * select the additional products
 */

async function getExtraMotorProducts(
  blindType: Blind,
  tableEntryList: KineticsCellularTableEntry[],
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
): Promise<Extra[] | undefined> {
  const accessorySchedule = await retrieveAccessorySchedule(blindType)
  if (typeof accessorySchedule === 'undefined') return undefined
  if (!isKineticsAccessorySchedule(accessorySchedule)) return undefined

  const output: Extra[] = []

  const remoteExtra = getRemoteExtra(tableEntryList, accessorySchedule)
  if (typeof remoteExtra !== 'undefined') output.push(remoteExtra)

  return output
}

function getRemoteExtra(
  tableEntryList: KineticsCellularTableEntry[],
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
  if (remoteExtra.quantity === 0) return undefined

  const chargerExtra: Extra = {
    name: '',
    quantity: 0,
    cost: 0
  }

  return chargerExtra
}
