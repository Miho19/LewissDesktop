import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '../ui/separator'

type Props = {
  name: string
  reference: string
  service: string
  pricingType: string
}

function ProjectHeader(props: Props) {
  const { name, reference, service, pricingType } = props
  return (
    <CardHeader className="flex flex-col h-full bg-card text-card-foreground ">
      <CardTitle className="flex w-full text-lg space-x-4 items-center justify-between">
        <span>{name}</span>
        <span>{reference}</span>
      </CardTitle>
      <CardDescription className="flex w-full space-x-4">
        <span>{service}</span>
        <Separator orientation="vertical" className="" />
        <span>{pricingType}</span>
      </CardDescription>
    </CardHeader>
  )
}

export default ProjectHeader
