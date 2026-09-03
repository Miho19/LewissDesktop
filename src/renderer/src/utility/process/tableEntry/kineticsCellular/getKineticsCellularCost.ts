import { Blind } from '@shared/types/blind/blind.types'

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
  return 0
}
