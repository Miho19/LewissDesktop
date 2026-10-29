import { retrievePricingScheduleAsync } from '@renderer/utility/process/pricingSchedule/retrievePricingSchedule'
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
 * @param sideChannel
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
  sideChannel: string
) {
  try {
    const pricingSchedule = await retrievePricingScheduleAsync(blindType)
    if (typeof pricingSchedule === 'undefined') throw new Error('pricing schedule is undefined')
    if (!isKineticsCellularPricingSchedule(pricingSchedule))
      throw new Error('incorrect pricing schedule')

    const dimensionCost = getKineticsCellularDimensionCost(width, height, fabric, pricingSchedule)
    if (typeof dimensionCost === 'undefined') throw new Error('dimension cost failure')

    const controlCost = getKineticsCellularControlCost(control, pricingSchedule)
    if (typeof controlCost === 'undefined') throw new Error('control cost failure')

    const headrailCost = getKineticsCellularHeadrailCost(headrailColour, pricingSchedule)
    if (typeof headrailCost === 'undefined') throw new Error('headrail cost failure')

    const sideChannelCost = getKineticsCellularSideChannelCost(height, sideChannel, pricingSchedule)
    if (typeof sideChannelCost === 'undefined') throw new Error('side channel cost failure')

    return dimensionCost + controlCost + headrailCost + sideChannelCost
  } catch (error) {
    console.error(error)
    return undefined
  }
}
