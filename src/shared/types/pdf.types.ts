import { Blind } from '@shared/types/blind/blind.types'
import { ColumnProperties, ContentColumns, ContentText } from 'pdfmake/interfaces'

type Success = {
  status: 'success'
  pdf: string
}

type Failure = {
  status: 'failure'
  error: Error[]
}

export type PDFResponse = Success | Failure

export type GetPDFTitleFn = (blindType: Blind, blindTotal: number) => ContentText
export type GetLogoHeaderFn = (blindType: Blind) => Promise<ContentColumns & ColumnProperties>
