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
): Promise<Extra[]> {
  return []
}
