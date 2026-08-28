export type Cost = {
  blindTotal: number
  gst: number
  total: number
  extra: Extra[]
}

export type Extra = {
  name: string
  quantity: number
  cost: number
}
