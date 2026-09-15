import { capitalise } from '@/utility/general/capitalise'
import { getLewissAluminiumCostAsync } from '@/utility/process/tableEntry/lewissAluminium/getLewissAluminiumCost'
import {
  getLewissSpacerBlock,
  getLewissVenetianControl
} from '@/utility/process/tableEntry/shared/venetian'

import { Blind } from '@shared/types/blind/blind.types'
import { Room, WindowMeasurement, ProjectFile } from '@shared/types/Project.types'
import { isVenetianSpec } from '@shared/types/spec/venetian.types'
import { LewissAluminiumTableEntry } from '@shared/types/tableEntry/lewissAluminium.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { Fit, WindowDisplay } from '@shared/types/WindowDisplay.types'

export async function getLewissAluminiumTableEntryAsync(
  blindType: Blind,
  index: number,
  windowDisplay: WindowDisplay,
  room: Room,
  windowMeasurement: WindowMeasurement,
  entries: TableEntry[],
  file: ProjectFile
) {
  const { width, height, fit, spec } = windowDisplay

  if (!isVenetianSpec(spec)) throw new Error(`${blindType} incorrect spec type`)

  const location = `${room.name} - ${windowMeasurement.name}`

  const leftBlindWidth = width[0]

  const fitCapitalised = capitalise(fit) as Fit

  const fabric = spec.fabric
  if (typeof fabric === 'undefined') throw new Error(`${blindType} fabric information missing`)

  const colour = fabric.name
  const fabricMultiplier = fabric.multiplier

  const control = getLewissVenetianControl(spec)

  const controlSide =
    fit === 'inside' ? windowMeasurement.controlSide : windowMeasurement.outsideControlSide

  const tiltSide = controlSide // this is currently incorrect as we do not have a seperate tilt selector

  const spacerBlock = getLewissSpacerBlock(spec)

  const leftBlindCost = await getLewissAluminiumCostAsync(
    blindType,
    leftBlindWidth,
    height,
    fabricMultiplier,
    control,
    spacerBlock
  )

  if (typeof leftBlindCost === 'undefined')
    throw new Error(`${blindType} left blind cost is undefined`)

  const leftBlindEntry: LewissAluminiumTableEntry = {
    index,
    location,
    width: width[0],
    height,
    fit: fitCapitalised,
    colour,
    control,
    'control side': controlSide,
    'tilt side': tiltSide,
    'Spacer Block': spacerBlock,
    price: leftBlindCost.toFixed(2)
  }

  return [leftBlindEntry]
}
