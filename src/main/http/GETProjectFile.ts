import { GETProjectFileResponse, ProjectFile } from '@shared/types/Project.types'

function GETProjectFileEndpoint() {
  return new URL(``, 'https://lewiss-measure-pro.netlify.app/.netlify/functions/graph')
}

function GETProjectFileFetchOptions(fileId: string) {
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'downloadJson', itemId: fileId })
  }

  return fetchOptions
}

async function GETProjectfile(fileId: string, endpoint: URL = GETProjectFileEndpoint()) {
  try {
    if (typeof fileId === 'undefined' || fileId.trim().length === 0)
      throw new Error('Missing file id')

    const fetchOptions = GETProjectFileFetchOptions(fileId)

    const response = await fetch(endpoint, fetchOptions)
    if (!response.ok) throw new Error(response.statusText)

    const jsonBody: GETProjectFileResponse = await response.json()

    if (!jsonBody.ok) throw new Error(response.statusText)

    const projectFile: ProjectFile = await JSON.parse(jsonBody.content)

    return projectFile
  } catch (error) {
    throw new Error('Failed to fetch project file', { cause: error })
  }
}

export default GETProjectfile
