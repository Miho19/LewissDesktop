import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Props = {
  name: string
  reference: string
  service: string
  pricingType: string
}

function CustomerCard(props: Props) {
  const { name, reference, service, pricingType } = props
  return (
    <Card>
      <CardHeader className="flex flex-col h-full bg-card text-card-foreground ">
        <CardTitle className="flex w-full text-lg space-x-4 items-center justify-between">
          <p className="flex w-full h-full">{name}</p>
          <p>{reference}</p>
        </CardTitle>
        <CardDescription className="flex w-full space-x-4">
          <span>{service}</span>
          <Separator orientation="vertical" />
          <span>{pricingType}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default CustomerCard
