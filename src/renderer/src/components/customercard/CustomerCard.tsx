import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Props = {
  name: string
  reference: string
  service: string
  pricingType: string
  consultantName: string
}

function CustomerCard(props: Props) {
  const { name, reference, service, pricingType, consultantName } = props
  return (
    <Card>
      <CardHeader className="flex flex-col h-full bg-card text-card-foreground ">
        <CardTitle className="flex w-full text-lg space-x-4 items-center justify-between">
          <p className="flex w-full h-full">{name}</p>
          <p>{reference}</p>
        </CardTitle>
        <CardDescription className="flex gap-4 justify-between w-full">
          <div className="flex w-full gap-4">
            <span>{service}</span>
            <Separator orientation="vertical" />
            <span>{pricingType}</span>
          </div>
          <p className="w-full flex justify-end">{consultantName}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default CustomerCard
