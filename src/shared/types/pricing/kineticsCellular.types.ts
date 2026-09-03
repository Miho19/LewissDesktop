import { Blind } from '../blind/blind.types'

export type KineticsCellularPricingSchedule = {
  blindType: Blind[]
  blockoutMultiplier: number
  sideChannelCustomColourSurcharge: number
  sideChannelCostPerMetreHeight: number
  headRailCustomColourSurcharge: number
  control: Control
  fabric: FabricCost
}

type FabricCost = {
  heightHeader: number[]
  widthHeader: number[]
  data: number[][]
}

type Base = {
  id: string
  cost: number
  name: string
}

type Control = {
  cord: Base
  'Lithium-ion': Base
}
