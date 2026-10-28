import { Blind } from '@shared/types/blind/blind.types'
import { isKineticsRollerPricingSchedule } from '@shared/types/pricing/kineticsRoller.types'
import { Fabric } from '@shared/types/Project.types'
import { retrievePricingScheduleAsync } from '@renderer/utility/process/pricingSchedule/retrievePricingSchedule'
import { getKineticsRollerDimensionCost } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerDimensionCost'
import { getKineticsRollerControlCost } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerControlCost'
import { getKineticsRollerBottomRailCost } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerBottomRailCost'
import { getKineticsRollerPelmetCost } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerPelmetCost'
import { getKineticsRollerBracketCost } from '@/utility/process/tableEntry/kineticsRoller/getKineticsBracketCost'

export async function getKineticsRollerCostAsync(
  blindType: Blind,
  width: number,
  height: number,
  fabric: Fabric,
  control: string,
  bottomRail: string,
  pelmet: string,
  bracket: string
) {
  try {
    const pricingSchedule = await retrievePricingScheduleAsync(blindType)
    if (typeof pricingSchedule === 'undefined') throw new Error('pricing schedule undefined')
    if (!isKineticsRollerPricingSchedule(pricingSchedule))
      throw new Error('incorrect pricing schedule')

    const dimensionCost = getKineticsRollerDimensionCost(width, height, fabric, pricingSchedule)
    if (typeof dimensionCost === 'undefined') throw new Error('dimension cost failure')

    const controlCost = getKineticsRollerControlCost(control, pricingSchedule)

    if (typeof controlCost === 'undefined') throw new Error('control cost failure')

    const bottomRailCost = getKineticsRollerBottomRailCost(width, bottomRail, pricingSchedule)
    if (typeof bottomRailCost === 'undefined') throw new Error('bottom rail cost failure')

    const pelmetCost = getKineticsRollerPelmetCost(width, pelmet, pricingSchedule)
    if (typeof pelmetCost === 'undefined') throw new Error('pelemt cost failure')

    const bracketCost = getKineticsRollerBracketCost(bracket, pricingSchedule)
    if (typeof bracketCost === 'undefined') throw new Error('bracket cost failure')

    return dimensionCost + controlCost + bottomRailCost + pelmetCost + bracketCost
  } catch (error) {
    console.error(error)
    return undefined
  }
}
