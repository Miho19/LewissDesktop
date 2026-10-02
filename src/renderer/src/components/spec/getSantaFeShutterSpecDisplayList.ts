import {
  getSantaFeShutterControl,
  getSantaFeShutterTrack
} from '@/utility/process/tableEntry/santaFeShutter'
import { Blind } from '@shared/types/blind/blind.types'
import { isSantaFeShutterSpec } from '@shared/types/spec/santaFe.types'
import { Spec, SpecDisplayList } from '@shared/types/spec/Spec.types'

export function getSantaFeShutterSpecDisplayList(blindType: Blind, spec: Spec) {
  if (!isSantaFeShutterSpec(spec)) return []

  const control = getSantaFeShutterControl(spec)
  const track = getSantaFeShutterTrack(spec) ?? 'No'
  const shutterPole = spec.shuttlePole ? 'Yes' : 'No'
  const flushBolt = spec.flushBolts ? 'Yes' : 'No'

  const displayList: SpecDisplayList[] = [
    { title: 'Control', description: control },
    { title: 'Track', description: track },
    { title: 'Shutter Pole', description: shutterPole },
    { title: 'Flush Bolt', description: flushBolt }
  ]

  return displayList
}
