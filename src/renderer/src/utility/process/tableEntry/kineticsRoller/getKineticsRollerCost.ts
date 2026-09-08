import { Blind } from '@shared/types/blind/blind.types'
import { isKineticsRollerPricingSchedule } from '@shared/types/pricing/kineticsRoller.types'
import { Fabric } from '@shared/types/Project.types'
import { retrievePricingScheduleAsync } from '@renderer/utility/process/tableEntry/shared/retrievePricingSchedule'
import { getKineticsRollerDimensionCost } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerDimensionCost'
import { getKineticsRollerControlCost } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerControlCost'
import { getKineticsRollerBottomRailCost } from '@renderer/utility/process/tableEntry/kineticsRoller/getKineticsRollerBottomRailCost'

export async function getKineticsRollerCostAsync(
  blindType: Blind,
  width: number,
  height: number,
  fabric: Fabric,
  control: string,
  controlLength: string,
  bottomRailType: string,
  bottomRailColour: string
) {
  const pricingSchedule = await retrievePricingScheduleAsync(blindType)
  if (typeof pricingSchedule === 'undefined') return undefined
  if (!isKineticsRollerPricingSchedule(pricingSchedule)) return undefined

  const dimensionCost = getKineticsRollerDimensionCost(width, height, fabric, pricingSchedule)
  if (typeof dimensionCost === 'undefined') return undefined

  const controlCost = getKineticsRollerControlCost(control, controlLength, pricingSchedule)
  if (typeof controlCost === 'undefined') return undefined

  const bottomRailCost = getKineticsRollerBottomRailCost(
    width,
    bottomRailType,
    bottomRailColour,
    pricingSchedule
  )
  if (typeof bottomRailCost === 'undefined') return undefined

  return dimensionCost + controlCost + bottomRailCost
}
