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

export type POSTJSONResponse = {
  ok: boolean
  filename: string
  itemId: string
  error: string
  webUrl: string
}
