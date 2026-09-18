import { createWindowWareHeader } from '@main/pdf/kinetics/shared'
import {
  createCostTotalColumn,
  createCustomerInformationColumn,
  createTable
} from '@main/pdf/shared'
import { Blind } from '@shared/types/blind/blind.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'
import { Content } from 'pdfmake'

export async function getKineticsCellularPDFContentAsync(worksheet: Worksheet) {
  const content: Content[] = []

  const { blindType, customer, tableEntryList, worksheetCost } = worksheet

  if (tableEntryList.length === 0) throw new Error(`Table Entry List is empty`)

  const header = await createWindowWareHeader()
  content.push(header)

  const titleString = getTitleString(blindType, tableEntryList.length)
  content.push(titleString)

  const customerInformationColumn = createCustomerInformationColumn(customer)
  content.push(customerInformationColumn)

  const blindInformation = createTable(tableEntryList)
  content.push(blindInformation)

  const costTotal = createCostTotalColumn(worksheetCost)
  content.push(costTotal)

  return content
}

function getTitleString(blindType: Blind, blindNumber: number) {
  const blindText = blindNumber > 1 ? 'blinds' : 'blind'

  const combSize = getCombSize(blindType)
  const text = `Lewis's order for custom-made kinetics honeycomb ${combSize}mm ${blindText}`

  const content: Content = {
    text: text.toUpperCase(),
    bold: true,
    marginBottom: 14
  }

  return content
}

function getCombSize(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
      return '10'
    case 'Kinetics 20mm Cellular Blind':
      return '20'
    default:
      throw new Error(`${blindType} is not a valid option`)
  }
}
