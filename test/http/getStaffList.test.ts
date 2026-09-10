import { GETStaff } from '@main/http/GETStaff'
import { describe, it, expect } from 'vitest'
describe('getStaffList', () => {
  it('should return a list of staff', async () => {
    const response = await GETStaff()

    expect(response).toBeDefined()
    expect(response.consultants).toBeDefined()
    expect(response.measurers).toBeDefined()

    const { consultants, measurers } = response
    expect(Array.isArray(consultants)).toBeTruthy()
    expect(consultants.length).toBeGreaterThan(0)
    expect(consultants.find((c) => c.name === 'Terry Donald')).toBeDefined()

    expect(Array.isArray(measurers)).toBeTruthy()
    expect(measurers.length).toBeGreaterThan(0)
    expect(measurers.find((m) => m === 'Terry Donald')).toBeDefined()
  })
})
