import { Column, ContentImage } from 'pdfmake/interfaces'

// we are going to eventually make this a shared function for all create content because it is the same thing repeated with the only change being title
export async function createWindowWareHeader() {
  const logo = await import('../../../../resources/Windoware-Logo-1.png?inline')

  const image: ContentImage = {
    image: logo.default,
    width: 100
  }

  const column: Column = {
    columns: [{ width: '*', text: ' ' }, image]
  }

  return column
}
