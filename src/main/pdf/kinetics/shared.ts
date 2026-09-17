import { Column, ContentImage } from 'pdfmake/interfaces'

import windowWareLogo from '../../../resources/Windoware-Logo-1.png?asset'

// we are going to eventually make this a shared function for all create content because it is the same thing repeated with the only change being title
export async function createWindowWareHeader() {
  const windowWareLogoAsBase64: string = await getImageAsBase64Async(windowWareLogo)

  const image: ContentImage = {
    image: windowWareLogoAsBase64,
    width: 100
  }

  const column: Column = {
    columns: [{ width: '*', text: ' ' }, image]
  }

  return column
}

async function getImageAsBase64Async(path: string): Promise<string> {
  const fileBlob = await fetchFileBlobAsync(path)
  return await convertFileToBase64(fileBlob)
}

async function fetchFileBlobAsync(path: string) {
  const response: Response = await fetch(path)
  return await response.blob()
}

async function convertFileToBase64(fileBlob: Blob): Promise<string> {
  const arrayBuffer = await fileBlob.arrayBuffer()
  return Buffer.from(arrayBuffer).toString('base64')
}
