import { Blind } from '@shared/types/blind/blind.types'
import { Spec, SpecDisplayList } from '@shared/types/spec/Spec.types'
import { isVenetianSpec } from '@shared/types/spec/venetian.types'

export function getLewissVenetianSpecDisplayList(blindType: Blind, spec: Spec) {
  if (!isVenetianSpec(spec)) return []

  const displayList: SpecDisplayList[] = [{ title: 'test', description: 'test' }]

  return displayList
}
