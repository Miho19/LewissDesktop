import { ProjectFile, Treatment, WindowMeasurement } from 'shared/types/Project.types'
import { WindowDisplay } from 'shared/types/Window.types'
import { getBlindCountDisplay } from './getBlindCountDisplay'
import { getWindowWidth } from './getWindowWidth'
import { getWindowHeight } from './getWindowHeight'

export function getWindowDisplayList(file: ProjectFile) {
  const rooms = file.project.rooms
  if (rooms.length === 0) return undefined

  const outputList: WindowDisplay[] = []

  for (var room of rooms) {
    const { id: roomId, treatment, windows } = room

    const roomWindows = windows.flatMap((window) => getWindowDisplay(roomId, window, treatment))
    outputList.push(...roomWindows)
  }

  return outputList.flat()
}

function getWindowDisplay(
  roomId: string,
  window: WindowMeasurement,
  treatment: Treatment
): WindowDisplay[] {
  const insideBlindCount = getBlindCountDisplay(window.blindCount) ?? 'single'
  const insideWidth = getWindowWidth(window, 'inside') ?? [0]
  const insideHeight = getWindowHeight(window, 'inside') ?? 0

  const inside: WindowDisplay = {
    windowId: window.id,
    roomId: roomId,
    fit: 'inside',
    blindCount: insideBlindCount,
    width: insideWidth,
    height: insideHeight,
    spec: treatment.insideLayer.spec
  }

  const outsideBlindCount = getBlindCountDisplay(window.outsideBlindCount) ?? 'single'
  const outsideWidth = getWindowWidth(window, 'outside') ?? [0]
  const outsideHeight = getWindowHeight(window, 'outside') ?? 0

  const outside: WindowDisplay = {
    windowId: window.id,
    roomId: roomId,
    fit: 'outside',
    blindCount: outsideBlindCount,
    width: outsideWidth,
    height: outsideHeight,
    spec: treatment.outsideLayer.spec
  }

  return [inside, outside]
}
