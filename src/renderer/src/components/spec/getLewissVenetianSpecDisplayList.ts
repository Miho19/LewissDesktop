import {
  getLewissSpacerBlock,
  getLewissVenetianControl,
  getLewissVenetianCutOut,
  getLewissVenetianSlatSize,
  getLewissVenetianValance
} from '@/utility/process/tableEntry/shared/venetian'
import { Blind } from '@shared/types/blind/blind.types'
import { Spec, SpecDisplayList } from '@shared/types/spec/Spec.types'
import { isVenetianSpec } from '@shared/types/spec/venetian.types'

export function getLewissVenetianSpecDisplayList(blindType: Blind, spec: Spec) {
  if (!isVenetianSpec(spec)) return []

  const slatSize = getLewissVenetianSlatSize(blindType) ?? 'Invalid'
  const control = getLewissVenetianControl(spec) ?? 'Invalid'
  const spacerBlock = getLewissSpacerBlock(spec)
  const valance = getLewissVenetianValance(spec) ?? 'No'
  const cutOut = getLewissVenetianCutOut(spec)

  const displayList: SpecDisplayList[] = [
    { title: 'Slat Size', description: `${slatSize}mm` },
    { title: 'Control', description: control },
    { title: 'Spacer Block', description: spacerBlock },
    { title: 'Valance', description: valance },
    { title: 'Cut Out', description: cutOut }
  ]

  return displayList
}
