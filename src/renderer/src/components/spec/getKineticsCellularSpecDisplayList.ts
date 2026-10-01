import {
  getKineticsCellularCombSize,
  getKineticsCellularControl,
  getKineticsCellularSideChannelColour
} from '@/utility/process/tableEntry/kineticsCellular'
import { Blind } from '@shared/types/blind/blind.types'
import { isKineticsCellularSpec } from '@shared/types/spec/kineticsCellular.types'
import { Spec, SpecDisplayList } from '@shared/types/spec/Spec.types'

export function getKineticsCellularSpecDisplayList(blindType: Blind, spec: Spec) {
  if (!isKineticsCellularSpec(spec)) throw new Error('Incorrect spec type')

  const combSize = getKineticsCellularCombSize(blindType)

  const control = getKineticsCellularControl(spec)

  const bracketColour = spec.bracketColour

  const sideChannelColour = getKineticsCellularSideChannelColour(spec)

  const displayList: SpecDisplayList[] = [
    { title: 'Comb Size', description: combSize },
    { title: 'Control', description: control },
    { title: 'Bracket Colour', description: bracketColour },
    { title: 'Side Channel Colour', description: sideChannelColour }
  ]

  return displayList
}
