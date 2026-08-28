export const SantaFeVenetianBlindOptions = [
  "Lewis's 25mm Aluminium Venetian",
  "Lewis's 50mm Aluminium Venetian",
  "Lewis's 50mm Fauxwood Venetian",
  "Lewis's 63mm Fauxwood Venetian",
  "Lewis's 50mm Phoenixwood Venetian",
  "Lewis's 63mm Phoenixwood Venetian"
] as const

export const KineticsVenetianBlindOptions = ['Kinetics Mikronwood 50mm Venetian'] as const

export const VenetianBlindOptions = [
  ...SantaFeVenetianBlindOptions,
  ...KineticsVenetianBlindOptions
]

export type VenetianBlind = (typeof VenetianBlindOptions)[number]

export const venetianSubTypeOptions = [
  'mikronwood-50',
  'aluminium-25',
  'aluminium-50',
  'fauxwood-50',
  'fauxwood-63',
  'phoenixwood-50',
  'phoenixwood-63'
] as const

export type VenetianSubType = (typeof venetianSubTypeOptions)[number]
