import ConsultantAvatar from '@/components/consultantAvatar/ConsultantAvatar'
import CustomerCard from '@/components/customercard/CustomerCard'

type Props = {
  name: string
  reference: string
  service: string
  pricingType: string
  consultantName: string
}

function ProjectPageHeader(props: Props) {
  const { name, reference, service, pricingType, consultantName } = props

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="flex w-full justify-end focus:outline-none gap-4 items-center">
        <ConsultantAvatar name={consultantName} />
      </div>
      <CustomerCard name={name} reference={reference} service={service} pricingType={pricingType} />
    </div>
  )
}

export default ProjectPageHeader
