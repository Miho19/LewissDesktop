import { Worksheet } from '@shared/types/worksheet/Worksheet.types'
import { Content } from 'pdfmake/interfaces'

type Success = {
  status: 'success'
  pdf: string
}

type Failure = {
  status: 'failure'
  error: Error[]
}

export type PDFResponse = Success | Failure

export type CreateWorksheetPDFFn = (worksheet: Worksheet) => Promise<Content[]>
