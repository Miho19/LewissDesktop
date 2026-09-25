import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle
} from '@/components/ui/item'
import { Fabric } from '@shared/types/Project.types'

type Props = {
  fabric: Fabric
}

function FabricItem(props: Props) {
  const { fabric } = props

  return (
    <Item variant="default">
      <ItemHeader>
        <img
          src={fabric.chipImageUrl}
          className="aspect-square rounded-sm object-cover w-full h-full"
          alt={`${fabric.name} chip`}
        />
      </ItemHeader>

      <ItemContent>
        <ItemTitle>
          {fabric.name} <span className="text-muted-foreground">(x{fabric.multiplier})</span>
        </ItemTitle>
        <ItemDescription>{fabric.collection}</ItemDescription>
      </ItemContent>
    </Item>
  )
}

export default FabricItem
