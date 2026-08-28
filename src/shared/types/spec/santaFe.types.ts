import { Blind } from '@shared/types/blind/blind.types'
import { Fabric } from '../Project.types'
import { Spec } from './Spec.types'

export type SantaFeShutterSpec = {
  blindType: Blind
  subtypeId: string
  fabric: Fabric
  track?: string
  shuttlePole: boolean
  flushBolts: boolean
  lithiumSmartMotor: boolean
  usbChargingCable: boolean
  smartDialRemote: boolean
  shadeAutoHub: boolean
}

export function isSantaFeShutterSpec(spec: Spec): spec is SantaFeShutterSpec {
  if (typeof spec === 'undefined') return false
  if (!('blindType' in spec)) return false

  if (!('subtypeId' in spec)) return false
  if (typeof spec.subtypeId !== 'string') return false

  // do more checks later
  if (!('shuttlePole' in spec)) return false

  return true
}
