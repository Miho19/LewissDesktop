import { GETStaff } from '@main/http/GETStaff'
import { describe, it, expect } from 'vitest'
describe('getStaffList', () => {
  it('should return a list of staff', async () => {
    const response = await GETStaff()
    console.log(response)
  })
})
