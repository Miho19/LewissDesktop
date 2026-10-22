import { Blind } from '@shared/types/blind/blind.types'
import { Fabric } from '../Project.types'
import { Spec } from './Spec.types'
import { KineticsRollerBlindOptions } from '../blind/kinetics.types'

export type KineticsRollerSpec = {
  blindType: Blind
  fabric?: Fabric
  rollDirection: string
  bracketColour: string
  bottomRailType: string
  bottomRailColour: string
  chainColour: string
  controlSide: string
  motorisation?: string
  pelmetType?: string
  customColour: boolean
  inlineBracket: boolean
  intermediateBracket: boolean
  combaBracket: boolean
  remoteQty: number
  usbCableQty: number
  smartLinkHubQty: number
}

export function isKineticsRollerSpec(spec: Spec): spec is KineticsRollerSpec {
  if (typeof spec === 'undefined') return false
  if (!('blindType' in spec)) return false

  const { blindType } = spec

  return (KineticsRollerBlindOptions as readonly string[]).includes(blindType)
}
