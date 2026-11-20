import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { Separator } from '@/components/ui/separator'
import { capitalise } from '@/utility/general/capitalise'
import { getLastModifiedFormatted } from '@/utility/general/getLastModifiedFormatted'
import { Order } from '@shared/types/process/Process.types'
import { Calculator, CircleCheckBig, CircleQuestionMark } from 'lucide-react'

type Props = {
  invoiceNumber: string
  measurer: string
  pricingType: string
  scheduleRef: string
  createdAt: string
  createdBy: string
  salesConsultant: string
  order: Order
}

// pricing types
// estimate
// final

function WorksheetHeader(props: Props) {
  const { scheduleRef, pricingType, order, salesConsultant, measurer, createdBy, createdAt } = props
  return (
    <Item>
      <ItemContent>
        <ItemTitle className="flex w-full justify-between items-center">
          <p className="flex gap-4 items-center">
            {scheduleRef}
            <Separator orientation="vertical" />
            <span className="text-xs text-muted-foreground">{capitalise(pricingType)}</span>
          </p>
          <p>{getOrderStatus(order)}</p>
        </ItemTitle>
        <Separator orientation="horizontal" className="my-4" />
        <ItemDescription className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
          <span className="text-foreground">Consultant</span>
          <span>{salesConsultant}</span>

          <span className="text-foreground">Measurer</span>
          <span>{measurer}</span>

          <span className="text-foreground">Created By</span>
          <span>{createdBy}</span>

          <span className="text-foreground">Created At</span>
          <span>{getLastModifiedFormatted(createdAt)}</span>
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}

function getOrderStatus(order: Order) {
  switch (order.pricingType) {
    case 'estimate':
      return <Calculator className="text-red-500" />
    case 'final':
      return <CircleCheckBig className="text-green-500" />
    default:
      return <CircleQuestionMark className="text-yellow-500" />
  }
}

export default WorksheetHeader
