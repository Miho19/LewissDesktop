import { getBlindTypeFromSpec } from '@/utility/process/windowDisplay/getBlindTypeFromSpec'
import { getKineticsCellularWindowTableEntryListAsync } from '@/utility/process/windowTableEntry/kineticsCellular'
import { Blind } from '@shared/types/blind/blind.types'
import { Line, ProcessFile } from '@shared/types/process/Process.types'
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
  // separate into blindType
  // create table entry

  const { lines } = file

  const map = mapLinesIntoBlindType(lines)

  const output = []

  try {
    for (const [key, value] of map) {
      const createFn = createFnMap[key]
      if (typeof createFn === 'undefined') continue
      const result = await createFn(value, file)
    }
  } catch (error) {
    console.error(`${error}`)
  }

  return output
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
  'Kinetics Sunscreen Roller Blind': function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Blockout Roller Blind': function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Light Filtering Roller Blind': function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 25mm Aluminium Venetian": function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Aluminium Venetian": function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Fauxwood Venetian": function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 63mm Fauxwood Venetian": function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Phoenixwood Venetian": function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 63mm Phoenixwood Venetian": function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Mikronwood 50mm Venetian': function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Woodlore Shutter': function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Woodlore Plus Shutter': function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Waterproof Woodlore Plus Shutter': function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Normandy Shutter': function (
    line: Line,
    file: ProcessFile
  ): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Roman Blind': function (line: Line, file: ProcessFile): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Separate Lining': function (line: Line, file: ProcessFile): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Unlined Curtain': function (line: Line, file: ProcessFile): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Lined Curtain': function (line: Line, file: ProcessFile): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Sheer Curtain': function (line: Line, file: ProcessFile): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  },
  'Interlined Curtain': function (line: Line, file: ProcessFile): Promise<WindowTableEntry[]> {
    throw new Error('Function not implemented.')
  }
}
