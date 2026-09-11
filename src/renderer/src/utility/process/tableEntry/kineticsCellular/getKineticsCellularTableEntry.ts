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
import { getButtingString } from '@/utility/process/tableEntry/shared/getButtingString'

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

  if (!isKineticsCellularSpec(spec)) throw new Error(`${blindType} incorrect spec type`)

  const location = `${room.name} - ${windowMeasurement.name}`

  const fitCapitalised = capitalise(fit) as Fit

  const comb = getCombSize(blindType)

  const { fabric } = spec
  if (typeof fabric === 'undefined') throw new Error(`${blindType} fabric information missing`)

  const fabricName = fabric.name

  const control = getControlString(spec)

  const controlSide =
    fit === 'inside' ? windowMeasurement.controlSide : windowMeasurement.outsideControlSide

  const sideChannelColour = getSideChannelColour(spec)

  const leftBlindButting = getButtingString(windowDisplay.blindCount, index, 'LHS')

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

  if (typeof leftBlindCost === 'undefined')
    throw new Error(`${blindType} left blind cost is undefined`)

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
    butting: leftBlindButting,
    remote: remote,
    channel: channel,
    price: leftBlindCost.toFixed(2)
  }

  if (blindCount !== 'butting') return [leftEntry]

  const rightBlindCost = await getKineticsCellularCost(
    blindType,
    width[1],
    height,
    fabricName,
    control,
    'white',
    sideChannelColour
  )

  if (typeof rightBlindCost === 'undefined')
    throw new Error(`${blindType} right blind cost is undefined`)

  const rightBlindButting = getButtingString(blindCount, index, 'RHS')
  const rightBlindChannel = leftEntry.channel > 0 ? leftEntry.channel + 1 : 0

  const rightEntry: KineticsCellularTableEntry = {
    ...leftEntry,
    width: width[1],
    butting: rightBlindButting,
    channel: rightBlindChannel,
    price: rightBlindCost.toFixed(2)
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

// move these functions into files associated with their cost
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

export function getFabricOpacity(fabricName: string) {
  if (!fabricName) return undefined
  const fabricStringArray = fabricName.split(' ')

  const opacityFound = fabricStringArray.find((word) =>
    (opacityOptions as readonly string[]).includes(word.toLocaleLowerCase())
  )

  if (typeof opacityFound === 'undefined') return undefined

  return capitalise(opacityFound)
}
