import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'

import { isKineticsCellularTableEntryList } from '@shared/types/tableEntry/kineticsCellular.types'

import { getExtraMotorProductsAsync } from '@renderer/utility/process/worksheet/cost/kinetics/shared'

export async function getKineticsCellularWorksheetExtraCostAsync(
  blindType: Blind,
  tableEntryList: TableEntry[],
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
) {
  if (!isKineticsCellularTableEntryList(tableEntryList)) return undefined

  const extraList =
    (await getExtraMotorProductsAsync(blindType, tableEntryList, windowDisplayList, file)) ?? []

  return extraList
}
