import { capitalise } from '@/utility/general/capitalise'
import { getLewissFauxwoodCostAsync } from '@/utility/process/tableEntry/lewissFauxwood/getLewissFauxwoodCost'
import {
  getLewissVenetianControl,
  getLewissVenetianValance,
  getLewissSpacerBlock,
  getLewissVenetianCutOut
} from '@/utility/process/tableEntry/shared/venetian'

import { Blind } from '@shared/types/blind/blind.types'
import { Room, WindowMeasurement, ProjectFile } from '@shared/types/Project.types'
import { isVenetianSpec } from '@shared/types/spec/venetian.types'
import { LewissFauxwoodTableEntry } from '@shared/types/tableEntry/lewissFauxwood.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { Fit, WindowDisplay } from '@shared/types/WindowDisplay.types'

export async function getLewissFauxwoodTableEntryAsync(
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

  const valance = getLewissVenetianValance(spec) ?? ''
  const fascia = ' '

  const spacerBlock = getLewissSpacerBlock(spec)

  const cutOut = getLewissVenetianCutOut(spec)

  const palladianShelf = ''

  const butting = ''

  const leftBlindCost = await getLewissFauxwoodCostAsync(
    blindType,
    leftBlindWidth,
    height,
    fabricMultiplier,
    control,
    valance,
    fascia,
    spacerBlock,
    cutOut,
    palladianShelf
  )

  if (typeof leftBlindCost === 'undefined')
    throw new Error(`${blindType} left blind cost is undefined`)

  const leftBlindEntry: LewissFauxwoodTableEntry = {
    index,
    location,
    width: leftBlindWidth,
    height,
    fit: fitCapitalised,
    colour: colour,
    control,
    'control side': controlSide,
    'tilt side': tiltSide,
    valance,
    fascia: fascia,
    'Spacer Block': spacerBlock,
    'cut out': cutOut,
    'palladian shelf': palladianShelf,
    butting,
    price: leftBlindCost
  }

  return [leftBlindEntry]
}
