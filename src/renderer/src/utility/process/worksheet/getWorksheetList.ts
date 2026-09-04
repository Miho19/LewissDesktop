import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { Spec } from '@shared/types/spec/Spec.types'
import { WindowDisplay } from '@shared/types/Window.types'
import { getBlindTypeFromSpec } from './getBlindTypeFromSpec'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'
import { Customer } from '@shared/types/worksheet/Customer.types'
import { Cost } from '@shared/types/worksheet/Cost.types'
import { getTableEntryListAsync } from '../tableEntry'
import { getWorksheetCostAsync } from 'renderer/src/utility/process/worksheet/cost/getWorksheetCost'

export async function getWorksheetListAsync(
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
): Promise<{ worksheetList: Worksheet[]; rejectedReasons: any[] }> {
  try {
    errorCheck(windowDisplayList, file)

    const map = getWindowDisplayMap(windowDisplayList)
    if (map.size === 0) throw new Error('Failed to map window display list')

    const [fulfilled, rejected] = await createWorksheetAsync(map, file)

    return { worksheetList: fulfilled, rejectedReasons: rejected }
  } catch (error) {
    throw new Error('getWorksheetListAsync', { cause: error })
  }
}

function errorCheck(windowDisplayList: WindowDisplay[], file: ProjectFile) {
  if (
    typeof windowDisplayList === 'undefined' ||
    !Array.isArray(windowDisplayList) ||
    windowDisplayList.length === 0
  )
    throw new Error('No window selected')

  if (typeof file === 'undefined') throw new Error('Project file is missing')
}

function getWindowDisplayMap(windowDisplayList: WindowDisplay[]) {
  const map: Map<Blind, WindowDisplay[]> = new Map()

  for (const w of windowDisplayList) {
    let spec: Spec | undefined = undefined
    if (w.fit === 'inside') spec = w.treatment.insideLayer.spec
    if (w.fit === 'outside') spec = w.treatment.outsideLayer.spec
    if (typeof spec === 'undefined') throw new Error('Incorrect value for fit')

    const blindType = getBlindTypeFromSpec(spec)
    if (typeof blindType === 'undefined') throw new Error('Blind type is incorrect')

    const current = map.get(blindType)
    if (typeof current === 'undefined') {
      map.set(blindType, [w])
    } else {
      map.set(blindType, [...current, w])
    }
  }

  return map
}

async function createWorksheetAsync(map: Map<Blind, WindowDisplay[]>, file: ProjectFile) {
  const entries = Array.from(map.entries())

  const jobList = entries.map(async ([key, value]) => {
    try {
      if (value.length === 0) return undefined

      // get the table entry list

      return await create(key, value, file)
    } catch (error) {
      const newError = new Error()
      newError.name = `${key}`
      newError.message = error instanceof Error ? error.message : 'Something went wrong.'
      newError.cause = error
      throw newError
    }
  })

  const result = await Promise.allSettled(jobList)

  const fulfilled = result
    .filter((j) => j.status === 'fulfilled')
    .map((j) => j.value)
    .filter((worksheet) => typeof worksheet !== 'undefined')

  const rejected = result.filter((j) => j.status === 'rejected').map((j) => j.reason)

  return [fulfilled, rejected]
}

async function create(blindType: Blind, windowDisplayList: WindowDisplay[], file: ProjectFile) {
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
    tableEntryList: tableEntryList
  }

  return worksheet
}
