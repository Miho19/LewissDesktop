import { capitalise } from '@/utility/general/capitalise'
import { getKineticsMikronwoodControl } from '@/utility/process/tableEntry/kineticsMikronwood/getKineticsMikronwoodControlCost'
import { getKineticsMikronwoodCostAsync } from '@/utility/process/tableEntry/kineticsMikronwood/getKineticsMikronwoodCost'
import { getKineticsMikronwoodFascia } from '@/utility/process/tableEntry/kineticsMikronwood/getKineticsMikronwoodFasciaCost'
import { getButtingString } from '@/utility/process/tableEntry/shared/getButtingString'
import { getRemoteAndChannel } from '@/utility/process/tableEntry/shared/kinetics'
import { Blind } from '@shared/types/blind/blind.types'
import { Room, WindowMeasurement, ProjectFile } from '@shared/types/Project.types'
import { isVenetianSpec, VenetianSpec } from '@shared/types/spec/venetian.types'
import { KineticsMikronwoodTableEntry } from '@shared/types/tableEntry/kineticsMikronwood.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { Fit, WindowDisplay } from '@shared/types/Window.types'

export async function getKineticsMikronwoodTableEntryAsync(
  blindType: Blind,
  index: number,
  windowDisplay: WindowDisplay,
  room: Room,
  windowMeasurement: WindowMeasurement,
  entries: TableEntry[],
  file: ProjectFile
) {
  const { width, height, fit, spec, blindCount } = windowDisplay

  if (!isVenetianSpec(spec)) throw new Error(`${blindType} incorrect spec type`)

  const location = `${room.name} - ${windowMeasurement.name}`

  const leftBlindWidth = width[0]

  const fitCapitalised = capitalise(fit) as Fit

  const { fabric } = spec
  if (typeof fabric === 'undefined') throw new Error(`${blindType} fabric information missing`)

  const colour = fabric.name

  const control = getKineticsMikronwoodControl(spec) ?? ' '

  const controlSide =
    fit === 'inside' ? windowMeasurement.controlSide : windowMeasurement.outsideControlSide

  const tiltSide = controlSide

  const fascia = getKineticsMikronwoodFascia(spec) ?? ' '

  const holdDownBracket = getKineticsMikronwoodHoldDownBracket(spec) ?? ' '

  const leftBlindButting = getButtingString(blindCount, index, 'LHS')

  const { remote, channel } = getRemoteAndChannel(location, control, entries)

  const leftBlindCost = await getKineticsMikronwoodCostAsync(
    blindType,
    leftBlindWidth,
    height,
    control,
    fascia,
    holdDownBracket
  )

  if (typeof leftBlindCost === 'undefined')
    throw new Error(`${blindType} left blind cost is undefined`)

  const leftEntry: KineticsMikronwoodTableEntry = {
    index,
    location,
    width: leftBlindWidth,
    height,
    fit: fitCapitalised,
    colour,
    control,
    'control side': controlSide,
    'tilt side': tiltSide,
    fascia,
    'hold down bracket': holdDownBracket,
    butting: leftBlindButting,
    remote,
    channel,
    price: leftBlindCost.toFixed(2)
  }

  if (blindCount !== 'butting') return [leftEntry]

  const rightBlindWidth = width[1]

  const rightBlindCost = await getKineticsMikronwoodCostAsync(
    blindType,
    rightBlindWidth,
    height,
    control,
    fascia,
    holdDownBracket
  )

  if (typeof rightBlindCost === 'undefined')
    throw new Error(`${blindType} right blind cost is undefined`)

  const rightBlindButting = getButtingString(blindCount, index, 'RHS')
  const rightBlindChannel = leftEntry.channel > 0 ? leftEntry.channel + 1 : 0

  const rightEntry: KineticsMikronwoodTableEntry = {
    ...leftEntry,
    width: rightBlindWidth,
    butting: rightBlindButting,
    channel: rightBlindChannel,
    price: rightBlindCost.toFixed(2)
  }

  return [leftEntry, rightEntry]
}

function getKineticsMikronwoodHoldDownBracket(spec: VenetianSpec) {
  const { holdDownBrackets } = spec
  if (typeof holdDownBrackets === 'boolean' && holdDownBrackets) return 'Antique Brass'

  return undefined
}
