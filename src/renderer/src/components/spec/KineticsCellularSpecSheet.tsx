import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle
} from '@/components/ui/item'
import {
  getKineticsCellularCombSize,
  getKineticsCellularControl,
  getKineticsCellularSideChannelColour
} from '@/utility/process/tableEntry/kineticsCellular'
import { Blind } from '@shared/types/blind/blind.types'
import {
  isKineticsCellularSpec,
  KineticsCellularSpec
} from '@shared/types/spec/kineticsCellular.types'
import { Spec } from '@shared/types/spec/Spec.types'

type Props = {
  blindType: Blind
  spec: Spec
}

function KineticsCellularSpecSheet(props: Props) {
  const { blindType, spec } = props

  if (!isKineticsCellularSpec(spec)) throw new Error('Must be Kinetics Cellular Spec')

  const combSize = getKineticsCellularCombSize(blindType)

  const control = getKineticsCellularControl(spec)

  const bracketColour = spec.bracketColour

  const sideChannelColour = getKineticsCellularSideChannelColour(spec)

  const itemList: { title: string; description: string }[] = [
    { title: 'Comb Size', description: combSize },
    { title: 'Control', description: control },
    { title: 'Bracket Colour', description: bracketColour },
    { title: 'Side Channel Colour', description: sideChannelColour }
  ]

  return (
    <ItemGroup>
      {itemList.map((curr) => (
        <>
          <Item variant="default" key={curr.title} role="listitem" size="sm">
            <ItemContent>
              <ItemTitle>{curr.title}</ItemTitle>
              <ItemDescription>{curr.description}</ItemDescription>
            </ItemContent>
          </Item>
        </>
      ))}
    </ItemGroup>
  )
}

export default KineticsCellularSpecSheet
