import { retrievePricingScheduleAsync } from '@renderer/utility/process/tableEntry/shared/retrievePricingSchedule'
import { Blind } from '@shared/types/blind/blind.types'
import { getKineticsCellularControlCost } from '@renderer/utility/process/tableEntry/kineticsCellular/getKineticsCellularControlCost'
import { getKineticsCellularDimensionCost } from '@renderer/utility/process/tableEntry/kineticsCellular/getKineticsCellularDimensionCost'
import { getKineticsCellularHeadrailCost } from '@renderer/utility/process/tableEntry/kineticsCellular/getKineticsCellularHeadrailCost'
import { getKineticsCellularSideChannelCost } from '@renderer/utility/process/tableEntry/kineticsCellular/getKineticsCellularSideChannelCost'
import { isKineticsCellularPricingSchedule } from '@shared/types/pricing/kineticsCellular.types'

/**
 *
 * @param blindType
 * @param width
 * @param height
 * @param fabric
 * @param control
 * @param headrailColour
 * @param sideChannelColour
 *
 * we are no longer going to rely on additional cost to host the motor cost
 */

export async function getKineticsCellularCost(
  blindType: Blind,
  width: number,
  height: number,
  fabric: string,
  control: string,
  headrailColour: string,
  sideChannelColour: string
) {
  try {
    const pricingSchedule = await retrievePricingScheduleAsync(blindType)
    if (typeof pricingSchedule === 'undefined') return undefined
    if (!isKineticsCellularPricingSchedule(pricingSchedule)) return undefined

    const dimensionCost = getKineticsCellularDimensionCost(width, height, fabric, pricingSchedule)
    if (typeof dimensionCost === 'undefined') return undefined

    const controlCost = getKineticsCellularControlCost(control, pricingSchedule)
    if (typeof controlCost === 'undefined') return undefined

    const headrailCost = getKineticsCellularHeadrailCost(headrailColour, pricingSchedule)
    if (typeof headrailCost === 'undefined') return undefined

    const sideChannelCost = getKineticsCellularSideChannelCost(
      height,
      sideChannelColour,
      pricingSchedule
    )
    if (typeof sideChannelCost === 'undefined') return undefined

    return dimensionCost + controlCost + headrailCost + sideChannelCost
  } catch (error) {
    return undefined
  }
}
