import {
  getKineticsMikronwoodControl,
  getKineticsMikronwoodFascia,
  getKineticsMikronwoodHoldDownBracket
} from '@/utility/process/tableEntry/kineticsMikronwood'
import { Blind } from '@shared/types/blind/blind.types'
import { Spec, SpecDisplayList } from '@shared/types/spec/Spec.types'
import { isVenetianSpec } from '@shared/types/spec/venetian.types'

export function getKineticsMikronwoodSpecDisplayList(_blindType: Blind, spec: Spec) {
  if (!isVenetianSpec(spec)) return []

  const control = getKineticsMikronwoodControl(spec) ?? 'Cord'
  const fascia = getKineticsMikronwoodFascia(spec) ?? 'None'
  const holdDownBracket = getKineticsMikronwoodHoldDownBracket(spec) ?? 'None'

  const displayList: SpecDisplayList[] = [
    { title: 'Control', description: control },
    { title: 'Fascia', description: fascia },
    { title: 'Hold Down Bracket', description: holdDownBracket }
  ]

  return displayList
}
