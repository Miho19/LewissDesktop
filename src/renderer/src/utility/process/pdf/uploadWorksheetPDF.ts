import { POSTFileResponse } from '@shared/types/Folder.types'
import { PDFResponse } from '@shared/types/pdf.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'

export async function uploadWorksheetPDFToSharePoint(
  worksheet: Worksheet,
  pdfResponse: PDFResponse
) {
  if (pdfResponse.status === 'failure') return pdfResponseFailureResponse(pdfResponse)

  return await window.api.writeWorksheetPDFToSharePoint(worksheet, pdfResponse.pdf)
}

export async function uploadWorksheetPDFToPending(worksheet: Worksheet, pdfResponse: PDFResponse) {
  if (pdfResponse.status === 'failure') return pdfResponseFailureResponse(pdfResponse)

  return await window.api.writeWorksheetPDFToPending(worksheet, pdfResponse.pdf)
}

export async function uploadWorksheetPDFToOrder(worksheet: Worksheet, pdfResponse: PDFResponse) {
  if (pdfResponse.status === 'failure') return pdfResponseFailureResponse(pdfResponse)

  return await window.api.writeWorksheetPDFToOrder(worksheet, pdfResponse.pdf)
}

function pdfResponseFailureResponse(pdfResponse: PDFResponse) {
  if (pdfResponse.status !== 'failure')
    throw new Error('PDF Response should have a status of failure')

  const errorResponse: POSTFileResponse = {
    ok: false,
    filename: '',
    itemId: '',
    error: `${pdfResponse.error}`,
    webUrl: ''
  }

  return errorResponse
}
