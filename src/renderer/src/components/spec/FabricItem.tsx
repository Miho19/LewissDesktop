import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/components/ui/item'
import { Fabric } from '@shared/types/Project.types'

type Props = {
  fabric: Fabric
}

function FabricItem(props: Props) {
  const { fabric } = props

  const multiplierFormatted = fabric.multiplier.toFixed(2)

  const premium = fabric.premium ?? false

  return (
    <Item variant="default">
      <ItemHeader>
        <img
          src={fabric.chipImageUrl}
          className="aspect-square rounded-sm object-cover w-32 h-32 border"
          alt={`${fabric.name} chip`}
        />
      </ItemHeader>

      <ItemContent>
        <ItemTitle className="flex w-full justify-between">
          <p>
            {fabric.name}{' '}
            <span className="text-muted-foreground text-xs">(x{multiplierFormatted})</span>
          </p>
          {premium && <p className="text-muted-foreground">Premium</p>}
        </ItemTitle>
        <ItemDescription>{fabric.collection}</ItemDescription>
      </ItemContent>
    </Item>
  )
}

export default FabricItem
