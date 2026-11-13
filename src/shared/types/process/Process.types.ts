import { Fabric, Room } from '@shared/types/Project.types'
import { Spec } from '@shared/types/spec/Spec.types'

export type ProcessFile = {
  schema: string
  schemaVersion: number
  kind: string
  scheduleRef: string
  invoiceNumber: string
  createdAt: string
  createdBy: string
  build: string
  customer: Customer
  salesConsultant: string
  measurer: string
  measurementSource: string
  pricingType: string
  newBuild: boolean
  order: Order
  lines: Line[]
  rooms: Room[]
}

type Customer = {
  reference: string
  name: string
  phone: string
  email: string
  address: string
  addressNumber: string
  addressStreet: string
  addressSuburb: string
  addressCity: string
  addressPostcode: string
  latitude: number
  longitude: number
}

type Order = {
  grandTotalNet: number
  roomsNetTotal: number
  callOutFee: number
  colourSurcharges: unknown[]
  colourSurchargeTotal: number
  extraChargesTotal: number
  installDiscount: number
  specialDiscount: number
  isNewBuild: boolean
  reference: string
  bankAccount: string
  deliveryWeeks: number
  guaranteeYears: number
  curtainCount: number
  blindCount: number
  pricingType: string
  measurementsText: string
  deposit: number
}

type Line = {
  line: number
  roomId: string
  room: string
  roomIndex: number
  slot: string
  productId: string
  product: string
  isCurtain: boolean
  heading: string
  description: string
  printedWindows: string[]
  operation: string
  fabric: Fabric
  lining: any
  length: any
  spec: Spec
  offer?: string
  offerLabel?: string
  offerDiscount: number
  gross: number
  net: number
  covers: Cover[]
}

type Cover = {
  windowId: string
  name: string
  scheduleCode: any
  width: number
  height: number
  fitting: string
  fixingType: string
  controlSide: string
  notSquare: boolean
}
