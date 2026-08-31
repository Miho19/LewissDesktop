import { Blind } from '@shared/types/blind/blind.types'
import { isKineticsCellularSpec } from '@shared/types/spec/kineticsCellular.types'
import { isKineticsRollerSpec } from '@shared/types/spec/kineticsRoller.types'
import { isSantaFeShutterSpec } from '@shared/types/spec/santaFe.types'
import { Spec } from '@shared/types/spec/Spec.types'
import { isVenetianSpec } from '@shared/types/spec/venetian.types'

export function getBlindTypeFromSpec(spec: Spec): Blind | undefined {
  if (isKineticsCellularSpec(spec)) return spec.blindType
  if (isKineticsRollerSpec(spec)) return spec.blindType
  if (isSantaFeShutterSpec(spec)) return spec.blindType
  if (isVenetianSpec(spec)) return spec.baseType ?? spec.blindType

  return undefined
}
