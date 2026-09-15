import { VenetianSpec } from '@shared/types/spec/venetian.types'

export function getLewissSpacerBlock(spec: VenetianSpec) {
  return spec.spacerBlock ? 'Yes' : 'No'
}

export function getLewissVenetianSpacerBlockCostAsync(spacerBlock: 'Yes' | 'No') {}
