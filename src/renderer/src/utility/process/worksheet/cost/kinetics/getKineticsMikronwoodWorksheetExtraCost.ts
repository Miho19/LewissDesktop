import { getExtraMotorProductsAsync } from '@/utility/process/worksheet/cost/kinetics/shared'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { isKineticsMikronwoodTableEntryList } from '@shared/types/tableEntry/kineticsMikronwood.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/Window.types'

export async function getKineticsMikronwoodWorksheetExtraCostAsync(
  blindType: Blind,
  tableEntryList: TableEntry[],
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
) {
  if (!isKineticsMikronwoodTableEntryList(tableEntryList)) return undefined

  const extraList =
    (await getExtraMotorProductsAsync(blindType, tableEntryList, windowDisplayList, file)) ?? []

  return extraList
}
