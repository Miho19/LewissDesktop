import { RomanSpec } from '@shared/types/spec/roman.types'
import { KineticsCellularSpec } from './kineticsCellular.types'
import { KineticsRollerSpec } from './kineticsRoller.types'
import { SantaFeShutterSpec } from './santaFe.types'
import { VenetianSpec } from './venetian.types'
import { CurtainSpec } from '@shared/types/spec/curtain.types'

export type Spec =
  | KineticsCellularSpec
  | KineticsRollerSpec
  | SantaFeShutterSpec
  | VenetianSpec
  | RomanSpec
  | CurtainSpec

export type SpecDual = {
  front: Spec
  rear: Spec
}

export function isSpecDual(spec: unknown): spec is SpecDual {
  if (spec == null) return false
  if (typeof spec !== 'object') return false
  if (!('front' in spec)) return false
  if (!('rear' in spec)) return false
  return true
}

export type SpecDisplayList = {
  title: string
  description: string
}

export type FaceFabric = {
  d: string
  s: string
  sd: string
  w: number
  r: number
  hr: number
  p: number
  of: string
  cn: string
  co: string
  fi: any
  or: string
  cl: string
  c: string
  st: any
  lb: string
  lr: string
  et: string
  cf: any
  ro: string
  wa: string
  bw: string
}
