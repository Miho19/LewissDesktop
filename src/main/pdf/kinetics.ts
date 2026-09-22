import { Blind } from '@shared/types/blind/blind.types'
import { Column, Content, ContentImage } from 'pdfmake/interfaces'

export async function createWindowWareHeaderAsync() {
  const logo = await import('../../../resources/Windoware-Logo-1.png?inline')

  const image: ContentImage = {
    image: logo.default,
    width: 100
  }

  const column: Column = {
    columns: [{ width: '*', text: ' ' }, image]
  }

  return column
}

export function getKineticsTitle(blindType: Blind, blindNumber: number) {
  const blindText = blindNumber > 1 ? 'blinds' : 'blind'
  const blindTypeText = getBlindTypeText(blindType)

  const text = `Lewis's order for custom-made kinetics ${blindTypeText} ${blindText}`

  const content: Content = {
    text: text.toUpperCase(),
    bold: true,
    marginBottom: 14
  }

  return content
}

function getBlindTypeText(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
      return `honeycomb 10mm`
    case 'Kinetics 20mm Cellular Blind':
      return `honeycomb 20mm`
    case 'Kinetics Mikronwood 50mm Venetian':
      return 'mikronwood 50mm'
    case 'Kinetics Sunscreen Roller Blind':
      return 'sunscreen-roller'
    case 'Kinetics Blockout Roller Blind':
      return 'blockout-roller'
    case 'Kinetics Light Filtering Roller Blind':
      return 'light-filtering-roller'

    default:
      throw new Error(`${blindType} is not part a Kinetics product`)
  }
}
