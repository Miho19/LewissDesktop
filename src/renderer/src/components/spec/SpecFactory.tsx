import FabricItem from '@/components/spec/FabricItem'
import { getKineticsCellularSpecDisplayList } from '@/components/spec/getKineticsCellularSpecDisplayList'
import { getKineticsRollerSpecDisplayList } from '@/components/spec/getKineticsRollerSpecDisplayList'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item'
import { Blind } from '@shared/types/blind/blind.types'
import { Spec } from '@shared/types/spec/Spec.types'

type Props = {
  blindType: Blind
  spec: Spec
}

function SpecFactory(props: Props) {
  const { blindType, spec } = props

  const { fabric } = spec
  if (fabric == null) return <></>

  const specList = getSpecContent(blindType, spec)

  return (
    <div className="w-full h-full flex flex-col">
      <ItemGroup>
        <>
          <FabricItem fabric={fabric} />
          {specList.map((curr) => (
            <Item variant="default" key={curr.title} role="listitem" size="sm">
              <ItemContent>
                <ItemTitle>{curr.title}</ItemTitle>
                <ItemDescription>{curr.description}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </>
      </ItemGroup>
    </div>
  )
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

    default:
      throw new Error(`${blindType} does not have a spec list`)
  }
}

export default SpecFactory
