import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Marker, MarkerContent } from '@/components/ui/marker'
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

function WorksheetHeader(props: Props) {
  const { scheduleRef, pricingType, order, salesConsultant, measurer, createdBy, createdAt } = props
  const {
    blindCount,
    curtainCount,
    callOutFee,
    deliveryWeeks,
    deposit,
    grandTotalNet,
    colourSurchargeTotal,
    extraChargesTotal,
    installDiscount,
    specialDiscount,
    roomsNetTotal,
    isNewBuild
  } = order

  return (
    <Card className="border-0 shadow-none ring-0">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="flex w-full items-center justify-between">
          <p>{scheduleRef}</p>
          <p>{getOrderStatus(order)}</p>
        </CardTitle>
        <CardDescription className="flex w-full justify-between">
          <div>{capitalise(pricingType)}</div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <div className="text-foreground font-semibold">Total</div>
            <div className="text-right text-foreground font-semibold">
              {grandTotalNet.toFixed(2)}
            </div>

            <div className="text-foreground">Deposit</div>
            <div className="text-right text-muted-foreground">{deposit.toFixed(2)}</div>
          </div>
        </CardDescription>
      </CardHeader>
      <Separator orientation="horizontal" className="my-4" />
      <CardContent className="flex flex-col w-full gap-8">
        <section className="flex w-full justify-between items-start">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4">
            <div className="text-foreground">Blind Count</div>
            <div className="text-right text-muted-foreground">{blindCount}</div>

            <div className="text-foreground">Curtain Count</div>
            <div className="text-right text-muted-foreground">{curtainCount}</div>

            <div className="text-foreground">Delivery</div>
            <div className="text-right text-muted-foreground">{deliveryWeeks} weeks</div>

            <div className="text-foreground">New Build</div>
            <div className="text-right text-muted-foreground">{isNewBuild ? 'Yes' : ' No'}</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4">
            <div className="text-foreground">Consultant</div>
            <div className="text-right text-muted-foreground">{salesConsultant}</div>

            <div className="text-foreground">Measurer</div>
            <div className="text-right text-muted-foreground">{measurer}</div>

            <div className="text-foreground">Created By</div>
            <div className="text-right text-muted-foreground">{createdBy}</div>

            <div className="text-foreground">Created At</div>
            <div className="text-right text-muted-foreground">
              {getLastModifiedFormatted(createdAt)}
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
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

// if i ever want to display full pricing information out

{
  /* <section className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <div className="text-foreground">Room Net Total</div>
          <div className="text-right text-foreground">{roomsNetTotal.toFixed(2)}</div>
          {colourSurchargeTotal > 0 && (
            <>
              <div className="text-foreground">Colour Surcharge</div>
              <div className="text-right text-foreground">{colourSurchargeTotal.toFixed(2)}</div>
            </>
          )}
          {extraChargesTotal > 0 && (
            <>
              <div className="text-foreground">Extra Surcharge</div>
              <div className="text-right text-foreground">{extraChargesTotal.toFixed(2)}</div>
            </>
          )}

          <div className="text-foreground">Call Out Fee</div>
          <div className="text-right text-foreground">{callOutFee.toFixed(2)}</div>

          {installDiscount > 0 && (
            <>
              <div className="text-foreground">Install Discount</div>
              <div className="text-right text-red-500">{installDiscount.toFixed(2)}</div>
            </>
          )}

          {specialDiscount > 0 && (
            <>
              <div className="text-foreground">Special Discount</div>
              <div className="text-right text-red-500">{specialDiscount.toFixed(2)}</div>
            </>
          )}

          <Separator orientation="horizontal" className="my-4 bg-foreground col-span-full" />
          <div className="text-foreground font-semibold">Total</div>
          <div className="text-right text-foreground font-semibold">{grandTotalNet.toFixed(2)}</div>

          <div className="text-foreground font-semibold">Deposit</div>
          <div className="text-right text-foreground font-semibold">{deposit.toFixed(2)}</div>
        </section> */
}
