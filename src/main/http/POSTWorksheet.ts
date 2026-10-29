import { Blind } from '@shared/types/blind/blind.types'
import { POSTFileResponse } from '@shared/types/Folder.types'
import { ProjectFile } from '@shared/types/Project.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'

function POSTWorksheetEndpoint() {
  return new URL(``, 'https://lewiss-measure-pro.netlify.app/.netlify/functions/graph')
}

function POSTWorksheetFetchOption(
  fileName: string,
  content: string,
  folderId: string
): RequestInit {
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: import.meta.env.MAIN_VITE_COOKIE },
    body: JSON.stringify({
      action: 'uploadJson',
      folderId: folderId,
      filename: fileName,
      content: content
    })
  }

  return fetchOptions
}

export async function POSTWorksheet(
  worksheet: Worksheet,
  file: ProjectFile,
  endpoint: URL = POSTWorksheetEndpoint()
) {
  const fileName = getFileName(worksheet)
  const data = JSON.stringify({ worksheet: worksheet, projectFile: file }, null, 2)
  const folderId = '01VFVMOABI7QI3JZ3NQZBZF7PVNERWE6G4' // root/history/processed orders/

  const fetchOption = POSTWorksheetFetchOption(fileName, data, folderId)

  const response = await fetch(endpoint, fetchOption)
  if (!response.ok) throw new Error(response.statusText)

  const jsonBody: POSTFileResponse = await response.json()

  return jsonBody
}

function getFileName(worksheet: Worksheet) {
  const { customerName, reference, salesConsultant } = worksheet.customer

  const consultantCode = getConsultantCode(salesConsultant)
  const tag = fileTagMappedToBlindType[worksheet.blindType] ?? 'Invalid'
  return `${consultantCode} ${customerName}-${reference} ${tag}.json`
}

function getConsultantCode(salesConsultant: string) {
  const split = salesConsultant.split(' ')
  const [first, last] = [
    split[0].trim().charAt(0).toUpperCase(),
    split[1].trim().charAt(0).toUpperCase()
  ]

  return `${first}${last}`
}

const fileTagMappedToBlindType: Record<Blind, string> = {
  'Kinetics Sunscreen Roller Blind': 'roller-ss',
  'Kinetics Blockout Roller Blind': 'roller-bo',
  'Kinetics Light Filtering Roller Blind': 'roller-lf',
  'Kinetics 10mm Cellular Blind': 'cellular-10',
  'Kinetics 20mm Cellular Blind': 'cellular-20',
  'Kinetics Mikronwood 50mm Venetian': 'mikronwood-50',
  "Lewis's 25mm Aluminium Venetian": 'aluminium-25',
  "Lewis's 50mm Aluminium Venetian": 'aluminium-50',
  "Lewis's 50mm Fauxwood Venetian": 'fauxwood-50',
  "Lewis's 63mm Fauxwood Venetian": 'fauxwood-63',
  "Lewis's 50mm Phoenixwood Venetian": 'pheonixwood-50',
  "Lewis's 63mm Phoenixwood Venetian": 'pheonixwood-63',
  'Santa Fe Woodlore Shutter': 'woodlore',
  'Santa Fe Woodlore Plus Shutter': 'woodlore-plus',
  'Santa Fe Waterproof Woodlore Plus Shutter': 'waterproof-woodlore-plus',
  'Santa Fe Normandy Shutter': 'normandy'
}
