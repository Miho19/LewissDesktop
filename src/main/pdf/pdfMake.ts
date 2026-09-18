import { TDocumentDefinitions } from 'pdfmake/interfaces'

import path from 'path'

const fonts = {
  Roboto: {
    normal: path.join(__dirname, 'resources/Roboto-Regular.ttf'),
    bold: path.join(__dirname, 'resources/Roboto-Medium.ttf'),
    italics: path.join(__dirname, 'resources/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, 'resources/Roboto-MediumItalic.ttf')
  }
}

export async function createPDFDocumentAsync(document: TDocumentDefinitions) {
  const pdfmake = (await import('pdfmake/build/pdfmake.js')).default
  const pdfFonts = (await import('pdfmake/build/vfs_fonts.js')).default

  pdfmake.addVirtualFileSystem(pdfFonts)

  return pdfmake.createPdf(document)
}

// export async function openPDFDocumentAsync(document: TDocumentDefinitions) {
//   const pdfDocument = await createPDFDocumentAsync(document)
//   pdfDocument.open()
// }
