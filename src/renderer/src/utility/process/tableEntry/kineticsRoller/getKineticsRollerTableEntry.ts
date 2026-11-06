import { capitalise } from '@renderer/utility/general/capitalise'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile, Room, WindowMeasurement } from '@shared/types/Project.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { BlindCount, Fit, WindowDisplay } from '@shared/types/WindowDisplay.types'
import { getRemoteAndChannel } from '../shared/kinetics'
import { isKineticsRollerSpec } from '@shared/types/spec/kineticsRoller.types'
import { KineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { getKineticsRollerCostAsync } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerCost'
import { getKineticsRollerPelmet } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerPelmetCost'
import { getKineticsRollerControl } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerControlCost'
import { getKineticsRollerBracket } from '@/utility/process/tableEntry/kineticsRoller/getKineticsBracketCost'
import { getKineticsRollerBottomRail } from '@/utility/process/tableEntry/kineticsRoller'

export async function getKineticsRollerTableEntryAsync(
  blindType: Blind,
  index: number,
  windowDisplay: WindowDisplay,
  _room: Room,
  windowMeasurement: WindowMeasurement,
  entries: TableEntry[],
  _file: ProjectFile
) {
  const { roomName, windowName, width, height, fit, spec, blindCount } = windowDisplay

  if (!isKineticsRollerSpec(spec)) throw new Error(`${blindType} incorrect spec type`)

  const location = `${roomName} - ${windowName}`

  const fitCapitalised = capitalise(fit) as Fit

  const roll = spec.rollDirection.replace(/roll/gi, '')

  const fabric = spec.fabric
  if (fabric == null) return []
  const fabricName = fabric.name
  const fabricMultiplier = fabric.multiplier

  const control = getKineticsRollerControl(spec, windowMeasurement)

  const controlSide =
    fit === 'inside' ? windowMeasurement.controlSide : windowMeasurement.outsideControlSide

  const bottomRail = getKineticsRollerBottomRail(spec)
  const bracket = getKineticsRollerBracket(spec)

  const pelmet = getKineticsRollerPelmet(spec)

  const { remote, channel } = getRemoteAndChannel(location, control, entries)

  const leftBlindButting = getKineticsRollerButting(blindCount, 'LHS')

  const leftBlindCost = await getKineticsRollerCostAsync(
    blindType,
    width[0],
    height,
    fabricMultiplier,
    control,
    bottomRail,
    pelmet,
    bracket,
    leftBlindButting
  )

  if (typeof leftBlindCost === 'undefined') throw new Error(`failed to get cost of blind`)

  const leftEntry: KineticsRollerTableEntry = {
    index,
    location,
    width: width[0],
    height: height,
    fit: fitCapitalised,
    roll,
    fabric: fabricName,
    control,
    'control side': controlSide,
    'bottom rail': bottomRail,
    bracket,
    pelmet,
    butting: leftBlindButting,
    remote: remote,
    channel: channel,
    price: leftBlindCost.toFixed(2)
  }

  if (blindCount !== 'butting') return [leftEntry]

  const rightBlindButting = getKineticsRollerButting(blindCount, 'RHS')

  const rightChannel = leftEntry.channel > 0 ? leftEntry.channel + 1 : 0

  const rightBlindCost = await getKineticsRollerCostAsync(
    blindType,
    width[1],
    height,
    fabricMultiplier,
    control,
    bottomRail,
    pelmet,
    bracket,
    rightBlindButting
  )
  if (typeof rightBlindCost === 'undefined') throw new Error(`failed to get cost of blind`)

  const rightEntry: KineticsRollerTableEntry = {
    ...leftEntry,
    index: index + 1,
    width: width[1],
    butting: rightBlindButting,
    channel: rightChannel,
    price: rightBlindCost?.toFixed(2)
  }

  leftEntry.buttingBlindRef = rightEntry
  rightEntry.buttingBlindRef = leftEntry

  return [leftEntry, rightEntry]
}

function getKineticsRollerButting(blindCount: BlindCount, side: 'LHS' | 'RHS') {
  if (blindCount !== 'butting') return ''

  return `${side}`
}
