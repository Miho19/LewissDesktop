import {
  retrieveAccessorySchedule,
  retrievePricingScheduleAsync
} from '@/utility/process/pricingSchedule/retrievePricingSchedule'
import { getLewissFauxwoodDimensionCost } from '@/utility/process/tableEntry/lewissFauxwood/getLewissFauxwoodDimensionCost'
import { getLewissFauxwoodFasciaCost } from '@/utility/process/tableEntry/lewissFauxwood/getLewissFauxwoodFasciaCost'
import { getLewissFauxwoodValanceCost } from '@/utility/process/tableEntry/lewissFauxwood/getLewissFauxwoodValanceCost'
import {
  getLewissVenetianCutoutCost,
  getLewissVenetianPalladianShelfCost,
  getLewissVenetianSpacerBlockCost
} from '@/utility/process/tableEntry/shared/venetian'
import { Blind } from '@shared/types/blind/blind.types'
import { isLewissFauxwoodPricingSchedule } from '@shared/types/pricing/lewissFauxwood.types'
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

  const fasciaCost = getLewissFauxwoodFasciaCost(blindType, width, fascia, pricingSchedule)
  if (typeof fasciaCost === 'undefined') return undefined

  // need add tests for spacerBlock cost

  const spacerBlockCost = getLewissVenetianSpacerBlockCost(spacerBlock, accessorySchedule)
  if (typeof spacerBlockCost === 'undefined') return undefined

  const cutOutCost = getLewissVenetianCutoutCost(blindType, cutOut, accessorySchedule)
  if (typeof cutOutCost === 'undefined') return undefined

  const palladianShelfCost = getLewissVenetianPalladianShelfCost(
    blindType,
    width,
    palladianShelf,
    accessorySchedule
  )
  if (typeof palladianShelfCost === 'undefined') return undefined

  return dimensionCost + valanceCost + fasciaCost + cutOutCost + palladianShelfCost
}
