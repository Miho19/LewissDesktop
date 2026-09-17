import { Column, ContentImage } from 'pdfmake/interfaces'

import windowWareLogo from '../../../resources/Windoware-Logo-1.png?asset'

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
