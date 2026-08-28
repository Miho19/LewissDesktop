import { Blind } from '@shared/types/blind/blind.types'
import { Fabric } from '../Project.types'
import { Spec } from './Spec.types'
import { KineticsCellularBlindOptions } from '../blind/kinetics.types'

export type KineticsCellularSpec = {
  blindType: Blind
  fabric?: Fabric
  bracketColour: string
  controlSide: string
  motorisation?: string
  customColour: boolean
  sideChannels: boolean
  remoteQty: number
  usbCableQty: number
  smartLinkHubQty: number
}

export function isKineticsCellularSpec(spec: Spec): spec is KineticsCellularSpec {
  if (typeof spec === 'undefined') return false
  if (!('blindType' in spec)) return false

  const { blindType } = spec

  return (KineticsCellularBlindOptions as readonly string[]).includes(blindType)
}
