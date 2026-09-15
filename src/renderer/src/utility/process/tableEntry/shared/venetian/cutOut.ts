import { VenetianSpec } from '@shared/types/spec/venetian.types'

export function getLewissVenetianCutOut(spec: VenetianSpec) {
  if (spec.cutout == null) return 'No'

  return spec.cutout ? 'Yes' : 'No'
}
