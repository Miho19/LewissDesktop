import { FaceFabric, Spec } from '@shared/types/spec/Spec.types'

export type RomanSpec = {
  operation: string
  faceFabric: FaceFabric
  liningColour: string
  chainColour: string
  chainSize: string
}

export function isRomanSpec(spec: Spec): spec is RomanSpec {
  if (typeof spec === 'undefined') return false
  if (!('operation' in spec)) return false
  if (!('faceFabric' in spec)) return false
  if (!('liningColour' in spec)) return false
  if (!('chainColour' in spec)) return false
  if (!('chainSize' in spec)) return false

  return true
}
