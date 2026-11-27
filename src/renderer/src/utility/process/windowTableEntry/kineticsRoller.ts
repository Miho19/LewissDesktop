import { capitalise } from '@/utility/general/capitalise'
import {
  getKineticsRollerBottomRail,
  getKineticsRollerButting,
  getKineticsRollerControl,
  getKineticsRollerCostAsync,
  getKineticsRollerPelmet
} from '@/utility/process/tableEntry/kineticsRoller'
import { getKineticsRollerBracket } from '@/utility/process/tableEntry/kineticsRoller/getKineticsBracketCost'
import { getBlindCountDisplay } from '@/utility/process/windowDisplay/getBlindCountDisplay'
import { windowTableEntryThrowError } from '@/utility/process/windowTableEntry/getWindowTableEntryList'
import { Blind } from '@shared/types/blind/blind.types'
import { Cover, ProcessFile } from '@shared/types/process/Process.types'
import { WindowMeasurement } from '@shared/types/Project.types'
import { isKineticsRollerSpec, KineticsRollerSpec } from '@shared/types/spec/kineticsRoller.types'
import { Spec } from '@shared/types/spec/Spec.types'
import { KineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { Fit } from '@shared/types/WindowDisplay.types'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'

export async function getKineticsRollerWindowTableEntryListAsync(
  blindType: Blind,
  index: number,
  roomName: string,
  spec: Spec,
  cover: Cover,
  window: WindowMeasurement,
  _file: ProcessFile
) {
  if (!isKineticsRollerSpec(spec))
    throw windowTableEntryThrowError(blindType, 'Incorrect spec type')

  const { name: windowName, width, height, controlSide, fitting } = cover

  const location = `${roomName} - ${windowName}`

  const fit = capitalise(fitting) as Fit

  const roll = getRollDirection(window, spec)

  const fabric = spec.fabric
  if (fabric == null) throw windowTableEntryThrowError(blindType, 'Fabric missing')
  const { name: fabricName, multiplier: fabricMultiplier } = fabric

  const control = getKineticsRollerControl(spec, window)

  const bottomRail = getKineticsRollerBottomRail(spec)
  const bracket = getKineticsRollerBracket(spec)
  const pelmet = getKineticsRollerPelmet(spec)

  const blindCount = fit === 'inside' ? window.blindCount : window.outsideBlindCount
  const blindCountString = getBlindCountDisplay(blindCount)
  if (typeof blindCountString === 'undefined')
    throw windowTableEntryThrowError(blindType, 'Incorrect blind count')

  const leftBlindButting = getKineticsRollerButting(blindCountString, 'LHS', index)

  const leftBlindCost = await getKineticsRollerCostAsync(
    blindType,
    width,
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
    width: width,
    height: height,
    fit: fit,
    roll,
    fabric: fabricName,
    control,
    'control side': controlSide,
    'bottom rail': bottomRail,
    bracket,
    pelmet,
    butting: leftBlindButting,
    remote: 0,
    channel: 0,
    price: leftBlindCost.toFixed(2)
  }

  const leftWindowTableEntry: WindowTableEntry = {
    blindType,
    tableEntry: leftEntry
  }

  return [leftWindowTableEntry]
}

function getRollDirection(window: WindowMeasurement, spec: KineticsRollerSpec) {
  const { rollerRoll, rollerRollRequired } = window
  const { rollDirection } = spec

  if (rollerRollRequired) return adjustRollString(rollerRollRequired)
  if (rollerRoll) return adjustRollString(rollerRoll)
  return adjustRollString(rollDirection)
}

function adjustRollString(roll: string) {
  return roll.replace(/roll/gi, '').trim()
}
