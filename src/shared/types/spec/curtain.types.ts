import { FaceFabric, Spec } from '@shared/types/spec/Spec.types'

export type CurtainSpec = {
  faceFabric: FaceFabric
  liningSource: string
  liningStandard: string | null
  liningFabric: LiningFabric
  pleatingStyle: string
  fullnessOverride: string | null
  amountOnFloor: string
  trackType: string | null
  install: string | null
  bottomHem: boolean
}

type LiningFabric = {
  d: string
  s: string
  sd: string
  w: number
  r: number
  hr: number
  dp: any
  p: number
  of: any
  cn: any
  co: string
  fi: string
  or: string
  cl: string
  c: string
  sap?: string
  st?: number
  lb: string
  lr: string
  et: string
  cf: number
  ro: string
  wa: string
  bw: string
  ck: string
  ckc: string
}

export function isCurtainSpec(spec: Spec): spec is CurtainSpec {
  if (typeof spec === 'undefined') return false
  if (!('faceFabric' in spec)) return false
  if (!('liningSource' in spec)) return false
  if (!('liningFabric' in spec)) return false
  if (!('pleatingStyle' in spec)) return false
  if (!('fullnessOverride' in spec)) return false
  if (!('amountOnFloor' in spec)) return false
  if (!('trackType' in spec)) return false
  if (!('install' in spec)) return false
  if (!('bottomHem' in spec)) return false

  return true
}
