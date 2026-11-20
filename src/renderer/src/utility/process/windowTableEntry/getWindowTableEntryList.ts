import { getBlindTypeFromSpec } from '@/utility/process/worksheet/getBlindTypeFromSpec'
import { Blind } from '@shared/types/blind/blind.types'
import { Line, ProcessFile } from '@shared/types/process/Process.types'

export async function getWindowTableEntryListAsync(file: ProcessFile) {
  // separate into blindType -->

  const { lines } = file

  const map = mapLinesIntoBlindType(lines)
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
