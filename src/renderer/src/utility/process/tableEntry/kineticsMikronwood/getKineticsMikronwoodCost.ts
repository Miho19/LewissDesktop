import { retrievePricingScheduleAsync } from '@/utility/process/pricingSchedule/retrievePricingSchedule'
import { getKineticsMikronwoodControlCost } from '@/utility/process/tableEntry/kineticsMikronwood/getKineticsMikronwoodControlCost'
import { getKineticsMikronwoodDimensionCost } from '@/utility/process/tableEntry/kineticsMikronwood/getKineticsMikronwoodDimensionCost'
import { getKineticsMikronwoodFasciaCost } from '@/utility/process/tableEntry/kineticsMikronwood/getKineticsMikronwoodFasciaCost'
import { Blind } from '@shared/types/blind/blind.types'
import { isKineticsMikronwoodPricingSchedule } from '@shared/types/pricing/kineticsMikronwood.types'

// Butting blind 2.1 factor, does it apply to the entire blind
// how does this work
// calculate both blinds width / height cost ??? then 2.1 or 2.1 on one of them

export async function getKineticsMikronwoodCostAsync(
  blindType: Blind,
  width: number,
  height: number,
  control: string,
  fascia: string,
  holdDownBracket: string
) {
  const pricingSchedule = await retrievePricingScheduleAsync(blindType)
  if (!isKineticsMikronwoodPricingSchedule(pricingSchedule)) return undefined

  const dimensionCost = getKineticsMikronwoodDimensionCost(width, height, pricingSchedule)
  if (typeof dimensionCost === 'undefined') return undefined

  const controlCost = getKineticsMikronwoodControlCost(control, pricingSchedule)
  if (typeof controlCost === 'undefined') return undefined

  const fasciaCost = getKineticsMikronwoodFasciaCost(fascia, pricingSchedule)
  if (typeof fasciaCost === 'undefined') return undefined

  return dimensionCost + controlCost + fasciaCost
}
