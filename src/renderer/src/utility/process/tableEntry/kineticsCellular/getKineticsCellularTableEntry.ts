import { capitalise } from '@renderer/utility/general/capitalise'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile, Room, WindowMeasurement } from '@shared/types/Project.types'
import {
  isKineticsCellularSpec,
  KineticsCellularSpec,
  opacityOptions
} from '@shared/types/spec/kineticsCellular.types'
import { KineticsCellularTableEntry } from '@shared/types/tableEntry/kineticsCellular.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { BlindCount, Fit, WindowDisplay } from '@shared/types/Window.types'
import { getRemoteAndChannel } from '../shared/kinetics'
import { getKineticsCellularCost } from './getKineticsCellularCost'

export async function getKineticsCellularTableEntryAsync(
  blindType: Blind,
  index: number,
  windowDisplay: WindowDisplay,
  room: Room,
  windowMeasurement: WindowMeasurement,
  entries: TableEntry[],
  file: ProjectFile
): Promise<KineticsCellularTableEntry[]> {
  const { width, height, fit, treatment, blindCount } = windowDisplay
  const spec = fit === 'inside' ? treatment.insideLayer.spec : treatment.outsideLayer.spec

  if (!isKineticsCellularSpec(spec)) return []

  const location = `${room.name} - ${windowMeasurement.name}`

  const fitCapitalised = capitalise(fit) as Fit

  const comb = getCombSize(blindType)

  const { fabric } = spec
  if (typeof fabric === 'undefined') return []

  const fabricName = fabric.name

  const control = getControlString(spec)

  const controlSide = spec.controlSide ?? windowMeasurement.controlSide

  const sideChannelColour = getSideChannelColour(spec)

  const butting = getButtingString(windowDisplay.blindCount, index, 'LHS')

  const { remote, channel } = getRemoteAndChannel(location, control, entries)

  const leftBlindCost = await getKineticsCellularCost(
    blindType,
    width[0],
    height,
    fabricName,
    control,
    'white',
    sideChannelColour
  )

  if (typeof leftBlindCost === 'undefined') return []

  const leftEntry: KineticsCellularTableEntry = {
    index,
    location,
    width: width[0],
    height: height,
    fit: fitCapitalised,
    comb,
    fabric: fabricName,
    control,
    'control side': controlSide,
    'headrail colour': 'White',
    'side channel colour': sideChannelColour,
    butting,
    remote: remote,
    channel: channel,
    price: leftBlindCost.toFixed(2)
  }

  if (blindCount !== 'butting') return [leftEntry]

  const rightSideCost = await getKineticsCellularCost(
    blindType,
    width[1],
    height,
    fabricName,
    control,
    'white',
    sideChannelColour
  )

  if (typeof rightSideCost === 'undefined') return []

  const rightSideButtingString = getButtingString(blindCount, index, 'RHS')
  const rightSideChannel = leftEntry.channel > 0 ? leftEntry.channel + 1 : 0

  const rightEntry: KineticsCellularTableEntry = {
    ...leftEntry,
    width: width[1],
    butting: rightSideButtingString,
    channel: rightSideChannel,
    price: rightSideCost.toFixed(2)
  }

  return [leftEntry, rightEntry]
}

function getCombSize(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
      return '10mm'
    case 'Kinetics 20mm Cellular Blind':
      return '20mm'
    default:
      return 'Invalid'
  }
}

function getControlString(spec: KineticsCellularSpec) {
  const { motorisation } = spec
  if (typeof motorisation === 'undefined') return 'Cord'

  return 'Lithium-ion'
}

function getSideChannelColour(spec: KineticsCellularSpec) {
  const { sideChannels } = spec
  if (!sideChannels) return 'None'

  return spec.customColour ? 'Custom' : 'White'
}

function getButtingString(blindCountString: BlindCount, index: number, side: 'LHS' | 'RHS') {
  if (blindCountString !== 'butting') return 'No'

  return `${side} of #${index}`
}

export function getFabricOpacity(fabricName: string) {
  if (!fabricName) return undefined
  const fabricStringArray = fabricName.split(' ')

  const opacityFound = fabricStringArray.find((word) =>
    (opacityOptions as readonly string[]).includes(word.toLocaleLowerCase())
  )

  if (typeof opacityFound === 'undefined') return undefined

  return capitalise(opacityFound)
}
