export type Consultant = {
  name: string
  email: string
  title: string
  phone: string
  functions: string
  pin: string
  accessMine: string
  accessAll: string
}

export type ConsultantFolder = {
  folderId: string
} & Consultant

export type GETStaffResponseBody = {
  ok: boolean
  measurers: string[]
  consultants: Consultant[]
}

export type GETStaffResponse = {
  measurers: string[]
  consultants: Consultant[]
}
