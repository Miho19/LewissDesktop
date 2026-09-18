import { TDocumentDefinitions } from 'pdfmake/interfaces'
import pdfmake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts'

const Roboto = {
  normal: 'Roboto-Regular.ttf',
  bold: 'Roboto-Medium.ttf',
  italics: 'Roboto-Italic.ttf',
  bolditalics: 'Roboto-MediumItalic.ttf'
}

export async function createPDFDocumentAsync(document: TDocumentDefinitions) {
  pdfmake.addFonts({ Roboto })
  pdfmake.addVirtualFileSystem(pdfFonts)

  return pdfmake.createPdf(document)
}
