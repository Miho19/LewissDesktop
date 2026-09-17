import { Blind } from '@shared/types/blind/blind.types'
import { describe, vi, it, expect, afterAll, beforeEach } from 'vitest'
import {
  getExamplePricingSchedule,
  getExampleAccessorySchedule,
  getWindowDisplayAndProjectFile
} from '../utility'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { createWorksheetAsync } from '@/utility/process/worksheet/getWorksheetList'
import { generateWorksheetPDF } from '@main/pdf/generateWorksheetPDF'

vi.mock(
  '@renderer/utility/process/pricingSchedule/retrievePricingSchedule',
  async (importOriginal) => {
    const actual =
      await importOriginal<
        typeof import('@renderer/utility/process/pricingSchedule/retrievePricingSchedule')
      >()
    return {
      ...actual,
      retrievePricingScheduleAsync: vi
        .fn()
        .mockImplementation((blindType: Blind) => getExamplePricingSchedule(blindType)),
      retrieveAccessorySchedule: vi
        .fn()
        .mockImplementation((blindType: Blind) => getExampleAccessorySchedule(blindType))
    }
  }
)

const input: { blindType: Blind }[] = [
  { blindType: 'Kinetics 10mm Cellular Blind' },
  { blindType: 'Kinetics 20mm Cellular Blind' },
  { blindType: 'Kinetics Blockout Roller Blind' },
  { blindType: 'Kinetics Light Filtering Roller Blind' },
  { blindType: 'Kinetics Sunscreen Roller Blind' }
]

describe('generateWorksheetPDF', () => {
  afterAll(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        blob: async () => new Blob(['fake iamge blob'], { type: 'image/png' })
      })
    )
  })

  it.each(input)('should return a worksheet pdf for $blindType', async ({ blindType }) => {
    const { projectFile, windowDisplayList } = getWindowDisplayAndProjectFile(blindType)

    if (windowDisplayList.length === 0) return

    const map = new Map<Blind, WindowDisplay[]>()
    map.set(blindType, windowDisplayList)

    const worksheet = await createWorksheetAsync(blindType, windowDisplayList, projectFile)
    expect(worksheet).toBeDefined()
    if (typeof worksheet === 'undefined') expect.fail('worksheet is undefined')

    const result = await generateWorksheetPDF(worksheet)
    expect(result).toBeDefined()
  })
})
