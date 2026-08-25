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
  project: any
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
