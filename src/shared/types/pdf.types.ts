import { Worksheet } from '@shared/types/worksheet/Worksheet.types'
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces'

type Success = {
  status: 'success'
  pdf: TDocumentDefinitions
}

type Failure = {
  status: 'failure'
  error: Error[]
}

export type PDFResponse = Success | Failure

export type CreateWorksheetPDFFn = (worksheet: Worksheet) => Promise<Content[]>
