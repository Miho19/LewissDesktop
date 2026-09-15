import { retrievePricingScheduleAsync } from '@/utility/process/pricingSchedule/retrievePricingSchedule'
import { Blind } from '@shared/types/blind/blind.types'

export async function getLewissFauxwoodCostAsync(
  blindType: Blind,
  width: number,
  height: number,
  fabricMultiplier: number,
  control: string,
  valance: string,
  fascia: string,
  spacerBlock: 'Yes' | 'No',
  cutOut: 'Yes' | 'No',
  palladianShelf: string
) {
  const pricingSchedule = await retrievePricingScheduleAsync(blindType)
}
