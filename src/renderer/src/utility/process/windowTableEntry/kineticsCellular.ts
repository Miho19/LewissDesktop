// its a table entry + blindType --> meant to enable expansion in future if needed

import { capitalise } from '@/utility/general/capitalise'
import { getKineticsCellularCombSize } from '@/utility/process/tableEntry/kineticsCellular'
import { getBlindTypeFromSpec } from '@/utility/process/windowDisplay/getBlindTypeFromSpec'
import { windowTableEntryThrowError } from '@/utility/process/windowTableEntry/getWindowTableEntryList'
import { Cover, ProcessFile } from '@shared/types/process/Process.types'
import { isKineticsCellularSpec } from '@shared/types/spec/kineticsCellular.types'
import { Spec } from '@shared/types/spec/Spec.types'
import { Fit } from '@shared/types/WindowDisplay.types'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'

export async function getKineticsCellularWindowTableEntryListAsync(
  index: number,
  roomName: string,
  spec: Spec,
  cover: Cover,
  file: ProcessFile
) {
  const output: WindowTableEntry[] = []

  const blindType = getBlindTypeFromSpec(spec)
  if (typeof blindType === 'undefined')
    return windowTableEntryThrowError('Kinetics 10mm Cellular Blind', 'Malformed spec')

  if (!isKineticsCellularSpec(spec))
    return windowTableEntryThrowError(blindType, 'Incorrect spec type')

  const { name: windowName, width, height, controlSide, fitting } = cover

  const location = `${roomName} - ${windowName}`

  const fit = capitalise(fitting) as Fit

  const comb = getKineticsCellularCombSize(blindType)

  const { fabric } = spec
  if (fabric == null) return windowTableEntryThrowError(blindType, 'Fabric missing')

  const fabricName = fabric.name
  return output
}
