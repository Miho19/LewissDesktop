import { FolderItem, GETFolderResponse } from 'shared/types/Folder.types'

function GETFolderEndpoint() {
  return new URL('', 'https://lewiss-measure-pro.netlify.app/.netlify/functions/graph')
}

function GETFolderFetchOptions(folderId: string): RequestInit {
  let body = ''

  if (folderId.trim().localeCompare('root', undefined, { sensitivity: 'base' }) === 0) {
    body = JSON.stringify({ action: 'listFolder' })
  } else {
    body = JSON.stringify({ action: 'listFolder', folderId })
  }

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  }

  return fetchOptions
}

export async function GETFolder(
  folderId: string,
  endpoint: URL = GETFolderEndpoint()
): Promise<FolderItem[]> {
  try {
    if (folderId == null || folderId.trim().length === 0) throw new Error('FolderId is undefined')

    const fetchOptions = GETFolderFetchOptions(folderId)

    const response = await fetch(endpoint, fetchOptions)
    if (!response.ok) throw new Error(response.statusText)
    const jsonBody: GETFolderResponse = await response.json()
    return jsonBody.children
  } catch (error) {
    throw new Error(`Failed to fetch folder: ${folderId}`)
  }
}
