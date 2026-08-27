import { Spec } from './spec/Spec.types'

export type GETProjectFileResponse = {
  ok: boolean
  content: string
}

export type ProjectFile = {
  id: number
  name: string
  phone: string
  email: string
  reference: string
  address: string
  addressNumber: string
  addressStreet: string
  addressSuburb: string
  addressCity: string
  addressPostcode: string
  measurer: string
  salesConsultant: string
  measurementSource: string
  measuredDate: string
  bookingDate: string
  bookingTime: string
  durationMinutes: number
  service: string
  roomsOther: string
  treatmentsOther: string
  fabrics: string
  notes: string
  calendarEventId: string
  calendarEventLink: string
  calendarUserEmail: string
  calendarEventCreatedAt: string
  bookingHistory: string[]
  confirmEmailRequested: boolean
  pricingType: string
  newBuild: string
  callOutFee: string
  project: Project
  createdDate: string
  localDirty: boolean
  createdBy: string
  createdAt: string
  lastEditedBy: string
  lastEditedAt: string
  cloudFolderId: string
  cloudFolderName: string
  cloudItemId: string
  cloudLastPushed: string
  placeId: string
  latitude: number
  longitude: number
  addressValidatedAt: string
}

type Project = {
  id: string
  createdAt: string
  rooms: Room[]
}

type Room = {
  id: string
  name: string
  createdAt: string
  brief: Brief
  treatment: Treatment
  windows: WindowMeasurement[]
}

type Brief = {
  selectedEdits: any[]
  selectedProducts: string[]
  otherSpecification: string
  notes: string
}

export type Treatment = {
  insideLayer: Layer
  outsideLayer: Layer
  notes: string
}

type Layer = {
  productId: string
  isExisting: boolean
  spec: Spec
}

export type Fabric = {
  name: string
  collection: string
  multiplier: number
  maxWidth?: number
  maxHeight?: number
  imageUrl: string
  chipImageUrl: string
  premium?: boolean
}

export type WindowMeasurement = {
  id: string
  number: number
  name: string
  measuredDate: string
  internalWidth: number
  internalHeightL: number
  internalHeightR: number
  architraveWidth?: number
  architraveWidthOther: any
  reveal?: number
  revealOther: any
  curtainType: any
  drawType: string
  curtainFixingType: string
  curtainFixingTypeOther: string
  blindFixingType: string
  blindFixingTypeOther: string
  controlSide: string
  controlLength: string
  controlLengthOther: string
  cordControlSide: string
  rollerRoll: string
  blindType: string
  blindFabric: string
  blind2Type: string
  blind2Fabric: string
  blindWidthError: string
  blindExtras: any[]
  blindPrice: any
  blindCount: number
  blindLeftWidth: string
  pelmetType: string
  bracketColour: string
  bottomRailType: string
  bottomRailColour: string
  chainColour: string
  headrailColour: string
  sideChannels: boolean
  shutterColourSurcharge: number
  shutterTrack: string
  fauxwoodFascia: boolean
  extraRemotes: number
  extraCables: number
  extraHubs: number
  curtainConfig: string
  pleatingStyle: string
  curtainFabric: any
  fabricSearch: string
  amountOnFloor: string
  existingTrackIsDouble: any
  existingTrackFixingPosition: any
  existingTrackType: string
  existingTrackTypeOther: string
  curtainReturns: boolean
  newTrackType: string
  newTrackTypeOther: string
  fixing: string
  fixingOther: string
  treatment: any[]
  sunProtection: string
  sunProtectionOther: string
  notes: string
  scheduleCode: string
  photos: any[]
  outsideControlSide: string
  outsideBlindFixingType: string
  outsideBlindFixingTypeOther: string
  outsideBlindType: string
  outsideBlindFabric: string
  outsideBlindExtras: any[]
  outsideBlindCount: number
  outsideBlindLeftWidth: string
  outsideBlind2Type: string
  outsideBlind2Fabric: string
  squareDiff: number
  blindAbove: number
  blindLeft: number
  blindRight: number
  existingTrackIsMotorised?: boolean
  blindUnderhang: number
}
