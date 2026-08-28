import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { Spec } from '@shared/types/spec/Spec.types'
import { WindowDisplay } from '@shared/types/Window.types'
import { getBlindTypeFromSpec } from './getBlindTypeFromSpec'
import { CreateWorksheetFn, Worksheet } from '@shared/types/worksheet/Worksheet.types'

export async function getWorksheetListAsync(windowDisplayList: WindowDisplay[], file: ProjectFile) {
  try {
    errorCheck(windowDisplayList, file)

    const map = getWindowDisplayMap(windowDisplayList)
    if (map.size === 0) throw new Error('Failed to map window display list')

    const worksheetList = await createWorksheetAsync(map, file)

    return worksheetList
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
    if (value.length === 0) return undefined
    const createFunction = createWorksheetFunction[key]
    if (typeof createFunction === 'undefined') return undefined

    return await createFunction(key, value, file)
  })

  const result = (await Promise.allSettled(jobList))
    .filter((j) => j.status === 'fulfilled')
    .map((j) => j.value)
    .filter((worksheet) => typeof worksheet !== 'undefined')

  return result
}

const createWorksheetFunction: Record<Blind, CreateWorksheetFn> = {
  'Kinetics 10mm Cellular Blind': function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  'Kinetics 20mm Cellular Blind': function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Sunscreen Roller Blind': function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Blockout Roller Blind': function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Light Filtering Roller Blind': function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 25mm Aluminium Venetian": function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Aluminium Venetian": function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Fauxwood Venetian": function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 63mm Fauxwood Venetian": function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Phoenixwood Venetian": function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 63mm Phoenixwood Venetian": function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Mikronwood 50mm Venetian': function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Woodlore Shutter': function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Woodlore Plus Shutter': function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Waterproof Woodlore Plus Shutter': function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Normandy Shutter': function (
    blindType: Blind,
    windowDisplayList: WindowDisplay[],
    file: ProjectFile
  ): Promise<Worksheet | undefined> {
    throw new Error('Function not implemented.')
  }
}
