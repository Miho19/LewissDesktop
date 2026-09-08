import { capitalise } from '@renderer/utility/general/capitalise'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile, Room, WindowMeasurement } from '@shared/types/Project.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { Fit, WindowDisplay } from '@shared/types/Window.types'
import { getRemoteAndChannel } from '../shared/kinetics'
import { isKineticsRollerSpec, KineticsRollerSpec } from '@shared/types/spec/kineticsRoller.types'
import { KineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { getKineticsRollerCostAsync } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerCost'
import { getKineticsRollerPelmet } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerPelmetCost'
import { getKineticsRollerControl } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerControlCost'

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
    controlLength,
    bottomRailType,
    bottomRailColour
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
