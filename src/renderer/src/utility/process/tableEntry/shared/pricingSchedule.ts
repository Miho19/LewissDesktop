import type { Blind } from '@shared/types/blind/blind.types'
import { queryClient } from '@renderer/main'

// need to setup ipc for this

export async function retrievePricingScheduleAsync(blindType: Blind) {
  try {
    const pricingSchedule = await queryClient.ensureQueryData({
      queryKey: [`pricing schedule ${blindType}`],
      queryFn: async () => await window.api.getPricingSchedule(blindType)
    })

    return pricingSchedule
  } catch (error) {
    throw new Error(`Failed to fetch ${blindType} pricing schedule`, { cause: error })
  }
}
