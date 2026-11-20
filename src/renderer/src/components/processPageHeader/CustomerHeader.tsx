import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'

type Props = {
  name: string
  reference: string
  email: string
  phone: string
  address: string
}

function CustomerHeader(props: Props) {
  const { name, reference, email, phone, address } = props
  return (
    <Item>
      <ItemContent>
        <ItemTitle className="flex justify-between w-full">
          <span className="text-lg">{name}</span>
          <span className="text-muted-foreground">{reference}</span>
        </ItemTitle>
        <ItemDescription className="flex flex-col w-full">
          <span>{phone}</span>
          <span>{email}</span>
          <span>{address}</span>
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}

export default CustomerHeader
