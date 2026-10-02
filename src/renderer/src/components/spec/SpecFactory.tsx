import { getKineticsCellularSpecDisplayList } from '@/components/spec/getKineticsCellularSpecDisplayList'
import { getKineticsMikronwoodSpecDisplayList } from '@/components/spec/getKineticsMikronwoodSpecDisplayList'
import { getKineticsRollerSpecDisplayList } from '@/components/spec/getKineticsRollerSpecDisplayList'
import { getLewissVenetianSpecDisplayList } from '@/components/spec/getLewissVenetianSpecDisplayList'
import { getSantaFeShutterSpecDisplayList } from '@/components/spec/getSantaFeShutterSpecDisplayList'
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { Blind } from '@shared/types/blind/blind.types'
import { Spec } from '@shared/types/spec/Spec.types'

type Props = {
  blindType: Blind
  spec: Spec
  errorHandler: (errorTitle: string, errorDescription: string) => void
}

function SpecFactory(props: Props) {
  const { blindType, spec, errorHandler } = props

  const specList = getSpecContent(blindType, spec)
  if (specList.length === 0) {
    errorHandler('', `${blindType} spec display list error`)
    return
  }

  return specList.map((curr) => (
    <Item variant="default" key={curr.title} role="listitem" size="sm">
      <ItemContent>
        <ItemTitle>{curr.title}</ItemTitle>
        <ItemDescription>{curr.description}</ItemDescription>
      </ItemContent>
    </Item>
  ))
}

function getSpecContent(blindType: Blind, spec: Spec) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
    case 'Kinetics 20mm Cellular Blind':
      return getKineticsCellularSpecDisplayList(blindType, spec)
    case 'Kinetics Blockout Roller Blind':
    case 'Kinetics Light Filtering Roller Blind':
    case 'Kinetics Sunscreen Roller Blind':
      return getKineticsRollerSpecDisplayList(blindType, spec)
    case 'Kinetics Mikronwood 50mm Venetian':
      return getKineticsMikronwoodSpecDisplayList(blindType, spec)

    case "Lewis's 25mm Aluminium Venetian":
    case "Lewis's 50mm Aluminium Venetian":
    case "Lewis's 50mm Fauxwood Venetian":
    case "Lewis's 63mm Fauxwood Venetian":
    case "Lewis's 50mm Phoenixwood Venetian":
    case "Lewis's 63mm Phoenixwood Venetian":
      return getLewissVenetianSpecDisplayList(blindType, spec)

    case 'Santa Fe Normandy Shutter':
    case 'Santa Fe Waterproof Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Shutter':
      return getSantaFeShutterSpecDisplayList(blindType, spec)

    default:
      return []
  }
}

export default SpecFactory
