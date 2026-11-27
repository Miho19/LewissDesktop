// its a table entry + blindType --> meant to enable expansion in future if needed

import { capitalise } from '@/utility/general/capitalise'
import {
  getKineticsCellularButtingString,
  getKineticsCellularCombSize,
  getKineticsCellularControl,
  getKineticsCellularCost,
  getKineticsCellularSideChannelColour
} from '@/utility/process/tableEntry/kineticsCellular'
import { getBlindCountDisplay } from '@/utility/process/windowDisplay/getBlindCountDisplay'
import { getBlindTypeFromSpec } from '@/utility/process/windowDisplay/getBlindTypeFromSpec'
import { windowTableEntryThrowError } from '@/utility/process/windowTableEntry/getWindowTableEntryList'
import { Blind } from '@shared/types/blind/blind.types'
import { Cover, ProcessFile } from '@shared/types/process/Process.types'
import { WindowMeasurement } from '@shared/types/Project.types'
import { isKineticsCellularSpec } from '@shared/types/spec/kineticsCellular.types'
import { Spec } from '@shared/types/spec/Spec.types'
import { KineticsCellularTableEntry } from '@shared/types/tableEntry/kineticsCellular.types'
import { Fit } from '@shared/types/WindowDisplay.types'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'

export async function getKineticsCellularWindowTableEntryListAsync(
  blindType: Blind,
  index: number,
  roomName: string,
  spec: Spec,
  cover: Cover,
  window: WindowMeasurement,
  _file: ProcessFile
) {
  if (!isKineticsCellularSpec(spec))
    throw windowTableEntryThrowError(blindType, 'Incorrect spec type')

  const { name: windowName, width, height, controlSide, fitting } = cover

  const location = `${roomName} - ${windowName}`

  const fit = capitalise(fitting) as Fit

  const comb = getKineticsCellularCombSize(blindType)

  const { fabric } = spec
  if (fabric == null) throw windowTableEntryThrowError(blindType, 'Fabric missing')

  const fabricName = fabric.name

  const control = getKineticsCellularControl(spec)

  const sideChannelColour = getKineticsCellularSideChannelColour(spec)

  const blindCount = fit === 'inside' ? window.blindCount : window.outsideBlindCount
  const blindCountString = getBlindCountDisplay(blindCount)
  if (typeof blindCountString === 'undefined')
    throw windowTableEntryThrowError(blindType, 'Incorrect blind count')

  const leftBlindButting = getKineticsCellularButtingString(blindCountString, index, 'LHS')

  const headrailColour = spec.bracketColour

  const leftBlindCost = await getKineticsCellularCost(
    blindType,
    width,
    height,
    fabricName,
    control,
    headrailColour,
    sideChannelColour
  )

  if (typeof leftBlindCost === 'undefined')
    throw windowTableEntryThrowError(blindType, 'Unable to get blind cost')

  const leftEntry: KineticsCellularTableEntry = {
    index,
    location,
    width: width,
    height: height,
    fit: fit,
    comb,
    fabric: fabricName,
    control,
    'control side': controlSide,
    'headrail colour': headrailColour,
    'side channel': sideChannelColour,
    butting: leftBlindButting,
    remote: 0,
    channel: 0,
    price: leftBlindCost.toFixed(2)
  }

  const leftWindowTableEntry: WindowTableEntry = {
    blindType,
    tableEntry: leftEntry
  }

  return [leftWindowTableEntry]
}
