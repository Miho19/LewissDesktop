import { getBlindTypeFromSpec } from '@/utility/process/worksheet/getBlindTypeFromSpec'
import { Blind } from '@shared/types/blind/blind.types'
import { VenetianBlindOptions } from '@shared/types/blind/venetian.types'
import {
  isLewissAccessorySchedule,
  LewissAccessorySchedule
} from '@shared/types/pricing/venetianAccessories.types'
import { VenetianSpec } from '@shared/types/spec/venetian.types'

const fauxwoodOptions = ['83 designer crown', '63 modern curve', '63 ramp'] as const
const phoenixwoodOptions = ['63 Catenary', '89mm Contempo', '63 Ramp'] as const

export function getLewissVenetianValance(spec: VenetianSpec) {
  const blindType = getBlindTypeFromSpec(spec)
  if (typeof blindType === 'undefined') return undefined

  switch (blindType) {
    case "Lewis's 50mm Fauxwood Venetian":
    case "Lewis's 63mm Fauxwood Venetian":
      return getFauxwoodValance(spec)
    case "Lewis's 50mm Phoenixwood Venetian":
    case "Lewis's 63mm Phoenixwood Venetian":
      return getPhoenixwoodValance(spec)

    default:
      return undefined
  }
}

function getFauxwoodValance(spec: VenetianSpec) {
  const { valanceCatenary, valanceModern, valanceRamp } = spec
  if (valanceCatenary != null) return '83 Designer Crown'

  if (valanceModern != null) return '63 Modern Curve'

  if (valanceRamp != null) return '63 Ramp'

  return undefined
}

function getPhoenixwoodValance(spec: VenetianSpec) {
  const { valanceCatenary, valanceModern, valanceRamp } = spec

  if (valanceCatenary != null) return '63 Catenary'

  if (valanceModern != null) return '89mm Contempo'

  if (valanceRamp != null) return '63 Ramp'

  return undefined
}

export function getLewissVenetianValanceCost(
  blindType: Blind,
  valance: string,
  pricingSchedule: LewissAccessorySchedule
) {
  if (!isBlindTypeValid(blindType)) return undefined
  if (!valance || valance.trim().length === 0) return 0
  if (!isLewissAccessorySchedule(pricingSchedule)) return undefined
  if (!isValidValance(blindType, valance)) return undefined

  const cost = getValanceCost(pricingSchedule)

  return cost
}

function isBlindTypeValid(blindType: Blind) {
  const optionSet = new Set<string>(VenetianBlindOptions)
  return optionSet.has(blindType)
}

function isValidValance(blindType: Blind, valance: string) {
  const valanceAdjusted = valance.trim().toLocaleLowerCase()

  switch (blindType) {
    case "Lewis's 50mm Fauxwood Venetian":
    case "Lewis's 63mm Fauxwood Venetian":
      return (fauxwoodOptions as readonly string[]).includes(valanceAdjusted)
    case "Lewis's 50mm Phoenixwood Venetian":
    case "Lewis's 63mm Phoenixwood Venetian":
      return (phoenixwoodOptions as readonly string[]).includes(valanceAdjusted)
    default:
      return false
  }
}

function getValanceCost(pricingSchedule: LewissAccessorySchedule) {
  const { valance } = pricingSchedule

  if (typeof valance === 'undefined') return undefined
  return valance.cost
}
