import { VenetianSpec } from '@shared/types/spec/venetian.types'

export function getLewissVenetianValance(spec: VenetianSpec) {
  const { valanceCatenary, valanceModern, valanceRamp } = spec
  if (valanceCatenary != null) return `83 Designer Crown`

  if (valanceModern != null) return `63 Modern Curve`

  if (valanceRamp != null) return `63 Ramp`

  return undefined
}
