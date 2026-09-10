import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/Window.types'
import { GetWorksheetExtraCostFn } from '@shared/types/worksheet/Worksheet.types'
import { getKineticsCellularWorksheetExtraCostAsync } from '@renderer/utility/process/worksheet/cost/kinetics/getKineticsCellularWorksheetExtraCost'

import { getKineticsRollerWorksheetExtraCostAsync } from '@renderer/utility/process/worksheet/cost/kinetics/getKineticsRollerWorksheetExtraCost'
import { getSantaFeShutterWorksheetExtraCostAsync } from '@/utility/process/worksheet/cost/kinetics/getSantaFeShutterWorksheetExtraCost'
import { Cost, Extra } from '@shared/types/worksheet/Cost.types'

export async function getWorksheetCostAsync(
  blindType: Blind,
  tableEntryList: TableEntry[],
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
) {
  const blindTotal = getTableEntryCost(tableEntryList)
  if (typeof blindTotal === 'undefined') return undefined

  const getWorksheetExtraCostFn = blindTypeMappedToGetWorksheetExtraCostFn[blindType]
  if (typeof getWorksheetExtraCostFn === 'undefined')
    throw new Error(`${blindType} does not have a get worksheet extra cost function`)

  const extraCostList = await getWorksheetExtraCostFn(
    blindType,
    tableEntryList,
    windowDisplayList,
    file
  )

  if (typeof extraCostList === 'undefined')
    throw new Error('Unable to generate worksheet extra cost')

  const gst = getGST(blindTotal, extraCostList)

  const total = blindTotal + sumExtraList(extraCostList)

  const worksheetCost: Cost = {
    blindTotal,
    gst,
    total,
    extra: extraCostList
  }

  return worksheetCost
}

const blindTypeMappedToGetWorksheetExtraCostFn: Record<Blind, GetWorksheetExtraCostFn> = {
  'Kinetics 10mm Cellular Blind': getKineticsCellularWorksheetExtraCostAsync,
  'Kinetics 20mm Cellular Blind': getKineticsCellularWorksheetExtraCostAsync,
  'Kinetics Blockout Roller Blind': getKineticsRollerWorksheetExtraCostAsync,
  'Kinetics Light Filtering Roller Blind': getKineticsRollerWorksheetExtraCostAsync,
  'Kinetics Sunscreen Roller Blind': getKineticsRollerWorksheetExtraCostAsync,
  'Santa Fe Normandy Shutter': getSantaFeShutterWorksheetExtraCostAsync,
  'Santa Fe Waterproof Woodlore Plus Shutter': getSantaFeShutterWorksheetExtraCostAsync,
  'Santa Fe Woodlore Plus Shutter': getSantaFeShutterWorksheetExtraCostAsync,
  'Santa Fe Woodlore Shutter': getSantaFeShutterWorksheetExtraCostAsync
}

export function getTableEntryCost(tableEntryList: TableEntry[]) {
  try {
    const blindTotal = tableEntryList.reduce((acc, curr) => acc + parseFloat(curr.price), 0)
    return blindTotal
  } catch (error) {
    return undefined
  }
}

export function getGST(blindTotal: number, extraList: Extra[], GST: number = 0.15) {
  const extraSum = sumExtraList(extraList)
  return (blindTotal + extraSum) * GST
}

export function sumExtraList(extraList: Extra[]) {
  return extraList.reduce((acc, curr) => curr.cost * curr.quantity + acc, 0)
}
