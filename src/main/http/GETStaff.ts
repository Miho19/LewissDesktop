import type { GETStaffResponse, GETStaffResponseBody } from '@shared/types/Consultant.types'

function GETStaffEndpoint() {
  return new URL(``, 'https://lewiss-measure-pro.netlify.app/.netlify/functions/staff')
}

function GETStaffFetchOption() {
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }

  return fetchOptions
}

export async function GETStaff(endpoint: URL = GETStaffEndpoint()): Promise<GETStaffResponse> {
  try {
    const fetchOptions = GETStaffFetchOption()
    const response = await fetch(endpoint, fetchOptions)
    if (!response.ok) throw new Error(response.statusText)
    const data: GETStaffResponseBody = await response.json()

    return { measurers: data.measurers, consultants: data.consultants }
  } catch (error) {
    throw new Error('Failed to fetch staff list', { cause: error })
  }
}
