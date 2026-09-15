import {
  retrieveAccessorySchedule,
  retrievePricingScheduleAsync
} from '@/utility/process/pricingSchedule/retrievePricingSchedule'
import { getLewissFauxwoodDimensionCost } from '@/utility/process/tableEntry/lewissFauxwood/getLewissFauxwoodDimensionCost'
import { getLewissFauxwoodValanceCost } from '@/utility/process/tableEntry/lewissFauxwood/getLewissFauxwoodValanceCost'
import { Blind } from '@shared/types/blind/blind.types'
import { isLewissFauxwoodPricingSchedule } from '@shared/types/pricing/lewissFauxwood.types'
import { isLewissVenetianPricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { isLewissAccessorySchedule } from '@shared/types/pricing/venetianAccessories.types'

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
  if (!isLewissFauxwoodPricingSchedule(pricingSchedule)) return undefined

  const dimensionCost = getLewissFauxwoodDimensionCost(
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

  const valanceCost = getLewissFauxwoodValanceCost(blindType, valance, accessorySchedule)
  if (typeof valanceCost === 'undefined') return undefined

  return dimensionCost + valanceCost
}
