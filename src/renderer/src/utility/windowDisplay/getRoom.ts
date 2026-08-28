import { ProjectFile } from '@shared/types/Project.types'

export function getRoom(roomId: string, file: ProjectFile) {
  if (typeof file === 'undefined') return undefined
  if (!roomId || roomId.trim().length === 0) return undefined

  const { rooms } = file.project
  const room = rooms.find((r) => r.id === roomId)

  return room
}
