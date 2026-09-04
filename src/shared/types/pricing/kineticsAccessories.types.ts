export type KineticsAccessorySchedule = {
  blindType: string[]
  motorisation: Base[]
  sillClip: Base
  customColours: string[]
}

type Base = {
  id: string
  name: string
  cost: number
}
