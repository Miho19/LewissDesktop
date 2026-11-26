import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { getBlindTypeFromSpec } from '../windowDisplay/getBlindTypeFromSpec'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'
import { Customer } from '@shared/types/worksheet/Customer.types'
import { getTableEntryListAsync } from '../tableEntry'
import { getWorksheetCostAsync } from '@renderer/utility/process/worksheet/cost/getWorksheetCost'

export function mapWindowDisplayList(windowDisplayList: WindowDisplay[]) {
  const map: Map<Blind, WindowDisplay[]> = new Map()

  for (const w of windowDisplayList) {
    const { spec } = w
    const blindType = getBlindTypeFromSpec(spec)

    if (typeof blindType === 'undefined') {
      continue
      // throw new Error('Blind type is undefined')
    }

    const current = map.get(blindType)
    if (typeof current === 'undefined') {
      map.set(blindType, [w])
    } else {
      map.set(blindType, [...current, w])
    }
  }

  return map
}

export async function createWorksheetAsync(
  blindType: Blind,
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
) {
  const customer: Customer = {
    customerName: file.name,
    reference: file.reference,
    salesConsultant: file.salesConsultant
  }

  const tableEntryList = await getTableEntryListAsync(blindType, windowDisplayList, file)

  const worksheetCost = await getWorksheetCostAsync(
    blindType,
    tableEntryList,
    windowDisplayList,
    file
  )

  if (typeof worksheetCost === 'undefined') throw new Error('failed to calculate worksheet cost')

  const worksheet: Worksheet = {
    blindType,
    customer,
    worksheetCost,
    tableEntryList: tableEntryList,
    instructions: ''
  }

  return worksheet
}
