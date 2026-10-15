import { capitalise } from '@/utility/general/capitalise'
import { Blind } from '@shared/types/blind/blind.types'
import { PDFResponse } from '@shared/types/pdf.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'

export async function openWorksheetPDF(worksheet: Worksheet, pdfResponse: PDFResponse) {
  const { status } = pdfResponse
  if (status === 'failure')
    throw new Error(`PDF Response is a failure`, { cause: pdfResponse.error })

  const { pdf } = pdfResponse

  if (typeof pdf !== 'string' || pdf.length === 0)
    throw new Error(`PDF Response has incorrect data`)

  const fileName = getFileName(worksheet)

  await window.api.openPDF(fileName, pdf)
}

function getFileName(worksheet: Worksheet) {
  const defaultFileName = `pdf_${Date.now().toString()}`

  const manufacturer = manufacturerMap[worksheet.blindType]
  if (typeof manufacturer === 'undefined') return defaultFileName

  const suffix = productSuffix[worksheet.blindType]
  if (typeof suffix === 'undefined') return defaultFileName

  const reference = worksheet.customer.reference

  return `${capitalise(manufacturer)} ${reference}${suffix}`
}

const manufacturerMap: Record<Blind, string> = {
  'Kinetics 10mm Cellular Blind': 'windoware',
  'Kinetics 20mm Cellular Blind': 'windoware',
  'Kinetics Sunscreen Roller Blind': 'windoware',
  'Kinetics Blockout Roller Blind': 'windoware',
  'Kinetics Light Filtering Roller Blind': 'windoware',
  "Lewis's 25mm Aluminium Venetian": 'windoware',
  "Lewis's 50mm Aluminium Venetian": 'windoware',
  "Lewis's 50mm Fauxwood Venetian": 'windoware',
  "Lewis's 63mm Fauxwood Venetian": 'windoware',
  "Lewis's 50mm Phoenixwood Venetian": 'windoware',
  "Lewis's 63mm Phoenixwood Venetian": 'windoware',
  'Kinetics Mikronwood 50mm Venetian': 'windoware',
  'Santa Fe Woodlore Shutter': 'SantaFe',
  'Santa Fe Woodlore Plus Shutter': 'SantaFe',
  'Santa Fe Waterproof Woodlore Plus Shutter': 'SantaFe',
  'Santa Fe Normandy Shutter': 'SantaFe'
}

const productSuffix: Record<Blind, string> = {
  'Kinetics 10mm Cellular Blind': 'KI',
  'Kinetics 20mm Cellular Blind': 'KI',
  'Kinetics Sunscreen Roller Blind': 'KI',
  'Kinetics Blockout Roller Blind': 'KI',
  'Kinetics Light Filtering Roller Blind': 'KI',
  "Lewis's 25mm Aluminium Venetian": 'VE',
  "Lewis's 50mm Aluminium Venetian": 'VE',
  "Lewis's 50mm Fauxwood Venetian": 'VE',
  "Lewis's 63mm Fauxwood Venetian": 'VE',
  "Lewis's 50mm Phoenixwood Venetian": 'VE',
  "Lewis's 63mm Phoenixwood Venetian": 'VE',
  'Kinetics Mikronwood 50mm Venetian': 'KI',
  'Santa Fe Woodlore Shutter': 'SH',
  'Santa Fe Woodlore Plus Shutter': 'SH',
  'Santa Fe Waterproof Woodlore Plus Shutter': 'SH',
  'Santa Fe Normandy Shutter': 'SH'
}
