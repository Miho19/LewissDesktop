import { capitalise } from '@renderer/utility/general/capitalise'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile, Room, WindowMeasurement } from '@shared/types/Project.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { BlindCount, Fit, WindowDisplay } from '@shared/types/WindowDisplay.types'
import { getRemoteAndChannel } from '../shared/kinetics'
import { isKineticsRollerSpec, KineticsRollerSpec } from '@shared/types/spec/kineticsRoller.types'
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

  const butting = ''

  // we can add object to table entry and it wont be displayed on pdf now.
  // do that to reference the butting blind
  // index will be recalc during preProcess
  // same with butting string

  const buttingString = getKineticsRollerButting(blindCount, index, 'LHS', spec)

  const leftBlindCost = await getKineticsRollerCostAsync(
    blindType,
    width[0],
    height,
    fabricMultiplier,
    control,
    bottomRail,
    pelmet,
    bracket,
    buttingString
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
    butting,
    remote: remote,
    channel: channel,
    price: leftBlindCost.toFixed(2),
    buttingBlindRef: null
  }

  return [leftEntry]
}

function getKineticsRollerButting(
  blindCount: BlindCount,
  index: number,
  side: 'LHS' | 'RHS',
  spec: KineticsRollerSpec
) {
  if (blindCount !== 'butting') return ''

  const { inlineBracket, intermediateBracket } = spec
  let buttingType = ''
  if (inlineBracket) {
    buttingType = 'Inline'
  }

  return ''
}
