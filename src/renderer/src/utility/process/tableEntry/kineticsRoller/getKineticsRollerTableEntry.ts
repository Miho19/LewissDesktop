import { capitalise } from '@renderer/utility/general/capitalise'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile, Room, WindowMeasurement } from '@shared/types/Project.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { Fit, WindowDisplay } from '@shared/types/Window.types'
import { getRemoteAndChannel } from '../shared/kinetics'
import { isKineticsRollerSpec, KineticsRollerSpec } from '@shared/types/spec/kineticsRoller.types'
import { KineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { getKineticsRollerCostAsync } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerCost'

export async function getKineticsRollerTableEntryAsync(
  blindType: Blind,
  index: number,
  windowDisplay: WindowDisplay,
  room: Room,
  windowMeasurement: WindowMeasurement,
  entries: TableEntry[],
  file: ProjectFile
) {
  const { width, height, fit, treatment, blindCount } = windowDisplay
  const spec = fit === 'inside' ? treatment.insideLayer.spec : treatment.outsideLayer.spec

  if (!isKineticsRollerSpec(spec)) return []

  const location = `${room.name} - ${windowMeasurement.name}`

  const fitCapitalised = capitalise(fit) as Fit

  const roll = spec.rollDirection

  const fabric = spec.fabric
  if (typeof fabric === 'undefined') return []

  const fabricName = fabric.name

  const control = getKineticsRollerControl(spec)
  const controlLength = windowMeasurement.controlLength

  const controlString = control.toLocaleLowerCase().includes('chain')
    ? `${control} ${controlLength}mm`
    : control

  const controlSide = spec.controlSide ?? windowMeasurement.controlSide

  const { bottomRailType, bottomRailColour } = spec
  const bottomRail = `${bottomRailType} ${bottomRailColour}`

  const bracket = spec.bracketColour

  const pelmet = getKineticsRollerPelmet(spec)

  const { remote, channel } = getRemoteAndChannel(location, control, entries)

  const price = await getKineticsRollerCostAsync(
    blindType,
    width[0],
    height,
    fabric,
    control,
    controlLength
  )
  if (typeof price === 'undefined') return []

  const leftEntry: KineticsRollerTableEntry = {
    index,
    location,
    width: width[0],
    height: height,
    fit: fitCapitalised,
    roll,
    fabric: fabricName,
    control: controlString,
    'control side': controlSide,
    'bottom rail': bottomRail,
    bracket,
    pelmet,
    butting: '',
    remote: remote,
    channel: channel,
    price: price.toFixed(0)
  }

  return [leftEntry]
}

function getKineticsRollerControl(spec: KineticsRollerSpec) {
  if (spec.motorisation == null) {
    return `Chain FastRise ${spec.chainColour}`
  }

  const motorisation = spec.motorisation
  if (motorisation.includes('lithium')) return 'Lithium-ion'

  return motorisation
}

function getKineticsRollerPelmet(spec: KineticsRollerSpec) {
  const { pelmetType } = spec
  if (pelmetType == null) return ''
  if (pelmetType.trim().length === 0) return ''

  const size = getPelmetSize(pelmetType)
  const fit = getPelmetFit(pelmetType)

  return `${size} - ${fit}`
}

// this function assumes the format of the pelmet
function getPelmetSize(pelmet: string) {
  const [size, _] = splitPelmetString(pelmet)
  const parsedSize = parseInt(size)

  const validSize = [110, 160] as const

  if (!(validSize as readonly number[]).includes(parsedSize))
    throw new Error('pelmet size is incorrect')

  return `${size}mm`
}

function getPelmetFit(pelmet: string) {
  const [_, fit] = splitPelmetString(pelmet)

  const fitAdjusted = fit.trim().toLocaleLowerCase()

  switch (fitAdjusted) {
    case 'i/s':
      return 'inside'
    case 'o/s':
      return 'outside'
    default:
      throw new Error(`${fitAdjusted} is not a valid fit for pelmet`)
  }
}

function splitPelmetString(pelmet: string): [string, string] {
  const split = pelmet.trim().split(' ')
  if (split.length !== 2) throw new Error('Incorrect pelmet string format')
  return [split[0], split[1]]
}
