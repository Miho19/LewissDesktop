import { createWindowWareHeaderAsync, getKineticsTitle } from '@main/pdf/kinetics'
import { createSantaFeOrderLogoAsync, getSantaFeTitle } from '@main/pdf/santaFe'
import {
  createCostTotalColumn,
  createCustomerInformationColumn,
  createTable
} from '@main/pdf/shared'
import { Blind } from '@shared/types/blind/blind.types'
import { GetLogoHeaderFn, GetPDFTitleFn } from '@shared/types/pdf.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'
import { Content } from 'pdfmake'

export async function createContentAsync(worksheet: Worksheet) {
  const content: Content[] = []

  const { blindType, customer, tableEntryList, worksheetCost } = worksheet

  if (tableEntryList.length === 0) throw new Error(`Table Entry List is empty`)

  const headerFunction = createPDFHeaderLogoFunctionMap[blindType]
  if (typeof headerFunction === 'undefined')
    throw new Error(`${blindType} does not have a header logo function`)

  const header = await headerFunction(blindType)
  content.push(header)

  const titleFunction = createPDFTitleFunctionMap[blindType]
  if (typeof titleFunction === 'undefined')
    throw new Error(`${blindType} does not have a title function`)

  const title = titleFunction(blindType, tableEntryList.length)
  content.push(title)

  const customerInformationColumn = createCustomerInformationColumn(customer)
  content.push(customerInformationColumn)

  const blindInformation = createTable(tableEntryList)
  content.push(blindInformation)

  const costTotal = createCostTotalColumn(worksheetCost)
  content.push(costTotal)

  return content
}

const createPDFHeaderLogoFunctionMap: Record<Blind, GetLogoHeaderFn> = {
  'Kinetics 10mm Cellular Blind': createWindowWareHeaderAsync,
  'Kinetics 20mm Cellular Blind': createWindowWareHeaderAsync,
  'Kinetics Sunscreen Roller Blind': createWindowWareHeaderAsync,
  'Kinetics Blockout Roller Blind': createWindowWareHeaderAsync,
  'Kinetics Light Filtering Roller Blind': createWindowWareHeaderAsync,
  'Kinetics Mikronwood 50mm Venetian': createWindowWareHeaderAsync,

  "Lewis's 25mm Aluminium Venetian": createSantaFeOrderLogoAsync,
  "Lewis's 50mm Aluminium Venetian": createSantaFeOrderLogoAsync,
  "Lewis's 50mm Fauxwood Venetian": createSantaFeOrderLogoAsync,
  "Lewis's 63mm Fauxwood Venetian": createSantaFeOrderLogoAsync,
  "Lewis's 50mm Phoenixwood Venetian": createSantaFeOrderLogoAsync,
  "Lewis's 63mm Phoenixwood Venetian": createSantaFeOrderLogoAsync,

  'Santa Fe Woodlore Shutter': createSantaFeOrderLogoAsync,
  'Santa Fe Woodlore Plus Shutter': createSantaFeOrderLogoAsync,
  'Santa Fe Waterproof Woodlore Plus Shutter': createSantaFeOrderLogoAsync,
  'Santa Fe Normandy Shutter': createSantaFeOrderLogoAsync
}

const createPDFTitleFunctionMap: Record<Blind, GetPDFTitleFn> = {
  'Kinetics 10mm Cellular Blind': getKineticsTitle,
  'Kinetics 20mm Cellular Blind': getKineticsTitle,
  'Kinetics Sunscreen Roller Blind': getKineticsTitle,
  'Kinetics Blockout Roller Blind': getKineticsTitle,
  'Kinetics Light Filtering Roller Blind': getKineticsTitle,
  'Kinetics Mikronwood 50mm Venetian': getKineticsTitle,

  "Lewis's 25mm Aluminium Venetian": getSantaFeTitle,
  "Lewis's 50mm Aluminium Venetian": getSantaFeTitle,
  "Lewis's 50mm Fauxwood Venetian": getSantaFeTitle,
  "Lewis's 63mm Fauxwood Venetian": getSantaFeTitle,
  "Lewis's 50mm Phoenixwood Venetian": getSantaFeTitle,
  "Lewis's 63mm Phoenixwood Venetian": getSantaFeTitle,

  'Santa Fe Woodlore Shutter': getSantaFeTitle,
  'Santa Fe Woodlore Plus Shutter': getSantaFeTitle,
  'Santa Fe Waterproof Woodlore Plus Shutter': getSantaFeTitle,
  'Santa Fe Normandy Shutter': getSantaFeTitle
}
