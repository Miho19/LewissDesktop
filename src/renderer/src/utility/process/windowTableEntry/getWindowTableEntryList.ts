import { getBlindTypeFromSpec } from '@/utility/process/windowDisplay/getBlindTypeFromSpec'
import { getKineticsCellularWindowTableEntryListAsync } from '@/utility/process/windowTableEntry/kineticsCellular'
import { getKineticsRollerWindowTableEntryListAsync } from '@/utility/process/windowTableEntry/kineticsRoller'
import { Blind } from '@shared/types/blind/blind.types'
import { Cover, Line, ProcessFile } from '@shared/types/process/Process.types'
import { WindowMeasurement } from '@shared/types/Project.types'
import { Spec } from '@shared/types/spec/Spec.types'
import {
  CreateWindowTableEntryListFn,
  WindowTableEntry
} from '@shared/types/WindowTableEntry.types'

/**
 *
 * @param file
 *
 * @returns @type WindowTableEntry[]
 *
 * take file --> map into
 */
export async function getWindowTableEntryListAsync(file: ProcessFile) {
  const { lines } = file

  const map = mapLinesIntoBlindType(lines)

  const output: WindowTableEntry[] = []

  try {
    for (const [key, value] of map) {
      const createFn = createFnMap[key]
      if (typeof createFn === 'undefined') continue

      const result = await applyCreateFnToLineList(value, file, createFn)
      output.push(...result)
    }
  } catch (error) {
    console.error(`${error}`)
  }

  return output
}

async function applyCreateFnToLineList(
  lineList: Line[],
  file: ProcessFile,
  createFn: CreateWindowTableEntryListFn
) {
  const output: WindowTableEntry[] = []

  for (const line of lineList) {
    const { room, spec, covers } = line

    for (const cover of covers) {
      const index = getCurrentIndex(output)
      const window = getWindowFromProcessFile(cover, file)
      const result = await createFn(index, room, spec, cover, window, file)
      output.push(...result)
    }
  }

  return output
}

function getCurrentIndex(windowTableEntryList: WindowTableEntry[]) {
  const currentMax = windowTableEntryList.reduce(
    (max, curr) => (curr.tableEntry.index > max ? curr.tableEntry.index : max),
    -1
  )
  if (currentMax <= 0) return 1
  return currentMax + 1
}

function mapLinesIntoBlindType(lineList: Line[]) {
  const map = new Map<Blind, Line[]>()

  for (const line of lineList) {
    const blindType = getBlindTypeFromLine(line)
    if (typeof blindType === 'undefined') continue

    const current = map.get(blindType)
    if (typeof current === 'undefined') {
      map.set(blindType, [line])
    } else {
      map.set(blindType, [...current, line])
    }
  }

  return map
}

function getBlindTypeFromLine(line: Line) {
  const { spec } = line
  return getBlindTypeFromSpec(spec)
}

const createFnMap: Record<Blind, CreateWindowTableEntryListFn> = {
  'Kinetics 10mm Cellular Blind': getKineticsCellularWindowTableEntryListAsync,
  'Kinetics 20mm Cellular Blind': getKineticsCellularWindowTableEntryListAsync,
  'Kinetics Sunscreen Roller Blind': getKineticsRollerWindowTableEntryListAsync,
  'Kinetics Blockout Roller Blind': getKineticsRollerWindowTableEntryListAsync,
  'Kinetics Light Filtering Roller Blind': getKineticsRollerWindowTableEntryListAsync,
  "Lewis's 25mm Aluminium Venetian": function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Aluminium Venetian": function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Fauxwood Venetian": function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 63mm Fauxwood Venetian": function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Phoenixwood Venetian": function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 63mm Phoenixwood Venetian": function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Mikronwood 50mm Venetian': function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Woodlore Shutter': function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Woodlore Plus Shutter': function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Waterproof Woodlore Plus Shutter': function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Normandy Shutter': function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Roman Blind': function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Separate Lining': function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Unlined Curtain': function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Lined Curtain': function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Sheer Curtain': function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Interlined Curtain': function (
    index: number,
    roomName: string,
    spec: Spec,
    cover: Cover,
    window: WindowMeasurement,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  }
}

export function windowTableEntryThrowError(blindType: Blind, errorMessage: string) {
  const error: Error = {
    name: blindType,
    message: errorMessage
  }

  throw error
}

function getWindowFromProcessFile(cover: Cover, file: ProcessFile) {
  const { windowId } = cover
  if (typeof windowId === 'undefined') throw new Error(`Cover is missing window id`)

  let found: WindowMeasurement | undefined = undefined

  for (const room of file.rooms) {
    found = room.windows.find((w) => w.id === windowId)
    if (typeof found !== 'undefined') break
  }

  if (typeof found === 'undefined')
    throw new Error(`window: ${windowId} does not exist in process file`)

  return found
}
