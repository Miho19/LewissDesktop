import type { GETStaffResponse, GETStaffResponseBody } from '@shared/types/Consultant.types'

function GETStaffEndpoint() {
  return new URL(``, 'https://lewiss-measure-pro.netlify.app/.netlify/functions/staff')
}

function GETStaffFetchOption() {
  const fetchOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: ''
    }
  }

  // 10 minutes
  //

  return fetchOptions
}

export async function GETStaff(endpoint: URL = GETStaffEndpoint()): Promise<GETStaffResponse> {
  const fetchOptions = GETStaffFetchOption()
  const response = await fetch(endpoint, fetchOptions)
  console.log(response)
  // if (!response.ok) throw new Error(response.statusText)

  const data: GETStaffResponseBody = await response.json()

  return { measurers: data.measurers, consultants: data.consultants }
}
