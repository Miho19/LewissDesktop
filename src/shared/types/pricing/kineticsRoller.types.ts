export type KineticsRollerPricingSchedule = {
  blindType: string[]
  dimension: Dimension
}

type Dimension = {
  heightHeader: number[]
  widthHeader: number[]
  data: number[][]
}
