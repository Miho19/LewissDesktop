import { Blind } from './blind.types'

export const SantaFeShutterBlindOptions = [
  'Santa Fe Woodlore Shutter',
  'Santa Fe Woodlore Plus Shutter',
  'Santa Fe Waterproof Woodlore Plus Shutter',
  'Santa Fe Normandy Shutter'
] as const

export type SantaFeShutterBlind = (typeof SantaFeShutterBlindOptions)[number]

// function isSantaFeShutterBlindType(blindType: Blind): blindType is SantaFeShutterBlind {
//   if (typeof blindType === 'undefined') return false
//   if (!(SantaFeShutterBlindOptions as readonly string[]).includes(blindType)) return false
//   return true
// }

// const SantaFeShutterSubTypeOptions = [
//   'woodlore',
//   'woodlore-plus',
//   'waterproof-woodlore-plus',
//   'normandy'
// ] as const

// type SantaFeShutterSubType = (typeof SantaFeShutterSubTypeOptions)[number]
