import { Blind } from '@shared/types/blind/blind.types'
import { ContentImage, Column, Content } from 'pdfmake/interfaces'

export async function createLewissHeaderAsync() {
  const windoware = await import('../../../resources/Windoware-Logo-1.png?inline')
  const kinetics = await import('../../../resources/Kinetics Black Text Logo.png?inline')

  const windowareLogo: ContentImage = {
    image: windoware.default,
    width: 100
  }

  const kineticsLogo: ContentImage = {
    image: kinetics.default,
    width: 100
  }

  const column: Column = {
    marginBottom: 10,
    columns: [kineticsLogo, { width: '*', text: ' ' }, windowareLogo]
  }

  return column
}

export function getLewissTitle(blindType: Blind, _blindNumber: number) {
  const text = `Order for ${blindType}`

  const content: Content = {
    text: text.toUpperCase(),
    bold: true,
    marginBottom: 14
  }

  return content
}
