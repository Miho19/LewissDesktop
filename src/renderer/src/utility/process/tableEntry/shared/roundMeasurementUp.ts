import { Blind } from '@shared/types/blind/blind.types'

export function roundMeasurementUp(meansurement: number, toNearest: number = 100) {
  return Math.ceil(meansurement / toNearest) * toNearest
}

export function getToNearest(blindType: Blind) {
  const roundingTo = nearestRoundingMap[blindType]
  if (typeof roundingTo === 'undefined') throw new Error(`${blindType} is not supported`)

  return roundingTo
}

const nearestRoundingMap: Record<Blind, number> = {
  'Kinetics 10mm Cellular Blind': 100,
  'Kinetics 20mm Cellular Blind': 100,
  'Kinetics Sunscreen Roller Blind': 100,
  'Kinetics Blockout Roller Blind': 100,
  'Kinetics Light Filtering Roller Blind': 100,
  "Lewis's 25mm Aluminium Venetian": 100,
  "Lewis's 50mm Aluminium Venetian": 100,
  "Lewis's 50mm Fauxwood Venetian": 100,
  "Lewis's 63mm Fauxwood Venetian": 100,
  "Lewis's 50mm Phoenixwood Venetian": 100,
  "Lewis's 63mm Phoenixwood Venetian": 100,
  'Kinetics Mikronwood 50mm Venetian': 100,
  'Santa Fe Woodlore Shutter': 50,
  'Santa Fe Woodlore Plus Shutter': 50,
  'Santa Fe Waterproof Woodlore Plus Shutter': 50,
  'Santa Fe Normandy Shutter': 50
}
