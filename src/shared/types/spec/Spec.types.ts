import { KineticsCellularSpec } from './kineticsCellular.types'
import { KineticsRollerSpec } from './kineticsRoller.types'
import { SantaFeShutterSpec } from './santaFe.types'
import { VenetianSpec } from './venetian.types'

export type Spec = KineticsCellularSpec | KineticsRollerSpec | SantaFeShutterSpec | VenetianSpec

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
