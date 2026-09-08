import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { isKineticsRollerTableEntryList } from '@shared/types/tableEntry/kineticsRoller.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/Window.types'
import { getExtraMotorProductsAsync } from '@renderer/utility/process/worksheet/cost/kinetics/shared'

export async function getKineticsRollerWorksheetExtraCostAsync(
  blindType: Blind,
  tableEntryList: TableEntry[],
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
) {
  if (!isKineticsRollerTableEntryList(tableEntryList)) return undefined

  const extraList =
    (await getExtraMotorProductsAsync(blindType, tableEntryList, windowDisplayList, file)) ?? []

  return extraList
}
