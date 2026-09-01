import { capitalise } from 'renderer/src/utility/general/capitalise'
import { Blind } from 'shared/types/blind/blind.types'
import { ProjectFile, Room, WindowMeasurement } from 'shared/types/Project.types'
import {
  isKineticsCellularSpec,
  KineticsCellularSpec
} from 'shared/types/spec/kineticsCellular.types'
import { KineticsCellularTableEntry } from 'shared/types/tableEntry/kineticsCellular.types'
import { TableEntry } from 'shared/types/tableEntry/TableEntry.types'
import { BlindCount, Fit, WindowDisplay } from 'shared/types/Window.types'
import { getRemoteAndChannel } from '../shared/kinetics'

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

  if (!isKineticsCellularSpec(spec))
    throw new Error('Spec does not match table entry creation method')

  const location = `${room.name} - ${windowMeasurement.name}`

  const fitCapitalised = capitalise(fit) as Fit

  const comb = getCombSize(blindType)

  const fabric = spec.fabric?.name
  if (typeof fabric === 'undefined') throw new Error('Fabric missing')

  const control = getControlString(spec)

  const controlSide = spec.controlSide ?? windowMeasurement.controlSide

  const sideChannelColour = getSideChannelColour(spec)

  const butting = getButtingString(windowDisplay.blindCount, index, 'LHS')

  const { remote, channel } = getRemoteAndChannel(location, control, entries)
  const leftEntry: KineticsCellularTableEntry = {
    index,
    location,
    width: width[0],
    height: height,
    fit: fitCapitalised,
    comb,
    fabric,
    control,
    'control side': controlSide,
    'headrail colour': 'White',
    'side channel colour': sideChannelColour,
    butting,
    remote: remote,
    channel: channel,
    price: ''
  }

  if (blindCount !== 'butting') return [leftEntry]

  const rightSideButtingString = getButtingString(blindCount, index, 'RHS')
  const rightSideChannel = leftEntry.channel > 0 ? leftEntry.channel + 1 : 0

  const rightEntry: KineticsCellularTableEntry = {
    ...leftEntry,
    width: width[1],
    butting: rightSideButtingString,
    channel: rightSideChannel
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

function getFabricOpacity(fabric: string) {
  if (!fabric) throw new Error('Fabric information missing')
  const fabricStringArray = fabric.split(' ')

  const translucentWord = fabricStringArray.find(
    (word) => word.localeCompare('translucent', undefined, { sensitivity: 'base' }) === 0
  )
  if (typeof translucentWord === 'undefined') return 'Blockout'

  return 'Translucent'
}
