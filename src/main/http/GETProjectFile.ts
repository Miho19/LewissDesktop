import { GETProjectFileResponse, ProjectFile } from '@shared/types/Project.types'
import { app, shell } from 'electron'
import path from 'path'
import fs from 'node:fs/promises'

function GETProjectFileEndpoint() {
  return new URL(``, 'https://lewiss-measure-pro.netlify.app/.netlify/functions/graph')
}

function GETProjectFileFetchOptions(fileId: string) {
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: import.meta.env.MAIN_VITE_COOKIE },
    body: JSON.stringify({ action: 'downloadJson', itemId: fileId })
  }

  return fetchOptions
}

async function GETProjectfile(fileId: string, endpoint: URL = GETProjectFileEndpoint()) {
  if (typeof fileId === 'undefined' || fileId.trim().length === 0)
    throw new Error('Missing file id')

  const fetchOptions = GETProjectFileFetchOptions(fileId)

  const response = await fetch(endpoint, fetchOptions)
  if (!response.ok) throw new Error(response.statusText)

  const jsonBody: GETProjectFileResponse = await response.json()

  if (!jsonBody.ok) throw new Error(response.statusText)

  const projectFile: ProjectFile = await JSON.parse(jsonBody.content)

  return projectFile
}

async function _writeToTemp(jsonBody: GETProjectFileResponse) {
  try {
    const tempFile = path.join(app.getPath('temp'), `projectFile.json`)
    await fs.writeFile(tempFile, jsonBody.content, 'utf-8')
    await shell.openPath(tempFile)
  } catch (error) {
    throw new Error(`Error writing to temp`, { cause: error })
  }
}

export default GETProjectfile
