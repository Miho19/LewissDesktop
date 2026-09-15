import {
  retrieveAccessorySchedule,
  retrievePricingScheduleAsync
} from '@/utility/process/pricingSchedule/retrievePricingSchedule'
import { getLewissAluminiumDimensionCost } from '@/utility/process/tableEntry/lewissAluminium/getLewissAluminiumDimensionCost'
import { getLewissAluminiumSpacerBlockCost } from '@/utility/process/tableEntry/lewissAluminium/getLewissAluminiumSpacerBlockCost'
import { Blind } from '@shared/types/blind/blind.types'
import { isLewissAluminiumPricingSchedule } from '@shared/types/pricing/lewissAluminium.types'
import { isLewissAccessorySchedule } from '@shared/types/pricing/venetianAccessories.types'

export async function getLewissAluminiumCostAsync(
  blindType: Blind,
  width: number,
  height: number,
  fabricMultiplier: number,
  control: string,
  spacerBlock: 'Yes' | 'No'
) {
  const pricingSchedule = await retrievePricingScheduleAsync(blindType)
  if (!isLewissAluminiumPricingSchedule(pricingSchedule)) return undefined

  const dimensionCost = getLewissAluminiumDimensionCost(
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

  const spacerBlockCost = getLewissAluminiumSpacerBlockCost(spacerBlock, accessorySchedule)
  if (typeof spacerBlockCost === 'undefined') return undefined

  return dimensionCost + spacerBlockCost
}
