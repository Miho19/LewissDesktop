import {
  retrievePricingScheduleAsync,
  retrieveAccessorySchedule
} from '@/utility/process/pricingSchedule/retrievePricingSchedule'
import { getLewissPhoenixwoodDimensionCost } from '@/utility/process/tableEntry/lewissPhoenixwood/getLewissPhoenixwoodDimensionCost'
import { Blind } from '@shared/types/blind/blind.types'
import { isLewissPhoenixwoodPricingSchedule } from '@shared/types/pricing/lewissPhoenixwood.types'
import { isLewissAccessorySchedule } from '@shared/types/pricing/venetianAccessories.types'

export async function getLewissPhoenixwoodCostAsync(
  blindType: Blind,
  width: number,
  height: number,
  fabricMultiplier: number,
  control: string,
  _valance: string,
  _fascia: string,
  _spacerBlock: 'Yes' | 'No',
  _cutOut: 'Yes' | 'No',
  _palladianShelf: string
) {
  const pricingSchedule = await retrievePricingScheduleAsync(blindType)
  if (!isLewissPhoenixwoodPricingSchedule(pricingSchedule)) return undefined

  const dimensionCost = getLewissPhoenixwoodDimensionCost(
    blindType,
    width,
    height,
    fabricMultiplier,
    control,
    pricingSchedule
  )

  if (typeof dimensionCost === 'undefined') return undefined

  const accessorySchedule = await retrieveAccessorySchedule(blindType)
  if (!isLewissAccessorySchedule(accessorySchedule)) return undefined

  return dimensionCost
}
