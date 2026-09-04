import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/Window.types'
import { GetWorksheetCostFn } from '@shared/types/worksheet/Worksheet.types'
import { getKineticsCellularWorksheetCostAsync } from '@renderer/utility/process/worksheet/cost/getKineticsCellularWorksheetCost'

export async function getWorksheetCostAsync(
  blindType: Blind,
  tableEntryList: TableEntry[],
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
) {
  const getWorksheetCostFn = blindTypeMappedToGetWorksheetCostFn[blindType]
  if (typeof getWorksheetCostFn === 'undefined')
    throw new Error(`${blindType} does not have a get worksheet cost function`)

  return await getWorksheetCostFn(blindType, tableEntryList, windowDisplayList, file)
}

const blindTypeMappedToGetWorksheetCostFn: Record<Blind, GetWorksheetCostFn> = {
  'Kinetics 10mm Cellular Blind': getKineticsCellularWorksheetCostAsync,
  'Kinetics 20mm Cellular Blind': getKineticsCellularWorksheetCostAsync
}

export function getTableEntryCost(tableEntryList: TableEntry[]) {
  try {
    const blindTotal = tableEntryList.reduce((acc, curr) => acc + parseFloat(curr.price), 0)
    return blindTotal
  } catch (error) {
    return undefined
  }
}
