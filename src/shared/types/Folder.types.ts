export type FolderItem = {
  id: string
  isFile: boolean
  isFolder: boolean
  lastModified: string
  name: string
  size: number
}

export type GETFolderResponse = {
  ok: boolean
  children: FolderItem[]
}
