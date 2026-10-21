import CustomerCard from '@/components/customerCard/CustomerCard'

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
      <CustomerCard
        name={name}
        reference={reference}
        service={service}
        pricingType={pricingType}
        consultantName={consultantName}
      />
    </div>
  )
}

export default ProjectPageHeader
