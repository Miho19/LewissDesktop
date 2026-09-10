import { Blind } from '@shared/types/blind/blind.types'
import { Room, WindowMeasurement, ProjectFile } from '@shared/types/Project.types'
import { SantaFeShutterTableEntry } from '@shared/types/tableEntry/santaFeShutter.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { Fit, WindowDisplay } from '@shared/types/Window.types'
import { isSantaFeShutterSpec } from '@shared/types/spec/santaFe.types'
import { capitalise } from '@renderer/utility/general/capitalise'
import { getSantaFeShutterCostAsync } from '@renderer/utility/process/tableEntry/santaFeShutter/getSantaFeShutterCost'

export async function getSantaFeShutterTableEntryAsync(
  blindType: Blind,
  index: number,
  windowDisplay: WindowDisplay,
  room: Room,
  windowMeasurement: WindowMeasurement,
  entries: TableEntry[],
  file: ProjectFile
): Promise<SantaFeShutterTableEntry[]> {
  const location = `${room.name} - ${windowMeasurement.name}`

  const { width, height, fit, treatment } = windowDisplay
  const spec = fit === 'inside' ? treatment.insideLayer.spec : treatment.outsideLayer.spec

  if (!isSantaFeShutterSpec(spec)) return []

  const fitCapitalised = capitalise(fit) as Fit

  const { fabric } = spec
  if (typeof fabric === 'undefined') return []

  const colour = fabric.name

  const control = spec.lithiumSmartMotor ? 'Lithium Smart Motor' : ' '

  const controlSide =
    fit === 'inside' ? windowMeasurement.controlSide : windowMeasurement.outsideControlSide

  const track = spec.track ?? ' '

  const shutterPole = spec.shuttlePole ? 'Yes' : ' '
  const flushBolt = spec.flushBolts ? 'Yes' : ' '

  const leftBlindCost = await getSantaFeShutterCostAsync(blindType, width[0], height, control)
  if (typeof leftBlindCost === 'undefined') return []

  const leftEntry: SantaFeShutterTableEntry = {
    index,
    location,
    width: width[0],
    height: height,
    fit: fitCapitalised,
    colour,
    control,
    'control side': controlSide,
    track,
    'shutter pole': shutterPole,
    'flush bolt': flushBolt,
    price: leftBlindCost.toFixed(2)
  }

  return [leftEntry]
}
