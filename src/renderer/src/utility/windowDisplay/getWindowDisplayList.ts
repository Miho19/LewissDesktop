import { ProjectFile, Treatment, WindowMeasurement } from '@shared/types/Project.types'
import { BlindCount, Fit, WindowDisplay } from '@shared/types/Window.types'
import { getBlindCountDisplay } from './getBlindCountDisplay'
import { getWindowWidth } from './getWindowWidth'
import { getWindowHeight } from './getWindowHeight'
import { isSpecDual } from '@shared/types/spec/Spec.types'

export function getWindowDisplayList(file: ProjectFile) {
  if (typeof file === 'undefined') throw new Error(`Project file is undefined`)
  if (typeof file.project === 'undefined') throw new Error(`Project object is undefined`)

  const { rooms } = file.project
  if (typeof rooms === 'undefined') throw new Error(`${file.name} failed to read rooms`)

  if (rooms.length === 0) return undefined

  const outputList: WindowDisplay[] = []

  for (var room of rooms) {
    const { id: roomId, treatment, windows } = room

    if (typeof treatment === 'undefined')
      throw new Error(`roomId: ${roomId} treatment is undefined`)

    const roomWindows = windows.flatMap((window) => getWindowDisplay(roomId, window, treatment))
    outputList.push(...roomWindows)
  }

  return outputList.flat()
}

// we need to return the windows out --> this is two for standard inside / outside single and butting
// for dual we need to return 4 blinds

export function getWindowDisplay(
  roomId: string,
  window: WindowMeasurement,
  treatment: Treatment
): WindowDisplay[] {
  const output: WindowDisplay[] = [
    ...createWindowDisplay(roomId, window.id, 'inside', window, treatment),
    ...createWindowDisplay(roomId, window.id, 'outside', window, treatment)
  ]

  const filtered = output.filter((wd) => {
    if (typeof wd === 'undefined') return false
    if (wd.width.length === 0) return false
    if (wd.width[0] === 0) return false
    if (wd.height === 0) return false
    return true
  })

  return filtered
}

function createWindowDisplay(
  roomId: string,
  windowId: string,
  fit: Fit,
  window: WindowMeasurement,
  treatment: Treatment
) {
  const widthArray = getWindowWidth(window, fit) ?? [0]
  const height = getWindowHeight(window, fit) ?? 0

  const blindCount =
    getBlindCountDisplay(fit === 'inside' ? window.blindCount : window.outsideBlindCount) ??
    'single'

  const layer = fit === 'inside' ? treatment.insideLayer : treatment.outsideLayer
  if (layer == null) {
    return []
  }

  const { spec } = layer
  if (typeof spec === 'undefined') return []

  const windowDisplay: WindowDisplay = {
    windowId,
    roomId,
    fit,
    blindCount,
    width: widthArray,
    height,
    spec: spec
  }

  if (blindCount === 'single' || blindCount === 'butting') return [windowDisplay]

  if (!isSpecDual(spec)) {
    return []
    // throw new Error(`room ${roomId} window ${windowId} spec needs to be dual`)
  }

  const { front, rear } = spec

  const frontDisplay = { ...windowDisplay, spec: front }
  const rearDisplay = { ...windowDisplay, spec: rear }

  return [frontDisplay, rearDisplay]
}
