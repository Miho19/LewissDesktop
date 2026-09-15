import { getLewissVenetianValanceCost } from '@/utility/process/tableEntry/shared/venetian'
import { Blind } from '@shared/types/blind/blind.types'
import { AccessorySchedule } from '@shared/types/pricing/pricingSchedule.types'
import { isLewissAccessorySchedule } from '@shared/types/pricing/venetianAccessories.types'

export function getLewissFauxwoodValanceCost(
  blindType: Blind,
  valance: string,
  pricingSchedule: AccessorySchedule
) {
  if (!isLewissAccessorySchedule(pricingSchedule)) return undefined
  return getLewissVenetianValanceCost(blindType, valance, pricingSchedule)
}
