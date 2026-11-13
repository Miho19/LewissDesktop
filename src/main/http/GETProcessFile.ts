import { ProcessFile } from '@shared/types/process/Process.types'
import { GETProjectFileResponse } from '@shared/types/Project.types'

function GETProcessFileEndpoint() {
  return new URL(``, 'https://lewiss-measure-pro.netlify.app/.netlify/functions/graph')
}

function GETProcessFileFetchOptions(fileId: string) {
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: import.meta.env.MAIN_VITE_COOKIE },
    body: JSON.stringify({ action: 'downloadJson', itemId: fileId })
  }

  return fetchOptions
}

export async function GETProcessFile(fileId: string, endpoint: URL = GETProcessFileEndpoint()) {
  if (typeof fileId === 'undefined' || fileId.trim().length === 0)
    throw new Error('Missing file id')

  const fetchOptions = GETProcessFileFetchOptions(fileId)

  const response = await fetch(endpoint, fetchOptions)
  if (!response.ok) throw new Error(response.statusText)

  const jsonBody: GETProjectFileResponse = await response.json()

  if (!jsonBody.ok) throw new Error(response.statusText)

  const processFile: ProcessFile = await JSON.parse(jsonBody.content)

  return processFile
}
