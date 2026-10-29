import { Blind } from '@shared/types/blind/blind.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'

function POSTHistoryPDFEndpoint() {
  return new URL(``, 'https://lewiss-measure-pro.netlify.app/.netlify/functions/graph')
}
function POSTHistoryPDFFetchOption(
  fileName: string,
  content: string,
  folderId: string
): RequestInit {
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: import.meta.env.MAIN_VITE_COOKIE },
    body: JSON.stringify({
      action: 'uploadPDF',
      folderId: folderId,
      filename: fileName,
      fileBase64: content
    })
  }

  return fetchOptions
}

export async function POSTHistoryPDF(
  worksheet: Worksheet,
  pdfBase64: string,
  endpoint: URL = POSTHistoryPDFEndpoint()
) {
  const fileName = getFileName(worksheet)
  const folderId = '01VFVMOAEPH2B72PIHJNBYWJDJZL2ZZQIW' // root/confirmed orders/
  const fetchOption = POSTHistoryPDFFetchOption(fileName, pdfBase64, folderId)

  const response = await fetch(endpoint, fetchOption)
  if (!response.ok) throw new Error(response.statusText)

  const jsonBody = await response.json()

  return jsonBody
}

function getFileName(worksheet: Worksheet) {
  const defaultFileName = `pdf_${Date.now().toString()}.pdf`

  const manufacturer = manufacturerMap[worksheet.blindType]
  if (typeof manufacturer === 'undefined') return defaultFileName

  const suffix = productSuffix[worksheet.blindType]
  if (typeof suffix === 'undefined') return defaultFileName

  const reference = worksheet.customer.reference

  return `${cap(manufacturer)} ${reference}${suffix}.pdf`
}

function cap(str: string) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
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
