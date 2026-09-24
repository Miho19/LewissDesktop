import { ProjectFile, Treatment, WindowMeasurement } from '@shared/types/Project.types'
import { BlindCount, Fit, WindowDisplay } from '@shared/types/WindowDisplay.types'
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
    const { id: roomId, treatment, windows, name } = room

    if (typeof treatment === 'undefined')
      throw new Error(`roomId: ${roomId} treatment is undefined`)

    const roomWindows = windows.flatMap((window) =>
      getWindowDisplay(roomId, window, treatment, name)
    )
    outputList.push(...roomWindows)
  }

  return outputList.flat()
}

// we need to return the windows out --> this is two for standard inside / outside single and butting
// for dual we need to return 4 blinds

// want to create a result return type --> windowdisplay[] and an array of errors to display to the user

export function getWindowDisplay(
  roomId: string,
  window: WindowMeasurement,
  treatment: Treatment,
  roomName: string
): WindowDisplay[] {
  const output: WindowDisplay[] = [
    ...createWindowDisplay(roomId, window.id, 'inside', window, treatment, roomName),
    ...createWindowDisplay(roomId, window.id, 'outside', window, treatment, roomName)
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

/**
 *
 * @param roomId
 * @param windowId
 * @param fit
 * @param window
 * @param treatment
 * @returns
 *
 *
 * If the room has a inside or outside spec that is dual but the current window is a single
 * it will inspect the spec and retrieve from the dual spec either front if inside or rear if outside for the spec
 *
 */
function createWindowDisplay(
  roomId: string,
  windowId: string,
  fit: Fit,
  window: WindowMeasurement,
  treatment: Treatment,
  roomName: string
) {
  const widthArray = getWindowWidth(window, fit) ?? [0]
  const height = getWindowHeight(window, fit) ?? 0

  const blindCount = getBlindCountDisplay(
    fit === 'inside' ? window.blindCount : window.outsideBlindCount
  )

  if (typeof blindCount === 'undefined')
    throw new Error(`${roomId} ${windowId} ${fit} incorrect blind count`)

  const layer = fit === 'inside' ? treatment.insideLayer : treatment.outsideLayer
  if (layer == null) {
    return []
  }

  let { spec } = layer
  if (typeof spec === 'undefined') throw new Error(`${roomId} ${windowId} ${fit} spec is undefined`)

  if (isSpecDual(spec) && blindCount !== 'dual') {
    // console.log(`room ${roomId} window ${windowId} spec needs to be dual`)
    spec = fit === 'inside' ? spec.front : spec.rear
  }

  const windowDisplay: WindowDisplay = {
    windowId,
    roomId,
    fit,
    blindCount,
    width: widthArray,
    height,
    spec: spec,
    roomName,
    windowName: window.name
  }

  if (blindCount !== 'dual') return [windowDisplay]

  if (!isSpecDual(spec)) {
    return []
    throw new Error(`${roomId} ${windowId} ${fit} spec needs to be dual`)
  }

  const { front, rear } = spec

  const frontDisplay: WindowDisplay = { ...windowDisplay, spec: front, fit: 'inside' }
  const rearDisplay: WindowDisplay = { ...windowDisplay, spec: rear, fit: 'outside' }

  return [frontDisplay, rearDisplay]
}
