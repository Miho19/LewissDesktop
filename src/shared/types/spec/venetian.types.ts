import {
  VenetianBlindOptions,
  VenetianBlind,
  VenetianSubType
} from '@shared/types/blind/venetian.types'
import { Fabric } from '../Project.types'
import { Spec } from './Spec.types'
import { Blind } from '../blind/blind.types'

export type VenetianSpec = {
  blindType: Blind
  fabric?: Fabric
  bracketColour: string
  controlSide: string
  motorisation?: string

  remoteQty: number
  usbCableQty: number
  smartLinkHubQty: number

  subtypeId: VenetianSubType
  baseType: VenetianBlind
  operation: any
  spacerBlock?: boolean
  cutout?: boolean
  valanceRamp?: boolean
  valanceModern?: boolean
  valanceCatenary?: boolean
  fasciaFlatReturns?: boolean
  fasciaColonialReturns?: boolean
  holdDownBrackets?: boolean
}

export function isVenetianSpec(spec: Spec): spec is VenetianSpec {
  if (typeof spec !== 'object') return false
  if (spec === null) return false
  if (!('baseType' in spec)) return false

  const { baseType } = spec
  if (typeof baseType !== 'string') return false

  if (!(VenetianBlindOptions as readonly string[]).includes(baseType)) return false

  return true
}
