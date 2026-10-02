import { getKineticsCellularSpecDisplayList } from '@/components/spec/getKineticsCellularSpecDisplayList'
import { getKineticsMikronwoodSpecDisplayList } from '@/components/spec/getKineticsMikronwoodSpecDisplayList'
import { getKineticsRollerSpecDisplayList } from '@/components/spec/getKineticsRollerSpecDisplayList'
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

    default:
      return []
  }
}

export default SpecFactory
