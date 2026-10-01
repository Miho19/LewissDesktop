import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle
} from '@/components/ui/item'
import { getKineticsCellularControl } from '@/utility/process/tableEntry/kineticsCellular'
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

const variation = 'outline'

function KineticsCellularSpecSheet(props: Props) {
  const { blindType, spec } = props

  if (!isKineticsCellularSpec(spec)) throw new Error('Must be Kinetics Cellular Spec')

  const control = getKineticsCellularControl(spec)

  const itemList: { title: string; description: string }[] = [
    { title: 'Control', description: control }
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
          <ItemSeparator />
        </>
      ))}
    </ItemGroup>
  )
}

export default KineticsCellularSpecSheet
