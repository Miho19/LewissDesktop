import { Blind } from 'shared/types/blind/blind.types'
import { Fabric } from '../Project.types'

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
