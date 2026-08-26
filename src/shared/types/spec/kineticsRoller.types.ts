import { Blind } from 'shared/blind/blind.types'
import { Fabric } from '../Project.types'

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
