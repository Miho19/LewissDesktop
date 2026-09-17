import { PDFResponse } from '@shared/types/pdf.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'

export async function createWorksheetPDF(worksheet: Worksheet): Promise<PDFResponse> {
  const response = await window.api.createWorksheetPDF(worksheet)
  return response
}
