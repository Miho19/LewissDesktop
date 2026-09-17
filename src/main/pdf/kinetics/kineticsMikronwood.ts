import { createWindowWareHeader } from '@main/pdf/kinetics/shared'
import {
  createCustomerInformationColumn,
  createTable,
  createCostTotalColumn
} from '@main/pdf/shared'
import { Blind } from '@shared/types/blind/blind.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'
import { Content } from 'pdfmake'

export async function getKineticsMikronwoodPDFContentAsync(worksheet: Worksheet) {
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

  const blindTypeTitle = getBlindTypeTitle(blindType)
  const text = `Lewis's order for custom-made kinetics ${blindTypeTitle} ${blindText}`

  const content: Content = {
    text: text.toUpperCase(),
    bold: true,
    marginBottom: 14
  }

  return content
}

function getBlindTypeTitle(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics Mikronwood 50mm Venetian':
      return 'mikronwood 50mm'
    default:
      throw new Error(`${blindType} incorrect blind type`)
  }
}
