import { PDFResponse } from '@shared/types/pdf.types'

export async function openWorksheetPDF(pdfResponse: PDFResponse) {
  const { status } = pdfResponse
  if (status === 'failure')
    throw new Error(`PDF Response is a failure`, { cause: pdfResponse.error })

  const { pdf } = pdfResponse

  if (typeof pdf !== 'string' || pdf.length === 0)
    throw new Error(`PDF Response has incorrect data`)

  await window.api.openPDF(pdf)
}
