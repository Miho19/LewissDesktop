import type { Blind } from '@shared/types/blind/blind.types'
import { queryClient } from '@renderer/utility/general/queryClient'

// need to setup ipc for this

export async function retrievePricingScheduleAsync(blindType: Blind) {
  const pricingSchedule = await queryClient.ensureQueryData({
    queryKey: [`pricing schedule ${blindType}`],
    queryFn: async () => await window.api.getPricingSchedule(blindType)
  })

  return pricingSchedule
}

export async function retrieveAccessorySchedule(blindType: Blind) {
  const accessorySchedule = await queryClient.ensureQueryData({
    queryKey: [`accessory schedule ${blindType}`],
    queryFn: async () => await window.api.getAccessorySchedule(blindType)
  })

  return accessorySchedule
}
