import { ProjectFile, WindowMeasurement } from '@shared/types/Project.types'

export function getWindow(windowId: string, file: ProjectFile) {
  if (typeof file === 'undefined') return undefined
  if (!windowId || windowId.trim().length === 0) return undefined

  const { rooms } = file.project

  let windowFound: WindowMeasurement | undefined = undefined

  for (const room of rooms) {
    windowFound = room.windows.find((w) => w.id === windowId)
    if (typeof windowFound !== 'undefined') break
  }

  return windowFound
}
