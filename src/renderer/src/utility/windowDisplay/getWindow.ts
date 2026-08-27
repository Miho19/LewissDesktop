import { ProjectFile } from 'shared/types/Project.types'

export function getWindow(windowId: string, file: ProjectFile) {
  if (typeof file === 'undefined') return undefined
  if (!windowId || windowId.trim().length === 0) return undefined

  const { rooms } = file.project
}
