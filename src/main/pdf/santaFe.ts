import { Blind } from '@shared/types/blind/blind.types'
import { Column, Content, ContentImage } from 'pdfmake/interfaces'

export async function createSantaFeOrderLogoAsync() {
  const logo = await import('../../../resources/santaFeLogo.png?inline')

  const image: ContentImage = {
    image: logo.default,
    width: 100
  }

  const column: Column = {
    columns: [{ width: '*', text: ' ' }, image]
  }

  return column
}

export function getSantaFeTitle(blindType: Blind, blindNumber: number) {
  const blindText = blindNumber > 1 ? 'blinds' : 'blind'

  const blindTypeText = getBlindTypeText(blindType)

  const text = `Lewis's order for custom-made ${blindTypeText} ${blindText}`

  const content: Content = {
    text: text.toUpperCase(),
    bold: true,
    marginBottom: 14
  }

  return content
}

function getBlindTypeText(blindType: Blind) {
  switch (blindType) {
    case "Lewis's 25mm Aluminium Venetian":
      return 'aluminium-25 venetian'
    case "Lewis's 50mm Aluminium Venetian":
      return 'aluminium-50 venetian'
    case "Lewis's 50mm Fauxwood Venetian":
      return 'fauxwood-50 venetian'
    case "Lewis's 63mm Fauxwood Venetian":
      return 'fauxwood-63 venetian'
    case "Lewis's 50mm Phoenixwood Venetian":
      return 'phoenixwood-50 venetian'
    case "Lewis's 63mm Phoenixwood Venetian":
      return 'phoenixwood-63 venetian'

    case 'Santa Fe Woodlore Shutter':
      return 'woodlore shutter'
    case 'Santa Fe Woodlore Plus Shutter':
      return 'woodlore plus shutter'
    case 'Santa Fe Waterproof Woodlore Plus Shutter':
      return 'waterproof woodlore plus shutter'
    case 'Santa Fe Normandy Shutter':
      return 'normandy shutter'

    default:
      throw new Error(`${blindType} is not Santa Fe product`)
  }
}
